import 'dotenv/config';

import { createPublicClient, createWalletClient, http } from 'viem';
import { base, baseSepolia } from 'viem/chains';
import { privateKeyToAccount } from 'viem/accounts';
import {
  getSmartAccountsEnvironment,
  Implementation,
  toMetaMaskSmartAccount,
} from '@metamask/smart-accounts-kit';

const PRIVATE_KEY = process.env.PRIVATE_KEY as `0x${string}` | undefined;
const METAMASK_CHAIN = (process.env.METAMASK_CHAIN ?? 'base-sepolia').toLowerCase();

const supportedChains = {
  base,
  'base-sepolia': baseSepolia,
} as const;

const selectedChain = supportedChains[METAMASK_CHAIN as keyof typeof supportedChains];
const RPC_URL =
  process.env.RPC_URL ??
  process.env.BASE_RPC_URL ??
  process.env.BASE_MAINNET_RPC_URL ??
  process.env.BASE_SEPOLIA_RPC_URL;

if (!PRIVATE_KEY) {
  throw new Error('Missing PRIVATE_KEY in .env');
}
if (!selectedChain) {
  throw new Error('Unsupported METAMASK_CHAIN. Use one of: base, base-sepolia');
}
if (!RPC_URL) {
  throw new Error(
    'Missing RPC URL in .env. Set RPC_URL (preferred) or BASE_RPC_URL / BASE_MAINNET_RPC_URL / BASE_SEPOLIA_RPC_URL.',
  );
}

export const chain = selectedChain;
export const transport = http(RPC_URL);
export const ownerAccount = privateKeyToAccount(PRIVATE_KEY);
export const publicClient = createPublicClient({ chain, transport });
export const walletClient = createWalletClient({
  account: ownerAccount,
  chain,
  transport,
});
export const smartAccountsEnvironment = getSmartAccountsEnvironment(chain.id);

function parseFundingTarget() {
  const raw = process.env.SMART_ACCOUNT_FUNDING_WEI?.trim();
  if (!raw) return 0n;
  try {
    return BigInt(raw);
  } catch {
    throw new Error('Invalid SMART_ACCOUNT_FUNDING_WEI in .env; expected an integer wei value.');
  }
}

export const smartAccountFundingTargetWei = parseFundingTarget();

const unsafeToMetaMaskSmartAccount = toMetaMaskSmartAccount as any;

export async function getSmartAccount() {
  return unsafeToMetaMaskSmartAccount({
    // The SDK currently expects a narrower viem client type than the one
    // produced by our installed viem version. Runtime behavior is fine, so we
    // bridge the type mismatch here instead of pinning the whole repo to an
    // older viem release.
    client: publicClient as any,
    implementation: Implementation.Hybrid,
    deployParams: [ownerAccount.address, [], [], []],
    deploySalt: '0x',
    signer: { account: ownerAccount },
    environment: smartAccountsEnvironment,
  });
}

export async function ensureSmartAccountFunding(smartAccountAddress: `0x${string}`) {
  const balanceBefore = await publicClient.getBalance({ address: smartAccountAddress });

  if (smartAccountFundingTargetWei === 0n || balanceBefore >= smartAccountFundingTargetWei) {
    return {
      funded: false,
      topUpWei: 0n,
      balanceBefore,
      balanceAfter: balanceBefore,
      transactionHash: null as `0x${string}` | null,
    };
  }

  const topUpWei = smartAccountFundingTargetWei - balanceBefore;
  const transactionHash = await walletClient.sendTransaction({
    to: smartAccountAddress,
    value: topUpWei,
  });
  await publicClient.waitForTransactionReceipt({ hash: transactionHash });
  const balanceAfter = await publicClient.getBalance({ address: smartAccountAddress });

  return {
    funded: true,
    topUpWei,
    balanceBefore,
    balanceAfter,
    transactionHash,
  };
}
