"use client";

import * as React from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { APP_NAME } from '@/lib/constants';
import { formatEtherLike, formatTimestamp, percentSpent, shortAddress, shortHash, yesNo } from '@/lib/format';
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
    <div className="metric-tile">
      <p className="section-kicker">{label}</p>
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

function ProofLine({
  label,
  value,
  copyValue,
}: {
  label: string;
  value: string;
  copyValue?: string | null;
}): React.JSX.Element {
  return (
    <div className="metric-tile">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="section-kicker">{label}</p>
          <p className="mt-2 break-all font-mono text-sm text-slate-100">{value}</p>
        </div>
        {copyValue ? (
          <Button variant="ghost" size="sm" onClick={() => void navigator.clipboard.writeText(copyValue)}>
            Copy
          </Button>
        ) : null}
      </div>
    </div>
  );
}

function ExplorerLink({
  label,
  hash,
  kind = 'tx',
}: {
  label: string;
  hash: string | null | undefined;
  kind?: 'tx' | 'address';
}): React.JSX.Element | null {
  if (!hash) return null;
  const href = kind === 'address' ? `https://basescan.org/address/${hash}` : `https://basescan.org/tx/${hash}`;
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="soft-pill inline-flex px-3 py-2 text-sm"
    >
      {label}
    </a>
  );
}

function ProgressBar({ value }: { value: number }): React.JSX.Element {
  return (
    <div className="h-2 overflow-hidden rounded-full bg-white/10">
      <div
        className="h-full rounded-full bg-gradient-to-r from-primary via-[#e08268] to-[#fffbfc] shadow-[0_0_24px_rgba(205,83,52,0.35)]"
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </div>
  );
}

