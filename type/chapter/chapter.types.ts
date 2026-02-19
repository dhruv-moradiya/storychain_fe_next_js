import { CHAPTER_PR_STATUSES, CHAPTER_STATUSES } from './chapter-enum';

export type TChapterStatus = (typeof CHAPTER_STATUSES)[number];
export type TChapterPRStatus = (typeof CHAPTER_PR_STATUSES)[number];

export interface IChapterStats {
  reads: number;
  uniqueReaders: number;

  completions: number;
  dropOffs: number;

  totalReadTime: number; // sum of all users
  avgReadTime: number;

  completionRate: number; // percentage
  engagementScore: number; // 0-100 score

  comments: number;
  childBranches: number;
}

/**
 * Represents a single chapter within a story.
 */
export interface IChapter {
  _id: string;
  slug: string;
  storySlug: string;

  parentChapterSlug?: string | null;
  ancestorSlugs: string[];
  depth: number;
  authorId: string;
  content: string;
  title: string;

  votes: {
    upvotes: number;
    downvotes: number;
    score: number;
  };

  status: TChapterStatus;
  isEnding: boolean;

  pullRequest: {
    isPR: boolean;
    prId?: string;
    status: TChapterPRStatus;
    submittedAt?: Date;
    reviewedBy?: string;
    reviewedAt?: Date;
    rejectionReason?: string;
  };

  version: number;
  previousVersionId?: string;

  stats: IChapterStats;

  reportCount: number;
  isFlagged: boolean;
  createdAt: Date;
  updatedAt: Date;
}
