import { IAutoSaveSearchResponse, IGetAutoSaveDraftResponse } from '@/type/auto-save';
import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { chapterAutoSaveApi } from './auto-save-api';

const autoSaveKeys = {
  all: ['auto-save'] as const,
  drafts: () => [...autoSaveKeys.all, 'drafts'] as const,
  search: (limit?: number) => [...autoSaveKeys.all, 'search', limit] as const,
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

const searchAutoSaveDraftsQueryFn = async (limit?: number): Promise<IAutoSaveSearchResponse> => {
  const response = await chapterAutoSaveApi.searchDrafts(limit);
  return response.data;
};

const useSearchAutoSaveDrafts = (
  limit?: number,
  options?: Omit<
    UseQueryOptions<
      IAutoSaveSearchResponse,
      AxiosError,
      IAutoSaveSearchResponse,
      ReturnType<typeof autoSaveKeys.search>
    >,
    'queryKey' | 'queryFn'
  >
) => {
  return useQuery({
    queryKey: autoSaveKeys.search(limit),
    queryFn: () => searchAutoSaveDraftsQueryFn(limit),
    ...options,
  });
};

export { useGetAutoSaveDraft, autoSaveKeys, useSearchAutoSaveDrafts, searchAutoSaveDraftsQueryFn };
