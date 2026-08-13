import { IBaseResponse } from '@/type/base-response.type';
// -----------------
// USER DETAIL PAGE
// -----------------
import { IStory } from '@/type/story/story.types';

import { AUTH_PROVIDER, PlatformRole, TPlatformRoleType } from './user-enum';
import { TBanType } from './user-request.type';

export type TAuthProvider = (typeof AUTH_PROVIDER)[number];

export interface IBanHistory {
  _id: string;

  userId: string; // Clerk ID of the banned user
  bannedBy: string; // Clerk ID of the moderator who issued the ban

  reason: string;
  reportId?: string; // The report that led to this ban (optional)

  banType: TBanType;
  durationDays?: number; // undefined when banType === 'PERMANENT'
  expiresAt?: Date; // undefined when banType === 'PERMANENT'

  isActive: boolean;

  liftedAt?: Date;
  liftedBy?: string; // Clerk ID of user who lifted the ban
  liftedReason?: string;

  evidenceUrls: string[];
  internalNotes?: string;

  createdAt: Date;
  updatedAt: Date;
}

export interface IUserBadge {
  name?: string;
  description?: string;
  iconUrl?: string;
}

export interface IUserStats {
  storiesCreated: number;
  chaptersWritten: number;
  totalUpvotes: number;
  totalDownvotes: number;
  branchesCreated: number;
}

export interface IUserPreferences {
  theme?: 'light' | 'dark' | 'system' | 'auto' | string;
  notificationsEnabled?: boolean;
}

export interface IPublicUserResponse {
  clerkId: string;
  username: string;
  avatarUrl: string;
}

export interface IConnectedAccount {
  provider: TAuthProvider;
  providerAccountId: string;
  email?: string;
  username?: string;
  avatarUrl?: string;
  connectedAt: Date;
}

export interface IBanDetails {
  banType: TBanType;
  bannedBy: IPublicUserResponse;
  createdAt: string;
  durationDays: number;
  expiresAt: string;
  reason: string;
}

export interface IBaseUser {
  clerkId: string;
  username: string;
  email: string;
  bio: string;
  avatarUrl: string;
  xp: number;
  level: number;
  badges: IUserBadge[];
  stats: IUserStats;
  preferences: IUserPreferences;
  lastActive: string;
  isActive?: boolean;
  createdAt: string;
  updatedAt: string;
  role: PlatformRole;
}

export interface IActiveUser extends IBaseUser {
  isBanned: false;
  banDetails?: never;
}

export interface IBannedUser extends IBaseUser {
  isBanned: true;
  banDetails: IBanDetails;
}

export type IUser = IActiveUser | IBannedUser;

export type IMeResponse = IBaseResponse<IUser>;

// -----------------
// PAGINATED USER LIST
// -----------------

export interface IPaginatedUserData extends Omit<IUser, 'badges' | 'role'> {
  badges: string[];
  connectedAccounts: IConnectedAccount[];
  primaryAuthMethod: TAuthProvider;
  emailVerified: boolean;
  role: TPlatformRoleType;
}

export interface IPaginatedUserResponseData {
  docs: IPaginatedUserData[];
  totalDocs: number;
  limit: number;
  page: number;
  totalPages: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: number | null;
  nextPage: number | null;
}

export type IPaginatedUserListResponse = IBaseResponse<IPaginatedUserResponseData>;

// -----------------
// WALLET
// -----------------

export interface IWallet {
  _id: string;
  userId: string;
  balance: number;
  totalEarned: number;
  totalSpent: number;
  totalWithdrawn: number;
  pendingWithdrawal: number;
  createdAt: string;
  updatedAt: string;
}

export type TGetWalletResponse = IBaseResponse<IWallet>;

export type IBanUserResponse = IBaseResponse<IBanHistory>;

export interface IUserBadgeDetail {
  id: string;
  name: string;
  description: string;
  icon: string;
  isUnlocked: boolean;
}

export interface IUserAchievementsResponse {
  badges: IUserBadgeDetail[];
  level: number;
  levelTitle: string;
  xp: number;
  nextLevelXp: number;
}

export interface IUserChapterWrittenItem {
  _id: string;
  title: string;
  slug: string;
  storySlug: string;
  storyTitle?: string;
  chapterNumber?: number;
  depth: number;
  status: string;
  votes?: {
    upvotes: number;
    downvotes: number;
    score: number;
  };
  stats?: {
    reads: number;
    comments: number;
    childBranches: number;
  };
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface IUserDetailPageData {
  user: {
    clerkId: string;
    username: string;
    email: string;
    bio?: string;
    avatarUrl?: string;
    level: number;
    levelTitle: string;
    xp: number;
    nextLevelXp: number;
    stats: IUserStats;
    isActive: boolean;
    lastActive: Date | string;
    createdAt: Date | string;
  };
  stories: IStory[];
  achievements: IUserAchievementsResponse;
  chaptersWritten: IUserChapterWrittenItem[];
}

export type IUserDetailPageResponse = IBaseResponse<IUserDetailPageData>;
