import { QueryClient } from '@tanstack/react-query';

/**
 * Creates a new QueryClient instance with optimal defaults for Next.js.
 * This factory function ensures a fresh client is created per request on the server.
 */
export function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // Data is considered fresh for 1 minute
        staleTime: 60 * 1000,
        // Garbage collect unused data after 5 minutes
        gcTime: 5 * 60 * 1000,
        // Retry failed requests once
        retry: 1,
        // Don't refetch on window focus by default (can override per-query)
        refetchOnWindowFocus: false,
      },
    },
  });
}

// Browser-side singleton to persist cache across pages
let browserQueryClient: QueryClient | undefined = undefined;

/**
 * Returns the QueryClient instance.
 * On the server, creates a new instance per request.
 * On the browser, reuses the same instance.
 */
export function getQueryClient() {
  if (typeof window === 'undefined') {
    // Server: always create a new QueryClient
    return makeQueryClient();
  }

  // Browser: create once and reuse
  if (!browserQueryClient) {
    browserQueryClient = makeQueryClient();
  }
  return browserQueryClient;
}
