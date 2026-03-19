import 'dotenv/config';

import { http } from 'viem';
import { createBundlerClient } from 'viem/account-abstraction';
import { chain, ownerAccount, publicClient, smartAccountsEnvironment, getSmartAccount } from './utils.js';

const BUNDLER_URL = process.env.BUNDLER_URL;

if (!BUNDLER_URL) {
  throw new Error('Missing BUNDLER_URL in .env');
}

async function main() {
  const smartAccount = await getSmartAccount();
  const beforeCode = await publicClient.getCode({ address: smartAccount.address });

  const bundlerClient = createBundlerClient({
    account: smartAccount,
    chain,
    transport: http(BUNDLER_URL),
  });

  const userOperationHash = await bundlerClient.sendUserOperation({
    calls: [
      {
        to: ownerAccount.address,
        value: 0n,
        data: '0x',
      },
    ],
  });

  const receipt = await bundlerClient.waitForUserOperationReceipt({ hash: userOperationHash });
  const afterCode = await publicClient.getCode({ address: smartAccount.address });

  console.log(JSON.stringify({
    chainId: chain.id,
    owner: ownerAccount.address,
    smartAccountAddress: smartAccount.address,
    delegationManager: smartAccountsEnvironment.DelegationManager,
    beforeDeployed: Boolean(beforeCode && beforeCode !== '0x'),
    userOperationHash,
    transactionHash: receipt.receipt.transactionHash,
    afterDeployed: Boolean(afterCode && afterCode !== '0x'),
  }, null, 2));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
