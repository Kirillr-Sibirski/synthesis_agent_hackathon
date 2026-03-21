"use client";

import * as React from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { formatEtherLike, shortAddress, shortHash, yesNo } from '@/lib/format';
import type { DashboardSnapshot } from '@/lib/types';

interface ProofWorkspaceProps {
  snapshot: DashboardSnapshot;
}

type TabKey = 'preflight' | 'delegation' | 'live' | 'readiness';

const tabs: Array<{ key: TabKey; label: string }> = [
  { key: 'preflight', label: 'Preflight' },
  { key: 'delegation', label: 'Signed delegation' },
  { key: 'live', label: 'Live proof' },
  { key: 'readiness', label: 'Readiness' },
];

function Field({ label, value }: { label: string; value: string }): React.JSX.Element {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
      <p className="text-[0.65rem] uppercase tracking-[0.18em] text-slate-400">{label}</p>
      <p className="mt-1 break-words font-mono text-sm text-slate-100">{value}</p>
    </div>
  );
}

function JsonBlock({ value }: { value: unknown }): React.JSX.Element {
  return (
    <pre className="max-h-[24rem] overflow-auto rounded-2xl border border-white/10 bg-black/30 p-4 font-mono text-[0.78rem] leading-6 text-slate-200">
      {JSON.stringify(value, null, 2)}
    </pre>
  );
}

