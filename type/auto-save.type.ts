import { IBaseResponse } from './base-response.type';

export type TAutoSaveType = 'update_chapter' | 'new_chapter' | 'root_chapter';

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

export interface IGetAutoSaveDraftResponse extends IBaseResponse<IPaginatedAutoSaveDrafts> {}

export interface IAutoSaveContentBaseRequest {
  title: string;
  content: string;
  storySlug?: string;
  autoSaveId?: string;
}

export interface IAutoSaveRootChapterRequest extends IAutoSaveContentBaseRequest {
  autoSaveType: 'root_chapter';
}

export interface IAutoSaveNewChapterRequest extends IAutoSaveContentBaseRequest {
  autoSaveType: 'new_chapter';
  parentChapterId: string;
}

export interface IAutoSaveUpdateChapterRequest extends IAutoSaveContentBaseRequest {
  autoSaveType: 'update_chapter';
  parentChapterId: string;
  chapterId: string;
}

export type TAutoSaveContentRequest =
  | IAutoSaveRootChapterRequest
  | IAutoSaveNewChapterRequest
  | IAutoSaveUpdateChapterRequest;

export interface IChapterAutoSaveContentResponse extends IBaseResponse<{
  _id: string;
  saveCount: number;
}> {}

export interface IConvertedChapter {
  _id: string;
  title: string;
  content: string;
  storyId: string;
  authorId: string;
  parentChapterId?: string;
  ancestorIds: string[];
  depth: number;
  status: 'pending_approval' | 'published';
  createdAt: string;
  updatedAt: string;
}

export interface IConvertAutoSaveToDraftResponse extends IBaseResponse<IConvertedChapter> {}
export interface IConvertAutoSaveToPublishedResponse extends IBaseResponse<IConvertedChapter> {}
