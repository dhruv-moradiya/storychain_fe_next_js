import {
  IChapterDetailResponse,
  IChapterSearchResponse,
  IUserChaptersResponse,
} from '@/type/chapter/chapter-response.type';
import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { QueryKey } from '@/lib/query-keys';

import { chapterApi } from './chapters-api';

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

const getChapterBySlugQueryFn = async (chapterSlug: string) => {
  const response = await chapterApi.getCachedChapterBySlug(chapterSlug);
  return response;
};

const useGetChapterBySlug = (
  chapterSlug: string,
  options?: Omit<
    UseQueryOptions<
      IChapterDetailResponse,
      AxiosError,
      IChapterDetailResponse,
      ReturnType<typeof QueryKey.chapter.bySlug>
    >,
    'queryKey' | 'queryFn'
  >
) => {
  return useQuery({
    queryKey: QueryKey.chapter.bySlug(chapterSlug),
    queryFn: () => chapterApi.getCachedChapterBySlug(chapterSlug),
    enabled: !!chapterSlug,
    ...options,
  });
};

export {
  getUserChaptersQueryFn,
  useGetUserChapters,
  searchChaptersQueryFn,
  useSearchChapters,
  getChapterBySlugQueryFn,
  useGetChapterBySlug,
};
