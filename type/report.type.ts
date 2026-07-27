export type ReportType = 'CHAPTER' | 'COMMENT' | 'USER' | 'STORY';
export type ReportReason =
  | 'SPAM'
  | 'HARASSMENT'
  | 'INAPPROPRIATE_CONTENT'
  | 'COPYRIGHT'
  | 'OFF_TOPIC'
  | 'OTHER';
export type ReportStatus = 'PENDING' | 'REVIEWED' | 'RESOLVED' | 'DISMISSED';

export interface IUserRef {
  clerkId: string;
  username: string;
  displayName?: string;
  avatarUrl?: string;
  email?: string;
}

export interface IReportItem {
  _id: string;
  reporterId: string | IUserRef;
  reportType: ReportType;
  relatedChapterSlug?: string;
  relatedCommentId?: string;
  relatedUserId?: string;
  relatedStorySlug?: string;
  reason: ReportReason;
  description: string;
  status: ReportStatus;
  reviewedBy?: string | IUserRef;
  reviewedAt?: string;
  resolution?: string;
  createdAt: string;
  updatedAt: string;
}

export type AppealStatus = 'PENDING' | 'UNDER_REVIEW' | 'APPROVED' | 'REJECTED' | 'ESCALATED';
export type AppealPriority = 'LOW' | 'NORMAL' | 'HIGH' | 'URGENT';
export type AppealReviewDecision = 'APPROVE' | 'REJECT' | 'ESCALATE';

export interface IAppealItem {
  _id: string;
  banHistoryId: string;
  userId: string | IUserRef;
  appealReason: string;
  explanation: string;
  evidenceUrls?: string[];
  status: AppealStatus;
  priority: AppealPriority;
  assignedTo?: string | IUserRef;
  assignedAt?: string;
  reviewedBy?: string | IUserRef;
  reviewedAt?: string;
  reviewDecision?: AppealReviewDecision;
  reviewNotes?: string;
  internalNotes?: string;
  escalationReason?: string;
  responseMessage?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateReportData {
  reportType: ReportType;
  relatedId: string;
  reason: ReportReason;
  description: string;
}
