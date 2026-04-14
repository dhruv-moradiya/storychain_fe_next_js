'use client';

import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';

import type { IPullRequest, PRStatus, PRType } from '@/type/pull-request.type';
import { AnimatePresence, motion } from 'framer-motion';
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

import { getColumns } from './columns';
import { PRListEmpty, PRListError, PRListLoading } from './pr-states';

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

  const columns = useMemo(() => getColumns(), []);

  // Filter pull requests
  const filteredPRs = useMemo(() => {
    return pullRequests.filter((pr) => {
      const matchesStatus = statusFilter === 'all' || pr.status === statusFilter;
      const matchesType = typeFilter === 'all' || pr.prType === typeFilter;
      const matchesSearch =
        !searchQuery ||
        pr.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        `#${pr._id}`.includes(searchQuery.toLowerCase());
      return matchesStatus && matchesType && matchesSearch;
    });
  }, [statusFilter, typeFilter, searchQuery, pullRequests]);

  // Stats
  const stats = useMemo(() => {
    return {
      total: pullRequests.length,
      open: pullRequests.filter((pr) => pr.status === 'open').length,
      approved: pullRequests.filter((pr) => pr.status === 'approved').length,
      merged: pullRequests.filter((pr) => pr.status === 'merged').length,
      closed: pullRequests.filter((pr) => pr.status === 'closed').length,
    };
  }, [pullRequests]);

  const handlePRClick = (pr: IPullRequest) => {
    router.push(`/stories/${slug}/pull-requests/${pr._id}`);
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
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
              className="bg-primary/10 flex h-12 w-12 items-center justify-center rounded-xl"
            >
              <Send className="text-primary h-6 w-6" />
            </motion.div>
            <div>
              <h1 className="text-foreground font-libre-baskerville text-2xl font-bold">
                Submit Requests
              </h1>
              <p className="text-muted-foreground text-sm">
                Review and manage chapter contributions
              </p>
            </div>
          </div>

          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2 shadow-sm transition-all hover:shadow-md">
            <Plus className="h-4 w-4" />
            New Request
          </Button>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        {...fadeIn(0.1)}
        className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6"
      >
        {[
          {
            label: 'Total',
            value: stats.total,
            icon: GitPullRequest,
            color: 'text-foreground',
            bg: 'bg-muted/60',
          },
          {
            label: 'Open',
            value: stats.open,
            icon: GitPullRequest,
            color: 'text-green-600 dark:text-green-400',
            bg: 'bg-green-500/10',
          },
          {
            label: 'Approved',
            value: stats.approved,
            icon: CheckCircle,
            color: 'text-blue-600 dark:text-blue-400',
            bg: 'bg-blue-500/10',
          },
          {
            label: 'Merged',
            value: stats.merged,
            icon: GitMerge,
            color: 'text-purple-600 dark:text-purple-400',
            bg: 'bg-purple-500/10',
          },
          {
            label: 'Closed',
            value: stats.closed,
            icon: GitPullRequestClosed,
            color: 'text-slate-500 dark:text-slate-400',
            bg: 'bg-slate-500/10',
          },
        ].map((stat) => (
          <motion.div
            key={stat.label}
            whileHover={{ y: -2, scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            className="bg-card border-border/50 group hover:border-primary/30 cursor-pointer rounded-xl border p-4 transition-all hover:shadow-md"
            onClick={() => setStatusFilter(stat.label.toUpperCase() as FilterStatus)}
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
          </motion.div>
        ))}
      </motion.div>

      {/* Filters */}
      <motion.div {...fadeIn(0.15)} className="mb-6 space-y-4">
        {/* Status tabs */}
        <div className="overflow-x-auto pb-2">
          <Tabs value={statusFilter} onValueChange={(v) => setStatusFilter(v as FilterStatus)}>
            <TabsList className="bg-card border-border/50 h-auto flex-nowrap border p-1">
              <TabsTrigger
                value="all"
                className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary gap-1.5"
              >
                All
              </TabsTrigger>
              <TabsTrigger
                value="OPEN"
                className="gap-1.5 data-[state=active]:bg-green-500/10 data-[state=active]:text-green-600 dark:data-[state=active]:text-green-400"
              >
                <GitPullRequest className="size-3.5" />
                Open
                {stats.open > 0 && (
                  <SecondaryBadge label={stats.open.toString()} size="sm" className="ml-1" />
                )}
              </TabsTrigger>
              <TabsTrigger
                value="APPROVED"
                className="gap-1.5 data-[state=active]:bg-blue-500/10 data-[state=active]:text-blue-600 dark:data-[state=active]:text-blue-400"
              >
                <CheckCircle className="size-3.5" />
                Approved
              </TabsTrigger>
              <TabsTrigger
                value="MERGED"
                className="gap-1.5 data-[state=active]:bg-purple-500/10 data-[state=active]:text-purple-600 dark:data-[state=active]:text-purple-400"
              >
                <GitMerge className="size-3.5" />
                Merged
              </TabsTrigger>
              <TabsTrigger
                value="REJECTED"
                className="gap-1.5 data-[state=active]:bg-red-500/10 data-[state=active]:text-red-600 dark:data-[state=active]:text-red-400"
              >
                <XCircle className="size-3.5" />
                Rejected
              </TabsTrigger>
              <TabsTrigger
                value="CLOSED"
                className="gap-1.5 data-[state=active]:bg-slate-500/10 data-[state=active]:text-slate-600 dark:data-[state=active]:text-slate-400"
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
            <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
            <Input
              placeholder="Search submit requests..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border-border/50 bg-card focus-visible:ring-primary pl-9"
            />
          </div>

          <Select value={typeFilter} onValueChange={(v) => setTypeFilter(v as FilterType)}>
            <SelectTrigger className="border-border/50 bg-card focus:ring-primary w-full sm:w-45">
              <Filter className="text-muted-foreground mr-2 h-4 w-4" />
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent className="bg-card border-border/50">
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="NEW_CHAPTER">
                <div className="flex items-center gap-2">
                  <Plus className="h-4 w-4 text-green-600 dark:text-green-400" />
                  New Chapter
                </div>
              </SelectItem>
              <SelectItem value="EDIT_CHAPTER">
                <div className="flex items-center gap-2">
                  <FileEdit className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                  Edit Chapter
                </div>
              </SelectItem>
              <SelectItem value="DELETE_CHAPTER">
                <div className="flex items-center gap-2">
                  <XCircle className="h-4 w-4 text-red-600 dark:text-red-400" />
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
          <DataTable
            columns={columns}
            data={filteredPRs}
            onRowClick={handlePRClick}
            renderSubComponent={({ row }) => (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2, delay: 0.05 }}
                className="bg-primary/3 p-5"
              >
                <div className="flex flex-col gap-6 md:flex-row md:items-start">
                  <div className="flex-1 space-y-4">
                    <div>
                      <h4 className="text-foreground font-libre-baskerville mb-1 text-sm font-semibold">
                        Description
                      </h4>
                      <p className="text-muted-foreground line-clamp-3 text-sm leading-relaxed">
                        {row.original.description ||
                          'No description provided for this pull request.'}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <div className="bg-card border-border/40 rounded-lg border p-4 shadow-sm">
                        <h4 className="text-foreground font-libre-baskerville mb-3 text-sm font-semibold">
                          Story & Chapter
                        </h4>
                        <dl className="text-muted-foreground space-y-2 text-sm">
                          <div className="flex flex-col">
                            <dt className="text-muted-foreground mb-1 text-xs tracking-wider uppercase">
                              Story
                            </dt>
                            <dd
                              className="text-foreground font-playfair truncate font-medium"
                              title={row.original.story?.title || row.original.storySlug}
                            >
                              {row.original.story?.title || row.original.storySlug}
                            </dd>
                          </div>
                          <div className="mt-2 flex flex-col">
                            <dt className="text-muted-foreground mb-1 text-xs tracking-wider uppercase">
                              Target Chapter
                            </dt>
                            <dd
                              className="text-foreground font-playfair truncate font-medium"
                              title={row.original.chapter?.title || row.original.chapterSlug}
                            >
                              {row.original.chapter?.title || row.original.chapterSlug}
                            </dd>
                          </div>
                          {row.original.chapter?.parentChapter && (
                            <div className="border-border/40 mt-2 flex flex-col border-t pt-2">
                              <dt className="text-muted-foreground mb-1 text-xs tracking-wider uppercase">
                                Parent Chapter
                              </dt>
                              <dd
                                className="text-foreground font-playfair truncate font-medium"
                                title={row.original.chapter.parentChapter.title}
                              >
                                {row.original.chapter.parentChapter.title}
                              </dd>
                            </div>
                          )}
                        </dl>
                      </div>

                      <div className="bg-card border-border/40 rounded-lg border p-4 shadow-sm">
                        <h4 className="text-foreground font-libre-baskerville mb-3 text-sm font-semibold">
                          Approval Status
                        </h4>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">Required Approvals (Auto)</span>
                            <span className="text-foreground font-medium">
                              {row.original.approvalsStatus.required}
                              {row.original.autoApprove?.enabled &&
                                ` (${row.original.autoApprove.threshold})`}
                            </span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">Received</span>
                            <span className="font-medium text-green-600 dark:text-green-400">
                              {row.original.approvalsStatus.received}
                            </span>
                          </div>

                          {row.original.approvers && row.original.approvers.length > 0 && (
                            <div className="border-border/40 border-t pt-2">
                              <span className="text-muted-foreground mb-2 block text-xs">
                                Approvers
                              </span>
                              <div className="flex -space-x-2">
                                {row.original.approvers.map((approver, idx) => (
                                  <div
                                    key={idx}
                                    className="bg-primary text-primary-foreground border-card flex h-6 w-6 items-center justify-center rounded-full border-2 text-xs font-bold"
                                    title={approver.username}
                                  >
                                    {approver.username.charAt(0).toUpperCase()}
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-card border-border/40 w-full rounded-lg border p-4 shadow-sm md:w-64">
                    <h4 className="text-foreground font-libre-baskerville mb-3 text-sm font-semibold">
                      Meta Information
                    </h4>
                    <dl className="text-muted-foreground space-y-4 text-sm">
                      <div className="flex flex-col">
                        <dt className="mb-1 text-xs">Author</dt>
                        <dd className="text-foreground font-playfair flex items-center gap-2 font-medium">
                          <div className="bg-secondary/20 text-secondary flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold uppercase">
                            {(row.original.author?.username || row.original.authorId).charAt(0)}
                          </div>
                          <span className="truncate">
                            {row.original.author?.username || row.original.authorId.slice(0, 8)}
                          </span>
                        </dd>
                      </div>
                      <div className="border-border/40 flex items-center justify-between border-t pt-3 text-xs">
                        <dt>Draft Status</dt>
                        <dd>
                          {row.original.isDraft ? (
                            <span className="rounded-full bg-amber-500/10 px-2 py-0.5 font-medium text-amber-600 dark:text-amber-400">
                              Draft
                            </span>
                          ) : (
                            <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 font-medium text-emerald-600 dark:text-emerald-400">
                              Ready
                            </span>
                          )}
                        </dd>
                      </div>
                      <div className="border-border/40 flex items-center justify-between border-t pt-3 text-xs">
                        <dt>Total Views</dt>
                        <dd className="text-foreground font-medium">{row.original.stats.views}</dd>
                      </div>
                    </dl>
                  </div>
                </div>
              </motion.div>
            )}
          />
        )}
      </motion.div>
    </div>
  );
}
