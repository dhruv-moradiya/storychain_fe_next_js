import apiClient from '@/lib/api-client';
import { IUserStoriesResponse } from '@/type/story/story-response.type';
import { AxiosResponse } from 'axios';

const StoryApi = {
  getUserStories: async (): Promise<AxiosResponse<IUserStoriesResponse>> => {
    return await apiClient.get<IUserStoriesResponse>('/stories/my');
  },
};

export { StoryApi };
