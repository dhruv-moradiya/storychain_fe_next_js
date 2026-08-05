import type { Metadata } from 'next';
import {
  IBM_Plex_Mono,
  Inter,
  Libre_Baskerville,
  Literata,
  Lora,
  Playfair_Display,
  Yellowtail,
} from 'next/font/google';
import Script from 'next/script';

import { NavigationProgress } from '@/components/common/loader/navigation-progress';
import { BannedUserGuard } from '@/components/providers/banned-user-guard';
import { ClerkThemeProvider } from '@/components/providers/clerk-theme-provider';
import { QueryProvider } from '@/components/providers/query-provider';
import { ThemeProvider } from '@/components/providers/theme-provider';
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

export const playfair = Playfair_Display({
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
  metadataBase: new URL('https://storychain-fe.vercel.app'),
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
    url: 'https://storychain-fe.vercel.app',
    title: 'StoryChain - Collaborative Branching Storytelling Platform',
    description:
      'Create, collaborate, and explore branching narratives with StoryChain. The ultimate platform for interactive storytelling.',
    siteName: 'StoryChain',
    images: [
      {
        url: 'https://res.cloudinary.com/dpji4qfnu/image/upload/v1781672960/5a66e236-525f-4415-a962-fabcd2e705b2_1_vigjei.png',
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
    images: [
      'https://res.cloudinary.com/dpji4qfnu/image/upload/v1781672960/5a66e236-525f-4415-a962-fabcd2e705b2_1_vigjei.png',
    ],
    creator: '@storychain',
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
  icons: {
    icon: '/icon.svg',
    shortcut: '/icon.svg',
    apple: '/icon.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${lora.variable} ${yellowtail.variable} ${playfair.variable} ${libreBaskerville.variable} ${ibmPlexMono.variable} ${literata.variable} antialiased`}
      >
        <Script
          id="razorpay-checkout"
          src="https://checkout.razorpay.com/v1/checkout.js"
          strategy="afterInteractive"
        />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ClerkThemeProvider
            signInUrl="/sign-in"
            signUpUrl="/sign-up"
            afterSignInUrl="/"
            afterSignUpUrl="/"
          >
            <QueryProvider>
              <BannedUserGuard>
                <main>
                  <NavigationProgress />
                  <ToastProvider>
                    {children}
                    {/* <FooterSection /> */}
                  </ToastProvider>
                </main>
              </BannedUserGuard>
            </QueryProvider>
          </ClerkThemeProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
