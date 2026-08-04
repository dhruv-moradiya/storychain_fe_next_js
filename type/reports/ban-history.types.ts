export type TBanType = 'GLOBAL' | 'STORY_SPECIFIC' | 'COMMENT_RESTRICTED' | string;

export interface IBanHistoryData {
  _id?: string;
  userId: string;
  bannedBy: string;
  reason: string;
  reportId?: string;
  banType: TBanType;
  durationDays?: number;
  expiresAt?: string | Date | null;
  isActive: boolean;
  liftedAt?: string | Date | null;
  liftedBy?: string;
  liftedReason?: string;
  evidenceUrls?: string[];
  internalNotes?: string;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}
