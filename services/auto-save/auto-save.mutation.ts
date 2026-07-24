import {
  IChapterAutoSaveContentResponse,
  IConvertAutoSaveResponse,
  TAutoSaveContentRequest,
} from '@/type/auto-save';
import { IBaseResponse } from '@/type/base-response.type';
import { UseMutationOptions, useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { QueryKey } from '@/lib/query-keys';

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
  slug: string,
  options?: UseMutationOptions<
    IConvertAutoSaveResponse,
    AxiosError,
    { autoSaveId: string; type: 'draft' | 'publish' }
  >
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ autoSaveId, type }) =>
      chapterAutoSaveApi.convertAutoSave(autoSaveId, type).then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QueryKey.story.bySlug(slug),
      });
    },
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
