import { ICreateGalleryImagePayload } from '@/type/gallery-images/gallery-images-request.types';
import {
  IAddGalleryImageResponse,
  IGenerateGalleryImageSignatureResponse,
  IGetGalleryImagesResponse,
} from '@/type/gallery-images/gallery-images-response.types';

import apiClient from '@/lib/api-client';

export const GalleryImagesApi = {
  GetGalleryImagesBySlug: async (storySlug: string) => {
    return await apiClient.get<IGetGalleryImagesResponse>(`/gallery-images/slug/${storySlug}`);
  },

  AddGalleryImage: async (storySlug: string, payload: ICreateGalleryImagePayload) => {
    return await apiClient.post<IAddGalleryImageResponse>(
      `/gallery-images/slug/${storySlug}`,
      payload
    );
  },

  GenerateSignature: async (storySlug: string) => {
    return await apiClient.post<IGenerateGalleryImageSignatureResponse>(
      `/gallery-images/slug/${storySlug}/signature`
    );
  },
};
