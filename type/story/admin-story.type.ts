import { IBaseResponse } from '../base-response.type';

export interface IAdminStoriesQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
  genre?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface IAdminStoryCreator {
  clerkId: string;
  username: string;
  avatarUrl?: string;
  email?: string;
}

export interface IAdminStoryCollaborator {
  _id: string;
  role: string;
  status: string;
  user: IAdminStoryCreator;
}

export interface IAdminStorySettings {
  isPublic?: boolean;
  allowBranching?: boolean;
  requireApproval?: boolean;
  allowComments?: boolean;
  allowVoting?: boolean;
  genres?: string[];
  contentRating?: string;
}

export interface IAdminStoryStats {
  totalChapters?: number;
  totalBranches?: number;
  totalReads?: number;
  totalVotes?: number;
  uniqueContributors?: number;
  averageRating?: number;
  upvotes?: number;
  downvotes?: number;
  score?: number;
}

export interface IAdminStoryPool {
  balance?: number;
  totalReceived?: number;
  totalDistributed?: number;
}

export interface IAdminStoryChapterDetails {
  totalChapters?: number;
  publishedChapters?: number;
  draftChapters?: number;
  rootChapters?: number;
  totalReads?: number;
  totalComments?: number;
}

export interface IAdminStoryPRDetails {
  totalPRs?: number;
  pendingPRs?: number;
  mergedPRs?: number;
  rejectedPRs?: number;
}

export interface IAdminStoryItem {
  _id: string;
  title: string;
  slug: string;
  description?: string;
  creatorId?: string;
  creator?: IAdminStoryCreator;
  status: string;
  settings?: IAdminStorySettings;
  stats?: IAdminStoryStats;
  tags?: string[];
  trendingScore?: number;
  lastActivityAt?: string;
  publishedAt?: string;
  createdAt?: string;
  updatedAt?: string;
  collaborators?: IAdminStoryCollaborator[];
  storyPool?: IAdminStoryPool;
  chapterDetails?: IAdminStoryChapterDetails;
  pullRequestDetails?: IAdminStoryPRDetails;
}

export interface IAdminStoriesPaginatedResponse {
  docs: IAdminStoryItem[];
  totalDocs: number;
  limit: number;
  totalPages: number;
  page: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: number | null;
  nextPage: number | null;
}

export type IAdminStoriesResponse = IBaseResponse<IAdminStoriesPaginatedResponse>;
