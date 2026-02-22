import { AutoSaveType } from './auto-save-enum';

export interface IAutoSaveContentBaseRequest {
  title: string;
  content: string;
  storySlug?: string;
  autoSaveId?: string;
}

export interface IAutoSaveRootChapterRequest extends IAutoSaveContentBaseRequest {
  autoSaveType: AutoSaveType.ROOT_CHAPTER;
}

export interface IAutoSaveNewChapterRequest extends IAutoSaveContentBaseRequest {
  autoSaveType: AutoSaveType.NEW_CHAPTER;
  parentChapterId: string;
}

export interface IAutoSaveUpdateChapterRequest extends IAutoSaveContentBaseRequest {
  autoSaveType: AutoSaveType.UPDATE_CHAPTER;
  parentChapterId: string;
  chapterId: string;
}

export type TAutoSaveContentRequest =
  | IAutoSaveRootChapterRequest
  | IAutoSaveNewChapterRequest
  | IAutoSaveUpdateChapterRequest;
