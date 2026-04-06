import { PRStatus } from '@/type';
import { Check, GitMerge, GitPullRequest, GitPullRequestClosed } from 'lucide-react';

export const PR_STATUS_CONFIG: Record<
  PRStatus,
  { icon: React.ElementType; color: string; bgColor: string; bgColorLight: string; label: string }
> = {
  open: {
    icon: GitPullRequest,
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-500',
    bgColorLight: 'bg-emerald-500/15',
    label: 'Open',
  },
  approved: {
    icon: Check,
    color: 'text-brand-blue',
    bgColor: 'bg-brand-blue',
    bgColorLight: 'bg-brand-blue/15',
    label: 'Approved',
  },
  merged: {
    icon: GitMerge,
    color: 'text-brand-pink-500',
    bgColor: 'bg-brand-pink-500',
    bgColorLight: 'bg-brand-pink-500/15',
    label: 'Merged',
  },
  closed: {
    icon: GitPullRequestClosed,
    color: 'text-slate-500',
    bgColor: 'bg-slate-500',
    bgColorLight: 'bg-slate-500/15',
    label: 'Closed',
  },
};
