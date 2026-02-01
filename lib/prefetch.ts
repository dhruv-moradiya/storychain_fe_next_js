import { QueryClient, dehydrate, QueryKey, QueryFunction } from '@tanstack/react-query';
import { makeQueryClient } from './query-client';

/**
 * Server-side prefetching utility for Next.js App Router.
 * Use this in page.tsx or layout.tsx Server Components to prefetch data.
 *
 * @example
 * // In a page.tsx Server Component:
 * export default async function StoryPage({ params }: { params: { slug: string } }) {
 *   await prefetchQuery({
 *     queryKey: storyKeys.detail(params.slug),
 *     queryFn: () => api.get(`/stories/${params.slug}`),
 *   });
 *
 *   return <StoryContent slug={params.slug} />;
 * }
 */
export async function prefetchQuery<TData>({
  queryKey,
  queryFn,
  staleTime,
}: {
  queryKey: QueryKey;
  queryFn: QueryFunction<TData>;
  staleTime?: number;
}) {
  const queryClient = makeQueryClient();

  await queryClient.prefetchQuery({
    queryKey,
    queryFn,
    staleTime,
  });

  return queryClient;
}

/**
 * Prefetch multiple queries in parallel.
 *
 * @example
 * const queryClient = await prefetchQueries([
 *   { queryKey: storyKeys.list({}), queryFn: () => api.get('/stories') },
 *   { queryKey: ['featured'], queryFn: () => api.get('/featured') },
 * ]);
 */
export async function prefetchQueries(
  queries: Array<{
    queryKey: QueryKey;
    queryFn: QueryFunction<unknown>;
    staleTime?: number;
  }>
) {
  const queryClient = makeQueryClient();

  await Promise.all(
    queries.map((query) =>
      queryClient.prefetchQuery({
        queryKey: query.queryKey,
        queryFn: query.queryFn,
        staleTime: query.staleTime,
      })
    )
  );

  return queryClient;
}

/**
 * Get dehydrated state for hydrating the client.
 * Use with HydrationBoundary component for manual hydration.
 *
 * @example
 * import { HydrationBoundary } from '@tanstack/react-query';
 *
 * export default async function Page() {
 *   const queryClient = await prefetchQuery({...});
 *   const dehydratedState = getDehydratedState(queryClient);
 *
 *   return (
 *     <HydrationBoundary state={dehydratedState}>
 *       <ClientComponent />
 *     </HydrationBoundary>
 *   );
 * }
 */
export function getDehydratedState(queryClient: QueryClient) {
  return dehydrate(queryClient);
}
