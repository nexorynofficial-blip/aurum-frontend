import type { Metadata, Viewport } from 'next';
import { fraunces, inter, plexMono } from '@/lib/fonts';
import { AppShell } from '@/components/layout/AppShell';
import { SITE } from '@/lib/constants';
import '@/styles/globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://aurum.luxury'),
  title: {
    default: `${SITE.name} — ${SITE.tagline}`,
    template: `%s · ${SITE.name}`,
  },
  description: SITE.description,
  keywords: [
    'luxury jewellery',
    'fine jewelry',
    'gold rings',
    'atelier',
    'high jewellery',
    'timepieces',
  ],
  openGraph: {
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.description,
    type: 'website',
    siteName: SITE.name,
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE.name,
    description: SITE.description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: '#0B0B0D',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${inter.variable} ${plexMono.variable}`}
    >
      <body className="font-body antialiased">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
