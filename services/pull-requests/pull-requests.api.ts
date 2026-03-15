import { TSubmitRequestType } from '@/type/submit-reuqest/submit-request.type';
import { AxiosResponse } from 'axios';

import apiClient from '@/lib/api-client';

export interface ICreatePullRequestRequest {
  title: string;
  description?: string;
  storySlug: string;
  prType: TSubmitRequestType;
  isDraft?: boolean;
  chapterSlug: string;
  parentChapterSlug: string;
  changes: {
    proposed?: string;
    original?: string;
  };
}

export interface ICreatePullRequestResponse {
  success: boolean;
  data: {
    _id: string;
  };
  status: string;
  message: string;
}

const PullRequestApi = {
  createPullRequest: async (
    payload: ICreatePullRequestRequest
  ): Promise<AxiosResponse<ICreatePullRequestResponse>> => {
    return await apiClient.post<ICreatePullRequestResponse>('/pull-requests', payload);
  },
};

export { PullRequestApi };