export function Dashboard({ initialSnapshot }: DashboardProps): React.JSX.Element {
  const [snapshot, setSnapshot] = React.useState(initialSnapshot);
  const [refreshing, startRefreshing] = React.useTransition();

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

  const spentPercent = percentSpent(snapshot.budget.spentWstETH, snapshot.budget.allocationWstETH);

  return (
    <main className="app-shell mx-auto min-h-screen max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
      <section className="grid gap-4">
        <Card className="panel-surface panel-grid relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(205,83,52,0.12),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(205,83,52,0.06),transparent_24%)]" />
          <CardHeader className="relative">
            <p className="section-kicker">Base Mainnet Proof</p>
            <CardTitle className="mt-1 text-3xl tracking-tight text-[#010400] sm:text-5xl">
              {APP_NAME}
            </CardTitle>
            <CardDescription className="max-w-3xl text-base">
              A principal-protected treasury where agents spend from bounded allowances and every live spend is provable on Base mainnet.
            </CardDescription>
            <div className="mt-5 flex flex-wrap gap-2">
              <Button onClick={refresh} disabled={refreshing}>
                {refreshing ? 'Refreshing…' : 'Refresh live snapshot'}
              </Button>
              <Button variant="outline" onClick={() => navigator.clipboard.writeText(snapshot.receipt.lookupHash)}>
                Copy receipt hash
              </Button>
              <Button
                variant="outline"
                onClick={() => navigator.clipboard.writeText(snapshot.treasury.spendTxHash ?? '')}
                disabled={!snapshot.treasury.spendTxHash}
              >
                Copy spend tx
              </Button>
              <ExplorerLink label="View spend tx on BaseScan" hash={snapshot.treasury.spendTxHash} />
              <ExplorerLink label="View treasury on BaseScan" hash={snapshot.treasury.treasuryAddress} kind="address" />
            </div>
          </CardHeader>
          <CardContent className="relative grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard
              label="Chain"
              value={snapshot.network.chainName}
              detail="The live proof and dashboard are aligned to Base mainnet."
              tone="success"
            />
            <StatCard
              label="Budget remaining"
              value={`${formatEtherLike(snapshot.budget.remainingWstETH)} wstETH left`}
              detail={`OPS_BUDGET still has spendable headroom after ${formatEtherLike(snapshot.budget.spentWstETH)} wstETH spent.`}
            />
            <StatCard
              label="Executor"
              value={shortAddress(snapshot.receipt.executor)}
              detail="The receipt points to the smart account as executor, not just the submitting EOA."
              tone="success"
            />
            <StatCard
              label="Receipt"
              value={shortHash(snapshot.receipt.lookupHash)}
              detail={`Recipient ${shortAddress(snapshot.receipt.recipient)} received ${formatEtherLike(snapshot.receipt.amountWstETH)} wstETH.`}
              tone="success"
            />
          </CardContent>
        </Card>
      </section>

      <section className="mt-6 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <Card className="panel-surface">
          <CardHeader>
            <p className="section-kicker">Live proof</p>
            <CardTitle>Public explorer links</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-2">
              <ExplorerLink label="Spend tx" hash={snapshot.treasury.spendTxHash} />
              <ExplorerLink label="Treasury deployment tx" hash={snapshot.treasury.deploymentTxHash} />
              <ExplorerLink label="Treasury contract" hash={snapshot.treasury.treasuryAddress} kind="address" />
              <ExplorerLink label="Receipt registry" hash={snapshot.treasury.receiptRegistryAddress} kind="address" />
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              <ProofLine label="Treasury" value={snapshot.treasury.treasuryAddress} copyValue={snapshot.treasury.treasuryAddress} />
              <ProofLine label="Smart-account executor" value={snapshot.receipt.executor} copyValue={snapshot.receipt.executor} />
              <ProofLine label="Spend transaction" value={snapshot.treasury.spendTxHash ?? '—'} copyValue={snapshot.treasury.spendTxHash} />
              <ProofLine label="Receipt hash" value={snapshot.receipt.lookupHash} copyValue={snapshot.receipt.lookupHash} />
              <ProofLine label="Budget ID" value={snapshot.budget.budgetId} copyValue={snapshot.budget.budgetId} />
              <ProofLine label="Task ID" value={snapshot.budget.taskId} copyValue={snapshot.budget.taskId} />
            </div>
          </CardContent>
        </Card>

        <Card className="panel-surface">
          <CardHeader>
            <p className="section-kicker">Why it matters</p>
            <CardTitle>Track-facing summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="metric-tile">
                <p className="font-medium text-[#010400]">Delegations</p>
                <p className="mt-2 text-sm text-[rgb(71,56,51,0.78)]">The smart account is the treasury-side executor in the live receipt.</p>
              </div>
              <div className="metric-tile">
                <p className="font-medium text-[#010400]">stETH / wstETH treasury</p>
                <p className="mt-2 text-sm text-[rgb(71,56,51,0.78)]">The live path is wired to Base mainnet <code>wstETH</code>, with bounded spendable budget.</p>
              </div>
              <div className="metric-tile">
                <p className="font-medium text-[#010400]">Receipts</p>
                <p className="mt-2 text-sm text-[rgb(71,56,51,0.78)]">Every spend links to task, budget, evidence, result, and metadata onchain.</p>
              </div>
              <div className="metric-tile">
                <p className="font-medium text-[#010400]">Budget model</p>
                <p className="mt-2 text-sm text-[rgb(71,56,51,0.78)]">Managers can allocate narrower sub-budgets instead of handing agents the whole treasury.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="mt-6 grid gap-6 lg:grid-cols-[1fr_1fr]">
        <Card className="panel-surface">
          <CardHeader>
            <p className="section-kicker">Onchain snapshot</p>
            <CardTitle>Numbers to point at</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="data-stack">
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
                <p>Available yield: {formatEtherLike(snapshot.treasury.availableYieldWstETH)} wstETH</p>
              </div>
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              <ProofLine label="Asset" value={snapshot.treasury.assetAddress} />
              <ProofLine label="Receipt registry" value={snapshot.treasury.receiptRegistryAddress} />
              <ProofLine label="Authorizer" value={snapshot.treasury.authorizerAddress} />
              <ProofLine label="Budget manager" value={snapshot.budget.manager} />
            </div>
          </CardContent>
        </Card>

        <Card className="panel-surface">
          <CardHeader>
            <p className="section-kicker">Receipt summary</p>
            <CardTitle>The key receipt facts</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-3 md:grid-cols-2">
            <StatCard label="Recipient" value={shortAddress(snapshot.receipt.recipient)} detail="Approved payout recipient in the live spend." />
            <StatCard label="Amount" value={`${formatEtherLike(snapshot.receipt.amountWstETH)} wstETH`} detail="Amount written into the recorded receipt." />
            <StatCard label="Timestamp" value={formatTimestamp(snapshot.receipt.timestamp)} detail="When the registry recorded the receipt." />
            <StatCard label="Readiness" value={yesNo(snapshot.readiness.overallReadyForSameNetworkDemoSubmission)} detail={snapshot.readiness.currentPosture} tone="success" />
          </CardContent>
        </Card>
      </section>

      <footer className="mt-6 flex flex-col gap-3 pb-6 text-sm text-slate-400 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-medium text-[#010400]">{APP_NAME}</p>
        </div>
        <div>
          Snapshot generated at <span className="font-mono text-[#010400]">{snapshot.generatedAt}</span>.
        </div>
      </footer>
    </main>
  );
}
