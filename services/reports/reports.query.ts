import { IBaseResponse } from '@/type/base-response.type';
import { IPaginatedReportQueryParams } from '@/type/reports/report-request.types';
import {
  IPopulatedReportDetails,
  IReportPaginatedResponse,
} from '@/type/reports/report-response.types';
import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { QueryKey } from '@/lib/query-keys';

import { ReportsApi } from './reports-api';

// ── Query functions (importable for prefetch) ─────────────────

export const getMyReportsQueryFn = async (params?: IPaginatedReportQueryParams) => {
  const response = await ReportsApi.getMyReports(params);
  return response.data;
};

export const getMyReportByIdQueryFn = async (reportId: string) => {
  const response = await ReportsApi.getMyReportById(reportId);
  return response.data;
};

export const getStoryReportsQueryFn = async (
  storySlug: string,
  params?: IPaginatedReportQueryParams
) => {
  const response = await ReportsApi.getStoryReports(storySlug, params);
  return response.data;
};

export const getAdminReportsQueryFn = async (params?: IPaginatedReportQueryParams) => {
  const response = await ReportsApi.getAdminReports(params);
  return response.data;
};

export const getAdminReportByIdQueryFn = async (reportId: string) => {
  const response = await ReportsApi.getAdminReportById(reportId);
  return response.data;
};

// ── React Query Hooks ──────────────────────────────────────────

export const useGetMyReports = (
  params?: IPaginatedReportQueryParams,
  options?: Omit<
    UseQueryOptions<
      IBaseResponse<IReportPaginatedResponse>,
      AxiosError,
      IBaseResponse<IReportPaginatedResponse>,
      ReturnType<typeof QueryKey.report.my>
    >,
    'queryKey' | 'queryFn'
  >
) => {
  return useQuery({
    queryKey: QueryKey.report.my(params),
    queryFn: () => getMyReportsQueryFn(params),
    ...options,
  });
};

export const useGetMyReportById = (
  reportId: string,
  options?: Omit<
    UseQueryOptions<
      IBaseResponse<IPopulatedReportDetails>,
      AxiosError,
      IBaseResponse<IPopulatedReportDetails>,
      ReturnType<typeof QueryKey.report.myById>
    >,
    'queryKey' | 'queryFn'
  >
) => {
  return useQuery({
    queryKey: QueryKey.report.myById(reportId),
    queryFn: () => getMyReportByIdQueryFn(reportId),
    enabled: !!reportId,
    ...options,
  });
};

export const useGetStoryReports = (
  storySlug: string,
  params?: IPaginatedReportQueryParams,
  options?: Omit<
    UseQueryOptions<
      IBaseResponse<IReportPaginatedResponse>,
      AxiosError,
      IBaseResponse<IReportPaginatedResponse>,
      ReturnType<typeof QueryKey.report.story>
    >,
    'queryKey' | 'queryFn'
  >
) => {
  return useQuery({
    queryKey: QueryKey.report.story(storySlug, params),
    queryFn: () => getStoryReportsQueryFn(storySlug, params),
    enabled: !!storySlug,
    ...options,
  });
};

export const useGetAdminReports = (
  params?: IPaginatedReportQueryParams,
  options?: Omit<
    UseQueryOptions<
      IBaseResponse<IReportPaginatedResponse>,
      AxiosError,
      IBaseResponse<IReportPaginatedResponse>,
      ReturnType<typeof QueryKey.report.admin>
    >,
    'queryKey' | 'queryFn'
  >
) => {
  return useQuery({
    queryKey: QueryKey.report.admin(params),
    queryFn: () => getAdminReportsQueryFn(params),
    ...options,
  });
};

export const useGetAdminReportById = (
  reportId: string,
  options?: Omit<
    UseQueryOptions<
      IBaseResponse<IPopulatedReportDetails>,
      AxiosError,
      IBaseResponse<IPopulatedReportDetails>,
      ReturnType<typeof QueryKey.report.adminById>
    >,
    'queryKey' | 'queryFn'
  >
) => {
  return useQuery({
    queryKey: QueryKey.report.adminById(reportId),
    queryFn: () => getAdminReportByIdQueryFn(reportId),
    enabled: !!reportId,
    ...options,
  });
};
