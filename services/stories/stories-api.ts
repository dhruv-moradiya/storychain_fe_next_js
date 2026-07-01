import {
  ICloudinarySignatureResponse,
  ICollaboratorListResponse,
  ICreateStoryResponse,
  IExploreStoriesResponse,
  IInvitationActionResponse,
  ISendInvitationBody,
  IStoryBasicResponse,
  IStoryImageUpdateResponse,
  IStoryOverviewResponse,
  IStorySettingsResponse,
  IStoryTreeResponse,
  IUserStoriesResponse,
  IUserStoryRoleResponse,
} from '@/type/story/story-response.type';
import { IStorySettings } from '@/type/story/story.types';
import { AxiosResponse } from 'axios';

import apiClient from '@/lib/api-client';
import { TStoryFormValues } from '@/lib/schemas/story.schema';

const StoryApi = {
  createStory: async (payload: TStoryFormValues): Promise<AxiosResponse<ICreateStoryResponse>> => {
    return await apiClient.post<ICreateStoryResponse>('/stories', payload);
  },

  getUserStories: async (): Promise<AxiosResponse<IUserStoriesResponse>> => {
    return await apiClient.get<IUserStoriesResponse>('/stories/my');
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
    image: { url: string; publicId: string }
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

  // ============USER ROLE============

  getUserRole: async (slug: string): Promise<AxiosResponse<IUserStoryRoleResponse>> => {
    return await apiClient.get<IUserStoryRoleResponse>(`/stories/slug/${slug}/user-role`);
  },

  // ============EXPLORE==========

  getExploreStories: async (): Promise<AxiosResponse<IExploreStoriesResponse>> => {
    return await apiClient.get<IExploreStoriesResponse>(`/stories/fresh-stories`);
  },
};

export { StoryApi };
