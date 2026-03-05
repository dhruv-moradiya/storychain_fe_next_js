'use client';

import { SecondaryBadge } from '@/components/common/badge';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { mockPullRequests } from '@/lib/data/pull-requests';
import { cn, fadeIn } from '@/lib/utils';
import type { IPullRequest, PRStatus, PRType } from '@/type/pull-request.type';
import { motion } from 'framer-motion';
import {
  CheckCircle,
  FileEdit,
  Filter,
  GitMerge,
  GitPullRequest,
  GitPullRequestClosed,
  Plus,
  Search,
  Send,
  XCircle,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';
import { CreatePRDialog, PRListEmpty, PRListError, PRListLoading } from '.';
import { columns } from './columns';

type FilterStatus = PRStatus | 'all';
type FilterType = PRType | 'all';

interface SubmitRequestsSectionProps {
  slug: string;
}

export default function SubmitRequestsSection({ slug }: SubmitRequestsSectionProps) {
  const router = useRouter();
  const [pullRequests] = useState<IPullRequest[]>(mockPullRequests);
  const [isLoading] = useState(false);
  const [error] = useState<string | null>(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<FilterStatus>('all');
  const [typeFilter, setTypeFilter] = useState<FilterType>('all');

  // Dialog states
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  // Filter pull requests
  const filteredPRs = useMemo(() => {
    return pullRequests.filter((pr) => {
      const matchesStatus = statusFilter === 'all' || pr.status === statusFilter;
      const matchesType = typeFilter === 'all' || pr.prType === typeFilter;
      const matchesSearch =
        !searchQuery ||
        pr.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pr.author?.username.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesStatus && matchesType && matchesSearch;
    });
  }, [statusFilter, typeFilter, searchQuery, pullRequests]);

  // Stats
  const stats = useMemo(() => {
    return {
      total: pullRequests.length,
      open: pullRequests.filter((pr) => pr.status === 'OPEN').length,
      approved: pullRequests.filter((pr) => pr.status === 'APPROVED').length,
      merged: pullRequests.filter((pr) => pr.status === 'MERGED').length,
      rejected: pullRequests.filter((pr) => pr.status === 'REJECTED').length,
      closed: pullRequests.filter((pr) => pr.status === 'CLOSED').length,
    };
  }, [pullRequests]);

  const handlePRClick = (pr: IPullRequest) => {
    router.push(`/stories/${slug}/submit-requests/${pr._id}`);
  };

  if (error) {
    return <PRListError message={error} onRetry={() => window.location.reload()} />;
  }

  return (
    <div className="container mx-auto max-w-6xl px-4 py-8">
      {/* Header */}
      <motion.div {...fadeIn()} className="mb-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-brand-pink-500/10 flex h-12 w-12 items-center justify-center rounded-xl">
              <Send className="text-brand-pink-500 h-6 w-6" />
            </div>
            <div>
              <h1 className="text-text-primary text-2xl font-bold">Submit Requests</h1>
              <p className="text-text-secondary-65">Review and manage chapter contributions</p>
            </div>
          </div>

          <Button
            className="bg-brand-pink-500 hover:bg-brand-pink-600 gap-2 text-white shadow-sm"
            onClick={() => setIsCreateDialogOpen(true)}
          >
            <Plus className="h-4 w-4" />
            New Request
          </Button>
        </div>
      </motion.div>

      {/* Stats - GitHub style (Themed) */}
      <motion.div
        {...fadeIn(0.1)}
        className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6"
      >
        {[
          {
            label: 'Total',
            value: stats.total,
            icon: GitPullRequest,
            color: 'text-text-primary',
            bg: 'bg-cream-95',
          },
          {
            label: 'Open',
            value: stats.open,
            icon: GitPullRequest,
            color: 'text-green-600',
            bg: 'bg-green-500/10',
          },
          {
            label: 'Approved',
            value: stats.approved,
            icon: CheckCircle,
            color: 'text-blue-600',
            bg: 'bg-blue-500/10',
          },
          {
            label: 'Merged',
            value: stats.merged,
            icon: GitMerge,
            color: 'text-purple-600',
            bg: 'bg-purple-500/10',
          },
          {
            label: 'Rejected',
            value: stats.rejected,
            icon: XCircle,
            color: 'text-red-600',
            bg: 'bg-red-500/10',
          },
          {
            label: 'Closed',
            value: stats.closed,
            icon: GitPullRequestClosed,
            color: 'text-slate-500',
            bg: 'bg-slate-500/10',
          },
        ].map((stat) => (
          <motion.div
            key={stat.label}
            whileHover={{ y: -2 }}
            className="bg-cream-95 border-border/50 group hover:border-brand-pink-500/30 cursor-pointer rounded-xl border p-4 transition-all hover:shadow-sm"
            onClick={() => setStatusFilter(stat.label.toUpperCase() as FilterStatus)}
          >
            <div className="flex items-center gap-2">
              <div className={cn('flex h-6 w-6 items-center justify-center rounded-md', stat.bg)}>
                <stat.icon className={cn('h-3.5 w-3.5', stat.color)} />
              </div>
              <span className="text-text-secondary-65 text-sm font-medium">{stat.label}</span>
            </div>
            <p className="text-text-primary mt-2 text-2xl font-bold">{stat.value}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Filters */}
      <motion.div {...fadeIn(0.15)} className="mb-6 space-y-4">
        {/* Status tabs */}
        <div className="overflow-x-auto pb-2">
          <Tabs value={statusFilter} onValueChange={(v) => setStatusFilter(v as FilterStatus)}>
            <TabsList className="bg-cream-95 border-border/50 h-auto flex-nowrap border p-1">
              <TabsTrigger
                value="all"
                className="data-[state=active]:bg-brand-pink-500/10 data-[state=active]:text-brand-pink-500 gap-1.5"
              >
                All
              </TabsTrigger>
              <TabsTrigger
                value="OPEN"
                className="gap-1.5 data-[state=active]:bg-green-500/10 data-[state=active]:text-green-600"
              >
                <GitPullRequest className="size-3.5" />
                Open
                {stats.open > 0 && (
                  <SecondaryBadge label={stats.open.toString()} size="sm" className="ml-1" />
                )}
              </TabsTrigger>
              <TabsTrigger
                value="APPROVED"
                className="gap-1.5 data-[state=active]:bg-blue-500/10 data-[state=active]:text-blue-600"
              >
                <CheckCircle className="size-3.5" />
                Approved
              </TabsTrigger>
              <TabsTrigger
                value="MERGED"
                className="gap-1.5 data-[state=active]:bg-purple-500/10 data-[state=active]:text-purple-600"
              >
                <GitMerge className="size-3.5" />
                Merged
              </TabsTrigger>
              <TabsTrigger
                value="REJECTED"
                className="gap-1.5 data-[state=active]:bg-red-500/10 data-[state=active]:text-red-600"
              >
                <XCircle className="size-3.5" />
                Rejected
              </TabsTrigger>
              <TabsTrigger
                value="CLOSED"
                className="gap-1.5 data-[state=active]:bg-slate-500/10 data-[state=active]:text-slate-600"
              >
                <GitPullRequestClosed className="size-3.5" />
                Closed
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Search and type filter */}
        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <Search className="text-text-secondary-65 absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
            <Input
              placeholder="Search submit requests..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border-border/50 bg-cream-95 focus-visible:ring-brand-pink-500 pl-9"
            />
          </div>

          <Select value={typeFilter} onValueChange={(v) => setTypeFilter(v as FilterType)}>
            <SelectTrigger className="border-border/50 bg-cream-95 focus:ring-brand-pink-500 w-full sm:w-[180px]">
              <Filter className="text-text-secondary-65 mr-2 h-4 w-4" />
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent className="bg-cream-95 border-border/50">
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="NEW_CHAPTER">
                <div className="flex items-center gap-2">
                  <Plus className="h-4 w-4 text-green-600" />
                  New Chapter
                </div>
              </SelectItem>
              <SelectItem value="EDIT_CHAPTER">
                <div className="flex items-center gap-2">
                  <FileEdit className="h-4 w-4 text-amber-600" />
                  Edit Chapter
                </div>
              </SelectItem>
              <SelectItem value="DELETE_CHAPTER">
                <div className="flex items-center gap-2">
                  <XCircle className="h-4 w-4 text-red-600" />
                  Delete Chapter
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </motion.div>

      {/* Pull Request Table */}
      <motion.div {...fadeIn(0.2)}>
        {isLoading ? (
          <PRListLoading count={5} />
        ) : filteredPRs.length === 0 ? (
          <PRListEmpty
            title={
              searchQuery || statusFilter !== 'all' || typeFilter !== 'all'
                ? 'No matching requests'
                : 'No submit requests yet'
            }
            description={
              searchQuery || statusFilter !== 'all' || typeFilter !== 'all'
                ? 'Try adjusting your filters'
                : 'Submit requests will appear here when contributors propose changes'
            }
          />
        ) : (
          <DataTable columns={columns} data={filteredPRs} onRowClick={handlePRClick} />
        )}
      </motion.div>

      {/* Create PR Dialog */}
      <CreatePRDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        storyTitle="The Jujutsu Legacy"
      />
    </div>
  );
}
