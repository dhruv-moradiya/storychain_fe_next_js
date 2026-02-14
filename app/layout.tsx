import type { Metadata } from 'next';
import {
  Inter,
  Lora,
  Literata,
  Playfair_Display,
  IBM_Plex_Mono,
  Libre_Baskerville,
  Yellowtail,
} from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';
import { QueryProvider } from '@/components/providers/query-provider';
import { NavigationProgress } from '@/components/common/loader/navigation-progress';
import ToastProvider from '@/components/shared/toast/toast-provider';
import './globals.css';

const inter = Inter({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  adjustFontFallback: true,
});

const lora = Lora({
  variable: '--font-lora',
  subsets: ['latin'],
  display: 'swap',
  preload: false,
  adjustFontFallback: true,
});

const literata = Literata({
  variable: '--font-literata',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  preload: false,
  adjustFontFallback: true,
});

const playfair = Playfair_Display({
  variable: '--font-playfair',
  subsets: ['latin'],
  display: 'swap',
  preload: false,
  adjustFontFallback: true,
});

const libreBaskerville = Libre_Baskerville({
  variable: '--font-libre-baskerville',
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
  preload: true,
  adjustFontFallback: true,
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: '--font-ibm-plex-mono',
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  display: 'swap',
  preload: true,
  adjustFontFallback: true,
});

const yellowtail = Yellowtail({
  variable: '--font-yellowtail',
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
  preload: true,
  adjustFontFallback: true,
});

export const metadata: Metadata = {
  metadataBase: new URL('https://storychain.app'), // Update with actual domain
  title: {
    default: 'StoryChain - Collaborative Branching Storytelling Platform',
    template: '%s | StoryChain',
  },
  description:
    'Create, collaborate, and explore branching narratives with StoryChain. The ultimate platform for interactive storytelling where your choices shape unique narrative journeys.',
  keywords: [
    'storytelling',
    'collaborative writing',
    'branching narratives',
    'interactive stories',
    'creative writing',
    'story collaboration',
  ],
  authors: [{ name: 'StoryChain' }],
  creator: 'StoryChain',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://storychain.app',
    title: 'StoryChain - Collaborative Branching Storytelling Platform',
    description:
      'Create, collaborate, and explore branching narratives with StoryChain. The ultimate platform for interactive storytelling.',
    siteName: 'StoryChain',
    images: [
      {
        url: '/og-image.png', // Create this image
        width: 1200,
        height: 630,
        alt: 'StoryChain - Collaborative Storytelling',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'StoryChain - Collaborative Branching Storytelling Platform',
    description:
      'Create, collaborate, and explore branching narratives with StoryChain. The ultimate platform for interactive storytelling.',
    images: ['/og-image.png'],
    creator: '@storychain', // Update with actual Twitter handle
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // google: 'your-google-verification-code', // Add when available
    // yandex: 'your-yandex-verification-code', // Add when available
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body
          className={`${inter.variable} ${lora.variable} ${yellowtail.variable} ${playfair.variable} ${libreBaskerville.variable} ${ibmPlexMono.variable} ${literata.variable} antialiased`}
        >
          <QueryProvider>
            <NavigationProgress />
            <ToastProvider>{children}</ToastProvider>
          </QueryProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
