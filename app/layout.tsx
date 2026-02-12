import type { Metadata } from 'next';
import { Inter, Lora, Literata } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';
import { QueryProvider } from '@/components/providers/query-provider';
import { NavigationProgress } from '@/components/common/loader/navigation-progress';
import ToastProvider from '@/components/shared/toast/toast-provider';
import './globals.css';
import { yellowtail, playfair, libreBaskerville, ibmPlexMono } from '@/lib/fonts';

const inter = Inter({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const lora = Lora({
  variable: '--font-lora',
  subsets: ['latin'],
});

const literata = Literata({
  variable: '--font-literata',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'StoryChain - Collaborative Storytelling',
  description: 'Create, collaborate, and explore branching narratives with StoryChain',
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
