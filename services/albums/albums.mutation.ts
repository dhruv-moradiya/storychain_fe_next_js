import {
  IAddImagesToAlbumPayload,
  ICreateAlbumPayload,
  IUpdateAlbumPayload,
} from '@/type/album/album-request.types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { toast } from '@/components/shared/toast/toast';
import { getErrorMessage } from '@/lib/error';
import { QueryKey } from '@/lib/query-keys';

import { AlbumsApi } from './albums-api';

export const useCreateAlbum = (storySlug: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: ICreateAlbumPayload) => AlbumsApi.CreateAlbum(storySlug, payload),
    onSuccess: (response) => {
      if (response.data.success) {
        queryClient.invalidateQueries({
          queryKey: QueryKey.album.byStorySlug(storySlug),
        });
        toast.success(response.data.message || 'Album created successfully');
      } else {
        toast.error(response.data.message || 'Failed to create album');
      }
    },
    onError: (error: AxiosError<{ message: string }> | unknown) => {
      toast.error(getErrorMessage(error, 'Something went wrong while creating album'));
    },
  });
};

export const useAddImagesToAlbum = (albumId: string, storySlug?: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: IAddImagesToAlbumPayload) => AlbumsApi.AddImagesToAlbum(albumId, payload),
    onSuccess: (response) => {
      if (response.data.success) {
        queryClient.invalidateQueries({
          queryKey: QueryKey.album.byId(albumId),
        });
        if (storySlug) {
          queryClient.invalidateQueries({
            queryKey: QueryKey.album.byStorySlug(storySlug),
          });
        }
        toast.success(response.data.message || 'Images added to album');
      } else {
        toast.error(response.data.message || 'Failed to add images');
      }
    },
    onError: (error: AxiosError<{ message: string }> | unknown) => {
      toast.error(getErrorMessage(error, 'Something went wrong while adding images'));
    },
  });
};

export const useUpdateAlbum = (albumId: string, storySlug?: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: IUpdateAlbumPayload) => AlbumsApi.UpdateAlbum(albumId, payload),
    onSuccess: (response) => {
      if (response.data.success) {
        queryClient.invalidateQueries({
          queryKey: QueryKey.album.byId(albumId),
        });
        if (storySlug) {
          queryClient.invalidateQueries({
            queryKey: QueryKey.album.byStorySlug(storySlug),
          });
        }
        toast.success(response.data.message || 'Album updated successfully');
      } else {
        toast.error(response.data.message || 'Failed to update album');
      }
    },
    onError: (error: AxiosError<{ message: string }> | unknown) => {
      toast.error(getErrorMessage(error, 'Something went wrong while updating album'));
    },
  });
};

export const useDeleteAlbum = (storySlug?: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (albumId: string) => AlbumsApi.DeleteAlbum(albumId),
    onSuccess: (response, albumId) => {
      if (response.data.success) {
        queryClient.invalidateQueries({
          queryKey: QueryKey.album.byId(albumId),
        });
        if (storySlug) {
          queryClient.invalidateQueries({
            queryKey: QueryKey.album.byStorySlug(storySlug),
          });
        }
        toast.success(response.data.message || 'Album deleted successfully');
      } else {
        toast.error(response.data.message || 'Failed to delete album');
      }
    },
    onError: (error: AxiosError<{ message: string }> | unknown) => {
      toast.error(getErrorMessage(error, 'Something went wrong while deleting album'));
    },
  });
};
