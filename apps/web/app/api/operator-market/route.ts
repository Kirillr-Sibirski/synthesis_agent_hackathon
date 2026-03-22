import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

async function fetchLidoAprPercent(): Promise<number> {
  try {
    const response = await fetch('https://lido.fi/', {
      headers: {
        'User-Agent': 'Agent-Allowance-Protocol/1.0',
      },
      cache: 'no-store',
    });

    const html = await response.text();
    const match = html.match(/(\d+(?:\.\d+)?)%\s*APR/i);
    if (!match) return 2.4;
    return Number(match[1]);
  } catch {
    return 2.4;
  }
}

async function fetchEthUsd(): Promise<number> {
  try {
    const response = await fetch('https://api.coinbase.com/v2/prices/ETH-USD/spot', {
      headers: {
        'User-Agent': 'Agent-Allowance-Protocol/1.0',
      },
      cache: 'no-store',
    });

    const json = (await response.json()) as { data?: { amount?: string } };
    return Number(json.data?.amount ?? '0');
  } catch {
    return 0;
  }
}

export async function GET(): Promise<Response> {
  const [aprPercent, ethUsd] = await Promise.all([fetchLidoAprPercent(), fetchEthUsd()]);

  return NextResponse.json(
    {
      aprPercent,
      ethUsd,
      sourceNote: 'APR from Lido homepage, ETH/USD from Coinbase spot.',
    },
    {
      headers: {
        'Cache-Control': 'no-store, max-age=0',
      },
    },
  );
}
