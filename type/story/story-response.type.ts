import { IChapterTreeItem } from '@/components/stories/sections/tree-section/types/canvas.types';

import {
  IStory,
  IStorySettings,
  TStoryCollaboratorRole,
  TStoryCollaboratorStatus,
  TStoryContentRating,
  TStoryGenres,
  TStoryStatus,
} from '.';
import { IBaseResponse } from '../base-response.type';
import { IChapter } from '../chapter';
import { IImageAsset, IUserBasic } from '../common';
import { IUserPreviewWithEmail } from '../user/user.type';

interface IStoryCreator extends Omit<IUserPreviewWithEmail, 'email'> {}

interface IStoryBasic {
  _id: string;
  title: string;
  slug: string;
}

interface IUserStories {
  title: string;
  slug: string;
  creatorId: string;
  status: TStoryStatus;
  tags: string[];
  trendingScore: number;
  contentRating: TStoryContentRating;
  genre: TStoryGenres[];
  publishedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

interface IStoryCollaboratorOverview {
  clerkId: string;
  username: string;
  avatar: string;
  email: string;
  role: TStoryCollaboratorRole;
  status: TStoryCollaboratorStatus;
}

export interface ILatestChaptersResponse {
  storySlug: string;
  chapterSlug: string;
  title: string;
  stats: IChapter['stats'];
  author: IUserPreviewWithEmail;
  updatedAt: Date;
}

interface IStoryOverview extends Omit<
  IStory,
  '_id' | 'creatorId' | 'collaboratorIds' | 'createdAt' | 'updatedAt'
> {
  creator: IStoryCreator;
  collaborators: IStoryCollaboratorOverview[];
  latestChapters: ILatestChaptersResponse[];
}
// ── Response Wrappers ─────────────────────────────────────────────────────────
interface IStoryBasicResponse extends IBaseResponse<IStoryBasic> {}

interface IUserStoriesResponse extends IBaseResponse<IUserStories[]> {}

interface IStoryTreeResponse extends IBaseResponse<{ chapters: IChapterTreeItem[] }> {}

interface IStorySettingsResponse extends IBaseResponse<{
  settings: IStorySettings;
  coverImage?: IImageAsset;
  cardImage?: IImageAsset;
}> {}

interface IStoryOverviewResponse extends IBaseResponse<IStoryOverview> {}

// ── Collaborator Response Wrappers ────────────────────────────────────────────

/**
 * Shape of a single collaborator record returned by
 * GET /slug/:slug/collaborators.
 * Intentionally explicit — avoid coupling to canvas/tree types.
 */
interface ICollaboratorRecord {
  _id: string;
  role: TStoryCollaboratorRole;
  status: TStoryCollaboratorStatus;
  invitedAt: Date;
  invitedBy: IUserBasic | null;
  user: IUserBasic;
}

/** GET /slug/:slug/collaborators */
interface ICollaboratorListResponse extends IBaseResponse<ICollaboratorRecord[]> {}

/**
 * The collaborator document returned after POST /collaborators,
 * POST /accept-invitation, or POST /decline-invitation.
 */
interface ICollaboratorActionData {
  _id: string;
  storyId: string;
  userId: string;
  role: TStoryCollaboratorRole;
  status: TStoryCollaboratorStatus;
  invitedAt: string;
}

/** POST /collaborators | POST /accept-invitation | POST /decline-invitation */
interface IInvitationActionResponse extends IBaseResponse<ICollaboratorActionData> {}

/** Body sent when creating a new invitation */
interface ISendInvitationBody {
  role: TStoryCollaboratorRole;
  invitedUserId: string;
  invitedUserName: string;
}

// ── Images ────────────────────────────────────────────────────────────────────
interface ICloudinarySignatureResponse extends IBaseResponse<{
  uploadURL: string;
}> {}

interface IStoryImageUpdateResponse extends IBaseResponse<IImageAsset> {}

interface ICreateStoryResponse extends IBaseResponse<{
  _id: string;
  title: string;
  slug: string;
  status: TStoryStatus;
  createdAt: string;
}> {}

export type {
  ICloudinarySignatureResponse,
  ICollaboratorActionData,
  ICollaboratorListResponse,
  ICollaboratorRecord,
  ICreateStoryResponse,
  IInvitationActionResponse,
  ISendInvitationBody,
  IStoryBasic,
  IStoryBasicResponse,
  IStoryImageUpdateResponse,
  IStoryOverview,
  IStoryOverviewResponse,
  IStorySettingsResponse,
  IStoryTreeResponse,
  IUserStories,
  IUserStoriesResponse,
};
