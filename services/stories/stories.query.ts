import { IBaseResponse } from '@/type/base-response.type';
import {
  IAdminStoriesPaginatedResponse,
  IAdminStoriesQueryParams,
} from '@/type/story/admin-story.type';
import {
  ICollaboratorListResponse,
  IStoryBasicResponse,
  IStoryOverviewResponse,
  IStorySettingsResponse,
  IStoryTimelineResponse,
  IStoryTreeResponse,
  IUserStoriesResponse,
  IUserStoryRoleResponse,
} from '@/type/story/story-response.type';
import {
  InfiniteData,
  UseInfiniteQueryOptions,
  UseQueryOptions,
  useInfiniteQuery,
  useQuery,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { QueryKey } from '@/lib/query-keys';

import { StoryApi } from './stories-api';

// ── Query functions (importable for SSR / prefetch) ───────────────────────────

export const getUserStoriesQueryFn = async () => {
  const response = await StoryApi.getUserStories();
  return response.data;
};

export const getAdminStoriesQueryFn = async (params?: IAdminStoriesQueryParams) => {
  const response = await StoryApi.getAdminStories(params);
  return response.data;
};

export const getStoryBasicQueryFn = async (slug: string) => {
  const response = await StoryApi.getStoryBasic(slug);
  return response.data;
};

export const getStoryTreeQueryFn = async (slug: string) => {
  const response = await StoryApi.getStoryTree(slug);
  return response.data;
};

export const getStorySettingsQueryFn = async (slug: string) => {
  const response = await StoryApi.getStorySettings(slug);
  return response.data;
};

export const getStoryOverviewQueryFn = async (slug: string) => {
  const response = await StoryApi.getStoryOverview(slug);
  return response.data;
};

export const getCollaboratorsQueryFn = async (slug: string) => {
  const response = await StoryApi.getCollaborators(slug);
  return response.data;
};

export const getStoryTimelineQueryFn = async (
  slug: string,
  params?: { limit?: number; skip?: number }
) => {
  const response = await StoryApi.getStoryTimeline(slug, params);
  return response.data;
};

// ── Hooks ─────────────────────────────────────────────────────────────────────

export const useGetUserStories = (
  options?: Omit<
    UseQueryOptions<
      IUserStoriesResponse,
      AxiosError,
      IUserStoriesResponse,
      typeof QueryKey.story.my
    >,
    'queryKey' | 'queryFn'
  >
) => {
  return useQuery({
    queryKey: QueryKey.story.my,
    queryFn: getUserStoriesQueryFn,
    ...options,
  });
};

export const useGetAdminStories = (
  params?: IAdminStoriesQueryParams,
  options?: Omit<
    UseQueryOptions<
      IBaseResponse<IAdminStoriesPaginatedResponse>,
      AxiosError,
      IBaseResponse<IAdminStoriesPaginatedResponse>,
      ReturnType<typeof QueryKey.story.adminList>
    >,
    'queryKey' | 'queryFn'
  >
) => {
  return useQuery({
    queryKey: QueryKey.story.adminList(params),
    queryFn: () => getAdminStoriesQueryFn(params),
    ...options,
  });
};

export const useGetStoryBasic = (
  slug: string,
  options?: Omit<
    UseQueryOptions<
      IStoryBasicResponse,
      AxiosError,
      IStoryBasicResponse,
      ReturnType<typeof QueryKey.story.basicBySlug>
    >,
    'queryKey' | 'queryFn'
  >
) => {
  return useQuery({
    queryKey: QueryKey.story.basicBySlug(slug),
    queryFn: () => getStoryBasicQueryFn(slug),
    enabled: !!slug,
    ...options,
  });
};

export const useGetStoryTree = (
  slug: string,
  options?: Omit<
    UseQueryOptions<
      IStoryTreeResponse,
      AxiosError,
      IStoryTreeResponse,
      ReturnType<typeof QueryKey.story.bySlug>
    >,
    'queryKey' | 'queryFn'
  >
) => {
  return useQuery({
    queryKey: QueryKey.story.bySlug(slug),
    queryFn: () => getStoryTreeQueryFn(slug),
    enabled: !!slug,
    ...options,
  });
};

export const useGetStorySettings = (
  slug: string | undefined,
  options?: Omit<
    UseQueryOptions<
      IStorySettingsResponse,
      AxiosError,
      IStorySettingsResponse,
      ReturnType<typeof QueryKey.story.settingsBySlug>
    >,
    'queryKey' | 'queryFn'
  >
) => {
  return useQuery({
    queryKey: QueryKey.story.settingsBySlug(slug ?? ''),
    queryFn: () => getStorySettingsQueryFn(slug ?? ''),
    enabled: !!slug,
    ...options,
  });
};

export const useGetStoryOverview = (
  slug: string,
  options?: Omit<
    UseQueryOptions<
      IStoryOverviewResponse,
      AxiosError,
      IStoryOverviewResponse,
      ReturnType<typeof QueryKey.story.overviewBySlug>
    >,
    'queryKey' | 'queryFn'
  >
) => {
  return useQuery({
    queryKey: QueryKey.story.overviewBySlug(slug),
    queryFn: () => getStoryOverviewQueryFn(slug),
    enabled: !!slug,
    ...options,
  });
};

export const useGetCollaborators = (
  slug: string,
  options?: Omit<
    UseQueryOptions<
      ICollaboratorListResponse,
      AxiosError,
      ICollaboratorListResponse,
      ReturnType<typeof QueryKey.story.collaborators>
    >,
    'queryKey' | 'queryFn'
  >
) => {
  return useQuery({
    queryKey: QueryKey.story.collaborators(slug),
    queryFn: () => getCollaboratorsQueryFn(slug),
    enabled: !!slug,
    ...options,
  });
};

export const getUserRoleQueryFn = async (slug: string) => {
  const response = await StoryApi.getUserRole(slug);
  return response.data;
};

export const useGetUserRole = (
  slug: string,
  options?: Omit<
    UseQueryOptions<
      IUserStoryRoleResponse,
      AxiosError,
      IUserStoryRoleResponse,
      ReturnType<typeof QueryKey.story.userRole>
    >,
    'queryKey' | 'queryFn'
  >
) => {
  return useQuery({
    queryKey: QueryKey.story.userRole(slug),
    queryFn: () => getUserRoleQueryFn(slug),
    enabled: !!slug,
    staleTime: 5 * 60 * 1000, // role rarely changes mid-session
    ...options,
  });
};

export const useGetStoryTimeline = (
  slug: string,
  params?: { limit?: number; skip?: number },
  options?: Omit<
    UseQueryOptions<
      IStoryTimelineResponse,
      AxiosError,
      IStoryTimelineResponse,
      ReturnType<typeof QueryKey.story.timeline>
    >,
    'queryKey' | 'queryFn'
  >
) => {
  return useQuery({
    queryKey: QueryKey.story.timeline(slug, params),
    queryFn: () => getStoryTimelineQueryFn(slug, params),
    enabled: !!slug,
    ...options,
  });
};

export const useGetInfiniteStoryTimeline = (
  slug: string,
  limit = 20,
  options?: Omit<
    UseInfiniteQueryOptions<
      IStoryTimelineResponse,
      AxiosError,
      InfiniteData<IStoryTimelineResponse>,
      ReturnType<typeof QueryKey.story.timelineInfinite>,
      number
    >,
    'queryKey' | 'queryFn' | 'initialPageParam' | 'getNextPageParam'
  >
) => {
  return useInfiniteQuery({
    queryKey: QueryKey.story.timelineInfinite(slug, limit),
    initialPageParam: 0,
    queryFn: ({ pageParam = 0 }) =>
      getStoryTimelineQueryFn(slug, { limit, skip: pageParam as number }),
    getNextPageParam: (lastPage) => {
      const { skip, limit: pageLimit, total } = lastPage.data;
      const nextSkip = skip + pageLimit;
      return nextSkip < total ? nextSkip : undefined;
    },
    enabled: !!slug,
    ...options,
  });
};

// ============EXPLORE==========

export const useGetFreshStories = () => {
  return useQuery({
    queryKey: QueryKey.story.explore.fresh,
    queryFn: StoryApi.getExploreStories,
    staleTime: Infinity,
    select: (response) => response.data,
  });
};

// ============STORY BANS==========

export const useCheckUserStoryBan = (storySlug: string, userId?: string) => {
  return useQuery({
    queryKey: ['storyBans', 'check', storySlug, userId],
    queryFn: async () => {
      const response = await StoryApi.checkUserStoryBan(storySlug, userId!);
      return response.data;
    },
    enabled: Boolean(storySlug && userId),
  });
};
