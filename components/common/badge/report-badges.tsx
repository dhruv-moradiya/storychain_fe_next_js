import type {
  AppealPriority,
  AppealStatus,
  ReportReason,
  ReportStatus,
  ReportType,
} from '@/type/report.type';
import {
  AlertCircle,
  AlertTriangle,
  BookOpen,
  CheckCircle,
  Circle,
  Clock,
  Eye,
  HelpCircle,
  Lock,
  type LucideIcon,
  MessageSquare,
  Scale,
  ShieldAlert,
  Tag,
  User,
  XCircle,
} from 'lucide-react';

import type { BadgeColorKey, BadgeConfig } from './types';
import { iconBadge, textBadge } from './utils';

// ============================================
// REPORT STATUS BADGES
// ============================================

const REPORT_STATUS_CONFIG: Record<
  ReportStatus,
  { color: BadgeColorKey; icon: LucideIcon; label: string }
> = {
  PENDING: { color: 'amber', icon: Clock, label: 'Pending' },
  REVIEWED: { color: 'blue', icon: Eye, label: 'Reviewed' },
  RESOLVED: { color: 'emerald', icon: CheckCircle, label: 'Resolved' },
  DISMISSED: { color: 'slate', icon: XCircle, label: 'Dismissed' },
};

export function reportStatusBadge(status: ReportStatus | string, options?: Partial<BadgeConfig>) {
  const config = REPORT_STATUS_CONFIG[status as ReportStatus] ?? {
    color: 'gray' as BadgeColorKey,
    icon: Circle,
    label: status,
  };
  return iconBadge(config.label, config.icon, config.color, { size: 'sm', ...options });
}

// ============================================
// REPORT REASON BADGES
// ============================================

const REPORT_REASON_CONFIG: Record<
  ReportReason,
  { color: BadgeColorKey; icon: LucideIcon; label: string }
> = {
  SPAM: { color: 'amber', icon: AlertTriangle, label: 'Spam' },
  HARASSMENT: { color: 'error', icon: AlertCircle, label: 'Harassment' },
  INAPPROPRIATE_CONTENT: { color: 'rose', icon: ShieldAlert, label: 'Inappropriate' },
  COPYRIGHT: { color: 'purple', icon: Lock, label: 'Copyright' },
  OFF_TOPIC: { color: 'slate', icon: HelpCircle, label: 'Off Topic' },
  OTHER: { color: 'blue', icon: Tag, label: 'Other' },
};

export function reportReasonBadge(reason: ReportReason | string, options?: Partial<BadgeConfig>) {
  const config = REPORT_REASON_CONFIG[reason as ReportReason] ?? {
    color: 'gray' as BadgeColorKey,
    icon: Tag,
    label: reason,
  };
  return iconBadge(config.label, config.icon, config.color, { size: 'sm', ...options });
}

// ============================================
// REPORT TYPE BADGES
// ============================================

const REPORT_TYPE_CONFIG: Record<
  ReportType,
  { color: BadgeColorKey; icon: LucideIcon; label: string }
> = {
  CHAPTER: { color: 'blue', icon: BookOpen, label: 'Chapter' },
  COMMENT: { color: 'purple', icon: MessageSquare, label: 'Comment' },
  USER: { color: 'rose', icon: User, label: 'User' },
  STORY: { color: 'amber', icon: AlertTriangle, label: 'Story' },
};

export function reportTypeBadge(type: ReportType | string, options?: Partial<BadgeConfig>) {
  const config = REPORT_TYPE_CONFIG[type as ReportType] ?? {
    color: 'gray' as BadgeColorKey,
    icon: Tag,
    label: type,
  };
  return iconBadge(config.label, config.icon, config.color, { size: 'sm', ...options });
}

// ============================================
// APPEAL STATUS BADGES
// ============================================

const APPEAL_STATUS_CONFIG: Record<
  AppealStatus,
  { color: BadgeColorKey; icon: LucideIcon; label: string }
> = {
  PENDING: { color: 'amber', icon: Clock, label: 'Pending' },
  UNDER_REVIEW: { color: 'blue', icon: Eye, label: 'Under Review' },
  APPROVED: { color: 'emerald', icon: CheckCircle, label: 'Approved' },
  REJECTED: { color: 'error', icon: XCircle, label: 'Rejected' },
  ESCALATED: { color: 'purple', icon: Scale, label: 'Escalated' },
};

export function appealStatusBadge(status: AppealStatus | string, options?: Partial<BadgeConfig>) {
  const config = APPEAL_STATUS_CONFIG[status as AppealStatus] ?? {
    color: 'gray' as BadgeColorKey,
    icon: Circle,
    label: status,
  };
  return iconBadge(config.label, config.icon, config.color, { size: 'sm', ...options });
}

// ============================================
// APPEAL PRIORITY BADGES
// ============================================

const APPEAL_PRIORITY_CONFIG: Record<AppealPriority, { color: BadgeColorKey; label: string }> = {
  LOW: { color: 'slate', label: 'Low Priority' },
  NORMAL: { color: 'blue', label: 'Normal Priority' },
  HIGH: { color: 'amber', label: 'High Priority' },
  URGENT: { color: 'error', label: 'Urgent Priority' },
};

export function appealPriorityBadge(
  priority: AppealPriority | string,
  options?: Partial<BadgeConfig>
) {
  const config = APPEAL_PRIORITY_CONFIG[priority as AppealPriority] ?? {
    color: 'gray' as BadgeColorKey,
    label: priority,
  };
  return textBadge(config.label, config.color, { size: 'sm', ...options });
}
