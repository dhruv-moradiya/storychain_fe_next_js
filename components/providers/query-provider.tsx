'use client';

import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ReactQueryStreamedHydration } from '@tanstack/react-query-next-experimental';
import { Toaster } from 'sonner';

import { getQueryClient } from '@/lib/query-client';
import { useMe } from '@/services/users/user.query';

interface QueryProviderProps {
  children: React.ReactNode;
}

function UserInitializer() {
  useMe();
  return null;
}

/**
 * QueryProvider component for Next.js App Router.
 * Uses ReactQueryStreamedHydration for seamless server-side data streaming.
 */
export function QueryProvider({ children }: QueryProviderProps) {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryStreamedHydration>
        <UserInitializer />
        {children}
      </ReactQueryStreamedHydration>
      <Toaster position="top-center" richColors />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
