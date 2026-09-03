import { IBaseResponse } from '@/type/base-response.type';
import {
  IAdminStoriesPaginatedResponse,
  IAdminStoriesQueryParams,
} from '@/type/story/admin-story.type';
import {
  IChangeStoryStatusResponse,
  ICheckStoryBanResponse,
  ICloudinarySignatureResponse,
  ICollaboratorListResponse,
  ICreateStoryResponse,
  IExploreStoriesResponse,
  IInvitationActionResponse,
  IPublishStoryResponse,
  ISendInvitationBody,
  IStoryBasicResponse,
  IStoryImageUpdateResponse,
  IStoryOverviewResponse,
  IStorySettingsResponse,
  IStoryTimelineResponse,
  IStoryTreeResponse,
  IUserStoriesResponse,
  IUserStoryRoleResponse,
} from '@/type/story/story-response.type';
import { IStorySettings, TStoryStatus } from '@/type/story/story.types';
import { AxiosResponse } from 'axios';

import apiClient from '@/lib/api-client';
import { TStoryFormValues } from '@/lib/schemas/story.schema';

const StoryApi = {
  createStory: async (payload: TStoryFormValues): Promise<AxiosResponse<ICreateStoryResponse>> => {
    return await apiClient.post<ICreateStoryResponse>('/stories', payload);
  },

  publishStory: async (slug: string): Promise<AxiosResponse<IPublishStoryResponse>> => {
    return await apiClient.post(`/stories/slug/${slug}/publish`);
  },

  updateStatus: async (
    slug: string,
    status: TStoryStatus
  ): Promise<AxiosResponse<IChangeStoryStatusResponse>> => {
    return await apiClient.patch(`/stories/slug/${slug}/status`, { status });
  },

  getUserStories: async (): Promise<AxiosResponse<IUserStoriesResponse>> => {
    return await apiClient.get<IUserStoriesResponse>('/stories/my');
  },

  getAdminStories: async (
    params?: IAdminStoriesQueryParams
  ): Promise<AxiosResponse<IBaseResponse<IAdminStoriesPaginatedResponse>>> => {
    return await apiClient.get<IBaseResponse<IAdminStoriesPaginatedResponse>>(
      '/stories/admin/stories',
      { params }
    );
  },

  getStoryBasic: async (slug: string): Promise<AxiosResponse<IStoryBasicResponse>> => {
    return await apiClient.get<IStoryBasicResponse>(`/stories/slug/${slug}`, {
      params: { fields: 'title,slug' },
    });
  },

  getStoryTree: async (slug: string): Promise<AxiosResponse<IStoryTreeResponse>> => {
    return await apiClient.get<IStoryTreeResponse>(`/stories/slug/${slug}/tree`);
  },

  getStorySettings: async (slug: string): Promise<AxiosResponse<IStorySettingsResponse>> => {
    return await apiClient.get<IStorySettingsResponse>(`/stories/slug/${slug}/settings`);
  },

  getStoryOverview: async (slug: string): Promise<AxiosResponse<IStoryOverviewResponse>> => {
    return await apiClient.get<IStoryOverviewResponse>(`/stories/slug/${slug}/overview`);
  },

  updateStorySettings: async (
    slug: string,
    settings: Partial<IStorySettings>
  ): Promise<AxiosResponse<IStorySettingsResponse>> => {
    return await apiClient.patch<IStorySettingsResponse>(
      `/stories/slug/${slug}/settings`,
      settings
    );
  },

  // ============IMAGES============

  getSignatureUrl: async (slug: string): Promise<AxiosResponse<ICloudinarySignatureResponse>> => {
    return await apiClient.get<ICloudinarySignatureResponse>(`/stories/slug/${slug}/signature-url`);
  },

  updateStoryCoverImage: async (
    slug: string,
    image: { url: string; publicId: string }
  ): Promise<AxiosResponse<IStoryImageUpdateResponse>> => {
    return await apiClient.patch<IStoryImageUpdateResponse>(`/stories/slug/${slug}/cover-image`, {
      coverImage: image,
    });
  },

  updateStoryCardImage: async (
    slug: string,
    image: { url: string; publicId: string; thumbnailUrl: string }
  ): Promise<AxiosResponse<IStoryImageUpdateResponse>> => {
    return await apiClient.patch<IStoryImageUpdateResponse>(`/stories/slug/${slug}/card-image`, {
      cardImage: image,
    });
  },

  // ============COLLABORATORS============

  getCollaborators: async (slug: string): Promise<AxiosResponse<ICollaboratorListResponse>> => {
    return await apiClient.get<ICollaboratorListResponse>(`/stories/slug/${slug}/collaborators`);
  },

  sendInvitation: async (
    slug: string,
    body: ISendInvitationBody
  ): Promise<AxiosResponse<IInvitationActionResponse>> => {
    return await apiClient.post<IInvitationActionResponse>(
      `/stories/slug/${slug}/collaborators`,
      body
    );
  },

  acceptInvitation: async (slug: string): Promise<AxiosResponse<IInvitationActionResponse>> => {
    return await apiClient.post<IInvitationActionResponse>(
      `/stories/slug/${slug}/collaborators/accept-invitation`
    );
  },

  declineInvitation: async (slug: string): Promise<AxiosResponse<IInvitationActionResponse>> => {
    return await apiClient.post<IInvitationActionResponse>(
      `/stories/slug/${slug}/collaborators/decline-invitation`
    );
  },

  // ============TIMELINE==========

  getStoryTimeline: async (
    slug: string,
    params?: { limit?: number; skip?: number }
  ): Promise<AxiosResponse<IStoryTimelineResponse>> => {
    return await apiClient.get<IStoryTimelineResponse>(`/stories/slug/${slug}/timeline`, {
      params,
    });
  },

  // ============USER ROLE============

  getUserRole: async (slug: string): Promise<AxiosResponse<IUserStoryRoleResponse>> => {
    return await apiClient.get<IUserStoryRoleResponse>(`/stories/slug/${slug}/user-role`);
  },

  // ============EXPLORE==========

  getExploreStories: async (): Promise<AxiosResponse<IExploreStoriesResponse>> => {
    return await apiClient.get<IExploreStoriesResponse>(`/stories/fresh-stories`);
  },

  // ============STORY BANS==========

  checkUserStoryBan: async (
    storySlug: string,
    userId: string
  ): Promise<AxiosResponse<ICheckStoryBanResponse>> => {
    return await apiClient.get<ICheckStoryBanResponse>(`/story-bans/check/${storySlug}/${userId}`);
  },
};

export { StoryApi };
