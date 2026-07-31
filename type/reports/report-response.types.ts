import { ReportGovernanceLevel } from './reports-enum';
import { TReportActionTaken, TReportReason, TReportStatus } from './reports.types';

export interface IPopulatedUserRef {
  clerkId: string;
  username: string;
  avatarUrl: string;
  email?: string;
}

export interface IPopulatedStoryRef {
  slug: string;
  title: string;
  creatorId: string;
  coverImage?: { url: string; publicId: string };
  status: string;
}

export interface IPopulatedChapterRef {
  slug: string;
  title: string;
  storySlug: string;
  chapterNumber?: number;
  authorId: string;
  status: string;
}

export interface IPopulatedCommentRef {
  _id: string;
  content: string;
  chapterSlug: string;
  isDeleted: boolean;
  createdAt: Date;
  author?: IPopulatedUserRef;
}

export interface IBasePopulatedReport {
  _id: string;
  governanceLevel: ReportGovernanceLevel;
  reason: TReportReason;
  description: string;
  status: TReportStatus;
  reporter?: IPopulatedUserRef;
  openedByUser?: IPopulatedUserRef;
  openedAt?: Date;
  resolvedByUser?: IPopulatedUserRef;
  resolvedAt?: Date;
  resolution?: string;
  actionTaken?: TReportActionTaken;
  escalatedToUser?: IPopulatedUserRef;
  escalatedAt?: Date;
  escalationReason?: string;
  createdAt?: Date;
  updatedAt?: Date;
  // Optional target entity references across report types
  story?: IPopulatedStoryRef;
  chapter?: IPopulatedChapterRef;
  comment?: IPopulatedCommentRef;
  targetUser?: IPopulatedUserRef;
}

export interface IUserReportDetails extends IBasePopulatedReport {
  reportType: 'USER';
  targetUser?: IPopulatedUserRef;
  targetEntity?: IPopulatedUserRef;
}

export interface IStoryReportDetails extends IBasePopulatedReport {
  reportType: 'STORY';
  story?: IPopulatedStoryRef;
  targetEntity?: IPopulatedStoryRef;
}

export interface IChapterReportDetails extends IBasePopulatedReport {
  reportType: 'CHAPTER';
  story?: IPopulatedStoryRef;
  chapter?: IPopulatedChapterRef;
  targetEntity?: IPopulatedChapterRef;
}

export interface ICommentReportDetails extends IBasePopulatedReport {
  reportType: 'COMMENT';
  story?: IPopulatedStoryRef;
  chapter?: IPopulatedChapterRef;
  comment?: IPopulatedCommentRef;
  targetEntity?: IPopulatedCommentRef;
}

export type IPopulatedReportDetails =
  | IUserReportDetails
  | IStoryReportDetails
  | IChapterReportDetails
  | ICommentReportDetails;

export interface IReportPaginatedResponse {
  docs: IPopulatedReportDetails[];
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
