import {
  ICreatePRFromAutoSaveRequest,
  ICreatePullRequestRequest,
} from '@/type/pull-reuqest/pull-request-request.type';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { toast } from '@/components/shared/toast/toast';

import { PullRequestApi } from './pull-requests.api';

export const useCreatePullRequest = () => {
  return useMutation({
    mutationFn: (payload: ICreatePullRequestRequest) => PullRequestApi.createPullRequest(payload),
    onSuccess: (response) => {
      if (response.data.success) {
        toast.success('Pull request created successfully');
      } else {
        toast.error(response.data.message || 'Failed to create pull request');
      }
    },
    onError: (error: AxiosError<{ message: string }>) => {
      const errorMessage =
        error.response?.data?.message || 'Something went wrong while creating pull request';
      toast.error(errorMessage);
    },
  });
};

export const useCreatePullRequestFromAutoSave = () => {
  return useMutation({
    mutationFn: ({
      storySlug,
      payload,
    }: {
      storySlug: string;
      payload: ICreatePRFromAutoSaveRequest;
    }) => PullRequestApi.createPullRequestFromAutoSave(storySlug, payload),
    onSuccess: (response) => {
      if (response.data.success) {
        toast.success('Pull request created successfully');
      } else {
        toast.error(response.data.message || 'Failed to create pull request');
      }
    },
    onError: (error: AxiosError<{ message: string }>) => {
      const errorMessage =
        error.response?.data?.message || 'Something went wrong while creating pull request';
      toast.error(errorMessage);
    },
  });
};
