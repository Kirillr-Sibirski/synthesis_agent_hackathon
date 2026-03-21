"use client";

import * as React from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import type { DashboardSnapshot, ReceiptLookupResult } from '@/lib/types';
import { shortHash } from '@/lib/format';

interface ReceiptLookupProps {
  snapshot: DashboardSnapshot;
}

function LookupField({ label, value }: { label: string; value: string }): React.JSX.Element {
  return (
    <div className="metric-tile space-y-1">
      <p className="section-kicker">{label}</p>
      <p className="break-all font-mono text-sm text-slate-100">{value}</p>
    </div>
  );
}

export function ReceiptLookup({ snapshot }: ReceiptLookupProps): React.JSX.Element {
  const [query, setQuery] = React.useState(snapshot.receipt.lookupHash);
  const [result, setResult] = React.useState<ReceiptLookupResult | null>(null);
  const [status, setStatus] = React.useState<'idle' | 'loading' | 'error'>('idle');

  const runLookup = React.useCallback(
    async (nextQuery: string) => {
      const cleaned = nextQuery.trim();
      if (!cleaned) {
        setResult(null);
        setStatus('idle');
        return;
      }

      setStatus('loading');

      try {
        const response = await fetch(`/api/receipt?hash=${encodeURIComponent(cleaned)}`, { cache: 'no-store' });
        if (!response.ok) {
          throw new Error(`Receipt lookup returned HTTP ${response.status}`);
        }

        const data = (await response.json()) as ReceiptLookupResult;
        setResult(data);
        setStatus('idle');
      } catch {
        setStatus('error');
      }
    },
    [],
  );

  React.useEffect(() => {
    void runLookup(snapshot.receipt.lookupHash);
  }, [runLookup, snapshot.receipt.lookupHash]);

  return (
    <Card className="panel-surface h-full">
      <CardHeader>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="section-kicker">Receipt explorer</p>
            <CardTitle>Receipt lookup</CardTitle>
            <CardDescription>Search the receipt registry proof path by hash, task, or budget reference.</CardDescription>
          </div>
          <Badge variant={result?.found ? 'success' : 'warning'}>
            {result?.found ? 'Receipt found' : 'Awaiting lookup'}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <form
          className="flex flex-col gap-3 sm:flex-row"
          onSubmit={(event) => {
            event.preventDefault();
            void runLookup(query);
          }}
        >
          <Input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Paste a receipt hash, task ID, budget ID, or proof hash"
            className="sm:flex-1"
          />
          <Button type="submit" size="lg" className="sm:w-36" disabled={status === 'loading'}>
            {status === 'loading' ? 'Looking up…' : 'Lookup'}
          </Button>
        </form>

        <div className="flex flex-wrap gap-2">
          {snapshot.receipt.relatedHashes.slice(0, 4).map((entry) => (
            <button
              key={entry.hash}
              type="button"
              onClick={() => {
                setQuery(entry.hash);
                void runLookup(entry.hash);
              }}
              className="soft-pill px-3 py-1.5 text-xs"
            >
              {entry.label}: {shortHash(entry.hash)}
            </button>
          ))}
        </div>

        <Separator />

        {result ? (
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant={result.found ? 'success' : 'danger'}>{result.label}</Badge>
              <Badge variant="outline">{result.source}</Badge>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <LookupField label="Hash" value={result.hash} />
              <LookupField label="Executor" value={result.executor ?? '—'} />
              <LookupField label="Recipient" value={result.recipient ?? '—'} />
              <LookupField label="Amount" value={result.amountWstETH ? `${result.amountWstETH} wstETH` : '—'} />
              <LookupField label="Budget ID" value={result.budgetId ?? '—'} />
              <LookupField label="Task ID" value={result.taskId ?? '—'} />
              <LookupField label="Metadata URI" value={result.metadataURI ?? '—'} />
              <LookupField label="Tx hash" value={result.txHash ?? '—'} />
            </div>

            <div className="data-stack">
              <p className="mb-3 section-kicker">Details</p>
              <div className="grid gap-3 md:grid-cols-2">
                {result.details.map((entry) => (
                  <LookupField key={entry.label} label={entry.label} value={entry.value} />
                ))}
              </div>
            </div>
          </div>
        ) : (
          <p className="text-sm text-slate-300">Use a known hash to pull the onchain receipt proof from the backend.</p>
        )}
      </CardContent>
    </Card>
  );
}
