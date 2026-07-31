import { ICreateGalleryImagePayload } from '@/type/gallery-images/gallery-images-request.types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { toast } from '@/components/shared/toast/toast';
import { getErrorMessage } from '@/lib/error';
import { QueryKey } from '@/lib/query-keys';

import { GalleryImagesApi } from './gallery-images-api';

/**
 * Mutation hook to add a gallery image to a story.
 */
export const useAddGalleryImage = (storySlug: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: ICreateGalleryImagePayload) =>
      GalleryImagesApi.AddGalleryImage(storySlug, payload),
    onSuccess: (response) => {
      if (response.data.success) {
        queryClient.invalidateQueries({
          queryKey: QueryKey.galleryImages.byStorySlug(storySlug),
        });
        toast.success(response.data.message || 'Image added successfully');
      } else {
        toast.error(response.data.message || 'Failed to add image');
      }
    },
    onError: (error: AxiosError<{ message: string }> | unknown) => {
      toast.error(getErrorMessage(error, 'Something went wrong while adding image'));
    },
  });
};

/**
 * Mutation hook to generate a Cloudinary upload signature for a gallery image.
 */
export const useGenerateGalleryImageSignature = (storySlug: string) => {
  return useMutation({
    mutationFn: () => GalleryImagesApi.GenerateSignature(storySlug),
    onError: (error: AxiosError<{ message: string }> | unknown) => {
      toast.error(getErrorMessage(error, 'Failed to generate upload signature'));
    },
  });
};
