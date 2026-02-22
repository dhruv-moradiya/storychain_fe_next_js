import { StoryApi } from './stories-api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { storyKeys } from './stories.query';
import { IStorySettings } from '@/type/story/story.types';
import { toast } from '@/components/shared/toast/toast';
import { AxiosError } from 'axios';

export const useUpdateStorySettings = (slug: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (settings: Partial<IStorySettings>) => StoryApi.updateStorySettings(slug, settings),
    onSuccess: (response) => {
      if (response.data.success) {
        queryClient.invalidateQueries({ queryKey: storyKeys.settings(slug) });
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
