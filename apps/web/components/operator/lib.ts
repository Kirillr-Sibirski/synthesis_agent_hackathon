"use client";

import {
  createPublicClient,
  getAddress,
  http,
  type Address,
  type Hex,
  zeroAddress,
  zeroHash,
} from "viem";
import { base } from "viem/chains";

export type BrowserProvider = {
  request: (args: { method: string; params?: unknown[] }) => Promise<unknown>;
};

export type ContractManifest = {
  abi: readonly unknown[];
  bytecode: Hex;
};

export type OperatorManifest = {
  baseAssetAddress: Address;
  spendSelector: Hex;
  factory: ContractManifest;
  treasury: ContractManifest;
  authorizer: ContractManifest;
  receiptRegistry: ContractManifest;
};

export type OperatorMarket = {
  aprPercent: number;
  ethUsd: number;
  sourceNote: string;
};

export type ManagedAllowance = {
  id: string;
  label: string;
  budgetId: Hex;
  manager: Address;
  executor: Address;
  recipient: Address;
  amountWstETH: string;
  ruleId: Hex;
  budgetTxHash: Hex;
  ruleTxHash: Hex;
  spentWstETH?: string;
};

export type ManagedTreasury = {
  id: string;
  name: string;
  ownerAddress: Address;
  assetAddress: Address;
  treasuryAddress: Address;
  authorizerAddress: Address;
  receiptRegistryAddress: Address;
  createdAt: string;
  creationTxHashes: {
    authorizer: Hex;
    treasury: Hex;
    receiptRegistry: Hex;
  };
  principalAmountWstETH?: string;
  principalDepositTxHash?: Hex;
  spendableTopUpWstETH?: string;
  spendableTopUpTxHash?: Hex;
  allowances: ManagedAllowance[];
};

export const STORAGE_KEY = "aap-managed-treasuries-v2";
export const FACTORY_STORAGE_KEY = "aap-operator-factory-address-v1";

export const publicClient = createPublicClient({
  chain: base,
  transport: http("https://mainnet.base.org"),
});

export const erc20Abi = [
  {
    type: "function",
    name: "balanceOf",
    stateMutability: "view",
    inputs: [{ name: "account", type: "address" }],
    outputs: [{ type: "uint256" }],
  },
  {
    type: "function",
    name: "transfer",
    stateMutability: "nonpayable",
    inputs: [
      { name: "to", type: "address" },
      { name: "amount", type: "uint256" },
    ],
    outputs: [{ type: "bool" }],
  },
  {
    type: "function",
    name: "approve",
    stateMutability: "nonpayable",
    inputs: [
      { name: "spender", type: "address" },
      { name: "amount", type: "uint256" },
    ],
    outputs: [{ type: "bool" }],
  },
] as const;

export function readStoredTreasuries(): ManagedTreasury[] {
  if (typeof window === "undefined") return [];

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as Array<Partial<ManagedTreasury>>;

    return parsed.map((treasury, index) => ({
      id: treasury.id ?? `treasury-${index}`,
      name: treasury.name ?? "Untitled Treasury",
      ownerAddress: getAddress(treasury.ownerAddress ?? zeroAddress),
      assetAddress: getAddress(treasury.assetAddress ?? zeroAddress),
      treasuryAddress: getAddress(treasury.treasuryAddress ?? zeroAddress),
      authorizerAddress: getAddress(treasury.authorizerAddress ?? zeroAddress),
      receiptRegistryAddress: getAddress(treasury.receiptRegistryAddress ?? zeroAddress),
      createdAt: treasury.createdAt ?? new Date().toISOString(),
      creationTxHashes: treasury.creationTxHashes ?? {
        authorizer: zeroHash,
        treasury: zeroHash,
        receiptRegistry: zeroHash,
      },
      principalAmountWstETH: treasury.principalAmountWstETH,
      principalDepositTxHash: treasury.principalDepositTxHash,
      spendableTopUpWstETH: treasury.spendableTopUpWstETH,
      spendableTopUpTxHash: treasury.spendableTopUpTxHash,
      allowances: treasury.allowances ?? [],
    }));
  } catch {
    return [];
  }
}

export function writeStoredTreasuries(treasuries: ManagedTreasury[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(treasuries));
}

export function getProvider(): BrowserProvider | null {
  return (window as Window & { ethereum?: BrowserProvider }).ethereum ?? null;
}

export function inputClassName() {
  return "w-full rounded-2xl border border-primary/20 bg-white px-4 py-3 text-sm text-[#010400] outline-none transition placeholder:text-[rgb(108,90,84)] focus:border-primary/40 focus:ring-2 focus:ring-primary/15";
}

export function helperClassName() {
  return "text-sm text-[rgb(71,56,51,0.78)]";
}

export function formatUsd(value: number): string {
  if (!Number.isFinite(value)) return "$0.00";

  const maximumFractionDigits = value >= 100 ? 0 : value >= 1 ? 2 : value >= 0.01 ? 4 : 6;

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits,
  }).format(value);
}

export function toErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  return "Something went wrong.";
}

export async function ensureBaseNetwork(provider: BrowserProvider) {
  const current = (await provider.request({ method: "eth_chainId" })) as string;
  if (current === "0x2105") return;

  try {
    await provider.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: "0x2105" }],
    });
  } catch (error) {
    const err = error as { code?: number };
    if (err?.code === 4902) {
      await provider.request({
        method: "wallet_addEthereumChain",
        params: [
          {
            chainId: "0x2105",
            chainName: "Base",
            nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
            rpcUrls: ["https://mainnet.base.org"],
            blockExplorerUrls: ["https://basescan.org"],
          },
        ],
      });
      return;
    }
    throw error;
  }
}
