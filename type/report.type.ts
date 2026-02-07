export type ReportType = 'CHAPTER' | 'COMMENT' | 'USER' | 'STORY';
export type ReportReason =
  | 'SPAM'
  | 'HARASSMENT'
  | 'INAPPROPRIATE_CONTENT'
  | 'COPYRIGHT'
  | 'OFF_TOPIC'
  | 'OTHER';

export interface CreateReportData {
  reportType: ReportType;
  relatedId: string;
  reason: ReportReason;
  description: string;
}
