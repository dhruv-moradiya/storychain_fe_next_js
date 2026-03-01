import { AUTO_SAVE_TYPES, CONVERTED_CHAPTER_STATUSES } from './auto-save-enum';
import type { IPagination } from '../common';

export type TAutoSaveType = (typeof AUTO_SAVE_TYPES)[number];

export interface IChapterAutoSave {
  _id: string;
  chapterId?: string;
  userId: string;
  content: string;
  title: string;
  lastSavedAt: string | Date; // Backend might return string
  isEnabled: boolean;
  saveCount: number;
  autoSaveType: TAutoSaveType;
  storyId: string;
  storySlug?: string;
  parentChapterId?: string;
}

/** Paginated list of auto-save drafts. */
export interface IPaginatedAutoSaveDrafts extends IPagination {
  docs: IChapterAutoSave[];
}

export interface IConvertedChapter {
  _id: string;
  title: string;
  content: string;
  storyId: string;
  authorId: string;
  parentChapterId?: string;
  ancestorIds: string[];
  depth: number;
  status: (typeof CONVERTED_CHAPTER_STATUSES)[number];
  createdAt: string;
  updatedAt: string;
}
