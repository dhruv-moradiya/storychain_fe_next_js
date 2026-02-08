import type { Metadata } from 'next';
import { Inter, Lora, Fira_Code, Literata } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';
import { QueryProvider } from '@/components/providers/query-provider';
import { NavigationProgress } from '@/components/common/loader/navigation-progress';
import './globals.css';

const inter = Inter({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const lora = Lora({
  variable: '--font-lora',
  subsets: ['latin'],
});

const firaCode = Fira_Code({
  variable: '--font-fira-code',
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
          className={`${inter.variable} ${lora.variable} ${firaCode.variable} ${literata.variable} antialiased`}
        >
          <QueryProvider>
            <NavigationProgress />
            {children}
          </QueryProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
