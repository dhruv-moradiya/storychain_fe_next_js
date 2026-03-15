import { IChapterStats, TChapterPRStatus, TChapterStatus } from './chapter.types';

export interface IChapterAuthorDetail {
  clerkId: string;
  username: string;
  avatarUrl: string;
  displayName: string;
  email?: string;
}

export interface IChapterVersion {
  _id: string;
  chapterSlug: string;
  version: number;
  content: string;
  title?: string;
  editedBy: string;
  editedByUser?: IChapterAuthorDetail;
  editReason?: string;
  changesSummary?: string;
  editType: 'manual_edit' | 'pr_merge' | 'auto_save' | 'initial_create';
  prId?: string;
  previousVersionId?: string;
  changeMetadata?: {
    characterCountDelta?: number;
    wordCountDelta?: number;
  };
  isVisible: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface IComment {
  _id: string;
  chapterSlug: string;
  userId: string;
  user?: IChapterAuthorDetail;
  parentCommentId: string | null;
  content: string;
  votes: {
    upvotes: number;
    downvotes: number;
  };
  createdAt: string;
  isEdited: boolean;
  editedAt?: string;
  isDeleted: boolean;
  reportCount: number;
  replies?: IComment[];
}

export interface IChapterDetail {
  _id: string;
  slug: string;
  storySlug: string;
  storyTitle?: string;

  // Tree structure
  parentChapterSlug: string | null;
  ancestorSlugs: string[];
  depth: number;
  branchIndex: number;

  // Author
  authorId: string;

  // Content
  content: string;
  title: string;
  chapterNumber?: number;

  // Voting
  votes: {
    upvotes: number;
    downvotes: number;
    score: number;
  };

  // Status
  status: TChapterStatus;
  isEnding: boolean;

  // Pull Request
  pullRequest: {
    isPR: boolean;
    prId?: string;
    status?: TChapterPRStatus;
    submittedAt?: string;
    reviewedBy?: string;
    reviewedAt?: string;
    rejectionReason?: string;
  };

  // Version control
  version: number;
  previousVersionId?: string;

  // Statistics
  stats: IChapterStats;

  // Moderation
  reportCount: number;
  isFlagged: boolean;

  createdAt: string;
  updatedAt: string;
}
