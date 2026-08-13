import { ISendInvitationBody } from '@/type/story/story-response.type';
import { IStorySettings, TStoryStatus } from '@/type/story/story.types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { toast } from '@/components/shared/toast/toast';
import { getErrorMessage } from '@/lib/error';
import { QueryKey } from '@/lib/query-keys';
import { TStoryFormValues } from '@/lib/schemas/story.schema';

import { StoryApi } from './stories-api';

export const useCreateStory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: TStoryFormValues) => StoryApi.createStory(payload),
    onSuccess: (response) => {
      if (response.data.success) {
        queryClient.invalidateQueries({ queryKey: ['story'] });
        toast.success(response.data.message || 'Story created successfully');
      } else {
        toast.error(response.data.message || 'Failed to create story');
      }
    },
    onError: (error: unknown) => {
      toast.error(getErrorMessage(error, 'Something went wrong while creating story'));
    },
  });
};

export const usePublishStory = () => {
  // const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (slug: string) => StoryApi.publishStory(slug),
    onSuccess: (response) => {
      if (response.data.success) {
        // queryClient.invalidateQueries({ queryKey: QueryKey.story.stats(slug) });
        toast.success(response.data.message || 'Story published successfully');
      } else {
        toast.error(response.data.message || 'Failed to publish story');
      }
    },
    onError: (error: unknown) => {
      toast.error(getErrorMessage(error));
    },
  });
};

export const useUpdateStoryStatus = (slug: string, status?: TStoryStatus) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newStatus?: TStoryStatus) => {
      const targetStatus = newStatus || status;
      if (!targetStatus) throw new Error('Status is required');
      return StoryApi.updateStatus(slug, targetStatus);
    },
    onSuccess: (response) => {
      if (response.data.success) {
        queryClient.invalidateQueries({ queryKey: QueryKey.story.bySlug(slug) });
        queryClient.invalidateQueries({ queryKey: QueryKey.story.settingsBySlug(slug) });
        toast.success(response.data.message || 'Story status updated successfully');
      } else {
        toast.error(response.data.message || 'Failed to update story status');
      }
    },
    onError: (error: unknown) => {
      toast.error(getErrorMessage(error));
    },
  });
};

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

export const useUploadStoryImage = (slug: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ file, type }: { file: File; type: 'cover' | 'card' }) => {
      // 1. Get signature URL
      const signatureResponse = await StoryApi.getSignatureUrl(slug);
      if (!signatureResponse.data.success || !signatureResponse.data.data.uploadURL) {
        throw new Error('Failed to get upload signature');
      }

      const uploadURL = signatureResponse.data.data.uploadURL;

      // Parse the uploadURL
      const url = new URL(uploadURL);
      const searchParams = url.searchParams;

      // 2. Upload to Cloudinary
      const formData = new FormData();
      formData.append('file', file);

      const timestamp = searchParams.get('timestamp');
      const signature = searchParams.get('signature');
      const apiKey = searchParams.get('api_key');
      const folder = searchParams.get('folder');
      const eager = searchParams.get('eager'); // auto-decoded from percent-encoding

      if (timestamp) formData.append('timestamp', timestamp);
      if (signature) formData.append('signature', signature);
      if (apiKey) formData.append('api_key', apiKey);
      if (folder) formData.append('folder', folder);
      // eager must be sent — the backend signature was computed over { eager, folder, timestamp }
      if (eager) formData.append('eager', eager);

      // Cloudinary upload API URL is the uploadURL without query params
      const uploadEndpoint = `${url.origin}${url.pathname}`;

      const cloudinaryResponse = await fetch(uploadEndpoint, {
        method: 'POST',
        body: formData,
      });

      if (!cloudinaryResponse.ok) {
        throw new Error('Failed to upload image to Cloudinary');
      }

      const cloudinaryData = await cloudinaryResponse.json();

      // 3. Update story data
      let updateResponse;
      if (type === 'cover') {
        const coverPayload = {
          url: cloudinaryData.secure_url,
          publicId: cloudinaryData.public_id,
        };
        updateResponse = await StoryApi.updateStoryCoverImage(slug, coverPayload);
      } else {
        const thumbnailUrl =
          cloudinaryData.eager && cloudinaryData.eager.length > 0
            ? cloudinaryData.eager[0].secure_url
            : cloudinaryData.secure_url;

        const cardPayload = {
          url: cloudinaryData.secure_url,
          publicId: cloudinaryData.public_id,
          thumbnailUrl,
        };
        updateResponse = await StoryApi.updateStoryCardImage(slug, cardPayload);
      }

      return updateResponse.data;
    },
    onSuccess: (data, variables) => {
      if (data.success) {
        queryClient.invalidateQueries({ queryKey: QueryKey.story.settingsBySlug(slug) });
        queryClient.invalidateQueries({ queryKey: QueryKey.story.overviewBySlug(slug) });
        toast.success(
          data.message ||
            `${variables.type === 'cover' ? 'Cover' : 'Card'} image updated successfully`
        );
      } else {
        toast.error(data.message || 'Failed to update image');
      }
    },
    onError: (error: unknown) => {
      toast.error(getErrorMessage(error, 'Something went wrong while uploading image'));
    },
  });
};
