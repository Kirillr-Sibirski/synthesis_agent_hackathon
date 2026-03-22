"use client";

import * as React from "react";

import Link from "next/link";
import { createWalletClient, custom, decodeEventLog, formatUnits, parseUnits, type Address, getAddress } from "viem";
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

function TokenInput({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}): React.JSX.Element {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-primary/20 bg-white px-3 py-2 shadow-sm">
      <input
        className="min-w-0 flex-1 border-0 bg-transparent px-0 py-2 text-sm text-[#010400] outline-none placeholder:text-[rgb(108,90,84)]"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="0.10"
      />
      <div className="flex items-center gap-2 rounded-full bg-[#fff7f3] px-3 py-2">
        <span className="text-sm font-semibold text-[#010400]">wstETH</span>
        <img
          src="https://s2.coinmarketcap.com/static/img/coins/64x64/12409.png"
          alt="wstETH"
          className="h-6 w-6 rounded-full"
        />
      </div>
    </div>
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

function TreasuryListItem({ treasury }: { treasury: ManagedTreasury }): React.JSX.Element {
  return (
    <div className="metric-tile">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-base font-semibold text-[#010400]">{treasury.name}</p>
          <p className={`mt-1 ${helperClassName()}`}>
            {treasury.allowances.length} {treasury.allowances.length === 1 ? "agent" : "agents"}
          </p>
        </div>
        <Badge variant="secondary">
          {treasury.principalAmountWstETH ? `${treasury.principalAmountWstETH} wstETH` : "New"}
        </Badge>
      </div>

      <div className="mt-4 flex items-center justify-between gap-3">
        <p className={helperClassName()}>
          Owner {shortAddress(treasury.ownerAddress)}
        </p>
        <Link
          href={`/treasury/${treasury.id}`}
          className="inline-flex h-9 items-center justify-center rounded-full border border-primary/20 bg-white/80 px-3 text-sm font-medium text-foreground transition-all duration-150 hover:bg-primary/10"
        >
          Open workspace
        </Link>
      </div>
    </div>
  );
}

export function Dashboard(): React.JSX.Element {
  const [walletAddress, setWalletAddress] = React.useState<Address | null>(null);
  const [walletBusy, setWalletBusy] = React.useState(false);
  const [walletStatus, setWalletStatus] = React.useState("Connect your wallet to create and manage treasuries.");
  const [manifest, setManifest] = React.useState<OperatorManifest | null>(null);
  const [market, setMarket] = React.useState<OperatorMarket>({ aprPercent: 2.4, ethUsd: 0, sourceNote: "" });
  const [managedTreasuries, setManagedTreasuries] = React.useState<ManagedTreasury[]>([]);
  const [storageHydrated, setStorageHydrated] = React.useState(false);
  const [factoryAddress, setFactoryAddress] = React.useState<Address | null>(null);
  const [walletAssetBalance, setWalletAssetBalance] = React.useState("0");
  const [creationStatus, setCreationStatus] = React.useState("Create a treasury and make the first principal deposit in one guided flow.");
  const [creationBusy, setCreationBusy] = React.useState(false);
  const [creationStep, setCreationStep] = React.useState<string | null>(null);
  const [treasuryName, setTreasuryName] = React.useState("My Agent Treasury");
  const [principalAmount, setPrincipalAmount] = React.useState("0.10");

  React.useEffect(() => {
    const stored = readStoredTreasuries();
    setManagedTreasuries(stored);
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
    writeStoredTreasuries(managedTreasuries);
  }, [managedTreasuries, storageHydrated]);

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
  }, [manifest, walletAddress]);

  const dailyYieldAsset = Number(principalAmount || "0") * (market.aprPercent / 100) / 365;
  const dailyYieldUsd = dailyYieldAsset * market.ethUsd;
  const hasEnoughAssetBalance = Number(principalAmount || "0") <= Number(walletAssetBalance || "0");

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

  const createAndFundTreasury = React.useCallback(async () => {
    const provider = getProvider();
    if (!provider || !walletAddress || !manifest) {
      setCreationStatus("Connect your wallet first.");
      return;
    }

    if (!hasEnoughAssetBalance) {
      setCreationStatus("Not enough wstETH in the connected wallet for this principal deposit.");
      return;
    }

    setCreationBusy(true);

    try {
      await ensureBaseNetwork(provider);
      const walletClient = createWalletClient({
        account: walletAddress,
        chain: base,
        transport: custom(provider),
      });

      const principalWei = parseUnits(principalAmount, 18);
      let activeFactory = factoryAddress;

      if (activeFactory) {
        let factoryLooksValid = false;

        try {
          const factoryCode = await publicClient.getCode({ address: activeFactory });
          if (factoryCode && factoryCode !== "0x") {
            await publicClient.readContract({
              address: activeFactory,
              abi: manifest.factory.abi,
              functionName: "treasuryOperator",
              args: ["0x0000000000000000000000000000000000000000"],
            });
            factoryLooksValid = true;
          }
        } catch {
          factoryLooksValid = false;
        }

        if (!factoryLooksValid) {
          activeFactory = null;
          setFactoryAddress(null);
          window.localStorage.removeItem(FACTORY_STORAGE_KEY);
        }
      }

      if (!activeFactory) {
        setCreationStep("1/3 Deploying operator factory");
        const deployFactoryTx = await walletClient.deployContract({
          abi: manifest.factory.abi,
          bytecode: manifest.factory.bytecode,
        });
        const deployFactoryReceipt = await publicClient.waitForTransactionReceipt({ hash: deployFactoryTx });
        activeFactory = getAddress(deployFactoryReceipt.contractAddress ?? "0x0000000000000000000000000000000000000000");
        setFactoryAddress(activeFactory);
        window.localStorage.setItem(FACTORY_STORAGE_KEY, activeFactory);
      }

      setCreationStep(activeFactory === factoryAddress ? "1/2 Approving wstETH" : "2/3 Approving wstETH");
      await publicClient.waitForTransactionReceipt({
        hash: await walletClient.writeContract({
          address: manifest.baseAssetAddress,
          abi: erc20Abi,
          functionName: "approve",
          args: [activeFactory, principalWei],
        }),
      });

      setCreationStep(activeFactory === factoryAddress ? "2/2 Creating treasury" : "3/3 Creating treasury");
      const bootstrapTx = await walletClient.writeContract({
        address: activeFactory,
        abi: manifest.factory.abi,
        functionName: "bootstrapTreasury",
        args: [
          manifest.baseAssetAddress,
          principalWei,
          treasuryName.trim() || "Untitled Treasury",
          {
            label: "",
            agent: "0x0000000000000000000000000000000000000000",
            amountWstETH: 0n,
            enabled: false,
          },
        ],
      });
      const bootstrapReceipt = await publicClient.waitForTransactionReceipt({ hash: bootstrapTx });

      let treasuryAddress: Address | null = null;
      let authorizerAddress: Address | null = null;
      let receiptRegistryAddress: Address | null = null;

      for (const log of bootstrapReceipt.logs) {
        try {
          const decoded = decodeEventLog({
            abi: manifest.factory.abi,
            data: log.data,
            topics: log.topics,
          });

          if (decoded.eventName === "TreasuryBootstrapped") {
            const args = decoded.args as {
              treasury: Address;
              authorizer: Address;
              receiptRegistry: Address;
            };
            treasuryAddress = getAddress(args.treasury);
            authorizerAddress = getAddress(args.authorizer);
            receiptRegistryAddress = getAddress(args.receiptRegistry);
            break;
          }
        } catch {
          // Ignore unrelated logs.
        }
      }

      if (!treasuryAddress || !authorizerAddress || !receiptRegistryAddress) {
        throw new Error("Treasury deployment completed, but the new addresses could not be decoded.");
      }

      const nextTreasury: ManagedTreasury = {
        id: crypto.randomUUID(),
        name: treasuryName.trim() || "Untitled Treasury",
        ownerAddress: walletAddress,
        assetAddress: manifest.baseAssetAddress,
        treasuryAddress,
        authorizerAddress,
        receiptRegistryAddress,
        createdAt: new Date().toISOString(),
        creationTxHashes: {
          authorizer: bootstrapTx,
          treasury: bootstrapTx,
          receiptRegistry: bootstrapTx,
        },
        principalAmountWstETH: principalAmount,
        principalDepositTxHash: bootstrapTx,
        allowances: [],
      };

      setManagedTreasuries((current) => {
        const next = [nextTreasury, ...current];
        writeStoredTreasuries(next);
        return next;
      });
      setCreationStatus(`${nextTreasury.name} is live. Open its workspace to assign agent budgets.`);
    } catch (error) {
      const message = toErrorMessage(error);
      if (message.toLowerCase().includes("simulation")) {
        setCreationStatus("Treasury creation simulation failed. I cleared any stale factory state; try once more and the app will redeploy the operator factory if needed.");
      } else {
        setCreationStatus(message);
      }
    } finally {
      setCreationBusy(false);
      setCreationStep(null);
    }
  }, [factoryAddress, hasEnoughAssetBalance, manifest, principalAmount, treasuryName, walletAddress]);

  return (
    <main className="app-shell mx-auto min-h-screen max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
      <section className="flex items-start justify-between gap-4">
        <div>
          <SectionLabel>Manage My Treasuries</SectionLabel>
          <h1 className="mt-1 text-3xl tracking-tight sm:text-5xl">
            <span className="text-[#cd5334] underline decoration-[#cd5334] underline-offset-8">Agent</span>{" "}
            <span className="text-[#010400]">Allowance</span>{" "}
            <span className="text-[#cd5334] italic">Protocol</span>
          </h1>
          <p className={`mt-3 ${helperClassName()}`}>{managedTreasuries.length} treasuries in this workspace</p>
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

      <section className="mt-6 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <Card className="panel-surface">
          <CardHeader>
            <SectionLabel>My Treasuries</SectionLabel>
            <CardTitle>Operator workspace</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {managedTreasuries.length ? (
              managedTreasuries.map((treasury) => <TreasuryListItem key={treasury.id} treasury={treasury} />)
            ) : (
              <div className="metric-tile">
                <p className="text-base font-semibold text-[#010400]">No treasuries yet</p>
                <p className={`mt-2 ${helperClassName()}`}>Create the first treasury to start assigning allowances to agents.</p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="panel-surface">
          <CardHeader>
            <SectionLabel>Create New Treasury</SectionLabel>
            <CardTitle>Deploy and fund principal</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="space-y-2">
              <label className="text-sm font-medium text-[#010400]">Treasury name</label>
              <input
                className={inputClassName()}
                value={treasuryName}
                onChange={(event) => setTreasuryName(event.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-[#010400]">Principal deposit</label>
              <TokenInput value={principalAmount} onChange={setPrincipalAmount} />
              <div className="flex items-center justify-between gap-3">
                <p className={helperClassName()}>Wallet balance: {Number(walletAssetBalance).toFixed(6)} wstETH</p>
                {walletAddress ? (
                  <button
                    type="button"
                    onClick={() => setPrincipalAmount(Number(walletAssetBalance).toFixed(6))}
                    className={`rounded-full border border-primary/20 px-3 py-1 text-xs ${helperClassName()}`}
                  >
                    Use max
                  </button>
                ) : null}
              </div>
              {!hasEnoughAssetBalance ? (
                <p className="text-sm text-[#cd5334]">Connected wallet does not have enough wstETH for this deposit.</p>
              ) : null}
            </div>

            <div className="grid gap-3 md:grid-cols-3">
              <StatCard label="Lido APR" value={`${market.aprPercent.toFixed(1)}%`} detail="Live yield reference for the treasury asset." />
              <StatCard label="Agent budget / day" value={`${dailyYieldAsset.toFixed(6)} wstETH`} detail="Estimated daily allowance based on current principal." />
              <StatCard label="Agent budget / day" value={formatUsd(dailyYieldUsd)} detail="Estimated daily value in USD." />
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Button onClick={() => void createAndFundTreasury()} disabled={creationBusy || !walletAddress || !manifest || !hasEnoughAssetBalance}>
                {creationBusy ? (
                  <>
                    <ButtonSpinner />
                    {creationStep ?? "Working..."}
                  </>
                ) : (
                  "Create treasury"
                )}
              </Button>
              <p className={helperClassName()}>
                Treasury creation now targets a batched flow: one-time factory deploy if needed, one token approval, then one bootstrap transaction.
              </p>
            </div>

            <p className={helperClassName()}>{creationStatus}</p>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
