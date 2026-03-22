import { NextResponse } from 'next/server';

import { loadReceiptLookup } from '@/lib/dashboard-data';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const query = url.searchParams.get('hash') ?? '';

  if (!query.trim()) {
    return NextResponse.json(
      {
        found: false,
        query: '',
        source: 'api',
        label: 'Missing hash',
        hash: '',
        details: [],
        relatedHashes: [],
      },
      { status: 400 },
    );
  }

  const result = await loadReceiptLookup(query);
  return NextResponse.json(result, {
    headers: {
      'Cache-Control': 'no-store, max-age=0',
    },
  });
}
