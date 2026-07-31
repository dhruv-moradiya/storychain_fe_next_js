import {
  IAddImagesToAlbumPayload,
  IAlbumQueryFilters,
  ICreateAlbumPayload,
  IUpdateAlbumPayload,
} from '@/type/album/album-request.types';
import {
  IAddImagesToAlbumResponse,
  ICreateAlbumResponse,
  IDeleteAlbumResponse,
  IGetAlbumDetailsResponse,
  IGetAlbumsResponse,
  IUpdateAlbumResponse,
} from '@/type/album/album-response.types';

import apiClient from '@/lib/api-client';

export const AlbumsApi = {
  GetAlbumsByStory: async (storySlug: string, filters?: IAlbumQueryFilters) => {
    return await apiClient.get<IGetAlbumsResponse>(`/albums/slug/${storySlug}`, {
      params: filters,
    });
  },

  GetAlbumById: async (albumId: string) => {
    return await apiClient.get<IGetAlbumDetailsResponse>(`/albums/${albumId}`);
  },

  CreateAlbum: async (storySlug: string, payload: ICreateAlbumPayload) => {
    return await apiClient.post<ICreateAlbumResponse>(`/albums/slug/${storySlug}`, payload);
  },

  AddImagesToAlbum: async (albumId: string, payload: IAddImagesToAlbumPayload) => {
    return await apiClient.post<IAddImagesToAlbumResponse>(`/albums/${albumId}/images`, payload);
  },

  UpdateAlbum: async (albumId: string, payload: IUpdateAlbumPayload) => {
    return await apiClient.patch<IUpdateAlbumResponse>(`/albums/${albumId}`, payload);
  },

  DeleteAlbum: async (albumId: string) => {
    return await apiClient.delete<IDeleteAlbumResponse>(`/albums/${albumId}`);
  },
};
