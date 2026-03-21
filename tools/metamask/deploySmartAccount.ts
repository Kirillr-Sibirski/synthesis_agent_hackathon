import 'dotenv/config';

import { http } from 'viem';
import { createBundlerClient } from 'viem/account-abstraction';
import {
  chain,
  ensureSmartAccountFunding,
  getSmartAccount,
  getUserOperationGasPrice,
  ownerAccount,
  publicClient,
  smartAccountFundingTargetWei,
  smartAccountsEnvironment,
} from './utils.js';

const BUNDLER_URL = process.env.BUNDLER_URL;

if (!BUNDLER_URL) {
  throw new Error('Missing BUNDLER_URL in .env');
}

async function main() {
  const smartAccount = await getSmartAccount();
  const beforeCode = await publicClient.getCode({ address: smartAccount.address });
  const funding = await ensureSmartAccountFunding(smartAccount.address);
  const { source: gasPriceSource, maxFeePerGas, maxPriorityFeePerGas } = await getUserOperationGasPrice();

  const bundlerClient = createBundlerClient({
    account: smartAccount,
    chain,
    transport: http(BUNDLER_URL),
  });

  const userOperationHash = await bundlerClient.sendUserOperation({
    maxFeePerGas,
    maxPriorityFeePerGas,
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
    fundingTargetWei: smartAccountFundingTargetWei.toString(),
    gasPriceSource,
    maxFeePerGas: maxFeePerGas.toString(),
    maxPriorityFeePerGas: maxPriorityFeePerGas.toString(),
    funding,
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
