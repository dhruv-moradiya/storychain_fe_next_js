import { IAlbumQueryFilters } from '@/type/album/album-request.types';
import { IGetAlbumDetailsResponse, IGetAlbumsResponse } from '@/type/album/album-response.types';
import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { QueryKey } from '@/lib/query-keys';

import { AlbumsApi } from './albums-api';

export const useGetAlbumsByStory = (
  storySlug: string,
  filters?: IAlbumQueryFilters,
  options?: Omit<
    UseQueryOptions<
      IGetAlbumsResponse,
      AxiosError,
      IGetAlbumsResponse,
      ReturnType<typeof QueryKey.album.byStorySlug>
    >,
    'queryKey' | 'queryFn'
  >
) => {
  return useQuery({
    queryKey: QueryKey.album.byStorySlug(storySlug, filters),
    queryFn: async () => {
      const res = await AlbumsApi.GetAlbumsByStory(storySlug, filters);
      return res.data;
    },
    enabled: !!storySlug,
    ...options,
  });
};

export const useGetAlbumById = (
  albumId: string,
  options?: Omit<
    UseQueryOptions<
      IGetAlbumDetailsResponse,
      AxiosError,
      IGetAlbumDetailsResponse,
      ReturnType<typeof QueryKey.album.byId>
    >,
    'queryKey' | 'queryFn'
  >
) => {
  return useQuery({
    queryKey: QueryKey.album.byId(albumId),
    queryFn: async () => {
      const res = await AlbumsApi.GetAlbumById(albumId);
      return res.data;
    },
    enabled: !!albumId,
    ...options,
  });
};
