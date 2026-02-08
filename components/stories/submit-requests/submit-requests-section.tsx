'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn, fadeIn } from '@/lib/utils';
import { mockPullRequests } from '@/lib/data/pull-requests';
import type { IPullRequest, PRStatus, PRType } from '@/type/pull-request.type';
import {
  GitPullRequest,
  GitMerge,
  GitPullRequestClosed,
  Search,
  Filter,
  Plus,
  CheckCircle,
  XCircle,
  FileEdit,
} from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { PRCard, PRListEmpty, PRListLoading, PRListError, CreatePRDialog } from '.';

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

  const handleCreatePR = (data: unknown) => {
    console.log('Creating PR:', data);
    toast.success('Submit request created successfully!');
    setIsCreateDialogOpen(false);
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
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100 dark:bg-purple-900/30">
              <GitPullRequest className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Submit Requests</h1>
              <p className="text-muted-foreground">Review and manage chapter contributions</p>
            </div>
          </div>

          <Button
            className="bg-brand-pink-500 hover:bg-brand-pink-600 gap-2 text-white"
            onClick={() => setIsCreateDialogOpen(true)}
          >
            <Plus className="h-4 w-4" />
            New Request
          </Button>
        </div>
      </motion.div>

      {/* Stats - GitHub style */}
      <motion.div
        {...fadeIn(0.1)}
        className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6"
      >
        {[
          { label: 'Total', value: stats.total, icon: GitPullRequest, color: 'text-foreground' },
          { label: 'Open', value: stats.open, icon: GitPullRequest, color: 'text-green-500' },
          { label: 'Approved', value: stats.approved, icon: CheckCircle, color: 'text-blue-500' },
          { label: 'Merged', value: stats.merged, icon: GitMerge, color: 'text-purple-500' },
          { label: 'Rejected', value: stats.rejected, icon: XCircle, color: 'text-red-500' },
          {
            label: 'Closed',
            value: stats.closed,
            icon: GitPullRequestClosed,
            color: 'text-slate-500',
          },
        ].map((stat) => (
          <motion.div
            key={stat.label}
            whileHover={{ y: -2 }}
            className="bg-card cursor-pointer rounded-xl border p-4 transition-shadow hover:shadow-md"
            onClick={() => setStatusFilter(stat.label.toUpperCase() as FilterStatus)}
          >
            <div className="flex items-center gap-2">
              <stat.icon className={cn('h-4 w-4', stat.color)} />
              <span className="text-muted-foreground text-sm">{stat.label}</span>
            </div>
            <p className="mt-1 text-2xl font-bold">{stat.value}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Filters - GitHub style */}
      <motion.div {...fadeIn(0.15)} className="mb-6 space-y-4">
        {/* Status tabs */}
        <div className="overflow-x-auto pb-2">
          <Tabs value={statusFilter} onValueChange={(v) => setStatusFilter(v as FilterStatus)}>
            <TabsList className="bg-muted/50 h-auto flex-nowrap p-1">
              <TabsTrigger value="all" className="gap-1.5">
                All
              </TabsTrigger>
              <TabsTrigger value="OPEN" className="gap-1.5">
                <GitPullRequest className="h-3.5 w-3.5 text-green-500" />
                Open
                {stats.open > 0 && (
                  <Badge variant="secondary" className="ml-1 h-5 px-1.5">
                    {stats.open}
                  </Badge>
                )}
              </TabsTrigger>
              <TabsTrigger value="APPROVED" className="gap-1.5">
                <CheckCircle className="h-3.5 w-3.5 text-blue-500" />
                Approved
              </TabsTrigger>
              <TabsTrigger value="MERGED" className="gap-1.5">
                <GitMerge className="h-3.5 w-3.5 text-purple-500" />
                Merged
              </TabsTrigger>
              <TabsTrigger value="REJECTED" className="gap-1.5">
                <XCircle className="h-3.5 w-3.5 text-red-500" />
                Rejected
              </TabsTrigger>
              <TabsTrigger value="CLOSED" className="gap-1.5">
                <GitPullRequestClosed className="h-3.5 w-3.5 text-slate-500" />
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
              className="pl-9"
            />
          </div>

          <Select value={typeFilter} onValueChange={(v) => setTypeFilter(v as FilterType)}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="NEW_CHAPTER">
                <div className="flex items-center gap-2">
                  <Plus className="h-4 w-4 text-green-500" />
                  New Chapter
                </div>
              </SelectItem>
              <SelectItem value="EDIT_CHAPTER">
                <div className="flex items-center gap-2">
                  <FileEdit className="h-4 w-4 text-amber-500" />
                  Edit Chapter
                </div>
              </SelectItem>
              <SelectItem value="DELETE_CHAPTER">
                <div className="flex items-center gap-2">
                  <XCircle className="h-4 w-4 text-red-500" />
                  Delete Chapter
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </motion.div>

      {/* Pull Request List - GitHub style */}
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
          <div className="bg-card overflow-hidden rounded-xl border">
            {/* List Header - GitHub style */}
            <div className="bg-muted/50 flex items-center justify-between border-b px-4 py-3">
              <div className="flex items-center gap-4 text-sm font-medium">
                <button
                  onClick={() => setStatusFilter('OPEN')}
                  className={cn(
                    'flex items-center gap-1.5 transition-colors',
                    statusFilter === 'OPEN'
                      ? 'text-foreground'
                      : 'text-muted-foreground hover:text-foreground'
                  )}
                >
                  <GitPullRequest className="h-4 w-4" />
                  {stats.open} Open
                </button>
                <button
                  onClick={() => setStatusFilter('MERGED')}
                  className={cn(
                    'flex items-center gap-1.5 transition-colors',
                    statusFilter === 'MERGED'
                      ? 'text-foreground'
                      : 'text-muted-foreground hover:text-foreground'
                  )}
                >
                  <GitMerge className="h-4 w-4" />
                  {stats.merged} Merged
                </button>
                <button
                  onClick={() => setStatusFilter('CLOSED')}
                  className={cn(
                    'flex items-center gap-1.5 transition-colors',
                    statusFilter === 'CLOSED'
                      ? 'text-foreground'
                      : 'text-muted-foreground hover:text-foreground'
                  )}
                >
                  <GitPullRequestClosed className="h-4 w-4" />
                  {stats.closed + stats.rejected} Closed
                </button>
              </div>
            </div>

            {/* PR Items */}
            <div className="divide-y">
              <AnimatePresence mode="popLayout">
                {filteredPRs.map((pr, index) => (
                  <motion.div
                    key={pr._id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ delay: index * 0.03 }}
                  >
                    <PRCard pullRequest={pr} onClick={() => handlePRClick(pr)} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        )}
      </motion.div>

      {/* Create PR Dialog */}
      <CreatePRDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        onSubmit={handleCreatePR}
        storyTitle="The Jujutsu Legacy"
      />
    </div>
  );
}
