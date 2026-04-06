import { PRType } from '@/type';
import { Edit, GitBranch, GitMerge } from 'lucide-react';

export const PR_TYPE_CONFIG: Record<
  PRType,
  { icon: React.ElementType; label: string; color: string }
> = {
  [PRType.NEW_BRANCH]: {
    icon: GitBranch,
    label: 'New Branch',
    color: 'text-emerald-600 bg-emerald-50 border-emerald-200',
  },
  [PRType.CONTINUATION]: {
    icon: GitMerge,
    label: 'Continuation',
    color: 'text-brand-blue bg-brand-blue/10 border-brand-blue/30',
  },
  [PRType.EDIT]: {
    icon: Edit,
    label: 'Edit',
    color: 'text-amber-600 bg-amber-50 border-amber-200',
  },
};
