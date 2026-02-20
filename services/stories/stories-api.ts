import apiClient from '@/lib/api-client';
import { IStoryTreeResponse, IUserStoriesResponse } from '@/type/story/story-response.type';
import { AxiosResponse } from 'axios';

const StoryApi = {
  getUserStories: async (): Promise<AxiosResponse<IUserStoriesResponse>> => {
    return await apiClient.get<IUserStoriesResponse>('/stories/my');
  },

  getStoryTree: async (slug: string): Promise<AxiosResponse<IStoryTreeResponse>> => {
    return await apiClient.get<IStoryTreeResponse>(`/stories/slug/${slug}/tree`);
  },
};

export { StoryApi };
