import { IGetAutoSaveDraftResponse } from '@/type/auto-save';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { chapterAutoSaveApi } from './auto-save-api';

const autoSaveKeys = {
  all: ['auto-save'] as const,
  drafts: () => [...autoSaveKeys.all, 'drafts'] as const,
};

const getAutoSaveDraftQueryFn = async (): Promise<IGetAutoSaveDraftResponse> => {
  const response = await chapterAutoSaveApi.getDrafts();
  return response.data;
};

const useGetAutoSaveDraft = (
  options?: Omit<
    UseQueryOptions<
      IGetAutoSaveDraftResponse,
      AxiosError,
      IGetAutoSaveDraftResponse,
      ReturnType<typeof autoSaveKeys.drafts>
    >,
    'queryKey' | 'queryFn'
  >
) => {
  return useQuery({
    queryKey: autoSaveKeys.drafts(),
    queryFn: getAutoSaveDraftQueryFn,
    ...options,
  });
};

export { useGetAutoSaveDraft, autoSaveKeys };
