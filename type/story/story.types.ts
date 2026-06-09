import type { IChapter, IChapterStats } from '../chapter/chapter.types';
import type { IImageAsset, IUserBasic, IVotes } from '../common';
import type { IChapterNodeData } from '../story-canvas.type';
import type {
  STORY_COLLABORATOR_ROLES,
  STORY_COLLABORATOR_ROLE_CONFIG,
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

// ── Role Config Derived Types ─────────────────────────────────────────────────

/** All individual permission keys (e.g. 'canEditStorySettings', 'canDeleteStory', …) */
type TStoryCollaboratorPermission =
  keyof (typeof STORY_COLLABORATOR_ROLE_CONFIG)[TStoryCollaboratorRole]['permissions'];

/** The full permissions object shape for any collaborator role */
type TStoryCollaboratorPermissions =
  (typeof STORY_COLLABORATOR_ROLE_CONFIG)[TStoryCollaboratorRole]['permissions'];

/** Shape of a single role's config entry (name, description, permissions) */
interface IStoryCollaboratorRoleConfig {
  name: string;
  description: string;
  permissions: TStoryCollaboratorPermissions;
}

/**
 * Extends `TStoryCollaboratorRole` with `'reader'` to cover users who are NOT
 * collaborators — they can only read the story.
 */
type TStoryCollaboratorRoleOrReader = TStoryCollaboratorRole | 'reader';

interface IStorySettings {
  isPublic: boolean;
  allowBranching: boolean;
  requireApproval: boolean;
  allowComments: boolean;
  allowVoting: boolean;
  genres: TStoryGenres[];
  contentRating: TStoryContentRating;
}

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

interface IStoryCreator {
  clerkId: string;
  email: string;
  username: string;
  avatar: string;
}

interface IStoryCollaboratorPreview {
  clerkId: string;
  username: string;
  email: string;
  avatarUrl: string;
  role: TStoryCollaboratorRole;
}

type ICollaboratorUser = Omit<IStoryCollaboratorPreview, 'role'>;

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

type IStoryCollaboratorWithUser = Omit<IStoryCollaborator, 'userId' | 'invitedBy'> & {
  role: TStoryCollaboratorRole;
  status: TStoryCollaboratorStatus;
  invitedBy: ICollaboratorUser | null;
  user: ICollaboratorUser;
  invitedAt: Date;
  updatedAt: Date;
};

interface IStoryCollaboratorPopulated {
  username: string;
  avatar: string;
  email: string;
  clerkId: string;
  role: TStoryCollaboratorRole;
  status: TStoryCollaboratorStatus;
}

interface IStoryLatestChapter {
  storySlug: string;
  slug: string;
  title: string;

  stats: IChapterStats;
  votes: IVotes;
  author: ICollaboratorUser;
  // createdAt: Date;
  // updatedAt: Date;
}

interface IChapterTree extends IChapter {
  children: IChapterNodeData[];
}

export type {
  IChapterTree,
  ICollaboratorUser,
  IStory,
  IStoryCollaborator,
  IStoryCollaboratorPreview,
  IStoryCollaboratorWithUser,
  IStoryCollaboratorPopulated,
  IStoryLatestChapter,
  IStoryCreator,
  IStorySettings,
  IStoryStats,
  IStoryCollaboratorRoleConfig,
  TStoryCollaboratorRole,
  TStoryCollaboratorRoleOrReader,
  TStoryCollaboratorPermission,
  TStoryCollaboratorPermissions,
  TStoryCollaboratorStatus,
  TStoryStatus,
  TStoryGenres,
  TStoryContentRating,
};

// Re-export common types so story-specific consumers can get them from one place
export type { IImageAsset, IUserBasic, IVotes };
