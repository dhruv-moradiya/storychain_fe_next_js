'use client';

import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';

import {
  IPullRequestList,
  IPullRequestListItem,
} from '@/type/pull-reuqest/pull-request-response.type';
import type { TPRStatus, TPullRequestType } from '@/type/pull-reuqest/pull-request.type';
import { motion } from 'framer-motion';
import { FileEdit, Filter, Plus, Search, Send, XCircle } from 'lucide-react';

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
import { fadeIn } from '@/lib/utils';
import { usePullRequests } from '@/services/pull-requests/pull-request.query';

import { getColumns } from './columns';
import { PRListEmpty, PRListError, PRListLoading } from './pr-states';
import { PRStatsCards } from './pr-stats-cards';
import { PRStatusTabs } from './pr-status-tabs';

type TFilterStatus = TPRStatus | 'all';
type TFilterType = TPullRequestType | 'all';

interface ISubmitRequestsSectionProps {
  slug: string;
  list?: IPullRequestList;
}

export default function SubmitRequestsSection({ slug }: ISubmitRequestsSectionProps) {
  const { data, isLoading, error } = usePullRequests();
  console.log('data :>> ', data);

  const router = useRouter();

  const pullRequests = useMemo<IPullRequestListItem[]>(() => {
    return data?.pages.flatMap((page) => page.data.docs) || [];
  }, [data]);

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<TFilterStatus>('all');
  const [typeFilter, setTypeFilter] = useState<TFilterType>('all');

  const columns = useMemo(() => getColumns(slug), [slug]);

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

  const handlePRClick = (pr: IPullRequestListItem) => {
    router.push(`/stories/${slug}/pull-requests/${pr._id}`);
  };

  if (error) {
    return (
      <PRListError
        message={error.message || 'An error occurred'}
        onRetry={() => window.location.reload()}
      />
    );
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
        </div>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        {...fadeIn(0.1)}
        className="mb-6 grid gap-3"
        style={{
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(150px, 100%), 1fr))',
        }}
      >
        <PRStatsCards stats={stats} setStatusFilter={setStatusFilter} />
      </motion.div>

      {/* Filters */}
      <motion.div {...fadeIn(0.15)} className="mb-6 space-y-4">
        {/* Status tabs */}
        <PRStatusTabs
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          stats={{ open: stats.open }}
        />

        {/* Search and type filter */}
        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
            <Input
              placeholder="Search submit requests..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border-border/50 bg-card pl-9"
            />
          </div>

          <Select value={typeFilter} onValueChange={(v) => setTypeFilter(v as TFilterType)}>
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
          <DataTable columns={columns} data={filteredPRs} onRowClick={handlePRClick} />
        )}
      </motion.div>
    </div>
  );
}
