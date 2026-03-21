"use client";

import * as React from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ReceiptLookup } from '@/components/receipt-lookup';
import { ProofWorkspace } from '@/components/proof-workspace';
import { Separator } from '@/components/ui/separator';
import { APP_NAME, APP_TAGLINE } from '@/lib/constants';
import { formatEtherLike, percentSpent, shortAddress, shortHash, yesNo } from '@/lib/format';
import type { DashboardSnapshot } from '@/lib/types';

interface DashboardProps {
  initialSnapshot: DashboardSnapshot;
}

function StatCard({
  label,
  value,
  detail,
  tone = 'default',
}: {
  label: string;
  value: string;
  detail: string;
  tone?: 'default' | 'success' | 'warning';
}): React.JSX.Element {
  return (
    <div className="rounded-[1.4rem] border border-white/10 bg-white/5 p-4">
      <p className="text-xs uppercase tracking-[0.18em] text-slate-400">{label}</p>
      <div className="mt-2 flex items-center justify-between gap-3">
        <p className="text-lg font-semibold text-slate-50">{value}</p>
        <Badge variant={tone === 'success' ? 'success' : tone === 'warning' ? 'warning' : 'secondary'}>
          {tone === 'success' ? 'Live' : tone === 'warning' ? 'Needs cutover' : 'Snapshot'}
        </Badge>
      </div>
      <p className="mt-2 text-sm text-slate-300">{detail}</p>
    </div>
  );
}

function ProgressBar({ value }: { value: number }): React.JSX.Element {
  return (
    <div className="h-2 overflow-hidden rounded-full bg-white/10">
      <div
        className="h-full rounded-full bg-gradient-to-r from-primary to-warning"
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </div>
  );
}

