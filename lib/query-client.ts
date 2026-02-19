import { QueryClient } from '@tanstack/react-query';

export const STALE_TIME = {
  /** Always fresh – manual invalidation required  */
  INFINITE: Infinity,

  /** Very frequent updates (real-time, chat, live data): 0 sec*/
  REALTIME: 0,

  /** Extremely short-lived data : 5 sec*/
  VERY_SHORT: 5 * 1000,

  /** 1 min */
  ONE_MINUTE: 60 * 1000,

  /** Short-lived, user-interactive data : 30 sec*/
  SHORT: 30 * 1000,

  /** Moderate caching (default dashboard data) : 2 min*/
  MEDIUM: 2 * 60 * 1000,

  /** Safe caching for lists & summaries : 5 min */
  LONG: 5 * 60 * 1000,

  /** Rarely changing data : 15 min*/
  VERY_LONG: 15 * 60 * 1000,
} as const;

/**
 * Creates a new QueryClient instance with optimal defaults for Next.js.
 * This factory function ensures a fresh client is created per request on the server.
 */
export function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // Data is considered fresh for 1 minute
        staleTime: STALE_TIME.ONE_MINUTE,
        // Garbage collect unused data after 5 minutes
        gcTime: STALE_TIME.LONG,
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
