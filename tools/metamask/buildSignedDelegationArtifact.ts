import 'dotenv/config';

import { createDelegation, signDelegation, type Delegation } from '@metamask/smart-accounts-kit';
import { createCaveatBuilder, getDelegationHashOffchain } from '@metamask/smart-accounts-kit/utils';
import { encodeFunctionData, getAddress, keccak256, toBytes } from 'viem';

import { chain, getSmartAccount, ownerAccount, smartAccountsEnvironment } from './utils.js';
import { treasuryAbi } from './treasuryAbi.js';

export type SignedDelegationArtifact = {
  generatedAt: string;
  qualificationStatus: string;
  network: {
    chainId: number;
    chainName: string;
    delegationManager: `0x${string}`;
  };
  accounts: {
    owner: `0x${string}`;
    delegatorSmartAccount: `0x${string}`;
    treasuryExecutor: `0x${string}`;
    delegate: `0x${string}`;
    redeemer: `0x${string}`;
    recipient: `0x${string}`;
  };
  treasurySpendIntent: {
    treasury: `0x${string}`;
    budgetId: `0x${string}`;
    amountWstETH: string;
    taskId: `0x${string}`;
    receiptHash: `0x${string}`;
    evidenceHash: `0x${string}`;
    resultHash: `0x${string}`;
    metadataURI: string;
    spendSelector: `0x${string}`;
    spendCallData: `0x${string}`;
  };
  delegation: Delegation;
  delegationHash: `0x${string}`;
  caveatSummary: {
    allowedTargets: `0x${string}`[];
    allowedMethods: `0x${string}`[];
    exactCalldata: `0x${string}`;
    redeemers: `0x${string}`[];
    limitedCalls: number;
    maxValueWei: string;
    validAfter: number;
    validBefore: number;
  };
  nextLiveSteps: string[];
};

export function json(value: unknown) {
  return JSON.stringify(
    value,
    (_, current) => (typeof current === 'bigint' ? current.toString() : current),
    2,
  );
}

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

export async function buildSignedDelegationArtifact(): Promise<SignedDelegationArtifact> {
  const TREASURY_ADDRESS = process.env.TREASURY_ADDRESS as `0x${string}` | undefined;
  const DEMO_RECIPIENT = process.env.DEMO_RECIPIENT as `0x${string}` | undefined;
  const DEMO_EXECUTOR = process.env.DEMO_EXECUTOR as `0x${string}` | undefined;
  const PRIVATE_KEY = process.env.PRIVATE_KEY as `0x${string}` | undefined;

  if (!TREASURY_ADDRESS) throw new Error('Missing TREASURY_ADDRESS in .env');
  if (!DEMO_RECIPIENT) throw new Error('Missing DEMO_RECIPIENT in .env');
  if (!DEMO_EXECUTOR) throw new Error('Missing DEMO_EXECUTOR in .env');
  if (!PRIVATE_KEY) throw new Error('Missing PRIVATE_KEY in .env');

  const smartAccount = await getSmartAccount();
  const treasuryAddress = getAddress(TREASURY_ADDRESS);
  const demoRecipient = getAddress(DEMO_RECIPIENT);
  const demoExecutor = getAddress(DEMO_EXECUTOR);

  const budgetId = keccak256(toBytes('OPS_BUDGET'));
  const taskId = readBytes32Env('TASK_ID', 'metamask-delegation-task-1');
  const receiptHash = readBytes32Env('RECEIPT_HASH', 'metamask-delegation-receipt-1');
  const evidenceHash = readBytes32Env('EVIDENCE_HASH', 'metamask-delegation-evidence-1');
  const resultHash = readBytes32Env('RESULT_HASH', 'metamask-delegation-result-1');
  const amountWstETH = readBigIntEnv('SPEND_AMOUNT_WSTETH', 1_000000000000000000n);
  const metadataURI = process.env.METADATA_URI?.trim() || 'ipfs://metamask-delegation-spend-1';

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
  const validAfter = now - 120;
  const validForSeconds = 24 * 60 * 60;
  const beforeThreshold = now + validForSeconds;

  const caveats = createCaveatBuilder(smartAccountsEnvironment)
    .addCaveat('redeemer', { redeemers: [demoExecutor] })
    .addCaveat('limitedCalls', { limit: 1 })
    .addCaveat('timestamp', { afterThreshold: validAfter, beforeThreshold })
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
    privateKey: PRIVATE_KEY,
    delegation: unsignedDelegation,
    delegationManager: smartAccountsEnvironment.DelegationManager,
    chainId: chain.id,
  });

  const signedDelegation = {
    ...unsignedDelegation,
    signature,
  } as Delegation;

  return {
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
      treasuryExecutor: smartAccount.address,
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
      validAfter,
      validBefore: beforeThreshold,
    },
    nextLiveSteps: [
      `Configure the treasury authorizer rule so executor=${smartAccount.address} for the MetaMask path.`,
      `Fund and deploy the MetaMask smart account via a ${chain.name} bundler.`,
      'Redeem this delegation through DelegationManager from the authorized executor.',
      'Execute the treasury spend and record tx hashes in Memory/Deployments/ and Memory/Submission/.',
    ],
  };
}
