import apiClient from '@/lib/api-client';
import {
  IChapterAutoSaveContentResponse,
  IConvertAutoSaveToDraftResponse,
  IConvertAutoSaveToPublishedResponse,
  IGetAutoSaveDraftResponse,
  TAutoSaveContentRequest,
} from '@/type/auto-save';
import { IBaseResponse } from '@/type/base-response.type';
import { AxiosResponse } from 'axios';

const chapterAutoSaveApi = {
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
   * Converts an auto-save draft to a real chapter (saved as draft).
   */
  convertToDraft: async (
    autoSaveId: string
  ): Promise<AxiosResponse<IConvertAutoSaveToDraftResponse>> => {
    return await apiClient.post<IConvertAutoSaveToDraftResponse>('/auto-save/convert-to-draft', {
      autoSaveId,
    });
  },

  /**
   * Converts an auto-save draft to a real chapter and publishes it directly.
   */
  convertToPublished: async (
    autoSaveId: string
  ): Promise<AxiosResponse<IConvertAutoSaveToPublishedResponse>> => {
    return await apiClient.post<IConvertAutoSaveToPublishedResponse>(
      '/auto-save/convert-to-published',
      {
        autoSaveId,
      }
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
