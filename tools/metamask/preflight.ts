import 'dotenv/config';

import { mkdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';

import { encodeFunctionData, getAddress, keccak256, toBytes } from 'viem';

import {
  chain,
  getSmartAccount,
  publicClient,
  smartAccountFundingTargetWei,
  smartAccountsEnvironment,
} from './utils.js';
import { treasuryAbi } from './treasuryAbi.js';

const TREASURY_ADDRESS = process.env.TREASURY_ADDRESS as `0x${string}` | undefined;
const DEMO_RECIPIENT = process.env.DEMO_RECIPIENT as `0x${string}` | undefined;
const DEMO_EXECUTOR = process.env.DEMO_EXECUTOR as `0x${string}` | undefined;
const TREASURY_EXECUTOR_ADDRESS = process.env.TREASURY_EXECUTOR_ADDRESS as `0x${string}` | undefined;
const BUNDLER_URL = process.env.BUNDLER_URL;
const WSTETH_ADDRESS = process.env.WSTETH_ADDRESS as `0x${string}` | undefined;
const PREFLIGHT_OUT = process.env.PREFLIGHT_OUT;

const BASE_MAINNET_CHAIN_ID = 8453;
const BASE_MAINNET_WSTETH = '0xc1CBa3fCea344f92D9239c08C0568f6F2F0ee452';

function readBytes32Env(name: string, fallbackLabel: string): `0x${string}` {
  const value = process.env[name]?.trim();
  if (!value) return keccak256(toBytes(fallbackLabel));
  if (!/^0x[a-fA-F0-9]{64}$/.test(value)) {
    throw new Error(`Invalid ${name} in .env; expected a 32-byte 0x-prefixed hex string.`);
  }
  return value as `0x${string}`;
}

function readBigIntEnv(name: string, fallback: bigint): bigint {
  const value = process.env[name]?.trim();
  if (!value) return fallback;
  try {
    return BigInt(value);
  } catch {
    throw new Error(`Invalid ${name} in .env; expected an integer wei-denominated value.`);
  }
}

async function probeBundler(url: string, expectedChainId: number) {
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
        chainMatchesSelectedNetwork: false,
        httpStatus: response.status,
        note: 'Bundler endpoint responded with non-JSON output.',
      };
    }

    const chainIdHex = typeof parsed?.result === 'string' ? parsed.result : null;
    const chainId = chainIdHex ? Number.parseInt(chainIdHex, 16) : null;
    const chainMatchesSelectedNetwork = chainId === expectedChainId;

    return {
      reachable: response.ok && typeof parsed?.result === 'string',
      chainMatchesSelectedNetwork,
      httpStatus: response.status,
      chainIdHex,
      chainId,
      expectedChainId,
      note: parsed?.error ? JSON.stringify(parsed.error) : undefined,
    };
  } catch (error) {
    return {
      reachable: false,
      chainMatchesSelectedNetwork: false,
      expectedChainId,
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
  const smartAccountNativeBalance = await publicClient.getBalance({ address: smartAccount.address });
  const treasuryExecutor = TREASURY_EXECUTOR_ADDRESS ? getAddress(TREASURY_EXECUTOR_ADDRESS) : null;
  const treasuryExecutorMatchesSmartAccount =
    treasuryExecutor !== null ? treasuryExecutor === getAddress(smartAccount.address) : false;
  const smartAccountFundingConfigured = smartAccountFundingTargetWei > 0n;
  const smartAccountFundingTargetMet =
    smartAccountFundingTargetWei === 0n
      ? smartAccountNativeBalance > 0n
      : smartAccountNativeBalance >= smartAccountFundingTargetWei;
  const smartAccountFundingReady = smartAccountNativeBalance > 0n || smartAccountFundingConfigured;

  const treasuryAddress = TREASURY_ADDRESS ? getAddress(TREASURY_ADDRESS) : null;
  const treasuryCode = treasuryAddress ? await publicClient.getCode({ address: treasuryAddress }) : null;
  const treasuryDeployed = Boolean(treasuryCode && treasuryCode !== '0x');

  const budgetId = keccak256(toBytes('OPS_BUDGET'));
  const taskId = readBytes32Env('TASK_ID', 'metamask-delegation-task-1');
  const receiptHash = readBytes32Env('RECEIPT_HASH', 'metamask-delegation-receipt-1');
  const evidenceHash = readBytes32Env('EVIDENCE_HASH', 'metamask-delegation-evidence-1');
  const resultHash = readBytes32Env('RESULT_HASH', 'metamask-delegation-result-1');
  const metadataURI = process.env.METADATA_URI?.trim() || 'ipfs://metamask-delegation-spend-1';
  const amountWstETH = readBigIntEnv('SPEND_AMOUNT_WSTETH', 1_000000000000000000n);

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

  const bundler = BUNDLER_URL
    ? await probeBundler(BUNDLER_URL, chain.id)
    : {
        reachable: false,
        chainMatchesSelectedNetwork: false,
        expectedChainId: chain.id,
        note: 'BUNDLER_URL not configured.',
      };
  const bundlerReady = bundler.reachable && bundler.chainMatchesSelectedNetwork === true;
  const selectedFinalChain = chain.id === BASE_MAINNET_CHAIN_ID;
  const configuredWstETHMatchesBaseMainnet = WSTETH_ADDRESS
    ? getAddress(WSTETH_ADDRESS) === getAddress(BASE_MAINNET_WSTETH)
    : false;
  const usingExpectedMainnetWstETH =
    chain.id === BASE_MAINNET_CHAIN_ID ? configuredWstETHMatchesBaseMainnet : null;
  const treasuryAuthorizerReadyForMetaMask = treasuryExecutorMatchesSmartAccount;
  const readyForLiveRedemption =
    missingRequired.length === 0 &&
    treasuryDeployed &&
    bundlerReady &&
    treasuryAuthorizerReadyForMetaMask &&
    (smartAccountDeployed || smartAccountFundingReady);
  const readyForFinalSameNetworkRun =
    selectedFinalChain &&
    readyForLiveRedemption &&
    smartAccountDeployed &&
    usingExpectedMainnetWstETH === true;

  const report = {
    generatedAt: new Date().toISOString(),
    network: {
      chainId: chain.id,
      chainName: chain.name,
      delegationManager: smartAccountsEnvironment.DelegationManager,
      entryPoint: smartAccountsEnvironment.EntryPoint,
      finalSameNetworkTarget: {
        chainId: BASE_MAINNET_CHAIN_ID,
        chainName: 'Base',
        chainSelected: selectedFinalChain,
        expectedWstETH: BASE_MAINNET_WSTETH,
        configuredWstETH: WSTETH_ADDRESS ?? null,
        configuredWstETHMatchesBaseMainnet,
        usingExpectedMainnetWstETH,
      },
    },
    env: {
      requiredConfigured: missingRequired.length === 0,
      missingRequired,
      bundlerConfigured: Boolean(BUNDLER_URL),
      wstETHConfigured: Boolean(WSTETH_ADDRESS),
      treasuryExecutorConfigured: Boolean(TREASURY_EXECUTOR_ADDRESS),
      smartAccountFundingTargetWei: smartAccountFundingTargetWei.toString(),
    },
    accounts: {
      delegatorSmartAccount: smartAccount.address,
      treasuryExecutor,
      executor: DEMO_EXECUTOR ?? null,
      recipient: DEMO_RECIPIENT ?? null,
    },
    onchain: {
      smartAccountDeployed,
      smartAccountNativeBalanceWei: smartAccountNativeBalance.toString(),
      smartAccountFundingConfigured,
      smartAccountFundingTargetMet,
      smartAccountFundingReady,
      treasuryAddress,
      treasuryDeployed,
    },
    bundler: {
      ...bundler,
      readyForSelectedNetworkUserOps: bundlerReady,
    },
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
      readyForFinalSameNetworkRun,
      remainingBlockers: [
        ...missingRequired.map((name) => `Missing env: ${name}`),
        ...(!selectedFinalChain ? ['Selected chain is not Base mainnet yet; final same-network thesis is still unmet.'] : []),
        ...(WSTETH_ADDRESS && !configuredWstETHMatchesBaseMainnet
          ? [`Configured WSTETH_ADDRESS does not match the Base mainnet canonical wstETH address (${BASE_MAINNET_WSTETH}).`]
          : []),
        ...(!treasuryDeployed ? [`TREASURY_ADDRESS has no code on ${chain.name}.`] : []),
        ...(!bundler.reachable ? ['Bundler is not reachable/usable yet.'] : []),
        ...(bundler.reachable && bundler.chainMatchesSelectedNetwork !== true
          ? [`Bundler chain does not match the selected MetaMask chain (expected ${chain.id}, got ${bundler.chainId ?? 'unknown'}).`]
          : []),
        ...(!TREASURY_EXECUTOR_ADDRESS
          ? ['TREASURY_EXECUTOR_ADDRESS is not set; for the MetaMask path the treasury authorizer must allow the smart-account address as executor.']
          : []),
        ...(TREASURY_EXECUTOR_ADDRESS && !treasuryExecutorMatchesSmartAccount
          ? [`TREASURY_EXECUTOR_ADDRESS does not match the derived MetaMask smart-account address (${smartAccount.address}).`]
          : []),
        ...(!smartAccountDeployed && !smartAccountFundingReady
          ? ['MetaMask smart account has no visible ETH funding for an unsponsored deployment. Pre-fund the counterfactual address or set SMART_ACCOUNT_FUNDING_WEI before the live flow.']
          : []),
        ...(smartAccountDeployed ? [] : ['MetaMask smart account still needs onchain deployment via user operation.']),
        ...(chain.id === BASE_MAINNET_CHAIN_ID && usingExpectedMainnetWstETH === false
          ? [`Configured WSTETH_ADDRESS does not match Base mainnet wstETH (${BASE_MAINNET_WSTETH}).`]
          : []),
      ],
      nextSteps: readyForFinalSameNetworkRun
        ? ['Refresh the public evidence pack, dashboard config, and deployment notes from this live Base mainnet proof set.']
        : [
            ...(selectedFinalChain
              ? []
              : ['Switch MetaMask integration env to Base mainnet (`METAMASK_CHAIN=base`) for the final same-network run.']),
            selectedFinalChain
              ? `Ensure the treasury address points at the intended live ${chain.name} treasury deployment.`
              : 'After switching chains, point TREASURY_ADDRESS at the intended live Base mainnet treasury deployment.',
            `Set TREASURY_EXECUTOR_ADDRESS=${smartAccount.address} so the treasury authorizer matches the MetaMask smart-account caller rather than the redeemer EOA.`,
            ...(chain.id === BASE_MAINNET_CHAIN_ID
              ? ['Ensure WSTETH_ADDRESS is set to the real Base mainnet token address and the treasury story uses that same network.']
              : []),
            ...(smartAccountDeployed || smartAccountFundingReady
              ? []
              : ['Pre-fund the counterfactual smart account or set SMART_ACCOUNT_FUNDING_WEI before attempting the first unsponsored bundler deployment.']),
            selectedFinalChain
              ? `Deploy/fund the MetaMask smart account through a working ${chain.name} bundler.`
              : 'After switching chains, deploy/fund the MetaMask smart account through a working Base mainnet bundler.',
            'Redeem the constrained delegation through DelegationManager from the authorized executor.',
            'Record the resulting treasury spend tx hash and update Memory/Deployments/ and Memory/Submission/.',
          ],
    },
  };

  const output = JSON.stringify(report, null, 2);

  if (PREFLIGHT_OUT) {
    const resolved = path.resolve(process.cwd(), PREFLIGHT_OUT);
    mkdirSync(path.dirname(resolved), { recursive: true });
    writeFileSync(resolved, `${output}\n`);
  }

  console.log(output);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
