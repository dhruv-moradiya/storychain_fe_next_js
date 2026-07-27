import { IBaseResponse } from '../base-response.type';
import { IConvertedChapter, IPaginatedAutoSaveDrafts } from './auto-save.types';

export interface IGetAutoSaveDraftResponse extends IBaseResponse<IPaginatedAutoSaveDrafts> {}

export interface IChapterAutoSaveContentResponse extends IBaseResponse<{
  _id: string;
  saveCount: number;
}> {}

export interface IConvertAutoSaveResponse extends IBaseResponse<IConvertedChapter> {}

export interface IAutoSaveSearchItem {
  _id: string;
  title: string;
  chapterSlug: string | null;
  parentChapterSlug?: string | null;
  storySlug: string;
  autoSaveType: string;
  wordCount: number;
  lastSavedAt: string;
}

export interface IAutoSaveSearchResponse extends IBaseResponse<IAutoSaveSearchItem[]> {}
