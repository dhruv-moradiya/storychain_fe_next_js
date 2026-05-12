import { IGetCommentsRequest } from '@/type/chapter/chapter-request.type';
import {
  IChapterDetailResponse,
  IChapterSearchResponse,
  IGetCommentsResponse,
  IUserChaptersResponse,
} from '@/type/chapter/chapter-response.type';
import {
  InfiniteData,
  UseInfiniteQueryOptions,
  UseQueryOptions,
  useInfiniteQuery,
  useQuery,
} from '@tanstack/react-query';
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

const useGetInfiniteComments = (
  input: Omit<IGetCommentsRequest, 'page'>,
  options?: Omit<
    UseInfiniteQueryOptions<
      IGetCommentsResponse,
      AxiosError,
      InfiniteData<IGetCommentsResponse>,
      ReturnType<typeof QueryKey.chapter.comments>,
      number
    >,
    'queryKey' | 'queryFn' | 'initialPageParam' | 'getNextPageParam'
  >
) => {
  const { chapterSlug, limit = 10, parentCommentId } = input;
  return useInfiniteQuery({
    queryKey: QueryKey.chapter.comments(chapterSlug, limit, parentCommentId),
    queryFn: ({ pageParam = 1 }) =>
      chapterApi.getPaginatedComments({
        chapterSlug,
        page: pageParam,
        limit,
        parentCommentId,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage.data.hasNextPage ? (lastPage.data.nextPage ?? undefined) : undefined;
    },
    enabled: !!chapterSlug,
    ...options,
  });
};

/**
 * Fetches paginated child replies for a given parent comment.
 * Uses a separate query key so reply pages are cached independently.
 */
const useGetInfiniteReplies = (
  input: Omit<IGetCommentsRequest, 'page'> & { parentCommentId: string },
  options?: Omit<
    UseInfiniteQueryOptions<
      IGetCommentsResponse,
      AxiosError,
      InfiniteData<IGetCommentsResponse>,
      ReturnType<typeof QueryKey.chapter.replies>,
      number
    >,
    'queryKey' | 'queryFn' | 'initialPageParam' | 'getNextPageParam'
  >
) => {
  const { chapterSlug, limit = 10, parentCommentId } = input;
  return useInfiniteQuery({
    queryKey: QueryKey.chapter.replies(chapterSlug, parentCommentId, limit),
    queryFn: ({ pageParam = 1 }) =>
      chapterApi.getPaginatedComments({
        chapterSlug,
        page: pageParam,
        limit,
        parentCommentId,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage.data.hasNextPage ? (lastPage.data.nextPage ?? undefined) : undefined;
    },
    enabled: !!chapterSlug && !!parentCommentId,
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
  useGetInfiniteComments,
  useGetInfiniteReplies,
};
