import { PRLabel, PRStatus, PRTimelineAction, PRType } from '@/type';
import {
  AlertTriangle,
  BookX,
  Check,
  CheckCircle,
  Circle,
  Copy,
  Edit,
  GitBranch,
  GitMerge,
  GitPullRequest,
  HelpCircle,
  Lock,
  type LucideIcon,
  MessageSquare,
  RefreshCcw,
  Sparkles,
  Tag,
  XCircle,
} from 'lucide-react';

import type { BadgeColorKey, BadgeConfig } from './types';
import { iconBadge, textBadge } from './utils';

// ============================================
// PR LABEL BADGES
// ============================================

const PR_LABEL_CONFIG: Record<PRLabel, { color: BadgeColorKey; icon: LucideIcon; label: string }> =
  {
    [PRLabel.NEEDS_REVIEW]: {
      color: 'warning',
      icon: HelpCircle,
      label: 'Needs Review',
    },
    [PRLabel.QUALITY_ISSUE]: {
      color: 'error',
      icon: AlertTriangle,
      label: 'Quality Issue',
    },
    [PRLabel.GRAMMAR]: {
      color: 'blue',
      icon: MessageSquare,
      label: 'Grammar',
    },
    [PRLabel.PLOT_HOLE]: {
      color: 'orange',
      icon: BookX,
      label: 'Plot Hole',
    },
    [PRLabel.LORE_INCONSISTENCY]: {
      color: 'purple',
      icon: AlertTriangle,
      label: 'Lore Inconsistency',
    },
    [PRLabel.CONFLICT]: {
      color: 'rose',
      icon: XCircle,
      label: 'Conflict',
    },
    [PRLabel.DUPLICATE]: {
      color: 'slate',
      icon: Copy,
      label: 'Duplicate',
    },
    [PRLabel.CHANGES_REQUESTED]: {
      color: 'amber',
      icon: RefreshCcw,
      label: 'Changes Requested',
    },
    [PRLabel.APPROVED]: {
      color: 'success',
      icon: CheckCircle,
      label: 'Approved',
    },
    [PRLabel.GOOD_FIRST_PR]: {
      color: 'emerald',
      icon: Sparkles,
      label: 'Good First PR',
    },
  };

export function prLabelBadge(label: PRLabel | string, options?: Partial<BadgeConfig>) {
  const config = PR_LABEL_CONFIG[label as PRLabel] ?? {
    color: 'gray' as BadgeColorKey,
    icon: Tag,
    label,
  };
  return iconBadge(config.label, config.icon, config.color, { size: 'xs', ...options });
}

export function prLabelsBadges(labels: (PRLabel | string)[], options?: Partial<BadgeConfig>) {
  return labels.map((l) => prLabelBadge(l, options));
}

// ============================================
// PR STATUS BADGES
// ============================================

const PR_STATUS_CONFIG: Record<
  PRStatus,
  { color: BadgeColorKey; icon: LucideIcon; label: string }
> = {
  [PRStatus.OPEN]: {
    color: 'success',
    icon: GitPullRequest,
    label: 'Open',
  },
  [PRStatus.APPROVED]: {
    color: 'emerald',
    icon: CheckCircle,
    label: 'Approved',
  },
  [PRStatus.CLOSED]: {
    color: 'error',
    icon: XCircle,
    label: 'Closed',
  },
  [PRStatus.MERGED]: {
    color: 'purple',
    icon: GitMerge,
    label: 'Merged',
  },
};

export function prStatusBadge(status: PRStatus | string, options?: Partial<BadgeConfig>) {
  const config = PR_STATUS_CONFIG[status as PRStatus] ?? {
    color: 'gray' as BadgeColorKey,
    icon: Circle,
    label: status,
  };
  return iconBadge(config.label, config.icon, config.color, { dot: false, ...options });
}

// ============================================
// PR TYPE BADGES
// ============================================

const PR_TYPE_BADGE_CONFIG: Record<
  PRType,
  { color: BadgeColorKey; icon: LucideIcon; label: string }
> = {
  [PRType.NEW_BRANCH]: {
    color: 'success',
    icon: GitBranch,
    label: 'New Branch',
  },
  [PRType.CONTINUATION]: {
    color: 'blue',
    icon: GitMerge,
    label: 'Continuation',
  },
  [PRType.EDIT]: {
    color: 'amber',
    icon: Edit,
    label: 'Edit',
  },
};

export function prTypeBadge(type: PRType | string, options?: Partial<BadgeConfig>) {
  const config = PR_TYPE_BADGE_CONFIG[type as PRType] ?? {
    color: 'gray' as BadgeColorKey,
    icon: GitPullRequest,
    label: type,
  };
  return iconBadge(config.label, config.icon, config.color, options);
}

// ============================================
// PR TIMELINE ACTION BADGES
// ============================================

const PR_TIMELINE_ACTION_CONFIG: Record<
  PRTimelineAction,
  { color: BadgeColorKey; icon: LucideIcon; label: string }
> = {
  [PRTimelineAction.SUBMITTED]: { color: 'blue', icon: GitPullRequest, label: 'Submitted' },
  [PRTimelineAction.REVIEW_REQUESTED]: {
    color: 'info',
    icon: HelpCircle,
    label: 'Review Requested',
  },
  [PRTimelineAction.REVIEW_SUBMITTED]: {
    color: 'cyan',
    icon: MessageSquare,
    label: 'Review Submitted',
  },
  [PRTimelineAction.APPROVED]: { color: 'success', icon: Check, label: 'Approved' },
  [PRTimelineAction.CHANGES_REQUESTED]: {
    color: 'warning',
    icon: RefreshCcw,
    label: 'Changes Requested',
  },
  [PRTimelineAction.VOTED]: { color: 'pink', icon: CheckCircle, label: 'Voted' },
  [PRTimelineAction.AUTO_APPROVED]: { color: 'emerald', icon: Sparkles, label: 'Auto Approved' },
  [PRTimelineAction.MERGED]: { color: 'purple', icon: GitMerge, label: 'Merged' },
  [PRTimelineAction.CLOSED]: { color: 'error', icon: XCircle, label: 'Closed' },
  [PRTimelineAction.REOPENED]: { color: 'success', icon: RefreshCcw, label: 'Reopened' },
  [PRTimelineAction.MARKED_DRAFT]: { color: 'gray', icon: Lock, label: 'Marked Draft' },
  [PRTimelineAction.READY_FOR_REVIEW]: {
    color: 'info',
    icon: CheckCircle,
    label: 'Ready for Review',
  },
  [PRTimelineAction.LABEL_ADDED]: { color: 'slate', icon: Tag, label: 'Label Added' },
  [PRTimelineAction.LABEL_REMOVED]: { color: 'slate', icon: Tag, label: 'Label Removed' },
};

export function prTimelineActionBadge(
  action: PRTimelineAction | string,
  options?: Partial<BadgeConfig>
) {
  const config = PR_TIMELINE_ACTION_CONFIG[action as PRTimelineAction] ?? {
    color: 'gray' as BadgeColorKey,
    icon: Circle,
    label: action,
  };
  return textBadge(config.label, config.color, { size: 'xs', ...options });
}
