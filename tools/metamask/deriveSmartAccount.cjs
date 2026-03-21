const { chain, ownerAccount, publicClient, smartAccountsEnvironment, getSmartAccount } = require('./utils.cjs');

async function main() {
  const smartAccount = await getSmartAccount();
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
