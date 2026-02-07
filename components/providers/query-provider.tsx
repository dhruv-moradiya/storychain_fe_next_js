'use client';

import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ReactQueryStreamedHydration } from '@tanstack/react-query-next-experimental';
import { getQueryClient } from '@/lib/query-client';
import { Toaster } from 'sonner';

interface QueryProviderProps {
  children: React.ReactNode;
}

/**
 * QueryProvider component for Next.js App Router.
 * Uses ReactQueryStreamedHydration for seamless server-side data streaming.
 */
export function QueryProvider({ children }: QueryProviderProps) {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryStreamedHydration>{children}</ReactQueryStreamedHydration>
      <Toaster position="top-center" richColors />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
