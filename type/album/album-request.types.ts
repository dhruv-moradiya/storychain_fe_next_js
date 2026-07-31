import { TAlbumVisibility } from './album.types';

export interface ICreateAlbumPayload {
  title: string;
  description?: string;
  tags?: string[];
  visibility?: TAlbumVisibility;
  sortOrder?: number;
}

export interface IAddImagesToAlbumPayload {
  imageIds: string[];
}

export interface IUpdateAlbumPayload {
  title?: string;
  description?: string;
  tags?: string[];
  visibility?: TAlbumVisibility;
  sortOrder?: number;
}

export interface IAlbumQueryFilters {
  visibility?: TAlbumVisibility;
}
