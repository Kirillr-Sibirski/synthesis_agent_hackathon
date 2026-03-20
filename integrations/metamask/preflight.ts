import 'dotenv/config';

import { encodeFunctionData, getAddress, keccak256, toBytes } from 'viem';

import { chain, getSmartAccount, publicClient, smartAccountsEnvironment } from './utils.js';
import { treasuryAbi } from './treasuryAbi.js';

const TREASURY_ADDRESS = process.env.TREASURY_ADDRESS as `0x${string}` | undefined;
const DEMO_RECIPIENT = process.env.DEMO_RECIPIENT as `0x${string}` | undefined;
const DEMO_EXECUTOR = process.env.DEMO_EXECUTOR as `0x${string}` | undefined;
const BUNDLER_URL = process.env.BUNDLER_URL;

async function probeBundler(url: string) {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        jsonrpc: '2.0',
        id: 1,
        method: 'eth_chainId',
        params: [],
      }),
    });

    const text = await response.text();
    let parsed: any = null;

    try {
      parsed = JSON.parse(text);
    } catch {
      return {
        reachable: false,
        httpStatus: response.status,
        note: 'Bundler endpoint responded with non-JSON output.',
      };
    }

    return {
      reachable: response.ok && typeof parsed?.result === 'string',
      httpStatus: response.status,
      chainIdHex: parsed?.result,
      note: parsed?.error ? JSON.stringify(parsed.error) : undefined,
    };
  } catch (error) {
    return {
      reachable: false,
      note: error instanceof Error ? error.message : String(error),
    };
  }
}

async function main() {
  const missingRequired = [
    !TREASURY_ADDRESS ? 'TREASURY_ADDRESS' : null,
    !DEMO_RECIPIENT ? 'DEMO_RECIPIENT' : null,
    !DEMO_EXECUTOR ? 'DEMO_EXECUTOR' : null,
  ].filter(Boolean);

  const smartAccount = await getSmartAccount();
  const smartAccountCode = await publicClient.getCode({ address: smartAccount.address });
  const smartAccountDeployed = Boolean(smartAccountCode && smartAccountCode !== '0x');

  const treasuryAddress = TREASURY_ADDRESS ? getAddress(TREASURY_ADDRESS) : null;
  const treasuryCode = treasuryAddress ? await publicClient.getCode({ address: treasuryAddress }) : null;
  const treasuryDeployed = Boolean(treasuryCode && treasuryCode !== '0x');

  const budgetId = keccak256(toBytes('OPS_BUDGET'));
  const taskId = keccak256(toBytes('metamask-delegation-task-1'));
  const receiptHash = keccak256(toBytes('metamask-delegation-receipt-1'));
  const evidenceHash = keccak256(toBytes('metamask-delegation-evidence-1'));
  const resultHash = keccak256(toBytes('metamask-delegation-result-1'));
  const metadataURI = 'ipfs://metamask-delegation-spend-1';
  const amountWstETH = 1_000000000000000000n;

  const spendCallData =
    treasuryAddress && DEMO_RECIPIENT
      ? encodeFunctionData({
          abi: treasuryAbi,
          functionName: 'spendFromBudget',
          args: [
            budgetId,
            getAddress(DEMO_RECIPIENT),
            amountWstETH,
            taskId,
            receiptHash,
            evidenceHash,
            resultHash,
            metadataURI,
          ],
        })
      : null;

  const bundler = BUNDLER_URL ? await probeBundler(BUNDLER_URL) : { reachable: false, note: 'BUNDLER_URL not configured.' };
  const readyForLiveRedemption =
    missingRequired.length === 0 &&
    treasuryDeployed &&
    bundler.reachable;

  const report = {
    generatedAt: new Date().toISOString(),
    network: {
      chainId: chain.id,
      chainName: chain.name,
      delegationManager: smartAccountsEnvironment.DelegationManager,
      entryPoint: smartAccountsEnvironment.EntryPoint,
    },
    env: {
      requiredConfigured: missingRequired.length === 0,
      missingRequired,
      bundlerConfigured: Boolean(BUNDLER_URL),
    },
    accounts: {
      delegatorSmartAccount: smartAccount.address,
      executor: DEMO_EXECUTOR ?? null,
      recipient: DEMO_RECIPIENT ?? null,
    },
    onchain: {
      smartAccountDeployed,
      treasuryAddress,
      treasuryDeployed,
    },
    bundler,
    spendIntent: spendCallData
      ? {
          selector: spendCallData.slice(0, 10),
          budgetId,
          taskId,
          receiptHash,
          evidenceHash,
          resultHash,
          metadataURI,
          amountWstETH: amountWstETH.toString(),
          callDataBytes: (spendCallData.length - 2) / 2,
        }
      : null,
    readiness: {
      readyForLiveRedemption,
      remainingBlockers: [
        ...missingRequired.map((name) => `Missing env: ${name}`),
        ...(!treasuryDeployed ? [`TREASURY_ADDRESS has no code on ${chain.name}.`] : []),
        ...(!bundler.reachable ? ['Bundler is not reachable/usable yet.'] : []),
        ...(smartAccountDeployed ? [] : ['MetaMask smart account still needs onchain deployment via user operation.']),
      ],
      nextSteps: [
        `Ensure the treasury address points at the intended live ${chain.name} treasury deployment.`,
        `Deploy/fund the MetaMask smart account through a working ${chain.name} bundler.`,
        'Redeem the constrained delegation through DelegationManager from the authorized executor.',
        'Record the resulting treasury spend tx hash and update deployments/ and submission/.',
      ],
    },
  };

  console.log(JSON.stringify(report, null, 2));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
