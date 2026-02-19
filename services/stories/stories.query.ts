import { TREE_MOCK_DATA } from '@/lib/data/tree-mock-data';
import { IUserStoriesResponse } from '@/type/story/story-response.type';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { StoryApi } from './stories-api';

const storyKeys = {
  all: ['stories'] as const,
  my: () => [...storyKeys.all, 'my'] as const,
  tree: (slug: string) => [...storyKeys.all, 'tree', slug] as const,
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

const getStoryTreeMockQueryFn = async () => {
  return TREE_MOCK_DATA;
};

const useGetStoryTree = (
  slug: string,
  options?: Omit<
    UseQueryOptions<
      typeof TREE_MOCK_DATA,
      AxiosError,
      typeof TREE_MOCK_DATA,
      ReturnType<typeof storyKeys.tree>
    >,
    'queryKey' | 'queryFn'
  >
) => {
  return useQuery({
    queryKey: storyKeys.tree(slug),
    queryFn: getStoryTreeMockQueryFn,
    ...options,
  });
};

export {
  getStoryTreeMockQueryFn,
  getUserStoriesQueryFn,
  storyKeys,
  useGetStoryTree,
  useGetUserStories,
};
