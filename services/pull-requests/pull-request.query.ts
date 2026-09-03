import { IPullRequestListResponse } from '@/type/pull-reuqest/pull-request-response.type';
import {
  InfiniteData,
  UseInfiniteQueryOptions,
  UseQueryOptions,
  useInfiniteQuery,
  useQuery,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { QueryKey } from '@/lib/query-keys';

import { PullRequestApi } from './pull-requests.api';

export const pullKeys = QueryKey.pullRequest;

// ── Query functions (importable for SSR / prefetch) ───────────────────────────

export const listMyPullRequestsQueryFn = async (page = 1, limit = 10) => {
  const res = await PullRequestApi.listMyPullRequests(page, limit);
  return res.data;
};

export const listStoryPullRequestsQueryFn = async (storySlug: string, page = 1, limit = 10) => {
  const res = await PullRequestApi.listStoryPullRequests(storySlug, page, limit);
  return res.data;
};

// ── User's Pull Requests Hooks ───────────────────────────────────────────────

export const useGetMyPullRequests = (
  page = 1,
  limit = 10,
  options?: Omit<
    UseQueryOptions<
      IPullRequestListResponse,
      AxiosError,
      IPullRequestListResponse,
      ReturnType<typeof QueryKey.pullRequest.myList>
    >,
    'queryKey' | 'queryFn'
  >
) => {
  return useQuery({
    queryKey: QueryKey.pullRequest.myList(page, limit),
    queryFn: () => listMyPullRequestsQueryFn(page, limit),
    ...options,
  });
};

export const useMyPullRequests = (
  limit = 10,
  options?: Omit<
    UseInfiniteQueryOptions<
      IPullRequestListResponse,
      AxiosError,
      InfiniteData<IPullRequestListResponse>,
      ReturnType<typeof QueryKey.pullRequest.my>,
      number
    >,
    'queryKey' | 'queryFn' | 'initialPageParam' | 'getNextPageParam'
  >
) => {
  return useInfiniteQuery({
    queryKey: QueryKey.pullRequest.my(limit),
    initialPageParam: 1,
    queryFn: async ({ pageParam = 1 }) => {
      const res = await PullRequestApi.listMyPullRequests(pageParam as number, limit);
      return res.data;
    },
    getNextPageParam: (lastPage) => {
      return lastPage.data.hasNextPage ? lastPage.data.page + 1 : undefined;
    },
    ...options,
  });
};

// ── Story's Pull Requests Hooks ───────────────────────────────────────────────

export const useGetStoryPullRequests = (
  storySlug: string,
  page = 1,
  limit = 10,
  options?: Omit<
    UseQueryOptions<
      IPullRequestListResponse,
      AxiosError,
      IPullRequestListResponse,
      ReturnType<typeof QueryKey.pullRequest.storyList>
    >,
    'queryKey' | 'queryFn'
  >
) => {
  return useQuery({
    queryKey: QueryKey.pullRequest.storyList(storySlug, page, limit),
    queryFn: () => listStoryPullRequestsQueryFn(storySlug, page, limit),
    enabled: !!storySlug,
    ...options,
  });
};

export const useStoryPullRequests = (
  storySlug: string,
  limit = 10,
  options?: Omit<
    UseInfiniteQueryOptions<
      IPullRequestListResponse,
      AxiosError,
      InfiniteData<IPullRequestListResponse>,
      ReturnType<typeof QueryKey.pullRequest.story>,
      number
    >,
    'queryKey' | 'queryFn' | 'initialPageParam' | 'getNextPageParam'
  >
) => {
  return useInfiniteQuery({
    queryKey: QueryKey.pullRequest.story(storySlug, limit),
    initialPageParam: 1,
    queryFn: async ({ pageParam = 1 }) => {
      const res = await PullRequestApi.listStoryPullRequests(storySlug, pageParam as number, limit);
      return res.data;
    },
    getNextPageParam: (lastPage) => {
      return lastPage.data.hasNextPage ? lastPage.data.page + 1 : undefined;
    },
    enabled: !!storySlug,
    ...options,
  });
};

// Aliases for backwards compatibility
export const useGetPullRequests = useGetMyPullRequests;
export const usePullRequests = useMyPullRequests;
