import { TPRStatus } from '@/type/pull-reuqest/pull-request.type';
import { CheckCircle, GitMerge, GitPullRequest, GitPullRequestClosed, XCircle } from 'lucide-react';

import { SecondaryBadge } from '@/components/common/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface PRStatusTabsProps {
  statusFilter: TPRStatus | 'all';
  setStatusFilter: (status: TPRStatus | 'all') => void;
  stats: {
    open: number;
  };
}

export function PRStatusTabs({ statusFilter, setStatusFilter, stats }: PRStatusTabsProps) {
  return (
    <div className="overflow-x-auto pb-2">
      <Tabs value={statusFilter} onValueChange={(v) => setStatusFilter(v as TPRStatus | 'all')}>
        <TabsList className="bg-card border-border/50 h-auto flex-nowrap border p-1">
          <TabsTrigger
            value="all"
            className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary gap-1.5"
          >
            All
          </TabsTrigger>
          <TabsTrigger
            value="open"
            className="gap-1.5 data-[state=active]:bg-green-500/10 data-[state=active]:text-green-600 dark:data-[state=active]:text-green-400"
          >
            <GitPullRequest className="size-3.5" />
            Open
            {stats.open > 0 && (
              <SecondaryBadge label={stats.open.toString()} size="sm" className="ml-1" />
            )}
          </TabsTrigger>
          <TabsTrigger
            value="approved"
            className="gap-1.5 data-[state=active]:bg-blue-500/10 data-[state=active]:text-blue-600 dark:data-[state=active]:text-blue-400"
          >
            <CheckCircle className="size-3.5" />
            Approved
          </TabsTrigger>
          <TabsTrigger
            value="merged"
            className="gap-1.5 data-[state=active]:bg-purple-500/10 data-[state=active]:text-purple-600 dark:data-[state=active]:text-purple-400"
          >
            <GitMerge className="size-3.5" />
            Merged
          </TabsTrigger>
          <TabsTrigger
            value="rejected"
            className="gap-1.5 data-[state=active]:bg-red-500/10 data-[state=active]:text-red-600 dark:data-[state=active]:text-red-400"
          >
            <XCircle className="size-3.5" />
            Rejected
          </TabsTrigger>
          <TabsTrigger
            value="closed"
            className="gap-1.5 data-[state=active]:bg-slate-500/10 data-[state=active]:text-slate-600 dark:data-[state=active]:text-slate-400"
          >
            <GitPullRequestClosed className="size-3.5" />
            Closed
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
}
