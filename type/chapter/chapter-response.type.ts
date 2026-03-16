import { IBaseResponse } from '../base-response.type';
import { IChapterAuthorDetail, IChapterDetail } from './chapter-detail.type';
import { TChapterStatus } from './chapter.types';

interface IUserChapters {
  _id: string;
  title: string;
  slug: string;
  storyTitle: string;
  storySlug: string;
  status: TChapterStatus;
  isEnding?: boolean;
  version?: number;
  displayNumber: string;

  votes: {
    upvotes: number;
    downvotes: number;
  };

  stats: {
    reads: number;
    comments: number;
    childBranches: number;
    uniqueReaders?: number;
    completionRate?: number;
  };

  pullRequest?: {
    isPR: boolean;
    status: string;
    prId?: string;
  };

  // Moderation
  reportCount?: number;
  isFlagged?: boolean;

  updatedAt: string;
}

interface IUserChaptersResponse extends IBaseResponse<IUserChapters[]> {}

interface IChapterSearchItem {
  _id: string;
  title: string;
  slug: string;
}

interface IChapterSearchResponse extends IBaseResponse<IChapterSearchItem[]> {}

// For chapter details page

interface IChapterNavInfo {
  slug: string;
  title: string;
}

interface IChapterDetailExtended extends IChapterDetail {
  author: IChapterAuthorDetail;
  previousChapters: IChapterNavInfo[];
  nextChapters: IChapterNavInfo[];
}

interface IChapterDetailResponse extends IBaseResponse<IChapterDetailExtended> {}

// For chapter details page, reading sesstions

interface IChapterStartReadingSessionResponse extends IBaseResponse<null> {}

interface IChapterRecordReadingSessionResponse extends IBaseResponse<null> {}

export type {
  IUserChapters,
  IUserChaptersResponse,
  IChapterSearchItem,
  IChapterSearchResponse,
  IChapterNavInfo,
  IChapterDetailExtended,
  IChapterDetailResponse,
  IChapterStartReadingSessionResponse,
  IChapterRecordReadingSessionResponse,
};
