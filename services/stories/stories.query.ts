import {
  ICollaboratorListResponse,
  IStoryBasicResponse,
  IStoryOverviewResponse,
  IStorySettingsResponse,
  IStoryTreeResponse,
  IUserStoriesResponse,
} from '@/type/story/story-response.type';
import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { QueryKey } from '@/lib/query-keys';

import { StoryApi } from './stories-api';

// ── Query functions (importable for SSR / prefetch) ───────────────────────────

export const getUserStoriesQueryFn = async () => {
  const response = await StoryApi.getUserStories();
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
