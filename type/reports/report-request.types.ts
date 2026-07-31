import { ReportActionTaken, ReportReason, ReportStatus, ReportType } from './reports-enum';

export interface ICreateReportPayload {
  reportType: ReportType;
  relatedChapterSlug?: string;
  relatedCommentId?: string;
  relatedUserId?: string;
  relatedStorySlug?: string;
  reason: ReportReason;
  description: string;
}

export interface IPaginatedReportQueryParams {
  page?: number;
  limit?: number;
  status?: ReportStatus;
  reportType?: ReportType;
  reason?: ReportReason;
}

export interface IResolveStoryReportPayload {
  status: ReportStatus.RESOLVED | ReportStatus.DISMISSED;
  resolution: string;
  actionTaken?: ReportActionTaken;
}

export interface IBanUserFromStoryPayload {
  userId: string;
  reason: string;
}

export interface IUpdateAdminReportStatusPayload {
  status: ReportStatus.UNDER_REVIEW | ReportStatus.DISMISSED | 'REVIEWED';
}

export interface IResolveAdminReportPayload {
  resolution: string;
  globalAction?: ReportActionTaken;
}

export interface IBanUserGloballyPayload {
  reason: string;
  durationDays?: number;
  evidenceUrls?: string[];
}
