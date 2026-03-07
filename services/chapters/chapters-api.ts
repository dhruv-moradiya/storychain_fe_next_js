import { AxiosResponse } from 'axios';
import apiClient from '@/lib/api-client';
import {
  IChapterSearchResponse,
  IUserChaptersResponse,
} from '@/type/chapter/chapter-response.type';

const chapterApi = {
  getUserChapters: async () => {
    const response: AxiosResponse<IUserChaptersResponse> =
      await apiClient.get<IUserChaptersResponse>('/chapters/my');
    return response.data;
  },

  searchChapters: async (storySlug: string) => {
    const response: AxiosResponse<IChapterSearchResponse> =
      await apiClient.get<IChapterSearchResponse>('/chapters/search', {
        params: { storySlug },
      });
    return response.data;
  },
};

export { chapterApi };
