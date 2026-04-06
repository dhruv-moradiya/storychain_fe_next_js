import { PRTimelineAction } from '@/type';
import {
  Check,
  Circle,
  Clock,
  GitMerge,
  GitPullRequest,
  HelpCircle,
  Lock,
  type LucideIcon,
  MessageSquare,
  RefreshCcw,
  Sparkles,
  Tag,
  X,
} from 'lucide-react';

export const TIMELINE_ACTION_CONFIG: Record<
  PRTimelineAction | string,
  { icon: LucideIcon; label: string; color: string; bgColor: string }
> = {
  [PRTimelineAction.SUBMITTED]: {
    icon: GitPullRequest,
    label: 'submitted this pull request',
    color: 'text-blue-600',
    bgColor: 'bg-blue-500/10',
  },
  [PRTimelineAction.REVIEW_REQUESTED]: {
    icon: HelpCircle,
    label: 'requested a review',
    color: 'text-brand-blue',
    bgColor: 'bg-brand-blue/10',
  },
  [PRTimelineAction.REVIEW_SUBMITTED]: {
    icon: MessageSquare,
    label: 'submitted a review',
    color: 'text-cyan-600',
    bgColor: 'bg-cyan-500/10',
  },
  [PRTimelineAction.APPROVED]: {
    icon: Check,
    label: 'approved these changes',
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-500/10',
  },
  [PRTimelineAction.CHANGES_REQUESTED]: {
    icon: RefreshCcw,
    label: 'requested changes',
    color: 'text-amber-600',
    bgColor: 'bg-amber-500/10',
  },
  [PRTimelineAction.VOTED]: {
    icon: Sparkles,
    label: 'voted on this pull request',
    color: 'text-brand-pink-500',
    bgColor: 'bg-brand-pink-500/10',
  },
  [PRTimelineAction.AUTO_APPROVED]: {
    icon: Sparkles,
    label: 'was auto-approved',
    color: 'text-emerald-500',
    bgColor: 'bg-emerald-500/10',
  },
  [PRTimelineAction.MERGED]: {
    icon: GitMerge,
    label: 'merged this pull request',
    color: 'text-purple-600',
    bgColor: 'bg-purple-500/10',
  },
  [PRTimelineAction.CLOSED]: {
    icon: X,
    label: 'closed this pull request',
    color: 'text-red-600',
    bgColor: 'bg-red-500/10',
  },
  [PRTimelineAction.REOPENED]: {
    icon: RefreshCcw,
    label: 'reopened this pull request',
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-500/10',
  },
  [PRTimelineAction.MARKED_DRAFT]: {
    icon: Lock,
    label: 'marked this as draft',
    color: 'text-slate-500',
    bgColor: 'bg-slate-500/10',
  },
  [PRTimelineAction.READY_FOR_REVIEW]: {
    icon: Clock,
    label: 'marked this as ready for review',
    color: 'text-brand-blue',
    bgColor: 'bg-brand-blue/10',
  },
  [PRTimelineAction.LABEL_ADDED]: {
    icon: Tag,
    label: 'added a label',
    color: 'text-slate-600',
    bgColor: 'bg-slate-500/10',
  },
  [PRTimelineAction.LABEL_REMOVED]: {
    icon: Tag,
    label: 'removed a label',
    color: 'text-slate-400',
    bgColor: 'bg-slate-500/5',
  },
  // Fallback for generic actions
  commented: {
    icon: MessageSquare,
    label: 'commented',
    color: 'text-slate-600',
    bgColor: 'bg-slate-500/10',
  },
  created: {
    icon: GitPullRequest,
    label: 'created this pull request',
    color: 'text-blue-600',
    bgColor: 'bg-blue-500/10',
  },
};

export const getTimelineActionConfig = (action: string) => {
  return (
    TIMELINE_ACTION_CONFIG[action] || {
      icon: Circle,
      label: action,
      color: 'text-slate-400',
      bgColor: 'bg-slate-400/10',
    }
  );
};
