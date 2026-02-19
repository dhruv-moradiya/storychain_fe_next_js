import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import { chapterApi } from './chapters-api';
import { IUserChaptersResponse } from '@/type/chapter/chapter-response.type';
import { AxiosError } from 'axios';
import { QueryKey } from '@/lib/query-keys';

const getUserChaptersQueryFn = async () => {
  const response = await chapterApi.getUserChapters();
  return response;
};

const useGetUserChapters = (
  options?: Omit<
    UseQueryOptions<
      IUserChaptersResponse,
      AxiosError,
      IUserChaptersResponse,
      typeof QueryKey.chapter.my
    >,
    'queryKey' | 'queryFn'
  >
) => {
  return useQuery({
    ...options,
    queryKey: QueryKey.chapter.my,
    queryFn: getUserChaptersQueryFn,
  });
};

export { getUserChaptersQueryFn, useGetUserChapters };
