import type { IChapter, IChapterStats } from '../chapter/chapter.types';
import type { IImageAsset, IUserBasic, IVotes } from '../common';
import type { IChapterNodeData } from '../story-canvas.type';
import type {
  STORY_COLLABORATOR_ROLES,
  STORY_COLLABORATOR_STATUSES,
  STORY_CONTENT_RATINGS,
  STORY_GENRES,
  STORY_STATUSES,
} from './story-enum';

// ── Derived types from enums ──────────────────────────────────────────────────
type TStoryStatus = (typeof STORY_STATUSES)[number];
type TStoryCollaboratorRole = (typeof STORY_COLLABORATOR_ROLES)[number];
type TStoryCollaboratorStatus = (typeof STORY_COLLABORATOR_STATUSES)[number];
type TStoryGenres = (typeof STORY_GENRES)[number];
type TStoryContentRating = (typeof STORY_CONTENT_RATINGS)[number];

// ── Story Settings ────────────────────────────────────────────────────────────
interface IStorySettings {
  isPublic: boolean;
  allowBranching: boolean;
  requireApproval: boolean;
  allowComments: boolean;
  allowVoting: boolean;
  genres: TStoryGenres[];
  contentRating: TStoryContentRating;
}

// ── Story Stats ───────────────────────────────────────────────────────────────
interface IStoryStats {
  totalChapters: number;
  totalBranches: number;
  totalReads: number;
  totalVotes: number;
  upvotes: number;
  downvotes: number;
  score: number;
  uniqueContributors: number;
  averageRating: number;
}

// ── Story Creator ─────────────────────────────────────────────────────────────
interface IStoryCreator {
  clerkId: string;
  email: string;
  username: string;
  avatar: string;
}

// ── Story Collaborator Info (for display badges etc.) ─────────────────────────
interface IStoryCollaboratorInfo {
  clerkId: string;
  username: string;
  avatarUrl: string;
  role: TStoryCollaboratorRole;
}

/**
 * Minimal user shape returned in populated/nested API fields.
 * Alias of IUserBasic — prefer importing IUserBasic from '@/type/common' for new code.
 */
type ICollaboratorUser = IUserBasic;

// ── Main Story Interface ──────────────────────────────────────────────────────
interface IStory {
  _id: string;
  title: string;
  slug: string;
  description: string;

  coverImage?: IImageAsset;
  cardImage?: IImageAsset;

  creatorId: string;

  settings: IStorySettings;
  stats: IStoryStats;

  tags: string[];
  genres: string[];
  contentRating: TStoryContentRating;

  status: TStoryStatus;

  trendingScore: number;
  lastActivityAt: Date;
  publishedAt: Date;

  createdAt: Date;
  updatedAt: Date;
}

// ── Story Collaborator (raw DB shape) ─────────────────────────────────────────
interface IStoryCollaborator {
  _id: string;
  storyId: string;
  userId: string;
  role: TStoryCollaboratorRole;
  invitedBy?: string;
  invitedAt: Date;
  acceptedAt?: Date;
  status: TStoryCollaboratorStatus;
  createdAt?: Date;
  updatedAt?: Date;
}

// ── Story Collaborator with populated User ────────────────────────────────────
type IStoryCollaboratorWithUser = Omit<IStoryCollaborator, 'userId' | 'invitedBy'> & {
  role: TStoryCollaboratorRole;
  status: TStoryCollaboratorStatus;
  invitedBy: ICollaboratorUser | null;
  user: ICollaboratorUser;
  invitedAt: Date;
  updatedAt: Date;
};

// ── Populated Collaborator (used in Overview) ──────────────────────────────────
interface IStoryCollaboratorPopulated {
  _id: string;
  role: TStoryCollaboratorRole;
  status: TStoryCollaboratorStatus;
  details: ICollaboratorUser;
}

// ── Latest Chapter Summary (used in Overview) ─────────────────────────────────
interface IStoryLatestChapter {
  _id: string;
  storySlug: string;
  slug: string;
  title: string;
  stats: IChapterStats;
  votes: IVotes;
  displayNumber: string;
  author: ICollaboratorUser;
  createdAt: Date;
  updatedAt: Date;
}

// ── Chapter Tree ──────────────────────────────────────────────────────────────
interface IChapterTree extends IChapter {
  children: IChapterNodeData[];
}

export type {
  IChapterTree,
  ICollaboratorUser,
  IStory,
  IStoryCollaborator,
  IStoryCollaboratorInfo,
  IStoryCollaboratorWithUser,
  IStoryCollaboratorPopulated,
  IStoryLatestChapter,
  IStoryCreator,
  IStorySettings,
  IStoryStats,
  TStoryCollaboratorRole,
  TStoryCollaboratorStatus,
  TStoryStatus,
  TStoryGenres,
  TStoryContentRating,
};

// Re-export common types so story-specific consumers can get them from one place
export type { IImageAsset, IUserBasic, IVotes };
