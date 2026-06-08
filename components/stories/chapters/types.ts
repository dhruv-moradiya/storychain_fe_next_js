import type { TChapterPRStatus, TChapterStatus } from '@/type/chapter/chapter.types';

export interface IChapterTableRow {
  _id: string;
  slug: string;
  storySlug: string;

  // Tree
  parentChapterSlug: string | null;
  ancestorSlugs: string[];
  depth: number;
  branchIndex: number;

  // Author
  authorId: string;
  authorName: string;

  // Content
  title: string;
  content: string;
  chapterNumber: number | null;

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
  };

  // Version
  version: number;

  // Stats
  stats: {
    reads: number;
    uniqueReaders: number;
    completionRate: number;
    engagementScore: number;
    comments: number;
    childBranches: number;
  };

  // Moderation
  reportCount: number;
  isFlagged: boolean;

  // Coin gating
  coinPrice: number;
  isUnlockedByUser: boolean;

  // Timestamps
  createdAt: string;
  updatedAt: string;

  // Nested children for expansion
  subRows?: IChapterTableRow[];
}

export type UserRole = 'owner' | 'co_author' | 'moderator' | 'reviewer' | 'contributor' | 'reader';

export interface IChaptersTableContext {
  isOwnerOrPrivileged: boolean;
  currentUserId: string;
  userRole: UserRole;
}
