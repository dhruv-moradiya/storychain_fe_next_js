import {
  ICreatePRFromAutoSaveRequest,
  ICreatePullRequestRequest,
} from '@/type/pull-reuqest/pull-request-request.type';
import {
  ICreatePullRequestResponse,
  IPullRequestListResponse,
} from '@/type/pull-reuqest/pull-request-response.type';
import { AxiosResponse } from 'axios';

import apiClient from '@/lib/api-client';

const PullRequestApi = {
  createPullRequest: async (
    payload: ICreatePullRequestRequest
  ): Promise<AxiosResponse<ICreatePullRequestResponse>> => {
    return await apiClient.post<ICreatePullRequestResponse>('/pull-requests', payload);
  },

  createPullRequestFromAutoSave: async (
    storySlug: string,
    payload: ICreatePRFromAutoSaveRequest
  ): Promise<AxiosResponse<ICreatePullRequestResponse>> => {
    return await apiClient.post<ICreatePullRequestResponse>(
      `/pull-requests/stories/${storySlug}/from-autosave`,
      payload
    );
  },

  listStoryPullRequests: async (
    page: number,
    limit: number
  ): Promise<AxiosResponse<IPullRequestListResponse>> => {
    return await apiClient.get<IPullRequestListResponse>(
      `/pull-requests/me?page=${page}&limit=${limit}`
    );
  },
};

export { PullRequestApi };
