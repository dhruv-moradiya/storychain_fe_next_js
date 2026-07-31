import { IGetGalleryImagesResponse } from '@/type/gallery-images/gallery-images-response.types';
import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { QueryKey } from '@/lib/query-keys';

import { GalleryImagesApi } from './gallery-images-api';

const getGalleryImagesQueryFn = async (storySlug: string) => {
  const response = await GalleryImagesApi.GetGalleryImagesBySlug(storySlug);
  return response.data;
};

export const useGetGalleryImages = (
  storySlug: string,
  options?: Omit<
    UseQueryOptions<
      IGetGalleryImagesResponse,
      AxiosError,
      IGetGalleryImagesResponse,
      ReturnType<typeof QueryKey.galleryImages.byStorySlug>
    >,
    'queryKey' | 'queryFn'
  >
) => {
  return useQuery({
    queryKey: QueryKey.galleryImages.byStorySlug(storySlug),
    queryFn: () => getGalleryImagesQueryFn(storySlug),
    enabled: !!storySlug,
    ...options,
  });
};

export { getGalleryImagesQueryFn };