export function Dashboard({ initialSnapshot }: DashboardProps): React.JSX.Element {
  const [snapshot, setSnapshot] = React.useState(initialSnapshot);
  const [refreshing, startRefreshing] = React.useTransition();
  const [walletAccount, setWalletAccount] = React.useState<string | null>(null);
  const [walletBusy, setWalletBusy] = React.useState(false);
  const [walletMessage, setWalletMessage] = React.useState('Wallet not connected');

  const refresh = React.useCallback(() => {
    startRefreshing(() => {
      void (async () => {
        try {
          const response = await fetch('/api/snapshot', { cache: 'no-store' });
          if (!response.ok) {
            throw new Error(`Snapshot endpoint returned HTTP ${response.status}`);
          }

          const nextSnapshot = (await response.json()) as DashboardSnapshot;
          setSnapshot(nextSnapshot);
        } catch {
          // Keep the last good snapshot on screen.
        }
      })();
    });
  }, []);

  const connectWallet = React.useCallback(async () => {
    const provider = (window as Window & { ethereum?: { request: (args: { method: string; params?: unknown[] }) => Promise<unknown> } }).ethereum;
    if (!provider) {
      setWalletMessage('MetaMask not found');
      return;
    }

    setWalletBusy(true);

    try {
      const accounts = (await provider.request({ method: 'eth_requestAccounts' })) as string[];
      const nextAccount = accounts[0] ?? null;
      setWalletAccount(nextAccount);
      setWalletMessage(nextAccount ? `Connected as ${shortAddress(nextAccount)}` : 'No account returned');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Wallet connection failed';
      setWalletMessage(message);
    } finally {
      setWalletBusy(false);
    }
  }, []);

  const switchWalletChain = React.useCallback(async () => {
    const provider = (window as Window & { ethereum?: { request: (args: { method: string; params?: unknown[] }) => Promise<unknown> } }).ethereum;
    if (!provider) {
      setWalletMessage('MetaMask not found');
      return;
    }

    setWalletBusy(true);

    try {
      await provider.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: `0x${snapshot.network.chainId.toString(16)}` }],
      });
      setWalletMessage(`Wallet switched to ${snapshot.network.chainName}`);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Could not switch wallet chain';
      setWalletMessage(message);
    } finally {
      setWalletBusy(false);
    }
  }, [snapshot.network.chainId, snapshot.network.chainName]);

  const spentPercent = percentSpent(snapshot.budget.spentWstETH, snapshot.budget.allocationWstETH);
  const readinessTone = snapshot.readiness.overallReadyForSameNetworkDemoSubmission ? 'success' : 'warning';

  return (
    <main className="mx-auto min-h-screen max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <section className="grid gap-4 lg:grid-cols-[1.35fr_0.95fr]">
        <Card className="relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(46,212,183,0.14),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(245,190,86,0.12),transparent_26%)]" />
          <CardHeader className="relative">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="default">{APP_NAME}</Badge>
              <Badge variant={snapshot.network.finalChainSelected ? 'success' : 'warning'}>
                {snapshot.network.finalChainSelected ? 'Base mainnet selected' : 'Base Sepolia prototype'}
              </Badge>
              <Badge variant={snapshot.network.readyForSelectedNetworkUserOps ? 'success' : 'warning'}>
                Bundler {yesNo(snapshot.network.bundlerReachable).toLowerCase()}
              </Badge>
            </div>
            <CardTitle className="mt-3 text-3xl tracking-tight sm:text-5xl">
              Treasury, receipts, and MetaMask proof in one judge dashboard.
            </CardTitle>
            <CardDescription className="max-w-2xl text-base text-slate-300">
              {APP_TAGLINE} The app reads the latest local artifacts, exposes the proof path through a real Next.js backend,
              and keeps the story honest about what is live versus what still needs the final Base mainnet cutover.
            </CardDescription>
            <div className="mt-5 flex flex-wrap gap-2">
              <Button onClick={refresh} disabled={refreshing}>
                {refreshing ? 'Refreshing…' : 'Refresh backend snapshot'}
              </Button>
              <Button variant="outline" onClick={() => void connectWallet()} disabled={walletBusy}>
                {walletBusy ? 'Waiting…' : walletAccount ? 'Reconnect wallet' : 'Connect wallet'}
              </Button>
              <Button variant="outline" onClick={() => void switchWalletChain()} disabled={walletBusy}>
                Switch wallet chain
              </Button>
              <Button variant="outline" onClick={() => navigator.clipboard.writeText(snapshot.receipt.lookupHash)}>
                Copy receipt hash
              </Button>
            </div>
          </CardHeader>
          <CardContent className="relative grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard
              label="Treasury"
              value={shortAddress(snapshot.treasury.treasuryAddress)}
              detail={`${snapshot.network.chainName} treasury wired to the current demo proof.`}
              tone="success"
            />
            <StatCard
              label="Budget"
              value={`${formatEtherLike(snapshot.budget.remainingWstETH)} wstETH left`}
              detail={`OPS_BUDGET remaining after ${formatEtherLike(snapshot.budget.spentWstETH)} wstETH spent.`}
            />
            <StatCard
              label="Receipt"
              value={shortHash(snapshot.receipt.lookupHash)}
              detail={`Executor: ${shortAddress(snapshot.receipt.executor)}`}
              tone="success"
            />
            <StatCard
              label="Readiness"
              value={snapshot.readiness.overallReadyForSameNetworkDemoSubmission ? 'Ready' : 'Not yet'}
              detail={snapshot.readiness.currentPosture}
              tone={snapshot.readiness.overallReadyForSameNetworkDemoSubmission ? 'success' : 'warning'}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Current posture</CardTitle>
            <CardDescription>
              Live on Base Sepolia today, honest about the Base mainnet cutover still needed for final sponsor acceptance.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Chain</p>
                <p className="mt-2 font-medium text-slate-100">{snapshot.network.chainName}</p>
                <p className="mt-1 text-sm text-slate-300">Target: {snapshot.network.finalChainName}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Bundler</p>
                <p className="mt-2 font-medium text-slate-100">{yesNo(snapshot.network.bundlerReachable)}</p>
                <p className="mt-1 text-sm text-slate-300">Ready for user ops: {yesNo(snapshot.network.readyForSelectedNetworkUserOps)}</p>
              </div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Wallet bridge</p>
              <p className="mt-2 font-medium text-slate-100">{walletAccount ? shortAddress(walletAccount) : 'Not connected'}</p>
              <p className="mt-1 text-sm text-slate-300">{walletMessage}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-medium text-slate-100">Budget progress</p>
                <span className="font-mono text-sm text-slate-300">{spentPercent.toFixed(1)}%</span>
              </div>
              <div className="mt-3">
                <ProgressBar value={spentPercent} />
              </div>
              <div className="mt-3 grid gap-2 text-sm text-slate-300">
                <p>Allocation: {formatEtherLike(snapshot.budget.allocationWstETH)} wstETH</p>
                <p>Spent: {formatEtherLike(snapshot.budget.spentWstETH)} wstETH</p>
                <p>Remaining: {formatEtherLike(snapshot.budget.remainingWstETH)} wstETH</p>
              </div>
            </div>
            <Separator />
            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Executor</p>
                <p className="mt-1 font-mono text-sm text-slate-100">{shortAddress(snapshot.treasury.treasuryExecutorAddress)}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Receipt registry</p>
                <p className="mt-1 font-mono text-sm text-slate-100">{shortAddress(snapshot.treasury.receiptRegistryAddress)}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Authorizer</p>
                <p className="mt-1 font-mono text-sm text-slate-100">{shortAddress(snapshot.treasury.authorizerAddress)}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Asset</p>
                <p className="mt-1 font-mono text-sm text-slate-100">{shortAddress(snapshot.treasury.assetAddress)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="mt-6 grid gap-6 xl:grid-cols-[0.96fr_1.04fr]">
        <ReceiptLookup snapshot={snapshot} />
        <ProofWorkspace snapshot={snapshot} />
      </section>

      <section className="mt-6 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <Card>
          <CardHeader>
            <CardTitle>Treasury and budget state</CardTitle>
            <CardDescription>Readable state for judges who want the actual onchain story, not just a headline.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3 md:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Treasury status</p>
              <div className="mt-3 space-y-2 text-sm text-slate-200">
                <p>Principal baseline: {formatEtherLike(snapshot.treasury.principalBaselineStETH)} stETH</p>
                <p>Total allocated: {formatEtherLike(snapshot.treasury.totalBudgetAllocatedWstETH)} wstETH</p>
                <p>Available yield: {formatEtherLike(snapshot.treasury.availableYieldWstETH)} wstETH</p>
                <p>Recipient balance: {formatEtherLike(snapshot.treasury.recipientBalanceWstETH)} wstETH</p>
              </div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Budget state</p>
              <div className="mt-3 space-y-2 text-sm text-slate-200">
                <p>Label: {snapshot.budget.label}</p>
                <p>Budget ID: {snapshot.budget.budgetId}</p>
                <p>Manager: {snapshot.budget.manager}</p>
                <p>Active: {yesNo(snapshot.budget.active)}</p>
              </div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 md:col-span-2">
              <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Receipt-backed spend intent</p>
              <div className="mt-3 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                <div>
                  <p className="text-xs text-slate-400">Task ID</p>
                  <p className="font-mono text-sm text-slate-100">{snapshot.budget.taskId}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400">Receipt hash</p>
                  <p className="font-mono text-sm text-slate-100">{snapshot.budget.receiptHash}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400">Evidence hash</p>
                  <p className="font-mono text-sm text-slate-100">{snapshot.budget.evidenceHash}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400">Result hash</p>
                  <p className="font-mono text-sm text-slate-100">{snapshot.budget.resultHash}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400">Metadata URI</p>
                  <p className="font-mono text-sm text-slate-100">{snapshot.budget.metadataURI}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400">Selector</p>
                  <p className="font-mono text-sm text-slate-100">{snapshot.budget.selector}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Readiness summary</CardTitle>
            <CardDescription>
              Honest track posture, blockers, and the remaining actions needed to make the final same-network claim.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs uppercase tracking-[0.18em] text-slate-400">MetaMask</p>
                <Badge variant={snapshot.readiness.metaMaskFinalSameNetworkReady ? 'success' : 'warning'} className="mt-3">
                  {yesNo(snapshot.readiness.metaMaskFinalSameNetworkReady)}
                </Badge>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Frontend demo</p>
                <Badge variant={snapshot.readiness.frontendFinalDemoConfigReady ? 'success' : 'warning'} className="mt-3">
                  {yesNo(snapshot.readiness.frontendFinalDemoConfigReady)}
                </Badge>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Cutover env</p>
                <Badge variant={snapshot.readiness.cutoverEnvReady ? 'success' : 'warning'} className="mt-3">
                  {yesNo(snapshot.readiness.cutoverEnvReady)}
                </Badge>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Submission ready</p>
                <Badge variant={readinessTone} className="mt-3">
                  {yesNo(snapshot.readiness.overallReadyForSameNetworkDemoSubmission)}
                </Badge>
              </div>
            </div>
            <Separator />
            <div className="space-y-2">
              {snapshot.readiness.blockers.slice(0, 4).map((blocker) => (
                <div key={blocker} className="rounded-2xl border border-white/10 bg-black/20 px-3 py-2 text-sm text-slate-200">
                  {blocker}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      <footer className="mt-6 pb-6 text-sm text-slate-400">
        Snapshot generated at <span className="font-mono text-slate-200">{snapshot.generatedAt}</span>. Backend sources are local file reads plus API routes.
      </footer>
    </main>
  );
}
