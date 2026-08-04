import { IBaseResponse } from '@/type/base-response.type';
import {
  IBanUserFromStoryPayload,
  IBanUserGloballyPayload,
  ICreateReportPayload,
  IPaginatedReportQueryParams,
  IResolveAdminReportPayload,
  IResolveStoryReportPayload,
  IUpdateAdminReportStatusPayload,
} from '@/type/reports/report-request.types';
import {
  IPopulatedReportDetails,
  IReportPaginatedResponse,
} from '@/type/reports/report-response.types';
import { AxiosResponse } from 'axios';

import apiClient from '@/lib/api-client';

export const ReportsApi = {
  // ── User Endpoints ──────────────────────────────────────────
  createReport: async (
    payload: ICreateReportPayload
  ): Promise<AxiosResponse<IBaseResponse<IPopulatedReportDetails>>> => {
    return await apiClient.post<IBaseResponse<IPopulatedReportDetails>>('/reports', payload);
  },

  getMyReports: async (
    params?: IPaginatedReportQueryParams
  ): Promise<AxiosResponse<IBaseResponse<IReportPaginatedResponse>>> => {
    return await apiClient.get<IBaseResponse<IReportPaginatedResponse>>('/reports/my-reports', {
      params,
    });
  },

  getMyReportById: async (
    reportId: string
  ): Promise<AxiosResponse<IBaseResponse<IPopulatedReportDetails>>> => {
    return await apiClient.get<IBaseResponse<IPopulatedReportDetails>>(`/reports/${reportId}`);
  },

  // ── Story Moderation Endpoints ──────────────────────────────
  getStoryReports: async (
    storySlug: string,
    params?: IPaginatedReportQueryParams
  ): Promise<AxiosResponse<IBaseResponse<IReportPaginatedResponse>>> => {
    return await apiClient.get<IBaseResponse<IReportPaginatedResponse>>(
      `/reports/stories/${storySlug}/reports`,
      { params }
    );
  },

  resolveStoryReport: async (
    storySlug: string,
    reportId: string,
    payload: IResolveStoryReportPayload
  ): Promise<AxiosResponse<IBaseResponse<IPopulatedReportDetails>>> => {
    return await apiClient.patch<IBaseResponse<IPopulatedReportDetails>>(
      `/reports/stories/${storySlug}/reports/${reportId}/resolve`,
      payload
    );
  },

  banUserFromStory: async (
    storySlug: string,
    payload: IBanUserFromStoryPayload
  ): Promise<AxiosResponse<IBaseResponse<{ success: boolean }>>> => {
    return await apiClient.post<IBaseResponse<{ success: boolean }>>(
      `/reports/stories/${storySlug}/bans`,
      payload
    );
  },

  unbanUserFromStory: async (
    storySlug: string,
    userId: string
  ): Promise<AxiosResponse<IBaseResponse<{ success: boolean }>>> => {
    return await apiClient.delete<IBaseResponse<{ success: boolean }>>(
      `/reports/stories/${storySlug}/bans/${userId}`
    );
  },

  // ── Platform Admin Endpoints ────────────────────────────────
  getAdminReports: async (
    params?: IPaginatedReportQueryParams
  ): Promise<AxiosResponse<IBaseResponse<IReportPaginatedResponse>>> => {
    return await apiClient.get<IBaseResponse<IReportPaginatedResponse>>('/reports/admin/reports', {
      params,
    });
  },

  getAdminReportById: async (
    reportId: string
  ): Promise<AxiosResponse<IBaseResponse<IPopulatedReportDetails>>> => {
    return await apiClient.get<IBaseResponse<IPopulatedReportDetails>>(
      `/reports/admin/reports/${reportId}`
    );
  },

  updateAdminReportStatus: async (
    reportId: string,
    payload: IUpdateAdminReportStatusPayload
  ): Promise<AxiosResponse<IBaseResponse<IPopulatedReportDetails>>> => {
    return await apiClient.patch<IBaseResponse<IPopulatedReportDetails>>(
      `/reports/admin/reports/${reportId}/status`,
      payload
    );
  },

  resolveAdminReport: async (
    reportId: string,
    payload: IResolveAdminReportPayload
  ): Promise<AxiosResponse<IBaseResponse<IPopulatedReportDetails>>> => {
    return await apiClient.post<IBaseResponse<IPopulatedReportDetails>>(
      `/reports/admin/reports/${reportId}/resolve`,
      payload
    );
  },

  banUserGlobally: async (
    userId: string,
    payload: IBanUserGloballyPayload
  ): Promise<AxiosResponse<IBaseResponse<{ success: boolean }>>> => {
    return await apiClient.post<IBaseResponse<{ success: boolean }>>(
      `/reports/admin/users/${userId}/ban`,
      { ...payload, userId }
    );
  },

  unbanUserGlobally: async (
    userId: string,
    payload: { reason?: string }
  ): Promise<AxiosResponse<IBaseResponse<{ success: boolean }>>> => {
    return await apiClient.post<IBaseResponse<{ success: boolean }>>(
      `/reports/admin/users/${userId}/unban`,
      payload
    );
  },
};
