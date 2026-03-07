import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import { chapterApi } from './chapters-api';
import {
  IChapterSearchResponse,
  IUserChaptersResponse,
} from '@/type/chapter/chapter-response.type';
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

const searchChaptersQueryFn = async (storySlug: string) => {
  const response = await chapterApi.searchChapters(storySlug);
  return response;
};

const useSearchChapters = (
  storySlug: string,
  options?: Omit<
    UseQueryOptions<
      IChapterSearchResponse,
      AxiosError,
      IChapterSearchResponse,
      ReturnType<typeof QueryKey.chapter.search>
    >,
    'queryKey' | 'queryFn'
  >
) => {
  return useQuery({
    queryKey: QueryKey.chapter.search(storySlug),
    queryFn: () => searchChaptersQueryFn(storySlug),
    enabled: !!storySlug,
    ...options,
  });
};

export { getUserChaptersQueryFn, useGetUserChapters, searchChaptersQueryFn, useSearchChapters };
