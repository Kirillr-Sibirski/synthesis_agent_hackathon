import {
  Implementation,
  toMetaMaskSmartAccount,
} from '@metamask/smart-accounts-kit';

import {
  chain,
  ownerAccount,
  publicClient,
  smartAccountsEnvironment,
} from './utils.js';

const unsafeToMetaMaskSmartAccount = toMetaMaskSmartAccount as any;

async function main() {
  const smartAccount = await unsafeToMetaMaskSmartAccount({
    // See note in utils.ts about the current SDK↔viem type mismatch.
    client: publicClient as any,
    implementation: Implementation.Hybrid,
    deployParams: [ownerAccount.address, [], [], []],
    deploySalt: '0x',
    signer: { account: ownerAccount },
    environment: smartAccountsEnvironment,
  });

  const code = await publicClient.getCode({ address: smartAccount.address });

  console.log(JSON.stringify({
    chainId: chain.id,
    owner: ownerAccount.address,
    smartAccountAddress: smartAccount.address,
    delegationManager: smartAccountsEnvironment.DelegationManager,
    entryPoint: smartAccountsEnvironment.EntryPoint,
    deployed: Boolean(code && code !== '0x'),
  }, null, 2));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
