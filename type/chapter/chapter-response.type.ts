import { IBaseResponse } from '../base-response.type';
import { TChapterStatus } from './chapter.types';

interface IUserChapters {
  id: string;
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

export type { IUserChapters, IUserChaptersResponse };
