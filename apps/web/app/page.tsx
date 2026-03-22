import type { Metadata } from 'next';
import type { ReactElement } from 'react';

import { Dashboard } from '@/components/dashboard';
import { APP_NAME } from '@/lib/constants';

export const metadata: Metadata = {
  title: APP_NAME,
};

export const dynamic = 'force-dynamic';

export default async function HomePage(): Promise<ReactElement> {
  return <Dashboard />;
}
