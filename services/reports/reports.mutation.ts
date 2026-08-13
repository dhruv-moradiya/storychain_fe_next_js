import {
  IBanUserFromStoryPayload,
  IBanUserGloballyPayload,
  ICreateReportPayload,
  IResolveAdminReportPayload,
  IResolveStoryReportPayload,
  IUpdateAdminReportStatusPayload,
} from '@/type/reports/report-request.types';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { toast } from '@/components/shared/toast/toast';
import { getErrorMessage } from '@/lib/error';
import { QueryKey } from '@/lib/query-keys';

import { ReportsApi } from './reports-api';

export const useCreateReportMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: ICreateReportPayload) => ReportsApi.createReport(payload),
    onSuccess: (response) => {
      if (response.data.success) {
        queryClient.invalidateQueries({ queryKey: ['report', 'my'] });
        toast.success(response.data.message || 'Report submitted successfully');
      } else {
        toast.error(response.data.message || 'Failed to submit report');
      }
    },
    onError: (error: unknown) => {
      toast.error(getErrorMessage(error, 'Something went wrong while submitting report'));
    },
  });
};

export const useResolveStoryReportMutation = (storySlug: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      reportId,
      payload,
    }: {
      reportId: string;
      payload: IResolveStoryReportPayload;
    }) => ReportsApi.resolveStoryReport(storySlug, reportId, payload),
    onSuccess: (response) => {
      if (response.data.success) {
        queryClient.invalidateQueries({ queryKey: QueryKey.report.story(storySlug) });
        queryClient.invalidateQueries({ queryKey: ['report', 'my'] });
        toast.success(response.data.message || 'Story report resolved');
      } else {
        toast.error(response.data.message || 'Failed to resolve story report');
      }
    },
    onError: (error: unknown) => {
      toast.error(getErrorMessage(error, 'Failed to resolve story report'));
    },
  });
};

export const useBanUserFromStoryMutation = (storySlug: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: IBanUserFromStoryPayload) =>
      ReportsApi.banUserFromStory(storySlug, payload),
    onSuccess: (response) => {
      if (response.data.success) {
        queryClient.invalidateQueries({ queryKey: QueryKey.report.story(storySlug) });
        toast.success(response.data.message || 'User banned from story');
      } else {
        toast.error(response.data.message || 'Failed to ban user from story');
      }
    },
    onError: (error: unknown) => {
      toast.error(getErrorMessage(error, 'Failed to ban user from story'));
    },
  });
};

export const useUnbanUserFromStoryMutation = (storySlug: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userId: string) => ReportsApi.unbanUserFromStory(storySlug, userId),
    onSuccess: (response) => {
      if (response.data.success) {
        queryClient.invalidateQueries({ queryKey: QueryKey.report.story(storySlug) });
        toast.success(response.data.message || 'Story ban lifted');
      } else {
        toast.error(response.data.message || 'Failed to lift story ban');
      }
    },
    onError: (error: unknown) => {
      toast.error(getErrorMessage(error, 'Failed to lift story ban'));
    },
  });
};

export const useUpdateAdminReportStatusMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      reportId,
      payload,
    }: {
      reportId: string;
      payload: IUpdateAdminReportStatusPayload;
    }) => ReportsApi.updateAdminReportStatus(reportId, payload),
    onSuccess: (response) => {
      if (response.data.success) {
        queryClient.invalidateQueries({ queryKey: ['report', 'admin'] });
        toast.success(response.data.message || 'Report status updated');
      } else {
        toast.error(response.data.message || 'Failed to update report status');
      }
    },
    onError: (error: unknown) => {
      toast.error(getErrorMessage(error, 'Failed to update report status'));
    },
  });
};

export const useResolveAdminReportMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      reportId,
      payload,
    }: {
      reportId: string;
      payload: IResolveAdminReportPayload;
    }) => ReportsApi.resolveAdminReport(reportId, payload),
    onSuccess: (response) => {
      if (response.data.success) {
        queryClient.invalidateQueries({ queryKey: ['report', 'admin'] });
        toast.success(response.data.message || 'Platform report resolved');
      } else {
        toast.error(response.data.message || 'Failed to resolve platform report');
      }
    },
    onError: (error: unknown) => {
      toast.error(getErrorMessage(error, 'Failed to resolve platform report'));
    },
  });
};

export const useBanUserGloballyMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userId, payload }: { userId: string; payload: IBanUserGloballyPayload }) =>
      ReportsApi.banUserGlobally(userId, payload),
    onSuccess: (response) => {
      if (response.data.success) {
        queryClient.invalidateQueries({ queryKey: ['report', 'admin'] });
        queryClient.invalidateQueries({ queryKey: ['user', 'list'] });
        toast.success(response.data.message || 'User banned globally');
      } else {
        toast.error(response.data.message || 'Failed to ban user globally');
      }
    },
    onError: (error: unknown) => {
      toast.error(getErrorMessage(error, 'Failed to ban user globally'));
    },
  });
};

export const useUnbanUserGloballyMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userId, payload }: { userId: string; payload: { reason?: string } }) =>
      ReportsApi.unbanUserGlobally(userId, payload),
    onSuccess: (response) => {
      if (response.data.success) {
        queryClient.invalidateQueries({ queryKey: ['report', 'admin'] });
        queryClient.invalidateQueries({ queryKey: ['user', 'list'] });
        toast.success(response.data.message || 'User unbanned globally');
      } else {
        toast.error(response.data.message || 'Failed to unban user globally');
      }
    },
    onError: (error: unknown) => {
      toast.error(getErrorMessage(error, 'Failed to unban user globally'));
    },
  });
};
