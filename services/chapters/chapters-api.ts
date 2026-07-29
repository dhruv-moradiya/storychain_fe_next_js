import { cache } from 'react';

import {
  IAddCommentRequest,
  IChapterRecordReadingSessionRequest,
  IChapterStartReadingSessionRequest,
  IGetCommentsRequest,
  IReactToChapterRequest,
  IUnlockChapterRequest,
} from '@/type/chapter/chapter-request.type';
import {
  IAddCommentResponse,
  IChapterDetailResponse,
  IChapterRecordReadingSessionResponse,
  IChapterSearchResponse,
  IChapterStartReadingSessionResponse,
  IGetCommentsResponse,
  IReactToChapterResponse,
  IUnlockChapterResponse,
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

  /**
   * To start a reading session for a chapter. This will create a new reading session in the backend.
   * As soon as user starts reading a chapter, we will call this API to create a reading session.
   * @usedIn: Chapter read page
   */
  chapterStartReadingSession: async (request: IChapterStartReadingSessionRequest) => {
    const response: AxiosResponse<IChapterStartReadingSessionResponse> =
      await apiClient.post<IChapterStartReadingSessionResponse>(
        `/reading-history/start-session`,
        request
      );
    return response.data;
  },

  /**
   * To record a reading session for a chapter. This will update the existing reading session in the backend with the duration of the reading session.
   * @usedIn: Chapter read page
   */
  chapterRecordReadingSession: async (request: IChapterRecordReadingSessionRequest) => {
    const response: AxiosResponse<IChapterRecordReadingSessionResponse> =
      await apiClient.post<IChapterRecordReadingSessionResponse>(
        `/reading-history/record-session`,
        request
      );
    return response.data;
  },

  getPaginatedComments: async (input: IGetCommentsRequest) => {
    const params: Record<string, string | number> = {
      page: input.page ?? 1,
      limit: input.limit ?? 10,
    };
    if (input.parentCommentId) {
      params.parentCommentId = input.parentCommentId;
    }
    const response: AxiosResponse<IGetCommentsResponse> = await apiClient.get<IGetCommentsResponse>(
      `/comments/chapter/${input.chapterSlug}`,
      { params }
    );
    return response.data;
  },

  addComment: async (input: IAddCommentRequest) => {
    const response: AxiosResponse<IAddCommentResponse> = await apiClient.post<IAddCommentResponse>(
      `/comments`,
      {
        chapterSlug: input.chapterSlug,
        content: input.content,
        parentCommentId: input.parentCommentId,
      }
    );
    return response.data;
  },

  reactToChapter: async (input: IReactToChapterRequest) => {
    const { slug, type } = input;
    const response: AxiosResponse<IReactToChapterResponse> =
      await apiClient.post<IReactToChapterResponse>(`/chapters/${slug}/reactions`, {
        type: type,
      });
    return response.data;
  },

  unlockChapter: async (input: IUnlockChapterRequest) => {
    const { slug } = input;
    const response: AxiosResponse<IUnlockChapterResponse> =
      await apiClient.post<IUnlockChapterResponse>(`/chapters/${slug}/unlock`);
    return response.data;
  },
};

export { chapterApi };
