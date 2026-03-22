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
} from "viem";
import { base } from "viem/chains";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { shortAddress } from "@/lib/format";

import {
  ensureBaseNetwork,
  erc20Abi,
  FACTORY_STORAGE_KEY,
  formatUsd,
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
    <span
      title={text}
      aria-label={text}
      className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-primary/20 bg-white text-xs font-semibold text-[#cd5334]"
    >
      i
    </span>
  );
}

function StatCard({
  label,
  value,
  detail,
}: {
  label: string;
  value: string;
  detail: string;
}): React.JSX.Element {
  return (
    <div className="metric-tile">
      <SectionLabel>{label}</SectionLabel>
      <p className="mt-2 text-lg font-semibold text-[#010400]">{value}</p>
      <p className={`mt-2 ${helperClassName()}`}>{detail}</p>
    </div>
  );
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
  const [walletAssetBalance, setWalletAssetBalance] = React.useState("0");
  const [topUpAmount, setTopUpAmount] = React.useState("0.001");
  const [topUpBusy, setTopUpBusy] = React.useState(false);
  const [topUpStatus, setTopUpStatus] = React.useState("Add a directly funded amount to create immediate spendable headroom.");
  const [allowanceBusy, setAllowanceBusy] = React.useState(false);
  const [allowanceStep, setAllowanceStep] = React.useState<string | null>(null);
  const [allowanceStatus, setAllowanceStatus] = React.useState("Create an allowance for a single agent wallet.");
  const [agentLabel, setAgentLabel] = React.useState("Research Agent");
  const [agentWallet, setAgentWallet] = React.useState("");
  const [agentAmount, setAgentAmount] = React.useState("0.01");

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
        const [manifestResponse, marketResponse] = await Promise.all([
          fetch("/api/operator-manifest", { cache: "no-store" }),
          fetch("/api/operator-market", { cache: "no-store" }),
        ]);

        if (manifestResponse.ok) {
          setManifest((await manifestResponse.json()) as OperatorManifest);
        }

        if (marketResponse.ok) {
          setMarket((await marketResponse.json()) as OperatorMarket);
        }
      } catch {
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
        setWalletAssetBalance(formatUnits(balance, 18));
      } catch {
        setWalletAssetBalance("0");
      }
    })();
  }, [manifest, walletAddress, topUpBusy]);

  const treasury = treasuries.find((item) => item.id === treasuryId) ?? null;
  const principal = Number(treasury?.principalAmountWstETH ?? "0");
  const dailyYieldAsset = principal * (market.aprPercent / 100) / 365;
  const dailyYieldUsd = dailyYieldAsset * market.ethUsd;
  const hasEnoughTopUpBalance = Number(topUpAmount || "0") <= Number(walletAssetBalance || "0");

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
    setWalletAssetBalance("0");
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

      const topUpWei = parseUnits(topUpAmount, 18);
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
  }, [hasEnoughTopUpBalance, manifest, topUpAmount, treasury, walletAddress]);

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
          <Link href="/" className={`inline-block ${helperClassName()}`}>
            Back to treasuries
          </Link>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-[#010400] sm:text-5xl">{treasury.name}</h1>
          <p className={`mt-3 ${helperClassName()}`}>Treasury workspace for principal, budgets, and active agents.</p>
        </div>

        <div className="flex flex-col items-end gap-2">
          <Button onClick={() => void connectWallet()} disabled={walletBusy}>
            {walletBusy ? (
              <>
                <ButtonSpinner />
                Connecting...
              </>
            ) : walletAddress ? (
              `${shortAddress(walletAddress)} on Base`
            ) : (
              "Connect wallet"
            )}
          </Button>
          {walletAddress ? (
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => void connectWallet()}
                className={`rounded-full border border-primary/20 px-3 py-1 text-xs ${helperClassName()}`}
              >
                Change wallet
              </button>
              <button
                type="button"
                onClick={clearWallet}
                className={`rounded-full border border-primary/20 px-3 py-1 text-xs ${helperClassName()}`}
              >
                Clear
              </button>
            </div>
          ) : null}
          <p className={`max-w-[18rem] text-right ${helperClassName()}`}>{walletStatus}</p>
        </div>
      </section>

      <section className="mt-6 grid gap-6 lg:grid-cols-3">
        <Card className="panel-surface">
          <CardHeader>
            <SectionLabel>Treasury Workspace</SectionLabel>
            <CardTitle>Core treasury stats</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-3 md:grid-cols-2">
            <StatCard
              label="Principal"
              value={treasury.principalAmountWstETH ? `${treasury.principalAmountWstETH} wstETH` : "Not funded"}
              detail="Principal capital held in the treasury."
            />
            <StatCard
              label="Current APR"
              value={`${market.aprPercent.toFixed(1)}%`}
              detail="Yield reference for the principal asset."
            />
            <StatCard
              label="Agent budget / day"
              value={`${dailyYieldAsset.toFixed(6)} wstETH`}
              detail="Estimated daily allowance capacity."
            />
            <StatCard
              label="Agent budget / day"
              value={formatUsd(dailyYieldUsd)}
              detail="Estimated daily value in USD."
            />
            <StatCard
              label="Immediate spendable top-up"
              value={treasury.spendableTopUpWstETH ? `${treasury.spendableTopUpWstETH} wstETH` : "None yet"}
              detail="Directly funded amount that is immediately spendable above protected principal."
            />
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

        <Card className="panel-surface">
          <CardHeader>
            <SectionLabel>Immediate Spendable Amount</SectionLabel>
            <CardTitle>Add direct spendable headroom</CardTitle>
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
                  onClick={() => setTopUpAmount(Number(walletAssetBalance).toFixed(6))}
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

            <p className={helperClassName()}>
              This sends extra `wstETH` directly into the treasury, so it can be used immediately without waiting for yield accrual.
            </p>
            <p className={helperClassName()}>{topUpStatus}</p>
          </CardContent>
        </Card>

        <Card className="panel-surface">
          <CardHeader>
            <SectionLabel>Create New Allowance</SectionLabel>
            <CardTitle>Assign an agent budget</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium text-[#010400]">Agent name</label>
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
                <label className="text-sm font-medium text-[#010400]">Agent wallet address</label>
                <input
                  className={inputClassName()}
                  value={agentWallet}
                  onChange={(event) => setAgentWallet(event.target.value)}
                  placeholder="0x..."
                />
                <p className={helperClassName()}>
                  This single address is used as the agent executor and the approved recipient for the demo flow.
                </p>
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
                  "Assign allowance"
                )}
              </Button>
            </div>

            <p className={helperClassName()}>{allowanceStatus}</p>
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
              treasury.allowances.map((allowance) => (
                <div key={allowance.id} className="metric-tile">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-base font-semibold text-[#010400]">{allowance.label}</p>
                      <p className={`mt-1 ${helperClassName()}`}>{shortAddress(allowance.executor)}</p>
                    </div>
                    <Badge variant="secondary">{allowance.amountWstETH} wstETH</Badge>
                  </div>
                  <div className={`mt-3 grid gap-2 ${helperClassName()}`}>
                    <p>Budget manager: {shortAddress(allowance.manager)}</p>
                    <p>Agent wallet: {shortAddress(allowance.executor)}</p>
                    <p>Current spend: {allowance.spentWstETH ?? "0"} wstETH</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="metric-tile">
                <p className="text-base font-semibold text-[#010400]">No agents yet</p>
                <p className={`mt-2 ${helperClassName()}`}>Assign the first allowance to populate this workspace.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
