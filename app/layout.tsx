import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import './hero-enhancements.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const SITE_URL = 'https://hyperfleets.ai';
const SITE_NAME = 'Hyperfleets';
const SITE_DESCRIPTION =
  'Hyperfleets builds the orchestration layer for autonomous fleets: software that decides what a fleet of autonomous machines should do next, above the autonomy stack.';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'Hyperfleets — We make autonomous machines work together.',
  description: 'Software that makes machines smarter. A new chapter is taking shape at Hyperfleets. Coming soon.',
  applicationName: SITE_NAME,
  keywords: ['Hyperfleets', 'autonomous fleets', 'fleet orchestration', 'autonomous vehicles', 'fleet intelligence'],
  alternates: { canonical: '/' },
  robots: { index: true, follow: true },
  openGraph: {
    type: 'website',
    url: SITE_URL,
    siteName: SITE_NAME,
    title: 'Hyperfleets — We make autonomous machines work together.',
    description: SITE_DESCRIPTION,
    images: [{ url: '/hero-road-cars-v3.png', width: 1600, height: 900, alt: 'Hyperfleets' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hyperfleets — We make autonomous machines work together.',
    description: SITE_DESCRIPTION,
    images: ['/hero-road-cars-v3.png'],
  },
};

// Structured data so search engines and AI agents can identify the organization behind the domain.
const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: SITE_NAME,
      alternateName: 'hyperfleets.ai',
      url: SITE_URL,
      logo: `${SITE_URL}/hyperfleets-logo.png`,
      email: 'founders@hyperfleets.ai',
      description: SITE_DESCRIPTION,
      slogan: 'We make autonomous machines work together.',
      sameAs: ['https://github.com/Hyperfleets'],
      contactPoint: {
        '@type': 'ContactPoint',
        email: 'founders@hyperfleets.ai',
        contactType: 'founders',
      },
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      description: SITE_DESCRIPTION,
      publisher: { '@id': `${SITE_URL}/#organization` },
      inLanguage: 'en',
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        {children}
      </body>
    </html>
  );
}
