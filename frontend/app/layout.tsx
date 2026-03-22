import type { Metadata } from 'next';
import type { ReactElement, ReactNode } from 'react';

import { APP_NAME, APP_TAGLINE } from '@/lib/constants';

import './globals.css';

export const metadata: Metadata = {
  title: APP_NAME,
  description: 'Judge dashboard for treasury status, receipt proof, MetaMask artifacts, and readiness.',
  metadataBase: new URL('https://localhost'),
  applicationName: APP_NAME,
  openGraph: {
    title: APP_NAME,
    description: APP_TAGLINE,
    images: ['/opengraph-image.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: APP_NAME,
    description: APP_TAGLINE,
    images: ['/twitter-image.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>): ReactElement {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
