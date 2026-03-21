import { NextResponse } from 'next/server';

import { loadDashboardSnapshot } from '@/lib/dashboard-data';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(): Promise<Response> {
  const snapshot = await loadDashboardSnapshot();
  return NextResponse.json(snapshot, {
    headers: {
      'Cache-Control': 'no-store, max-age=0',
    },
  });
}
