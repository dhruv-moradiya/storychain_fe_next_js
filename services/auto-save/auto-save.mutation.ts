import {
  IChapterAutoSaveContentResponse,
  IConvertAutoSaveToDraftResponse,
  IConvertAutoSaveToPublishedResponse,
  TAutoSaveContentRequest,
} from '@/type/auto-save';
import { IBaseResponse } from '@/type/base-response.type';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { chapterAutoSaveApi } from './auto-save-api';

const useAutoSaveContent = (
  options?: UseMutationOptions<IChapterAutoSaveContentResponse, AxiosError, TAutoSaveContentRequest>
) => {
  return useMutation({
    mutationFn: (payload: TAutoSaveContentRequest) =>
      chapterAutoSaveApi.saveContent(payload).then((res) => res.data),
    ...options,
  });
};

const useConvertToDraft = (
  options?: UseMutationOptions<IConvertAutoSaveToDraftResponse, AxiosError, string>
) => {
  return useMutation({
    mutationFn: (autoSaveId: string) =>
      chapterAutoSaveApi.convertToDraft(autoSaveId).then((res) => res.data),
    ...options,
  });
};

const useConvertToPublished = (
  options?: UseMutationOptions<IConvertAutoSaveToPublishedResponse, AxiosError, string>
) => {
  return useMutation({
    mutationFn: (autoSaveId: string) =>
      chapterAutoSaveApi.convertToPublished(autoSaveId).then((res) => res.data),
    ...options,
  });
};

const useDeleteAutoSave = (
  options?: UseMutationOptions<IBaseResponse<null>, AxiosError, string>
) => {
  return useMutation({
    mutationFn: (autoSaveId: string) =>
      chapterAutoSaveApi.deleteDraft(autoSaveId).then((res) => res.data),
    ...options,
  });
};

export { useAutoSaveContent, useConvertToDraft, useConvertToPublished, useDeleteAutoSave };
