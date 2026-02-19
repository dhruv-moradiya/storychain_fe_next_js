import { AxiosResponse } from 'axios';
import apiClient from '@/lib/api-client';
import { IUserChaptersResponse } from '@/type/chapter/chapter-response.type';

const chapterApi = {
  getUserChapters: async () => {
    const response: AxiosResponse<IUserChaptersResponse> =
      await apiClient.get<IUserChaptersResponse>('/chapters/my');
    return response.data;
  },
};

export { chapterApi };
