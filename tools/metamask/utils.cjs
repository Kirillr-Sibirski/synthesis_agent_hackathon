require('dotenv').config();

const { createPublicClient, createWalletClient, http } = require('viem');
const { baseSepolia } = require('viem/chains');
const { privateKeyToAccount } = require('viem/accounts');
const {
  getSmartAccountsEnvironment,
  Implementation,
  toMetaMaskSmartAccount,
} = require('@metamask/smart-accounts-kit');

const PRIVATE_KEY = process.env.PRIVATE_KEY;
const BASE_SEPOLIA_RPC_URL = process.env.BASE_SEPOLIA_RPC_URL;

if (!PRIVATE_KEY) throw new Error('Missing PRIVATE_KEY in .env');
if (!BASE_SEPOLIA_RPC_URL) throw new Error('Missing BASE_SEPOLIA_RPC_URL in .env');

const chain = baseSepolia;
const transport = http(BASE_SEPOLIA_RPC_URL);
const ownerAccount = privateKeyToAccount(PRIVATE_KEY);
const publicClient = createPublicClient({ chain, transport });
const walletClient = createWalletClient({ account: ownerAccount, chain, transport });
const smartAccountsEnvironment = getSmartAccountsEnvironment(chain.id);

async function getSmartAccount() {
  return toMetaMaskSmartAccount({
    client: publicClient,
    implementation: Implementation.Hybrid,
    deployParams: [ownerAccount.address, [], [], []],
    deploySalt: '0x',
    signer: { account: ownerAccount },
    environment: smartAccountsEnvironment,
  });
}

module.exports = {
  chain,
  transport,
  ownerAccount,
  publicClient,
  walletClient,
  smartAccountsEnvironment,
  getSmartAccount,
};
