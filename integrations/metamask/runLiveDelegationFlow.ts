import 'dotenv/config';

import { mkdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';

import { createBundlerClient } from 'viem/account-abstraction';
import { http, createWalletClient, getAddress } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import { ExecutionMode, createExecution, redeemDelegations } from '@metamask/smart-accounts-kit';

import { buildSignedDelegationArtifact, json } from './buildSignedDelegationArtifact.js';
import {
  chain,
  ensureSmartAccountFunding,
  getSmartAccount,
  publicClient,
  smartAccountFundingTargetWei,
  transport,
} from './utils.js';

const BUNDLER_URL = process.env.BUNDLER_URL;
const DRY_RUN = ['1', 'true', 'yes'].includes((process.env.DRY_RUN ?? '').toLowerCase());
const EXECUTOR_PRIVATE_KEY =
  (process.env.EXECUTOR_PRIVATE_KEY as `0x${string}` | undefined) ??
  (process.env.PRIVATE_KEY as `0x${string}` | undefined);
const ARTIFACT_OUT =
  process.env.ARTIFACT_OUT ??
  `artifacts/metamask/signed-delegation-${chain.id}.json`;

if (!EXECUTOR_PRIVATE_KEY) {
  throw new Error('Missing EXECUTOR_PRIVATE_KEY (or PRIVATE_KEY fallback) in .env');
}

async function main() {
  const smartAccount = await getSmartAccount();
  const beforeCode = await publicClient.getCode({ address: smartAccount.address });
  const beforeDeployed = Boolean(beforeCode && beforeCode !== '0x');

  const artifact = await buildSignedDelegationArtifact();
  const artifactPath = path.resolve(process.cwd(), ARTIFACT_OUT);
  mkdirSync(path.dirname(artifactPath), { recursive: true });
  writeFileSync(artifactPath, `${json(artifact)}\n`);

  const executorAccount = privateKeyToAccount(EXECUTOR_PRIVATE_KEY);
  if (getAddress(artifact.accounts.redeemer) !== getAddress(executorAccount.address)) {
    throw new Error(
      `Executor key does not match artifact redeemer. Expected ${artifact.accounts.redeemer}, got ${executorAccount.address}.`,
    );
  }

  let deployReceipt:
    | {
        userOperationHash: `0x${string}`;
        transactionHash: `0x${string}`;
      }
    | undefined;
  let fundingReceipt:
    | {
        funded: boolean;
        topUpWei: string;
        balanceBeforeWei: string;
        balanceAfterWei: string;
        transactionHash: `0x${string}` | null;
      }
    | undefined;

  if (!beforeDeployed && !DRY_RUN) {
    if (!BUNDLER_URL) {
      throw new Error('Missing BUNDLER_URL in .env; cannot deploy smart account for live flow.');
    }

    const funding = await ensureSmartAccountFunding(smartAccount.address);
    fundingReceipt = {
      funded: funding.funded,
      topUpWei: funding.topUpWei.toString(),
      balanceBeforeWei: funding.balanceBefore.toString(),
      balanceAfterWei: funding.balanceAfter.toString(),
      transactionHash: funding.transactionHash,
    };

    const bundlerClient = createBundlerClient({
      account: smartAccount,
      chain,
      transport: http(BUNDLER_URL),
    });

    const userOperationHash = await bundlerClient.sendUserOperation({
      calls: [{ to: executorAccount.address, value: 0n, data: '0x' }],
    });
    const receipt = await bundlerClient.waitForUserOperationReceipt({ hash: userOperationHash });

    deployReceipt = {
      userOperationHash,
      transactionHash: receipt.receipt.transactionHash,
    };
  }

  const smartAccountCode = await publicClient.getCode({ address: smartAccount.address });
  const smartAccountDeployed = Boolean(smartAccountCode && smartAccountCode !== '0x');

  const execution = createExecution({
    target: artifact.treasurySpendIntent.treasury,
    value: 0n,
    callData: artifact.treasurySpendIntent.spendCallData,
  });
  const redemptions = [
    {
      permissionContext: [artifact.delegation],
      executions: [execution],
      mode: ExecutionMode.SingleDefault,
    },
  ];

  const preview = {
    chainId: chain.id,
    chainName: chain.name,
    artifactPath,
    smartAccountAddress: smartAccount.address,
    beforeDeployed,
    smartAccountDeployed,
    smartAccountFundingTargetWei: smartAccountFundingTargetWei.toString(),
    fundingReceipt,
    deployReceipt,
    redemptionReady: smartAccountDeployed,
    dryRun: DRY_RUN,
    redeemer: executorAccount.address,
    treasury: artifact.treasurySpendIntent.treasury,
    delegationManager: artifact.network.delegationManager,
    redemptions,
  };

  if (DRY_RUN) {
    console.log(
      json({
        qualificationStatus: smartAccountDeployed
          ? 'dry-run only; live flow payload assembled'
          : 'dry-run only; artifact assembled but smart account not yet deployed',
        ...preview,
      }),
    );
    return;
  }

  if (!smartAccountDeployed) {
    throw new Error(
      `Smart account ${smartAccount.address} is not deployed on ${chain.name} after deploy step.`,
    );
  }

  const executorWalletClient = createWalletClient({
    account: executorAccount,
    chain,
    transport,
  });

  const txHash = await redeemDelegations(
    executorWalletClient as any,
    publicClient as any,
    artifact.network.delegationManager,
    redemptions as any,
  );
  const receipt = await publicClient.waitForTransactionReceipt({ hash: txHash });

  console.log(
    json({
      qualificationStatus:
        'Live MetaMask delegation flow broadcast. Final sponsor proof still depends on successful treasury execution and recorded receipt evidence.',
      ...preview,
      redemptionTransactionHash: txHash,
      redemptionBlockNumber: receipt.blockNumber.toString(),
      redemptionStatus: receipt.status,
    }),
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
