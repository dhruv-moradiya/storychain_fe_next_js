import { cache } from 'react';

import {
  IChapterDetailResponse,
  IChapterSearchResponse,
  IUserChaptersResponse,
} from '@/type/chapter/chapter-response.type';
import { AxiosResponse } from 'axios';

import apiClient from '@/lib/api-client';

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

  /**
   * To get chapter details
   * @usedIn: Chapter read page
   */
  getCachedChapterBySlug: cache(async (chapterSlug: string) => {
    const response: AxiosResponse<IChapterDetailResponse> =
      await apiClient.get<IChapterDetailResponse>(`/chapters/slug/${chapterSlug}`);
    return response.data;
  }),
};

export { chapterApi };
