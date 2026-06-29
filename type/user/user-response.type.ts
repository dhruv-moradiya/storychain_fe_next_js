import { IBaseResponse } from '@/type/base-response.type';

import { PlatformRole } from './user-enum';

export interface IUserBadge {
  name?: string;
  description?: string;
  iconUrl?: string;
}

export interface IUserStats {
  storiesPublished?: number;
  chaptersPublished?: number;
  totalReads?: number;
  totalClaps?: number;
}

export interface IUserPreferences {
  theme?: 'light' | 'dark' | 'system' | 'auto' | string;
  notificationsEnabled?: boolean;
}

export interface IUser {
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
  isActive: boolean;
  isBanned: boolean;
  banReason?: string;
  bannedUntil?: string;
  lastActive: string;
  createdAt: string;
  updatedAt: string;
  role: PlatformRole;
}

export type IMeResponse = IBaseResponse<IUser>;

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
