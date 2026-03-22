"use client";

import * as React from "react";

import Link from "next/link";
import {
  createWalletClient,
  custom,
  decodeEventLog,
  formatUnits,
  getAddress,
  parseUnits,
  type Address,
  type Hex,
} from "viem";
import { base } from "viem/chains";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { shortAddress } from "@/lib/format";
import type { DashboardSnapshot } from "@/lib/types";

import {
  ensureBaseNetwork,
  erc20Abi,
  FACTORY_STORAGE_KEY,
  getProvider,
  helperClassName,
  inputClassName,
  publicClient,
  readStoredTreasuries,
  toErrorMessage,
  type ManagedAllowance,
  type ManagedTreasury,
  type OperatorManifest,
  type OperatorMarket,
  writeStoredTreasuries,
} from "@/components/operator/lib";

function SectionLabel({ children }: { children: React.ReactNode }): React.JSX.Element {
  return <p className="section-kicker">{children}</p>;
}

function ButtonSpinner(): React.JSX.Element {
  return <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-r-transparent" />;
}

function InfoHint({ text }: { text: string }): React.JSX.Element {
  return (
    <span className="group relative inline-flex">
      <span
        aria-label={text}
        className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-primary/20 bg-white text-xs font-semibold text-[#cd5334]"
      >
        i
      </span>
      <span className="pointer-events-none absolute left-1/2 top-full z-20 mt-2 hidden w-56 -translate-x-1/2 rounded-2xl border border-primary/20 bg-white px-3 py-2 text-xs font-normal text-[#010400] shadow-[0_16px_40px_rgba(205,83,52,0.12)] group-hover:block">
        {text}
      </span>
    </span>
  );
}

function StatCard({
  label,
  value,
  detail,
  children,
}: {
  label: string;
  value: string;
  detail: string;
  children?: React.ReactNode;
}): React.JSX.Element {
  return (
    <div className="metric-tile">
      <div className="flex items-center gap-2">
        <SectionLabel>{label}</SectionLabel>
        <InfoHint text={detail} />
      </div>
      <p className="mt-2 text-lg font-semibold text-[#010400]">{value}</p>
      {children ? <div className="mt-3">{children}</div> : null}
    </div>
  );
}

function InlineAction({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick?: () => void;
}): React.JSX.Element {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-full border border-primary/15 bg-white px-3 py-1 text-[11px] font-medium text-[#5d423b] transition-colors hover:border-primary/35 hover:bg-primary/5 hover:text-[#010400]"
    >
      {children}
    </button>
  );
}

function ProofTabButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}): React.JSX.Element {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border px-3 py-2 text-sm font-medium transition-all ${
        active
          ? "border-[#cd5334] bg-[#fff2ec] text-[#010400]"
          : "border-primary/15 bg-white text-[#5d423b] hover:border-primary/35 hover:bg-primary/5 hover:text-[#010400]"
      }`}
    >
      {children}
    </button>
  );
}

function asRecord(value: unknown): Record<string, unknown> {
  if (!value || typeof value !== "object" || Array.isArray(value)) return {};
  return value as Record<string, unknown>;
}

function asString(value: unknown): string | null {
  return typeof value === "string" && value.length ? value : null;
}

function asNumber(value: unknown): number | null {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string" && value.trim().length) {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : null;
  }
  return null;
}

function asStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.filter((entry): entry is string => typeof entry === "string" && entry.length > 0);
}

function formatUnixTimestamp(value: number | null): string {
  if (!value) return "—";
  return new Date(value * 1000).toLocaleString();
}

function shortHex(value: string | null | undefined): string {
  if (!value || value.length <= 18) return value ?? "—";
  return `${value.slice(0, 10)}…${value.slice(-8)}`;
}

function describeSelector(selector: string | null | undefined): string {
  if (!selector) return "—";
  if (selector.toLowerCase() === "0x7441041a") return "spendFromBudget(...)";
  return selector;
}

type AgentReceipt = {
  receiptHash: Hex;
  taskId: Hex;
  ruleId: Hex;
  executor: Address;
  recipient: Address;
  amountWstETH: string;
  budgetId: Hex;
  evidenceHash: Hex;
  resultHash: Hex;
  metadataURI: string;
  timestamp: string;
  txHash: Hex;
};

type AgentProofTab = "receipts" | "delegations";

const receiptRegistryAbi = [
  {
    type: "event",
    name: "ReceiptRegistered",
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "bytes32", name: "receiptHash", type: "bytes32" },
      { indexed: true, internalType: "bytes32", name: "taskId", type: "bytes32" },
      { indexed: true, internalType: "bytes32", name: "ruleId", type: "bytes32" },
      { indexed: false, internalType: "address", name: "executor", type: "address" },
      { indexed: false, internalType: "address", name: "recipient", type: "address" },
      { indexed: false, internalType: "uint256", name: "amount", type: "uint256" },
      { indexed: false, internalType: "bytes32", name: "budgetId", type: "bytes32" },
      { indexed: false, internalType: "bytes32", name: "evidenceHash", type: "bytes32" },
      { indexed: false, internalType: "bytes32", name: "resultHash", type: "bytes32" },
      { indexed: false, internalType: "string", name: "metadataURI", type: "string" },
      { indexed: false, internalType: "uint64", name: "timestamp", type: "uint64" },
    ],
  },
] as const;

function formatReceiptTimestamp(timestamp: bigint): string {
  return new Date(Number(timestamp) * 1000).toLocaleString();
}

export function TreasuryWorkspace({ treasuryId }: { treasuryId: string }): React.JSX.Element {
  const [walletAddress, setWalletAddress] = React.useState<Address | null>(null);
  const [walletBusy, setWalletBusy] = React.useState(false);
  const [walletStatus, setWalletStatus] = React.useState("Connect your wallet to manage agent allowances.");
  const [market, setMarket] = React.useState<OperatorMarket>({ aprPercent: 2.4, ethUsd: 0, sourceNote: "" });
  const [manifest, setManifest] = React.useState<OperatorManifest | null>(null);
  const [factoryAddress, setFactoryAddress] = React.useState<Address | null>(null);
  const [treasuries, setTreasuries] = React.useState<ManagedTreasury[]>([]);
  const [storageHydrated, setStorageHydrated] = React.useState(false);
  const [walletAssetBalanceWei, setWalletAssetBalanceWei] = React.useState<bigint>(0n);
  const [topUpAmount, setTopUpAmount] = React.useState("0.001");
  const [topUpBusy, setTopUpBusy] = React.useState(false);
  const [topUpStatus, setTopUpStatus] = React.useState("Add a directly funded amount to create immediate spendable headroom.");
  const [withdrawAmount, setWithdrawAmount] = React.useState("0.001");
  const [withdrawBusy, setWithdrawBusy] = React.useState(false);
  const [withdrawStatus, setWithdrawStatus] = React.useState("Withdraw protected principal back to the connected operator wallet.");
  const [allowanceBusy, setAllowanceBusy] = React.useState(false);
  const [allowanceStep, setAllowanceStep] = React.useState<string | null>(null);
  const [allowanceStatus, setAllowanceStatus] = React.useState("Create an allowance for a single agent wallet.");
  const [agentLabel, setAgentLabel] = React.useState("Research Agent");
  const [agentWallet, setAgentWallet] = React.useState("");
  const [agentAmount, setAgentAmount] = React.useState("0.01");
  const [selectedAllowanceId, setSelectedAllowanceId] = React.useState<string | null>(null);
  const [activeProofTab, setActiveProofTab] = React.useState<AgentProofTab>("receipts");
  const [receiptsLoading, setReceiptsLoading] = React.useState(false);
  const [receiptsError, setReceiptsError] = React.useState<string | null>(null);
  const [agentReceipts, setAgentReceipts] = React.useState<Record<string, AgentReceipt[]>>({});
  const [dashboardSnapshot, setDashboardSnapshot] = React.useState<DashboardSnapshot | null>(null);
  const [snapshotError, setSnapshotError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const stored = readStoredTreasuries();
    setTreasuries(stored);
    const storedFactory = window.localStorage.getItem(FACTORY_STORAGE_KEY);
    if (storedFactory) {
      try {
        setFactoryAddress(getAddress(storedFactory));
      } catch {
        window.localStorage.removeItem(FACTORY_STORAGE_KEY);
      }
    }
    setStorageHydrated(true);
  }, []);

  React.useEffect(() => {
    const provider = getProvider();
    if (!provider) return;

    void (async () => {
      try {
        const accounts = (await provider.request({ method: "eth_accounts" })) as string[];
        if (!accounts[0]) return;

        const nextAccount = getAddress(accounts[0]);
        const chainId = (await provider.request({ method: "eth_chainId" })) as string;
        setWalletAddress(nextAccount);
        setWalletStatus(
          chainId === "0x2105"
            ? `Connected ${shortAddress(nextAccount)} on Base.`
            : `Connected ${shortAddress(nextAccount)}. Switch to Base to continue.`,
        );
      } catch {
        // Ignore passive auto-connect failures.
      }
    })();
  }, []);

  React.useEffect(() => {
    if (!storageHydrated) return;
    writeStoredTreasuries(treasuries);
  }, [storageHydrated, treasuries]);

  React.useEffect(() => {
    void (async () => {
      try {
        const [manifestResponse, marketResponse, snapshotResponse] = await Promise.all([
          fetch("/api/operator-manifest", { cache: "no-store" }),
          fetch("/api/operator-market", { cache: "no-store" }),
          fetch("/api/snapshot", { cache: "no-store" }),
        ]);

        if (manifestResponse.ok) {
          setManifest((await manifestResponse.json()) as OperatorManifest);
        }

        if (marketResponse.ok) {
          setMarket((await marketResponse.json()) as OperatorMarket);
        }

        if (snapshotResponse.ok) {
          setDashboardSnapshot((await snapshotResponse.json()) as DashboardSnapshot);
          setSnapshotError(null);
        } else {
          setSnapshotError("Could not load the packaged MetaMask proof snapshot.");
        }
      } catch (error) {
        setSnapshotError(toErrorMessage(error));
        // Keep fallbacks.
      }
    })();
  }, []);

  React.useEffect(() => {
    if (!walletAddress || !manifest) return;

    void (async () => {
      try {
        const balance = await publicClient.readContract({
          address: manifest.baseAssetAddress,
          abi: erc20Abi,
          functionName: "balanceOf",
          args: [walletAddress],
        });
        setWalletAssetBalanceWei(balance);
      } catch {
        setWalletAssetBalanceWei(0n);
      }
    })();
  }, [manifest, walletAddress, topUpBusy]);

  const treasury = treasuries.find((item) => item.id === treasuryId) ?? null;
  const walletAssetBalance = formatUnits(walletAssetBalanceWei, 18);
  const topUpWei = React.useMemo(() => {
    try {
      return parseUnits(topUpAmount || "0", 18);
    } catch {
      return null;
    }
  }, [topUpAmount]);
  const hasEnoughTopUpBalance = topUpWei !== null && topUpWei <= walletAssetBalanceWei;
  const canWithdrawPrincipal = Number(withdrawAmount || "0") <= Number(treasury?.principalAmountWstETH ?? "0");
  const selectedAllowance = treasury?.allowances.find((allowance) => allowance.id === selectedAllowanceId) ?? null;
  const selectedAllowanceReceipts = selectedAllowance ? agentReceipts[selectedAllowance.id] ?? [] : [];
  const packagedDelegation = asRecord(dashboardSnapshot?.proof.signedDelegation);
  const packagedDelegationAccounts = asRecord(packagedDelegation.accounts);
  const packagedDelegationNetwork = asRecord(packagedDelegation.network);
  const packagedCaveatSummary = asRecord(packagedDelegation.caveatSummary);
  const packagedAllowedTargets = asStringArray(packagedCaveatSummary.allowedTargets);
  const packagedAllowedMethods = asStringArray(packagedCaveatSummary.allowedMethods);
  const packagedRedeemers = asStringArray(packagedCaveatSummary.redeemers);
  const packagedLimitedCalls = asNumber(packagedCaveatSummary.limitedCalls);
  const packagedMaxValueWei = asString(packagedCaveatSummary.maxValueWei);
  const packagedValidAfter = asNumber(packagedCaveatSummary.validAfter);
  const packagedValidBefore = asNumber(packagedCaveatSummary.validBefore);
  const packagedExactCalldata = asString(packagedCaveatSummary.exactCalldata);
  const liveProofTxs = dashboardSnapshot?.proof.liveProofTxs ?? [];

  React.useEffect(() => {
    if (!treasury?.allowances.length) {
      setSelectedAllowanceId(null);
      return;
    }

    if (!selectedAllowanceId || !treasury.allowances.some((allowance) => allowance.id === selectedAllowanceId)) {
      setSelectedAllowanceId(treasury.allowances[0]?.id ?? null);
    }
  }, [selectedAllowanceId, treasury]);

  const loadReceiptsForAllowance = React.useCallback(async (allowance: ManagedAllowance) => {
    if (!treasury) return;

    setReceiptsLoading(true);
    setReceiptsError(null);

    try {
      const logs = await publicClient.getLogs({
        address: treasury.receiptRegistryAddress,
        event: receiptRegistryAbi[0],
        fromBlock: 0n,
        toBlock: "latest",
      });

      const nextReceipts: AgentReceipt[] = logs
        .filter((log) => {
          const { executor, budgetId, timestamp, receiptHash, taskId, ruleId, recipient, amount, evidenceHash, resultHash, metadataURI } = log.args;
          if (
            !executor || !budgetId || timestamp === undefined || !receiptHash || !taskId || !ruleId || !recipient || amount === undefined
            || !evidenceHash || !resultHash || metadataURI === undefined
          ) {
            return false;
          }

          return getAddress(executor) === allowance.executor || budgetId === allowance.budgetId;
        })
        .sort((left, right) => Number((right.args.timestamp ?? 0n)) - Number((left.args.timestamp ?? 0n)))
        .map((log) => {
          const { executor, budgetId, timestamp, receiptHash, taskId, ruleId, recipient, amount, evidenceHash, resultHash, metadataURI } = log.args;

          return {
            receiptHash: receiptHash as Hex,
            taskId: taskId as Hex,
            ruleId: ruleId as Hex,
            executor: getAddress(executor as Address),
            recipient: getAddress(recipient as Address),
            amountWstETH: formatUnits(amount as bigint, 18),
            budgetId: budgetId as Hex,
            evidenceHash: evidenceHash as Hex,
            resultHash: resultHash as Hex,
            metadataURI: metadataURI ?? "",
            timestamp: formatReceiptTimestamp(timestamp as bigint),
            txHash: log.transactionHash,
          };
        });

      setAgentReceipts((current) => ({
        ...current,
        [allowance.id]: nextReceipts,
      }));
    } catch (error) {
      setReceiptsError(toErrorMessage(error));
    } finally {
      setReceiptsLoading(false);
    }
  }, [treasury]);

  React.useEffect(() => {
    if (!selectedAllowance) return;
    if (agentReceipts[selectedAllowance.id]) return;
    void loadReceiptsForAllowance(selectedAllowance);
  }, [agentReceipts, loadReceiptsForAllowance, selectedAllowance]);

  const connectWallet = React.useCallback(async () => {
    const provider = getProvider();
    if (!provider) {
      setWalletStatus("MetaMask was not found in this browser.");
      return;
    }

    setWalletBusy(true);
    try {
      await ensureBaseNetwork(provider);
      const accounts = (await provider.request({ method: "eth_requestAccounts" })) as string[];
      const nextAccount = getAddress(accounts[0] ?? "0x0000000000000000000000000000000000000000");
      setWalletAddress(nextAccount);
      setWalletStatus(`Connected ${shortAddress(nextAccount)} on Base.`);
    } catch (error) {
      setWalletStatus(toErrorMessage(error));
    } finally {
      setWalletBusy(false);
    }
  }, []);

  const clearWallet = React.useCallback(() => {
    setWalletAddress(null);
    setWalletAssetBalanceWei(0n);
    setWalletStatus("Wallet cleared for this app. Reconnect or switch accounts in MetaMask.");
  }, []);

  const addSpendableTopUp = React.useCallback(async () => {
    const provider = getProvider();
    if (!provider || !walletAddress || !manifest || !treasury) {
      setTopUpStatus("Connect your wallet first.");
      return;
    }

    if (!hasEnoughTopUpBalance) {
      setTopUpStatus("Not enough wstETH in the connected wallet for this top-up.");
      return;
    }

    setTopUpBusy(true);

    try {
      await ensureBaseNetwork(provider);
      const walletClient = createWalletClient({
        account: walletAddress,
        chain: base,
        transport: custom(provider),
      });

      if (topUpWei === null) {
        throw new Error("Enter a valid wstETH top-up amount.");
      }
      const topUpTx = await walletClient.writeContract({
        address: manifest.baseAssetAddress,
        abi: erc20Abi,
        functionName: "transfer",
        args: [treasury.treasuryAddress, topUpWei],
      });
      await publicClient.waitForTransactionReceipt({ hash: topUpTx });

      setTreasuries((current) => {
        const next = current.map((item) =>
          item.id === treasury.id
            ? {
                ...item,
                spendableTopUpWstETH: String((Number(item.spendableTopUpWstETH ?? "0") + Number(topUpAmount || "0")).toFixed(6)),
                spendableTopUpTxHash: topUpTx,
              }
            : item,
        );
        writeStoredTreasuries(next);
        return next;
      });

      setTopUpStatus(`Added ${topUpAmount} wstETH as immediate spendable headroom.`);
    } catch (error) {
      setTopUpStatus(toErrorMessage(error));
    } finally {
      setTopUpBusy(false);
    }
  }, [hasEnoughTopUpBalance, manifest, topUpAmount, topUpWei, treasury, walletAddress]);

  const withdrawPrincipal = React.useCallback(async () => {
    const provider = getProvider();
    if (!provider || !walletAddress || !manifest || !treasury) {
      setWithdrawStatus("Connect your wallet first.");
      return;
    }

    if (!canWithdrawPrincipal) {
      setWithdrawStatus("Requested principal withdrawal exceeds the protected principal currently recorded in this treasury.");
      return;
    }

    setWithdrawBusy(true);

    try {
      await ensureBaseNetwork(provider);
      const walletClient = createWalletClient({
        account: walletAddress,
        chain: base,
        transport: custom(provider),
      });

      if (!factoryAddress) {
        throw new Error("Operator factory not found. Create a treasury first from the main page.");
      }

      try {
        await publicClient.readContract({
          address: factoryAddress,
          abi: manifest.factory.abi,
          functionName: "treasuryOperator",
          args: ["0x0000000000000000000000000000000000000000"],
        });
      } catch {
        window.localStorage.removeItem(FACTORY_STORAGE_KEY);
        setFactoryAddress(null);
        throw new Error("Stored operator factory is invalid. Go back to the main page and create the treasury again.");
      }

      const withdrawWei = parseUnits(withdrawAmount, 18);
      const withdrawTx = await walletClient.writeContract({
        address: factoryAddress,
        abi: manifest.factory.abi,
        functionName: "withdrawPrincipal",
        args: [treasury.treasuryAddress, withdrawWei],
      });
      await publicClient.waitForTransactionReceipt({ hash: withdrawTx });

      setTreasuries((current) => {
        const next = current.map((item) =>
          item.id === treasury.id
            ? {
                ...item,
                principalAmountWstETH: String(Math.max(0, Number(item.principalAmountWstETH ?? "0") - Number(withdrawAmount || "0")).toFixed(6)),
              }
            : item,
        );
        writeStoredTreasuries(next);
        return next;
      });

      setWithdrawStatus(`Withdrew ${withdrawAmount} wstETH of protected principal back to the connected operator wallet.`);
    } catch (error) {
      setWithdrawStatus(toErrorMessage(error));
    } finally {
      setWithdrawBusy(false);
    }
  }, [canWithdrawPrincipal, factoryAddress, manifest, treasury, walletAddress, withdrawAmount]);

  const assignAgentBudget = React.useCallback(async () => {
    const provider = getProvider();
    if (!provider || !walletAddress || !manifest || !treasury) {
      setAllowanceStatus("Connect your wallet first.");
      return;
    }

    setAllowanceBusy(true);

    try {
      await ensureBaseNetwork(provider);
      const walletClient = createWalletClient({
        account: walletAddress,
        chain: base,
        transport: custom(provider),
      });

      if (!factoryAddress) {
        throw new Error("Operator factory not found. Create a treasury first from the main page.");
      }

      try {
        await publicClient.readContract({
          address: factoryAddress,
          abi: manifest.factory.abi,
          functionName: "treasuryOperator",
          args: ["0x0000000000000000000000000000000000000000"],
        });
      } catch {
        window.localStorage.removeItem(FACTORY_STORAGE_KEY);
        setFactoryAddress(null);
        throw new Error("Stored operator factory is invalid. Go back to the main page and create the treasury again.");
      }

      const agentAddress = getAddress(agentWallet);
      const amount = parseUnits(agentAmount, 18);

      setAllowanceStep("1/1 Assigning allowance");
      const assignTx = await walletClient.writeContract({
        address: factoryAddress,
        abi: manifest.factory.abi,
        functionName: "assignAllowance",
        args: [treasury.treasuryAddress, agentLabel, agentAddress, amount],
      });
      const assignReceipt = await publicClient.waitForTransactionReceipt({ hash: assignTx });

      let budgetId: `0x${string}` | null = null;
      let ruleId: `0x${string}` | null = null;

      for (const log of assignReceipt.logs) {
        try {
          const decoded = decodeEventLog({
            abi: manifest.factory.abi,
            data: log.data,
            topics: log.topics,
          });

          if (decoded.eventName === "AllowanceAssigned") {
            const args = decoded.args as {
              budgetId: `0x${string}`;
              ruleId: `0x${string}`;
            };
            budgetId = args.budgetId;
            ruleId = args.ruleId;
            break;
          }
        } catch {
          // Ignore unrelated logs.
        }
      }

      if (!budgetId || !ruleId) {
        throw new Error("Allowance transaction succeeded, but the new allowance IDs could not be decoded.");
      }

      const nextAllowance: ManagedAllowance = {
        id: crypto.randomUUID(),
        label: agentLabel,
        budgetId,
        manager: walletAddress,
        executor: agentAddress,
        recipient: agentAddress,
        amountWstETH: agentAmount,
        ruleId,
        budgetTxHash: assignTx,
        ruleTxHash: assignTx,
        spentWstETH: "0",
      };

      setTreasuries((current) => {
        const next = current.map((item) =>
          item.id === treasury.id
            ? { ...item, allowances: [nextAllowance, ...item.allowances] }
            : item,
        );
        writeStoredTreasuries(next);
        return next;
      });

      setSelectedAllowanceId(nextAllowance.id);
      setAllowanceStatus(`${agentLabel} is ready with ${agentAmount} wstETH of allowance.`);
    } catch (error) {
      setAllowanceStatus(toErrorMessage(error));
    } finally {
      setAllowanceBusy(false);
      setAllowanceStep(null);
    }
  }, [agentAmount, agentLabel, agentWallet, factoryAddress, manifest, treasury, walletAddress]);

  if (!treasury) {
    return (
      <main className="app-shell mx-auto min-h-screen max-w-5xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="panel-surface rounded-[1.75rem] p-8">
          <SectionLabel>Treasury Workspace</SectionLabel>
          <h1 className="mt-2 text-3xl font-semibold text-[#010400]">Treasury not found</h1>
          <p className={`mt-3 ${helperClassName()}`}>This workspace does not exist in your local operator session.</p>
          <div className="mt-6">
            <Link
              href="/"
              className="inline-flex h-10 items-center justify-center rounded-full border border-primary/20 bg-white/80 px-4 text-sm font-medium text-foreground transition-all duration-150 hover:bg-primary/10"
            >
              Back to treasuries
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="app-shell mx-auto min-h-screen max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
      <section className="flex items-start justify-between gap-4">
        <div>
          <Link
            href="/"
            className="inline-flex h-9 items-center justify-center rounded-full border border-primary/20 bg-white/80 px-3 text-sm font-medium text-foreground transition-all duration-150 hover:bg-primary/10"
          >
            Back to treasuries
          </Link>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-[#010400] sm:text-5xl">{treasury.name}</h1>
          <p className={`mt-3 ${helperClassName()}`}>Treasury workspace for principal, budgets, and active agents.</p>
        </div>

        <div className="flex max-w-[19rem] flex-col items-end gap-2">
          <div className="panel-surface flex min-w-[14rem] flex-col gap-2 rounded-[1.35rem] p-2">
            <Button onClick={() => void connectWallet()} disabled={walletBusy} className="w-full justify-between">
              {walletBusy ? (
                <>
                  <span className="inline-flex items-center gap-2">
                    <ButtonSpinner />
                    Connecting...
                  </span>
                  <span />
                </>
              ) : walletAddress ? (
                <>
                  <span>{shortAddress(walletAddress)}</span>
                  <span className="text-primary-foreground/80">Base</span>
                </>
              ) : (
                "Connect wallet"
              )}
            </Button>
            {walletAddress ? (
              <div className="flex items-center justify-end gap-2">
                <InlineAction onClick={() => void connectWallet()}>Change wallet</InlineAction>
                <InlineAction onClick={clearWallet}>Clear</InlineAction>
              </div>
            ) : null}
          </div>
          <p className={`text-right ${helperClassName()}`}>{walletStatus}</p>
        </div>
      </section>

      <section className="mt-6">
        <Card className="panel-surface">
          <CardHeader>
            <SectionLabel>Treasury Workspace</SectionLabel>
            <CardTitle>Core treasury stats</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            <div className="metric-tile md:col-span-2 xl:col-span-1">
              <div className="flex items-center gap-2">
                <SectionLabel>Principal</SectionLabel>
                <InfoHint text="Principal capital held in the treasury. You can return part of this protected base capital back to the connected operator wallet." />
              </div>
              <p className="mt-2 text-lg font-semibold text-[#010400]">
                {treasury.principalAmountWstETH ? `${treasury.principalAmountWstETH} wstETH` : "Not funded"}
              </p>
              <div className="mt-3 space-y-3">
                <input
                  className={inputClassName()}
                  value={withdrawAmount}
                  onChange={(event) => setWithdrawAmount(event.target.value)}
                  placeholder="0.001 wstETH"
                />
                <div className="flex items-center justify-between gap-3">
                  <p className={helperClassName()}>
                    Protected principal: {Number(treasury.principalAmountWstETH ?? "0").toFixed(6)} wstETH
                  </p>
                  <InlineAction onClick={() => setWithdrawAmount(Number(treasury.principalAmountWstETH ?? "0").toFixed(6))}>
                    Use max
                  </InlineAction>
                </div>
                {!canWithdrawPrincipal ? (
                  <p className="text-sm text-[#cd5334]">Requested withdrawal is above the treasury&apos;s protected principal.</p>
                ) : null}
                <Button
                  onClick={() => void withdrawPrincipal()}
                  disabled={withdrawBusy || !walletAddress || !manifest || !canWithdrawPrincipal}
                  className="w-full"
                >
                  {withdrawBusy ? (
                    <>
                      <ButtonSpinner />
                      Withdrawing...
                    </>
                  ) : (
                    "Withdraw principal"
                  )}
                </Button>
                <p className={helperClassName()}>{withdrawStatus}</p>
              </div>
            </div>
            <StatCard
              label="Spendable amount"
              value={treasury.spendableTopUpWstETH ? `${treasury.spendableTopUpWstETH} wstETH` : "0 wstETH"}
              detail="Directly funded spendable headroom available for agents to work with immediately."
            />
            <StatCard
              label="wstETH APR"
              value={`${market.aprPercent.toFixed(1)}%`}
              detail="Yield reference for wstETH. Use the official Lido pool and wrap flow as the source context."
            >
              <a
                href="https://help.lido.fi/en/articles/5231836-what-is-lido-s-wsteth"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white px-3 py-2 text-sm font-medium text-[#010400]"
              >
                <img
                  src="https://s2.coinmarketcap.com/static/img/coins/64x64/12409.png"
                  alt="wstETH"
                  className="h-5 w-5 rounded-full"
                />
                View wstETH on Lido
              </a>
            </StatCard>
            <StatCard
              label="Active agents"
              value={String(treasury.allowances.length)}
              detail="Agents currently assigned to this treasury."
            />
            <StatCard
              label="Treasury owner"
              value={shortAddress(treasury.ownerAddress)}
              detail="Wallet that created and manages this treasury."
            />
          </CardContent>
        </Card>
      </section>

      <section className="mt-6">
        <Card className="panel-surface">
          <CardHeader>
            <SectionLabel>Assigned Agent Budgets</SectionLabel>
            <CardTitle>Current agents and spendings</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {treasury.allowances.length ? (
              treasury.allowances.map((allowance) => {
                const isSelected = selectedAllowanceId === allowance.id;
                const receiptCount = agentReceipts[allowance.id]?.length;

                return (
                  <button
                    key={allowance.id}
                    type="button"
                    onClick={() => setSelectedAllowanceId(allowance.id)}
                    className={`metric-tile text-left transition-all ${isSelected ? "ring-2 ring-primary/25" : "hover:ring-2 hover:ring-primary/10"}`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-base font-semibold text-[#cd5334]">{allowance.label}</p>
                        <p className={`mt-1 ${helperClassName()}`}>{shortAddress(allowance.executor)}</p>
                      </div>
                      <Badge variant="secondary">{allowance.amountWstETH} wstETH</Badge>
                    </div>
                    <div className={`mt-3 grid gap-2 ${helperClassName()}`}>
                      <p>Total allowed to spend: {allowance.amountWstETH} wstETH</p>
                      <p>Current spend: {allowance.spentWstETH ?? "0"} wstETH</p>
                      <p>
                        Percent spent:{" "}
                        {(
                          Math.min(
                            100,
                            Math.max(
                              0,
                              ((Number(allowance.spentWstETH ?? "0") || 0) / Math.max(Number(allowance.amountWstETH) || 1, 1e-12)) * 100,
                            ),
                          )
                        ).toFixed(1)}
                        %
                      </p>
                      <p>ERC-8004 receipts: {receiptCount ?? "—"}</p>
                    </div>
                    <div className="mt-4 flex items-center justify-between gap-3">
                      <span className="text-xs font-medium uppercase tracking-[0.18em] text-[#cd5334]">
                        {isSelected ? "Viewing agent actions" : "Open agent actions"}
                      </span>
                      <span className="rounded-full border border-primary/15 bg-white px-3 py-1 text-[11px] font-medium text-[#5d423b]">
                        View receipts
                      </span>
                    </div>
                  </button>
                );
              })
            ) : (
              <div className="metric-tile">
                <p className="text-base font-semibold text-[#010400]">No agents yet</p>
                <p className={`mt-2 ${helperClassName()}`}>Assign the first allowance to populate this workspace.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </section>

      {selectedAllowance ? (
        <section className="mt-6">
          <Card className="panel-surface">
            <CardHeader className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <SectionLabel>Agent action proof</SectionLabel>
                <CardTitle>{selectedAllowance.label}</CardTitle>
                <p className={`mt-2 max-w-3xl ${helperClassName()}`}>
                  Switch between the <strong className="text-[#010400]">ERC-8004 receipt view</strong> and the <strong className="text-[#010400]">MetaMask delegation view</strong>. Together they show both halves of the story: how the action was authorized and how it was recorded onchain.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="secondary">{shortAddress(selectedAllowance.executor)}</Badge>
                <ProofTabButton active={activeProofTab === "receipts"} onClick={() => setActiveProofTab("receipts")}>ERC-8004 receipts</ProofTabButton>
                <ProofTabButton active={activeProofTab === "delegations"} onClick={() => setActiveProofTab("delegations")}>MetaMask delegations</ProofTabButton>
                {activeProofTab === "receipts" ? (
                  <InlineAction onClick={() => void loadReceiptsForAllowance(selectedAllowance)}>
                    {receiptsLoading ? "Refreshing..." : "Refresh receipts"}
                  </InlineAction>
                ) : null}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {activeProofTab === "receipts" ? (
                <>
                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="metric-tile">
                      <SectionLabel>Allowance cap</SectionLabel>
                      <p className="mt-2 text-lg font-semibold text-[#010400]">{selectedAllowance.amountWstETH} wstETH</p>
                      <p className={`mt-2 ${helperClassName()}`}>Maximum spend approved for this agent budget.</p>
                    </div>
                    <div className="metric-tile">
                      <SectionLabel>Budget ID</SectionLabel>
                      <p className="mt-2 break-all text-sm font-semibold text-[#010400]">{selectedAllowance.budgetId}</p>
                      <p className={`mt-2 ${helperClassName()}`}>AAP budget bucket this agent spends through.</p>
                    </div>
                    <div className="metric-tile">
                      <SectionLabel>Authorization rule</SectionLabel>
                      <p className="mt-2 break-all text-sm font-semibold text-[#010400]">{selectedAllowance.ruleId}</p>
                      <p className={`mt-2 ${helperClassName()}`}>Delegation / rule provenance attached to the spend flow.</p>
                    </div>
                  </div>

                  {receiptsError ? <p className="text-sm text-[#cd5334]">{receiptsError}</p> : null}

                  {receiptsLoading && !selectedAllowanceReceipts.length ? (
                    <div className="metric-tile">
                      <p className="text-base font-semibold text-[#010400]">Loading receipts...</p>
                      <p className={`mt-2 ${helperClassName()}`}>Querying the onchain receipt registry for this agent.</p>
                    </div>
                  ) : selectedAllowanceReceipts.length ? (
                    <div className="space-y-3">
                      {selectedAllowanceReceipts.map((receipt) => (
                        <div key={receipt.receiptHash} className="metric-tile">
                          <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
                            <div>
                              <SectionLabel>ERC-8004 receipt</SectionLabel>
                              <p className="mt-2 break-all text-sm font-semibold text-[#010400]">{receipt.receiptHash}</p>
                            </div>
                            <a
                              href={`https://basescan.org/tx/${receipt.txHash}`}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex h-9 items-center justify-center rounded-full border border-primary/20 bg-white/80 px-3 text-sm font-medium text-foreground transition-all duration-150 hover:bg-primary/10"
                            >
                              View tx
                            </a>
                          </div>
                          <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                            <div>
                              <p className="text-xs font-medium uppercase tracking-[0.18em] text-[rgb(108,90,84)]">Amount</p>
                              <p className="mt-1 text-sm font-semibold text-[#010400]">{receipt.amountWstETH} wstETH</p>
                            </div>
                            <div>
                              <p className="text-xs font-medium uppercase tracking-[0.18em] text-[rgb(108,90,84)]">Executor</p>
                              <p className="mt-1 text-sm font-semibold text-[#010400]">{shortAddress(receipt.executor)}</p>
                            </div>
                            <div>
                              <p className="text-xs font-medium uppercase tracking-[0.18em] text-[rgb(108,90,84)]">Recipient</p>
                              <p className="mt-1 text-sm font-semibold text-[#010400]">{shortAddress(receipt.recipient)}</p>
                            </div>
                            <div>
                              <p className="text-xs font-medium uppercase tracking-[0.18em] text-[rgb(108,90,84)]">Task ID</p>
                              <p className="mt-1 break-all text-xs font-semibold text-[#010400]">{receipt.taskId}</p>
                            </div>
                            <div>
                              <p className="text-xs font-medium uppercase tracking-[0.18em] text-[rgb(108,90,84)]">Rule ID</p>
                              <p className="mt-1 break-all text-xs font-semibold text-[#010400]">{receipt.ruleId}</p>
                            </div>
                            <div>
                              <p className="text-xs font-medium uppercase tracking-[0.18em] text-[rgb(108,90,84)]">Timestamp</p>
                              <p className="mt-1 text-sm font-semibold text-[#010400]">{receipt.timestamp}</p>
                            </div>
                            <div>
                              <p className="text-xs font-medium uppercase tracking-[0.18em] text-[rgb(108,90,84)]">Evidence hash</p>
                              <p className="mt-1 break-all text-xs font-semibold text-[#010400]">{receipt.evidenceHash}</p>
                            </div>
                            <div>
                              <p className="text-xs font-medium uppercase tracking-[0.18em] text-[rgb(108,90,84)]">Result hash</p>
                              <p className="mt-1 break-all text-xs font-semibold text-[#010400]">{receipt.resultHash}</p>
                            </div>
                            <div>
                              <p className="text-xs font-medium uppercase tracking-[0.18em] text-[rgb(108,90,84)]">Metadata URI</p>
                              <p className="mt-1 break-all text-xs font-semibold text-[#010400]">{receipt.metadataURI || "—"}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="metric-tile">
                      <p className="text-base font-semibold text-[#010400]">No receipts yet</p>
                      <p className={`mt-2 ${helperClassName()}`}>
                        Once this agent performs an authorized AAP spend, the receipt registry will show the ERC-8004 receipt entries here.
                      </p>
                    </div>
                  )}
                </>
              ) : (
                <>
                  <div className="metric-tile">
                    <p className="text-sm font-medium text-[#010400]">
                      This tab shows the <strong>MetaMask authorization side</strong> of the exact same flow. A constrained delegation lets the smart account execute the treasury spend, and the treasury then records the receipt with the matching rule provenance.
                    </p>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                    <div className="metric-tile">
                      <SectionLabel>Delegator smart account</SectionLabel>
                      <p className="mt-2 break-all text-sm font-semibold text-[#010400]">
                        {dashboardSnapshot?.treasury.smartAccountAddress ?? "Unavailable"}
                      </p>
                      <p className={`mt-2 ${helperClassName()}`}>This is the MetaMask smart account that ultimately appears as executor in the receipt.</p>
                    </div>
                    <div className="metric-tile">
                      <SectionLabel>Allowed target</SectionLabel>
                      <p className="mt-2 break-all text-sm font-semibold text-[#010400]">
                        {packagedAllowedTargets[0] ?? treasury.treasuryAddress}
                      </p>
                      <p className={`mt-2 ${helperClassName()}`}>Delegation is constrained to the treasury contract, not a generic arbitrary call surface.</p>
                    </div>
                    <div className="metric-tile">
                      <SectionLabel>Allowed method</SectionLabel>
                      <p className="mt-2 text-sm font-semibold text-[#010400]">
                        {describeSelector(packagedAllowedMethods[0] ?? dashboardSnapshot?.budget.selector)}
                      </p>
                      <p className={`mt-2 ${helperClassName()}`}>The delegation only permits the treasury spend entrypoint that powers the allowance flow.</p>
                    </div>
                    <div className="metric-tile">
                      <SectionLabel>Rule linkage</SectionLabel>
                      <p className="mt-2 break-all text-sm font-semibold text-[#010400]">{selectedAllowance.ruleId}</p>
                      <p className={`mt-2 ${helperClassName()}`}>AAP still matches the resulting call against this treasury rule before the receipt is registered.</p>
                    </div>
                  </div>

                  <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
                    <div className="metric-tile">
                      <SectionLabel>How to present this</SectionLabel>
                      <ol className="mt-3 list-decimal space-y-2 pl-4 text-sm text-[rgb(71,56,51,0.88)]">
                        <li>The human controls a MetaMask smart account and creates a constrained delegation instead of handing over treasury ownership.</li>
                        <li>That delegation is locked down to the treasury target, the `spendFromBudget(...)` method, and a narrow set of caveats such as redeemer, call count, and time bounds.</li>
                        <li>An authorized redeemer redeems the delegation, and the MetaMask smart account becomes the onchain executor of the treasury spend.</li>
                        <li>The treasury then checks the AAP budget and matching `ruleId`, executes the spend, and records the ERC-8004 receipt.</li>
                        <li>That is why the receipt view and the delegation view belong together: one shows authorization, the other shows the auditable result.</li>
                      </ol>
                    </div>

                    <div className="metric-tile">
                      <SectionLabel>Packaged delegation caveats</SectionLabel>
                      <div className={`mt-3 grid gap-2 ${helperClassName()}`}>
                        <p><strong className="text-[#010400]">Delegation hash:</strong> {shortHex(asString(packagedDelegation.delegationHash))}</p>
                        <p><strong className="text-[#010400]">Artifact network:</strong> {asString(packagedDelegationNetwork.chainName) ?? "—"}</p>
                        <p><strong className="text-[#010400]">Redeemer:</strong> {packagedRedeemers[0] ?? asString(packagedDelegationAccounts.redeemer) ?? "—"}</p>
                        <p><strong className="text-[#010400]">Limited calls:</strong> {packagedLimitedCalls ?? "—"}</p>
                        <p><strong className="text-[#010400]">Max value:</strong> {packagedMaxValueWei ?? "0"} wei</p>
                        <p><strong className="text-[#010400]">Valid after:</strong> {formatUnixTimestamp(packagedValidAfter)}</p>
                        <p><strong className="text-[#010400]">Valid before:</strong> {formatUnixTimestamp(packagedValidBefore)}</p>
                        <p><strong className="text-[#010400]">Exact calldata:</strong> {shortHex(packagedExactCalldata)}</p>
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                    <div className="metric-tile">
                      <SectionLabel>Budget ID</SectionLabel>
                      <p className="mt-2 break-all text-sm font-semibold text-[#010400]">{selectedAllowance.budgetId}</p>
                      <p className={`mt-2 ${helperClassName()}`}>This is the budget bucket the delegated spend is allowed to draw from.</p>
                    </div>
                    <div className="metric-tile">
                      <SectionLabel>Receipt executor</SectionLabel>
                      <p className="mt-2 break-all text-sm font-semibold text-[#010400]">
                        {dashboardSnapshot?.treasury.receiptRegistryExecutor ?? dashboardSnapshot?.treasury.smartAccountAddress ?? "Unavailable"}
                      </p>
                      <p className={`mt-2 ${helperClassName()}`}>In the live proof, the smart account address is what the receipt registry records as executor.</p>
                    </div>
                    <div className="metric-tile">
                      <SectionLabel>Qualification status</SectionLabel>
                      <p className="mt-2 text-sm font-semibold text-[#010400]">{dashboardSnapshot?.proof.qualificationStatus ?? "Unavailable"}</p>
                      <p className={`mt-2 ${helperClassName()}`}>This summarizes the packaged MetaMask proof posture used by the dashboard.</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="metric-tile">
                      <SectionLabel>Live proof transactions</SectionLabel>
                      <p className={`mt-2 ${helperClassName()}`}>
                        These are the concrete Base proof links you can click during the demo to show the real delegation redemption and resulting treasury execution.
                      </p>
                    </div>
                    {liveProofTxs.length ? (
                      liveProofTxs.map((tx) => (
                        <div key={tx.hash} className="metric-tile">
                          <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
                            <div>
                              <SectionLabel>{tx.label}</SectionLabel>
                              <p className="mt-2 text-sm font-semibold text-[#010400]">{tx.description}</p>
                              <p className={`mt-2 break-all ${helperClassName()}`}>{tx.hash}</p>
                            </div>
                            <a
                              href={`https://basescan.org/tx/${tx.hash}`}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex h-9 items-center justify-center rounded-full border border-primary/20 bg-white/80 px-3 text-sm font-medium text-foreground transition-all duration-150 hover:bg-primary/10"
                            >
                              View tx
                            </a>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="metric-tile">
                        <p className="text-base font-semibold text-[#010400]">Live proof snapshot unavailable</p>
                        <p className={`mt-2 ${helperClassName()}`}>The delegation tab could not load the packaged live-proof transaction list.</p>
                      </div>
                    )}
                  </div>

                  {snapshotError ? <p className="text-sm text-[#cd5334]">{snapshotError}</p> : null}
                </>
              )}
            </CardContent>
          </Card>
        </section>
      ) : null}

      <section className="mt-6 grid gap-6 lg:grid-cols-2">
        <Card className="panel-surface">
          <CardHeader>
            <SectionLabel>Agent Budgeting</SectionLabel>
            <CardTitle>Deploy a new agent allowance</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium text-[#cd5334]">Agent name</label>
                <input
                  className={inputClassName()}
                  value={agentLabel}
                  onChange={(event) => setAgentLabel(event.target.value)}
                />
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-[#010400]">
                  <span>Agent spending cap</span>
                  <InfoHint text="This is the total maximum wstETH this treasury lets this agent spend under the current budget. It does not reset daily yet, and it is not a percentage split." />
                </label>
                <input
                  className={inputClassName()}
                  value={agentAmount}
                  onChange={(event) => setAgentAmount(event.target.value)}
                  placeholder="0.01 wstETH"
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="flex items-center gap-2 text-sm font-medium text-[#010400]">
                  <span>Agent wallet address</span>
                  <InfoHint text="This wallet is used as both the agent executor and the approved recipient in the current demo flow." />
                </label>
                <input
                  className={inputClassName()}
                  value={agentWallet}
                  onChange={(event) => setAgentWallet(event.target.value)}
                  placeholder="0x..."
                />
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Button onClick={() => void assignAgentBudget()} disabled={allowanceBusy || !walletAddress || !manifest}>
                {allowanceBusy ? (
                  <>
                    <ButtonSpinner />
                    {allowanceStep ?? "Working..."}
                  </>
                ) : (
                  "Deploy agent allowance"
                )}
              </Button>
            </div>

            <p className={helperClassName()}>{allowanceStatus}</p>
          </CardContent>
        </Card>

        <Card className="panel-surface">
          <CardHeader>
            <SectionLabel>Immediate Spendable Amount</SectionLabel>
            <CardTitle className="flex items-center gap-2">
              <span>Add direct spendable headroom</span>
              <InfoHint text="This sends extra wstETH directly into the treasury so the treasury can support spending immediately without waiting for yield accrual." />
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-[#010400]">Top-up amount</label>
              <input
                className={inputClassName()}
                value={topUpAmount}
                onChange={(event) => setTopUpAmount(event.target.value)}
                placeholder="0.001 wstETH"
              />
              <div className="flex items-center justify-between gap-3">
                <p className={helperClassName()}>Wallet balance: {Number(walletAssetBalance).toFixed(6)} wstETH</p>
                <button
                  type="button"
                  onClick={() => setTopUpAmount(walletAssetBalance)}
                  className={`rounded-full border border-primary/20 px-3 py-1 text-xs ${helperClassName()}`}
                >
                  Use max
                </button>
              </div>
              {!hasEnoughTopUpBalance ? (
                <p className="text-sm text-[#cd5334]">Connected wallet does not have enough wstETH for this top-up.</p>
              ) : null}
            </div>

            <Button onClick={() => void addSpendableTopUp()} disabled={topUpBusy || !walletAddress || !manifest || !hasEnoughTopUpBalance}>
              {topUpBusy ? (
                <>
                  <ButtonSpinner />
                  Funding...
                </>
              ) : (
                "Add spendable amount"
              )}
            </Button>

            <p className={helperClassName()}>{topUpStatus}</p>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
