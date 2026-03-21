import 'dotenv/config';

import { readFileSync } from 'node:fs';
import path from 'node:path';

import { ExecutionMode, createExecution, redeemDelegations } from '@metamask/smart-accounts-kit';
import { createWalletClient, getAddress } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';

import { json, type SignedDelegationArtifact } from './buildSignedDelegationArtifact.js';
import { chain, publicClient, smartAccountsEnvironment, transport } from './utils.js';

const EXECUTOR_PRIVATE_KEY =
  (process.env.EXECUTOR_PRIVATE_KEY as `0x${string}` | undefined) ??
  (process.env.PRIVATE_KEY as `0x${string}` | undefined);
const ARTIFACT_PATH = process.argv[2] ?? process.env.DELEGATION_ARTIFACT_PATH;
const DRY_RUN = ['1', 'true', 'yes'].includes((process.env.DRY_RUN ?? '').toLowerCase());

if (!EXECUTOR_PRIVATE_KEY) {
  throw new Error('Missing EXECUTOR_PRIVATE_KEY (or PRIVATE_KEY fallback) in .env');
}
if (!ARTIFACT_PATH) {
  throw new Error(
    'Missing delegation artifact path. Pass a JSON file path as argv[2] or set DELEGATION_ARTIFACT_PATH.',
  );
}

function loadArtifact(filePath: string): SignedDelegationArtifact {
  const resolved = path.resolve(process.cwd(), filePath);
  return JSON.parse(readFileSync(resolved, 'utf8')) as SignedDelegationArtifact;
}

async function main() {
  const artifact = loadArtifact(ARTIFACT_PATH!);
  const executorAccount = privateKeyToAccount(EXECUTOR_PRIVATE_KEY!);
  const walletClient = createWalletClient({
    account: executorAccount,
    chain,
    transport,
  });

  const delegationManager = getAddress(
    artifact.network?.delegationManager ?? smartAccountsEnvironment.DelegationManager,
  );
  const treasury = getAddress(artifact.treasurySpendIntent.treasury);
  const callData = artifact.treasurySpendIntent.spendCallData;
  const smartAccountAddress = getAddress(artifact.accounts.delegatorSmartAccount);
  const expectedRedeemer = artifact.accounts.redeemer ?? artifact.accounts.delegate;

  if (expectedRedeemer && getAddress(expectedRedeemer) !== getAddress(executorAccount.address)) {
    throw new Error(
      `Executor key does not match artifact redeemer. Expected ${expectedRedeemer}, got ${executorAccount.address}.`,
    );
  }
  if (artifact.network?.chainId && artifact.network.chainId !== chain.id) {
    throw new Error(
      `Artifact chainId ${artifact.network.chainId} does not match configured chain ${chain.id}.`,
    );
  }

  const smartAccountCode = await publicClient.getCode({ address: smartAccountAddress });
  const smartAccountDeployed = Boolean(smartAccountCode && smartAccountCode !== '0x');

  const execution = createExecution({
    target: treasury,
    value: 0n,
    callData,
  });

  const redemptions = [
    {
      permissionContext: [artifact.delegation],
      executions: [execution],
      mode: ExecutionMode.SingleDefault,
    },
  ];

  const preview = {
    artifactPath: path.resolve(process.cwd(), ARTIFACT_PATH!),
    chainId: chain.id,
    chainName: chain.name,
    delegationManager,
    treasury,
    executor: executorAccount.address,
    smartAccountAddress,
    smartAccountDeployed,
    dryRun: DRY_RUN,
    redemptions,
  };

  if (DRY_RUN) {
    console.log(
      json({
        qualificationStatus: smartAccountDeployed
          ? 'dry-run only'
          : 'dry-run only; smart account not yet deployed',
        ...preview,
      }),
    );
    return;
  }

  if (!smartAccountDeployed) {
    throw new Error(
      `Smart account ${smartAccountAddress} is not deployed on ${chain.name}. Run bun run metamask:deploy-smart-account first.`,
    );
  }

  const txHash = await redeemDelegations(
    walletClient as any,
    publicClient as any,
    delegationManager,
    redemptions as any,
  );
  const receipt = await publicClient.waitForTransactionReceipt({ hash: txHash });

  console.log(
    json({
      qualificationStatus:
        'Live delegation redemption broadcast. Final sponsor proof still depends on successful treasury execution and recorded receipts.',
      ...preview,
      transactionHash: txHash,
      blockNumber: receipt.blockNumber.toString(),
      status: receipt.status,
    }),
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
