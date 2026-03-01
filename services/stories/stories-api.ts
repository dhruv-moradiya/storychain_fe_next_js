import apiClient from '@/lib/api-client';
import {
  ICollaboratorListResponse,
  IInvitationActionResponse,
  ISendInvitationBody,
  IStoryOverviewResponse,
  IStorySettingsResponse,
  IStoryTreeResponse,
  IUserStoriesResponse,
} from '@/type/story/story-response.type';
import { IStorySettings } from '@/type/story/story.types';
import { AxiosResponse } from 'axios';

const StoryApi = {
  getUserStories: async (): Promise<AxiosResponse<IUserStoriesResponse>> => {
    return await apiClient.get<IUserStoriesResponse>('/stories/my');
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
    return await apiClient.post<IStorySettingsResponse>(`/stories/slug/${slug}/settings`, settings);
  },

  // ── Collaborators ───────────────────────────────────────────────────────────

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
};

export { StoryApi };
