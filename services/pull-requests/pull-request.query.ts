import { IPullRequestListResponse } from '@/type/pull-reuqest/pull-request-response.type';
import { UseQueryOptions, useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { PullRequestApi } from './pull-requests.api';

export const pullKeys = {
  all: ['pull-requests'] as const,
};

export const useGetPullRequests = (
  options?: Omit<
    UseQueryOptions<
      IPullRequestListResponse,
      AxiosError,
      IPullRequestListResponse,
      typeof pullKeys.all
    >,
    'queryKey' | 'queryFn'
  >
) => {
  return useQuery({
    queryKey: pullKeys.all,
    queryFn: async () => {
      const res = await PullRequestApi.listStoryPullRequests(1, 10);
      return res.data;
    },
    ...options,
  });
};

export const usePullRequests = () => {
  return useInfiniteQuery<IPullRequestListResponse, AxiosError>({
    queryKey: pullKeys.all,

    initialPageParam: 1,

    queryFn: async ({ pageParam }) => {
      const res = await PullRequestApi.listStoryPullRequests(pageParam as number, 10);
      return res.data;
    },

    getNextPageParam: (lastPage) => {
      return lastPage.data.hasNextPage ? lastPage.data.page + 1 : undefined;
    },
  });
};
