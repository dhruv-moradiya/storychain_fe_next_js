import { AUTO_SAVE_TYPES, CONVERTED_CHAPTER_STATUSES } from './auto-save-enum';

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

export interface IPaginatedAutoSaveDrafts {
  docs: IChapterAutoSave[];
  totalDocs: number;
  limit: number;
  totalPages: number;
  page: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: number | null;
  nextPage: number | null;
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
