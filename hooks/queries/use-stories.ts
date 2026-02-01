import { useQuery, useSuspenseQuery } from '@tanstack/react-query';
import { api } from '@/lib/api-client';

// ============================================
// Types (adjust based on your API response)
// ============================================
export interface Story {
  id: string;
  slug: string;
  title: string;
  description: string;
  coverImage?: string;
  authorId: string;
  createdAt: string;
  updatedAt: string;
}

export interface StoriesResponse {
  stories: Story[];
  total: number;
  page: number;
  pageSize: number;
}

// ============================================
// Query Keys Factory
// ============================================
// Using a factory pattern for consistent cache management
export const storyKeys = {
  all: ['stories'] as const,
  lists: () => [...storyKeys.all, 'list'] as const,
  list: (filters: Record<string, unknown>) => [...storyKeys.lists(), filters] as const,
  details: () => [...storyKeys.all, 'detail'] as const,
  detail: (slug: string) => [...storyKeys.details(), slug] as const,
};

// ============================================
// Query Options Factory (for prefetching)
// ============================================
export const storyQueryOptions = {
  list: (params?: { page?: number; pageSize?: number }) => ({
    queryKey: storyKeys.list(params ?? {}),
    queryFn: () =>
      api.get<StoriesResponse>('/stories', {
        params: { page: params?.page ?? 1, pageSize: params?.pageSize ?? 10 },
      }),
    staleTime: 60 * 1000, // 1 minute
  }),

  detail: (slug: string) => ({
    queryKey: storyKeys.detail(slug),
    queryFn: () => api.get<Story>(`/stories/${slug}`),
    staleTime: 5 * 60 * 1000, // 5 minutes
    enabled: !!slug,
  }),
};

// ============================================
// Query Hooks
// ============================================

/**
 * Fetch a paginated list of stories
 */
export function useStories(params?: { page?: number; pageSize?: number }) {
  return useQuery(storyQueryOptions.list(params));
}

/**
 * Fetch a single story by slug
 */
export function useStory(slug: string) {
  return useQuery(storyQueryOptions.detail(slug));
}

/**
 * Suspense-enabled version for use with React Suspense boundaries
 * Use this in Server Components or with Suspense boundaries
 */
export function useStorySuspense(slug: string) {
  return useSuspenseQuery(storyQueryOptions.detail(slug));
}

/**
 * Suspense-enabled stories list
 */
export function useStoriesSuspense(params?: { page?: number; pageSize?: number }) {
  return useSuspenseQuery(storyQueryOptions.list(params));
}