export function ProofWorkspace({ snapshot }: ProofWorkspaceProps): React.JSX.Element {
  const [tab, setTab] = React.useState<TabKey>('preflight');
  const badgeVariant =
    snapshot.readiness.overallReadyForSameNetworkDemoSubmission
      ? 'success'
      : snapshot.receipt.found
        ? 'secondary'
        : 'warning';
  const preflight = snapshot.proof.preflight as Record<string, any>;
  const delegation = snapshot.proof.signedDelegation as Record<string, any>;
  const network = preflight.network as Record<string, any>;
  const finalTarget = network?.finalSameNetworkTarget as Record<string, any>;
  const env = preflight.env as Record<string, any>;
  const accounts = preflight.accounts as Record<string, any>;
  const onchain = preflight.onchain as Record<string, any>;
  const bundler = preflight.bundler as Record<string, any>;
  const spendIntent = preflight.spendIntent as Record<string, any>;
  const readiness = preflight.readiness as Record<string, any>;
  const delegationNetwork = delegation.network as Record<string, any>;
  const delegationAccounts = delegation.accounts as Record<string, any>;
  const treasuryIntent = delegation.treasurySpendIntent as Record<string, any>;
  const delegationMessage = delegation.delegation as Record<string, any>;

  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <CardTitle>MetaMask artifact and proof view</CardTitle>
            <CardDescription>
              The dashboard keeps the signed delegation, live proof, and readiness story together.
            </CardDescription>
            <p className="mt-2 text-sm text-slate-200">{snapshot.proof.liveProofHighlight}</p>
          </div>
          <Badge variant={badgeVariant}>
            {snapshot.proof.qualificationStatus}
          </Badge>
        </div>
        <div className="flex flex-wrap gap-2 pt-2">
          {tabs.map((item) => (
            <Button
              key={item.key}
              variant={tab === item.key ? 'default' : 'outline'}
              size="sm"
              onClick={() => setTab(item.key)}
            >
              {item.label}
            </Button>
          ))}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {tab === 'preflight' ? (
          <div className="space-y-4">
            <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
              <Field label="Selected chain" value={`${snapshot.network.chainName} (${snapshot.network.chainId})`} />
              <Field label="Final target" value={`${snapshot.network.finalChainName} (${snapshot.network.finalChainId})`} />
              <Field label="Bundler reachable" value={yesNo(snapshot.network.bundlerReachable)} />
              <Field label="Smart account deployed" value={yesNo(Boolean(onchain.smartAccountDeployed))} />
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              <Field label="Treasury" value={shortAddress(String(onchain.treasuryAddress ?? snapshot.treasury.treasuryAddress))} />
              <Field label="Smart account / executor" value={shortAddress(String(accounts.delegatorSmartAccount ?? snapshot.treasury.smartAccountAddress))} />
              <Field label="Bundler chain matches" value={yesNo(Boolean(bundler.chainMatchesSelectedNetwork))} />
              <Field label="User ops ready" value={yesNo(Boolean(bundler.readyForSelectedNetworkUserOps))} />
              <Field label="Budget ID" value={shortHash(String(spendIntent.budgetId ?? snapshot.budget.budgetId))} />
              <Field label="Receipt hash" value={shortHash(String(spendIntent.receiptHash ?? snapshot.receipt.lookupHash))} />
              <Field label="Amount" value={`${formatEtherLike(String(spendIntent.amountWstETH ?? snapshot.receipt.amountWstETH))} wstETH`} />
              <Field label="Call data bytes" value={String(spendIntent.callDataBytes ?? '—')} />
            </div>
            <JsonBlock value={preflight} />
          </div>
        ) : null}

        {tab === 'delegation' ? (
          <div className="space-y-4">
            <div className="grid gap-3 md:grid-cols-2">
              <Field label="Owner" value={shortAddress(String(delegationAccounts.owner ?? snapshot.treasury.smartAccountAddress))} />
              <Field label="Delegator smart account" value={shortAddress(String(delegationAccounts.delegatorSmartAccount ?? snapshot.treasury.smartAccountAddress))} />
              <Field label="Treasury executor" value={shortAddress(String(delegationAccounts.treasuryExecutor ?? snapshot.treasury.treasuryExecutorAddress))} />
              <Field label="Delegation manager" value={shortAddress(String(delegationNetwork.delegationManager ?? '—'))} />
              <Field label="Delegation hash" value={shortHash(String(delegation.delegationHash ?? snapshot.proof.signedDelegation.delegationHash ?? '—'))} />
              <Field label="Signature" value={shortHash(String(delegationMessage.signature ?? delegation.signature ?? '—'), 14, 10)} />
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              <Field label="Treasury" value={shortAddress(String(treasuryIntent.treasury ?? snapshot.treasury.treasuryAddress))} />
              <Field label="Budget ID" value={shortHash(String(treasuryIntent.budgetId ?? snapshot.budget.budgetId))} />
              <Field label="Task ID" value={shortHash(String(treasuryIntent.taskId ?? snapshot.budget.taskId))} />
              <Field label="Receipt hash" value={shortHash(String(treasuryIntent.receiptHash ?? snapshot.receipt.lookupHash))} />
              <Field label="Evidence hash" value={shortHash(String(treasuryIntent.evidenceHash ?? snapshot.receipt.evidenceHash))} />
              <Field label="Result hash" value={shortHash(String(treasuryIntent.resultHash ?? snapshot.receipt.resultHash))} />
            </div>
            <JsonBlock value={delegation} />
          </div>
        ) : null}

        {tab === 'live' ? (
          <div className="space-y-4">
            <div className="grid gap-3 md:grid-cols-2">
              {snapshot.proof.liveProofTxs.map((entry) => (
                <div key={entry.hash} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-400">{entry.label}</p>
                  <p className="mt-1 text-sm font-medium text-slate-100">{entry.description}</p>
                  <p className="mt-3 break-all font-mono text-sm text-primary">{entry.hash}</p>
                </div>
              ))}
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Live proof note</p>
              <Separator className="my-3" />
              <pre className="max-h-[24rem] overflow-auto whitespace-pre-wrap font-mono text-sm leading-6 text-slate-200">
                {snapshot.proof.liveProofNote}
              </pre>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="grid gap-3 md:grid-cols-2">
                <Field label="Receipt executor" value={shortAddress(snapshot.receipt.executor)} />
                <Field label="Receipt recipient" value={shortAddress(snapshot.receipt.recipient)} />
                <Field label="Amount" value={`${formatEtherLike(snapshot.receipt.amountWstETH)} wstETH`} />
                <Field label="Transaction hash" value={snapshot.receipt.txHash ?? '—'} />
              </div>
            </div>
          </div>
        ) : null}

        {tab === 'readiness' ? (
          <div className="space-y-4">
            <div className="grid gap-3 md:grid-cols-4">
              <Field label="MetaMask same-network ready" value={yesNo(snapshot.readiness.metaMaskFinalSameNetworkReady)} />
              <Field label="Frontend demo config ready" value={yesNo(snapshot.readiness.frontendFinalDemoConfigReady)} />
              <Field label="Cutover env ready" value={yesNo(snapshot.readiness.cutoverEnvReady)} />
              <Field label="Overall ready" value={yesNo(snapshot.readiness.overallReadyForSameNetworkDemoSubmission)} />
            </div>

            <div className="grid gap-3">
              {snapshot.readiness.honestTracks.map((track) => (
                <div key={track.key} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="font-medium text-slate-100">{track.label}</p>
                      <p className="text-sm text-slate-300">
                        {track.blocker ?? 'No blocker reported for this track.'}
                      </p>
                    </div>
                    <Badge variant={track.honest ? 'success' : 'warning'}>{track.honest ? 'Honest now' : 'Still incomplete'}</Badge>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Blockers</p>
                <Separator className="my-3" />
                <ul className="space-y-2 text-sm text-slate-200">
                  {snapshot.readiness.blockers.map((blocker) => (
                    <li key={blocker} className="rounded-xl border border-white/10 bg-white/5 px-3 py-2">
                      {blocker}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Next actions</p>
                <Separator className="my-3" />
                <ul className="space-y-2 text-sm text-slate-200">
                  {snapshot.readiness.nextActions.map((action) => (
                    <li key={action} className="rounded-xl border border-white/10 bg-white/5 px-3 py-2">
                      {action}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}
