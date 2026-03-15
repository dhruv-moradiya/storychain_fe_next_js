import {
  IAutoSaveSearchResponse,
  IChapterAutoSaveContentResponse,
  IConvertAutoSaveResponse,
  IGetAutoSaveDraftResponse,
  TAutoSaveContentRequest,
} from '@/type/auto-save';
import { IBaseResponse } from '@/type/base-response.type';
import { AxiosResponse } from 'axios';

import apiClient from '@/lib/api-client';

const chapterAutoSaveApi = {
  /**
   * Search auto-save drafts.
   */
  searchDrafts: async (limit = 5): Promise<AxiosResponse<IAutoSaveSearchResponse>> => {
    return await apiClient.get<IAutoSaveSearchResponse>('/auto-save/search', {
      params: { limit },
    });
  },

  /**
   * Fetches all active auto-save drafts for the authenticated user.
   */
  getDrafts: async (page = 1, limit = 10): Promise<AxiosResponse<IGetAutoSaveDraftResponse>> => {
    return await apiClient.get<IGetAutoSaveDraftResponse>(`/auto-save/draft`, {
      params: { page, limit },
    });
  },

  /**
   * Saves content as an auto-save draft.
   */
  saveContent: async (
    payload: TAutoSaveContentRequest
  ): Promise<AxiosResponse<IChapterAutoSaveContentResponse>> => {
    return await apiClient.post<IChapterAutoSaveContentResponse>('/auto-save/save', payload);
  },

  /**
   * Converts an auto-save draft to a real chapter (draft or published).
   */
  convertAutoSave: async (
    autoSaveId: string,
    type: 'draft' | 'publish'
  ): Promise<AxiosResponse<IConvertAutoSaveResponse>> => {
    return await apiClient.post<IConvertAutoSaveResponse>(
      `/auto-save/convert`,
      { autoSaveId },
      { params: { type } }
    );
  },

  /**
   * Deletes an auto-save draft.
   */
  deleteDraft: async (autoSaveId: string): Promise<AxiosResponse<IBaseResponse<null>>> => {
    return await apiClient.delete<IBaseResponse<null>>(`/auto-save/${autoSaveId}`);
  },
};

export { chapterAutoSaveApi };
