import { TGalleryCategory } from './gallery-images.types';

export interface ICreateGalleryImagePayload {
  url: string;
  publicId: string;
  title?: string;
  caption?: string;
  category?: TGalleryCategory;
  tags?: string[];
  chapterSlug?: string;
  albumId?: string;
  isMoodboard?: boolean;
}
