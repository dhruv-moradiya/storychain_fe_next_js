import { IChapterTreeItem } from '@/components/stories/sections/tree-section/types/canvas.types';
import {
  IStoryStats,
  IStorySettings,
  TStoryContentRating,
  TStoryStatus,
  IStory,
  IStoryCollaboratorPopulated,
  IStoryLatestChapter,
  TStoryCollaboratorRole,
  TStoryCollaboratorStatus,
} from '.';
import { IBaseResponse } from '../base-response.type';
import { IImageAsset, IUserBasic } from '../common';

// ── Basic Story (fields select) ──────────────────────────────────────────────
interface IStoryBasic {
  _id: string;
  title: string;
  slug: string;
}

// ── User Stories (dashboard list item) ───────────────────────────────────────
interface IUserStories {
  _id: string;
  title: string;
  slug: string;
  description: string;

  coverImage?: IImageAsset;
  cardImage?: IImageAsset;

  creatorId: string;

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

// ── Story Overview (full detail page) ────────────────────────────────────────
interface IStoryOverview extends IStory {
  collaborators: IStoryCollaboratorPopulated[];
  latestChapters: IStoryLatestChapter[];
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
  IStoryBasic,
  IStoryBasicResponse,
  IUserStories,
  IUserStoriesResponse,
  IStoryTreeResponse,
  IStorySettingsResponse,
  IStoryOverview,
  IStoryOverviewResponse,
  ICollaboratorRecord,
  ICollaboratorListResponse,
  ICollaboratorActionData,
  IInvitationActionResponse,
  ISendInvitationBody,
  ICloudinarySignatureResponse,
  IStoryImageUpdateResponse,
  ICreateStoryResponse,
};
