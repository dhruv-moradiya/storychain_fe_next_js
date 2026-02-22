import {
  IStorySettingsResponse,
  IStoryTreeResponse,
  IUserStoriesResponse,
} from '@/type/story/story-response.type';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { StoryApi } from './stories-api';

const storyKeys = {
  all: ['stories'] as const,
  my: () => [...storyKeys.all, 'my'] as const,
  tree: (slug: string) => [...storyKeys.all, 'tree', slug] as const,
  settings: (slug: string) => [...storyKeys.all, 'settings', slug] as const,
};

const getUserStoriesQueryFn = async () => {
  const response = await StoryApi.getUserStories();
  return response.data;
};

const useGetUserStories = (
  options?: Omit<
    UseQueryOptions<
      IUserStoriesResponse,
      AxiosError,
      IUserStoriesResponse,
      ReturnType<typeof storyKeys.my>
    >,
    'queryKey' | 'queryFn'
  >
) => {
  return useQuery({
    queryKey: storyKeys.my(),
    queryFn: getUserStoriesQueryFn,
    ...options,
  });
};

const getStoryTreeQueryFn = async (slug: string) => {
  const response = await StoryApi.getStoryTree(slug);
  return response.data;
};

const useGetStoryTree = (
  slug: string,
  options?: Omit<
    UseQueryOptions<
      IStoryTreeResponse,
      AxiosError,
      IStoryTreeResponse,
      ReturnType<typeof storyKeys.tree>
    >,
    'queryKey' | 'queryFn'
  >
) => {
  return useQuery({
    queryKey: storyKeys.tree(slug),
    queryFn: () => getStoryTreeQueryFn(slug),
    enabled: !!slug,
    ...options,
  });
};

const getStorySettingsQueryFn = async (slug: string) => {
  const response = await StoryApi.getStorySettings(slug);
  return response.data;
};

const useGetStorySettings = (
  slug: string | undefined,
  options?: Omit<
    UseQueryOptions<
      IStorySettingsResponse,
      AxiosError,
      IStorySettingsResponse,
      ReturnType<typeof storyKeys.settings>
    >,
    'queryKey' | 'queryFn'
  >
) => {
  return useQuery({
    queryKey: storyKeys.settings(slug || ''),
    queryFn: () => getStorySettingsQueryFn(slug || ''),
    enabled: !!slug,
    ...options,
  });
};

export {
  getStorySettingsQueryFn,
  getStoryTreeQueryFn,
  getUserStoriesQueryFn,
  storyKeys,
  useGetStorySettings,
  useGetStoryTree,
  useGetUserStories,
};
