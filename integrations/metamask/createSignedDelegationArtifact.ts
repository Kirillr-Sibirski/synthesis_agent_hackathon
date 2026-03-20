import 'dotenv/config';

import { createDelegation, signDelegation } from '@metamask/smart-accounts-kit';
import { createCaveatBuilder, getDelegationHashOffchain } from '@metamask/smart-accounts-kit/utils';
import { encodeFunctionData, getAddress, keccak256, toBytes } from 'viem';

import { chain, getSmartAccount, ownerAccount, smartAccountsEnvironment } from './utils.js';
import { treasuryAbi } from './treasuryAbi.js';

const TREASURY_ADDRESS = process.env.TREASURY_ADDRESS as `0x${string}` | undefined;
const DEMO_RECIPIENT = process.env.DEMO_RECIPIENT as `0x${string}` | undefined;
const DEMO_EXECUTOR = process.env.DEMO_EXECUTOR as `0x${string}` | undefined;
const PRIVATE_KEY = process.env.PRIVATE_KEY as `0x${string}` | undefined;

if (!TREASURY_ADDRESS) throw new Error('Missing TREASURY_ADDRESS in .env');
if (!DEMO_RECIPIENT) throw new Error('Missing DEMO_RECIPIENT in .env');
if (!DEMO_EXECUTOR) throw new Error('Missing DEMO_EXECUTOR in .env');
if (!PRIVATE_KEY) throw new Error('Missing PRIVATE_KEY in .env');

async function main() {
  const smartAccount = await getSmartAccount();
  const treasuryAddress = getAddress(TREASURY_ADDRESS!);
  const demoRecipient = getAddress(DEMO_RECIPIENT!);
  const demoExecutor = getAddress(DEMO_EXECUTOR!);

  const budgetId = keccak256(toBytes('OPS_BUDGET'));
  const taskId = keccak256(toBytes('metamask-delegation-task-1'));
  const receiptHash = keccak256(toBytes('metamask-delegation-receipt-1'));
  const evidenceHash = keccak256(toBytes('metamask-delegation-evidence-1'));
  const resultHash = keccak256(toBytes('metamask-delegation-result-1'));
  const amountWstETH = 1_000000000000000000n;
  const metadataURI = 'ipfs://metamask-delegation-spend-1';

  const spendCallData = encodeFunctionData({
    abi: treasuryAbi,
    functionName: 'spendFromBudget',
    args: [
      budgetId,
      demoRecipient,
      amountWstETH,
      taskId,
      receiptHash,
      evidenceHash,
      resultHash,
      metadataURI,
    ],
  });
  const spendSelector = spendCallData.slice(0, 10) as `0x${string}`;

  const now = Math.floor(Date.now() / 1000);
  const validForSeconds = 24 * 60 * 60;
  const beforeThreshold = now + validForSeconds;

  const caveats = createCaveatBuilder(smartAccountsEnvironment)
    .addCaveat('redeemer', { redeemers: [demoExecutor] })
    .addCaveat('limitedCalls', { limit: 1 })
    .addCaveat('timestamp', { afterThreshold: now, beforeThreshold })
    .build();

  const unsignedDelegation = createDelegation({
    environment: smartAccountsEnvironment,
    from: smartAccount.address,
    to: demoExecutor,
    scope: {
      type: 'functionCall',
      targets: [treasuryAddress],
      selectors: [spendSelector],
      exactCalldata: { calldata: spendCallData },
      valueLte: { maxValue: 0n },
    },
    caveats,
  });

  const signature = await signDelegation({
    privateKey: PRIVATE_KEY!,
    delegation: unsignedDelegation,
    delegationManager: smartAccountsEnvironment.DelegationManager,
    chainId: chain.id,
  });

  const signedDelegation = {
    ...unsignedDelegation,
    signature,
  };

  const artifact = {
    generatedAt: new Date().toISOString(),
    qualificationStatus:
      'Constrained MetaMask delegation artifact generated and signed offchain. Live onchain redemption still requires bundler-backed smart-account deployment and redeem flow.',
    network: {
      chainId: chain.id,
      chainName: chain.name,
      delegationManager: smartAccountsEnvironment.DelegationManager,
    },
    accounts: {
      owner: ownerAccount.address,
      delegatorSmartAccount: smartAccount.address,
      delegate: demoExecutor,
      redeemer: demoExecutor,
      recipient: demoRecipient,
    },
    treasurySpendIntent: {
      treasury: treasuryAddress,
      budgetId,
      amountWstETH: amountWstETH.toString(),
      taskId,
      receiptHash,
      evidenceHash,
      resultHash,
      metadataURI,
      spendSelector,
      spendCallData,
    },
    delegation: signedDelegation,
    delegationHash: getDelegationHashOffchain(signedDelegation),
    caveatSummary: {
      allowedTargets: [treasuryAddress],
      allowedMethods: [spendSelector],
      exactCalldata: spendCallData,
      redeemers: [demoExecutor],
      limitedCalls: 1,
      maxValueWei: '0',
      validAfter: now,
      validBefore: beforeThreshold,
    },
    nextLiveSteps: [
      'Fund and deploy the MetaMask smart account via a Base Sepolia bundler.',
      'Redeem this delegation through DelegationManager from the authorized executor.',
      'Execute the treasury spend and record tx hashes in deployments/ and submission/.',
    ],
  };

  console.log(JSON.stringify(artifact, null, 2));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
