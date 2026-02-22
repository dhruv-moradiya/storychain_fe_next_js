import { IBaseResponse } from '../base-response.type';
import { IPaginatedAutoSaveDrafts, IConvertedChapter } from './auto-save.types';

export interface IGetAutoSaveDraftResponse extends IBaseResponse<IPaginatedAutoSaveDrafts> {}

export interface IChapterAutoSaveContentResponse extends IBaseResponse<{
  _id: string;
  saveCount: number;
}> {}

export interface IConvertAutoSaveToDraftResponse extends IBaseResponse<IConvertedChapter> {}
export interface IConvertAutoSaveToPublishedResponse extends IBaseResponse<IConvertedChapter> {}
