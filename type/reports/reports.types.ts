import {
  REPORT_ACTIONS_TAKEN,
  REPORT_REASONS,
  REPORT_STATUSES,
  REPORT_TYPES,
} from './reports-enum';

export type TReportType = (typeof REPORT_TYPES)[number];
export type TReportReason = (typeof REPORT_REASONS)[number];
export type TReportStatus = (typeof REPORT_STATUSES)[number];
export type TReportActionTaken = (typeof REPORT_ACTIONS_TAKEN)[number];
