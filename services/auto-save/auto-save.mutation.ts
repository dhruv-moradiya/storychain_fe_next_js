import {
  IChapterAutoSaveContentResponse,
  IConvertAutoSaveResponse,
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

const useConvertAutoSave = (
  options?: UseMutationOptions<
    IConvertAutoSaveResponse,
    AxiosError,
    { autoSaveId: string; type: 'draft' | 'publish' }
  >
) => {
  return useMutation({
    mutationFn: ({ autoSaveId, type }) =>
      chapterAutoSaveApi.convertAutoSave(autoSaveId, type).then((res) => res.data),
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

export { useAutoSaveContent, useConvertAutoSave, useDeleteAutoSave };
