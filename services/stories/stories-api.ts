import apiClient from '@/lib/api-client';
import {
  IStorySettingsResponse,
  IStoryTreeResponse,
  IUserStoriesResponse,
} from '@/type/story/story-response.type';
import { IStorySettings } from '@/type/story/story.types';
import { AxiosResponse } from 'axios';

const StoryApi = {
  getUserStories: async (): Promise<AxiosResponse<IUserStoriesResponse>> => {
    return await apiClient.get<IUserStoriesResponse>('/stories/my');
  },

  getStoryTree: async (slug: string): Promise<AxiosResponse<IStoryTreeResponse>> => {
    return await apiClient.get<IStoryTreeResponse>(`/stories/slug/${slug}/tree`);
  },

  getStorySettings: async (slug: string): Promise<AxiosResponse<IStorySettingsResponse>> => {
    return await apiClient.get<IStorySettingsResponse>(`/stories/slug/${slug}/settings`);
  },

  updateStorySettings: async (
    slug: string,
    settings: Partial<IStorySettings>
  ): Promise<AxiosResponse<IStorySettingsResponse>> => {
    return await apiClient.post<IStorySettingsResponse>(`/stories/slug/${slug}/settings`, settings);
  },
};

export { StoryApi };
