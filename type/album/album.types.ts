import { IGalleryImage } from '../gallery-images';
import { ALBUM_VISIBILITIES } from './album-enum';

export type TAlbumVisibility = (typeof ALBUM_VISIBILITIES)[number];

export interface IAlbum {
  _id: string;
  storySlug: string;
  createdBy: string;
  title: string;
  description?: string;
  tags: string[];
  visibility: TAlbumVisibility;
  sortOrder: number;
  imageCount?: number;
  createdAt: string;
  updatedAt: string;
}

export interface IAlbumWithImages extends IAlbum {
  images: IGalleryImage[];
}
