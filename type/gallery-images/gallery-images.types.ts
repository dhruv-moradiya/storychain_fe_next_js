import { GALLERY_IMAGE_CATEGORIES } from './gallery-images-enum';

export type TGalleryCategory = (typeof GALLERY_IMAGE_CATEGORIES)[number];

export interface IGalleryImage {
  _id: string;
  storySlug: string;
  uploadedBy: string;

  // The asset
  url: string;
  publicId: string;

  // Metadata
  title?: string;
  caption?: string;
  category: TGalleryCategory;
  tags?: string[];

  // Context links
  chapterSlug?: string;
  albumId?: string;

  // Flags
  isMoodboard: boolean;
  sortOrder: number;

  createdAt: string;
  updatedAt: string;
}
