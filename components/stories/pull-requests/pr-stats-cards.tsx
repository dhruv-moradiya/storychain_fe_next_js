import { TPRStatus } from '@/type/pull-reuqest/pull-request.type';
import { CheckCircle, GitMerge, GitPullRequest, GitPullRequestClosed } from 'lucide-react';

import { cn } from '@/lib/utils';

interface PRStatsCardsProps {
  stats: {
    total: number;
    open: number;
    approved: number;
    merged: number;
    closed: number;
  };
  setStatusFilter: (status: TPRStatus | 'all') => void;
}

export function PRStatsCards({ stats, setStatusFilter }: PRStatsCardsProps) {
  return (
    <>
      {[
        {
          label: 'Total',
          value: stats.total,
          icon: GitPullRequest,
          color: 'text-foreground',
          bg: 'bg-muted/60',
          filterValue: 'all',
        },
        {
          label: 'Open',
          value: stats.open,
          icon: GitPullRequest,
          color: 'text-green-600 dark:text-green-400',
          bg: 'bg-green-500/10',
          filterValue: 'open',
        },
        {
          label: 'Approved',
          value: stats.approved,
          icon: CheckCircle,
          color: 'text-blue-600 dark:text-blue-400',
          bg: 'bg-blue-500/10',
          filterValue: 'approved',
        },
        {
          label: 'Merged',
          value: stats.merged,
          icon: GitMerge,
          color: 'text-purple-600 dark:text-purple-400',
          bg: 'bg-purple-500/10',
          filterValue: 'merged',
        },
        {
          label: 'Closed',
          value: stats.closed,
          icon: GitPullRequestClosed,
          color: 'text-slate-500 dark:text-slate-400',
          bg: 'bg-slate-500/10',
          filterValue: 'closed',
        },
      ].map((stat) => (
        <div
          key={stat.label}
          className="bg-card border-border/50 group hover:border-primary/30 cursor-pointer rounded-xl border p-4 transition-all hover:shadow-md"
          onClick={() => setStatusFilter(stat.filterValue as TPRStatus | 'all')}
        >
          <div className="flex items-center gap-2">
            <div className={cn('flex h-6 w-6 items-center justify-center rounded-md', stat.bg)}>
              <stat.icon className={cn('h-3.5 w-3.5', stat.color)} />
            </div>
            <span className="text-muted-foreground text-sm font-medium">{stat.label}</span>
          </div>
          <p className="text-foreground font-libre-baskerville mt-2 text-2xl font-bold">
            {stat.value}
          </p>
        </div>
      ))}
    </>
  );
}
