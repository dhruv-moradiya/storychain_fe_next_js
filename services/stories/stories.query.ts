import { IUserStoriesResponse } from '@/type/story/story-response.type';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { StoryApi } from './stories-api';

const storyKeys = {
  all: ['stories'] as const,
  my: () => [...storyKeys.all, 'my'] as const,
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

export { getUserStoriesQueryFn, storyKeys, useGetUserStories };
