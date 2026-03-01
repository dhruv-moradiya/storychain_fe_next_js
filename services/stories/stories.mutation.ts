import { StoryApi } from './stories-api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QueryKey } from '@/lib/query-keys';
import { IStorySettings } from '@/type/story/story.types';
import { ISendInvitationBody } from '@/type/story/story-response.type';
import { toast } from '@/components/shared/toast/toast';
import { AxiosError } from 'axios';

// ── Settings ──────────────────────────────────────────────────────────────────

export const useUpdateStorySettings = (slug: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (settings: Partial<IStorySettings>) => StoryApi.updateStorySettings(slug, settings),
    onSuccess: (response) => {
      if (response.data.success) {
        queryClient.invalidateQueries({ queryKey: QueryKey.story.settingsBySlug(slug) });
        toast.success(response.data.message || 'Settings updated successfully', {
          description: 'Your story configuration has been saved.',
          action: {
            label: 'View',
            onClick: () => {
              window.location.href = `/stories/slug/${slug}`;
            },
          },
        });
      } else {
        toast.error(response.data.message || 'Failed to update settings');
      }
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error?.response?.data?.message || 'Something went wrong');
    },
  });
};

// ── Collaborator Mutations ────────────────────────────────────────────────────

/**
 * Send a collaborator invitation.
 * POST /slug/:slug/collaborators
 */
export const useSendInvitation = (slug: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: ISendInvitationBody) => StoryApi.sendInvitation(slug, body),
    onSuccess: (response) => {
      if (response.data.success) {
        queryClient.invalidateQueries({ queryKey: QueryKey.story.collaborators(slug) });
        toast.success(response.data.message || 'Invitation sent successfully');
      } else {
        toast.error(response.data.message || 'Failed to send invitation');
      }
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error?.response?.data?.message || 'Something went wrong');
    },
  });
};

/**
 * Accept a pending collaboration invitation for the current user.
 * POST /slug/:slug/collaborators/accept-invitation
 */
export const useAcceptInvitation = (slug: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => StoryApi.acceptInvitation(slug),
    onSuccess: (response) => {
      if (response.data.success) {
        queryClient.invalidateQueries({ queryKey: QueryKey.story.collaborators(slug) });
        toast.success(response.data.message || 'Invitation accepted');
      } else {
        toast.error(response.data.message || 'Failed to accept invitation');
      }
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error?.response?.data?.message || 'Something went wrong');
    },
  });
};

/**
 * Decline a pending collaboration invitation for the current user.
 * POST /slug/:slug/collaborators/decline-invitation
 */
export const useDeclineInvitation = (slug: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => StoryApi.declineInvitation(slug),
    onSuccess: (response) => {
      if (response.data.success) {
        queryClient.invalidateQueries({ queryKey: QueryKey.story.collaborators(slug) });
        toast.success(response.data.message || 'Invitation declined');
      } else {
        toast.error(response.data.message || 'Failed to decline invitation');
      }
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error?.response?.data?.message || 'Something went wrong');
    },
  });
};
