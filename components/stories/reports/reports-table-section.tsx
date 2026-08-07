'use client';

import * as React from 'react';
import { useState } from 'react';

import {
  IPopulatedReportDetails,
  ReportActionTaken,
  ReportReason,
  ReportStatus,
  ReportType,
} from '@/type/reports';
import { formatDistanceToNow } from 'date-fns';
import { AlertTriangle, Filter, RefreshCw, Search, Shield } from 'lucide-react';

import { reportReasonBadge, reportStatusBadge, reportTypeBadge } from '@/components/common/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useGetStoryReports, useResolveStoryReportMutation } from '@/services/reports';

import ReportDetailDialog from './report-detail-dialog';

interface ReportsTableSectionProps {
  slug: string;
}

export function ReportsTableSection({ slug }: ReportsTableSectionProps) {
  // Query Filters State
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');

  // React Query integration
  const queryParams = {
    page,
    limit: 10,
    ...(statusFilter !== 'all' && { status: statusFilter as ReportStatus }),
    ...(typeFilter !== 'all' && { reportType: typeFilter as ReportType }),
  };

  const {
    data: responseData,
    isLoading,
    isFetching,
    refetch,
  } = useGetStoryReports(slug, queryParams);
  const resolveMutation = useResolveStoryReportMutation(slug);

  const paginatedDocs = responseData?.data?.docs || [];
  const totalDocs = responseData?.data?.totalDocs || 0;
  const totalPages = responseData?.data?.totalPages || 1;

  // Selected report for modal
  const [selectedReport, setSelectedReport] = useState<IPopulatedReportDetails | null>(null);
  const [isReportDialogOpen, setIsReportDialogOpen] = useState(false);

  // Client-side search filtering on current page
  const filteredReports = paginatedDocs.filter((r) => {
    const reporterName = r.reporter?.username || '';
    const description = r.description || '';
    const reason = r.reason || '';

    return (
      description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      reason.toLowerCase().includes(searchQuery.toLowerCase()) ||
      reporterName.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const handleResolve = (
    reportId: string,
    status: ReportStatus.RESOLVED | ReportStatus.DISMISSED,
    resolution: string,
    actionTaken?: ReportActionTaken
  ) => {
    resolveMutation.mutate(
      {
        reportId,
        payload: {
          status,
          resolution,
          actionTaken,
        },
      },
      {
        onSuccess: () => {
          setIsReportDialogOpen(false);
        },
      }
    );
  };

  return (
    <div className="flex flex-col gap-5">
      {/* Header — Same as Chapters header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-brand-pink-500/10 flex h-10 w-10 items-center justify-center rounded-xl">
            <AlertTriangle className="text-brand-pink-500 h-5 w-5" />
          </div>
          <div>
            <h1 className="text-text-primary text-xl font-semibold">Story Reports</h1>
            <p className="text-text-secondary-65 text-sm">
              Review and moderate reports submitted for this story
            </p>
          </div>
        </div>

        {/* Filter Inputs */}
        <div className="flex flex-wrap items-center gap-2.5">
          <div className="relative min-w-50 flex-1 sm:w-64">
            <Search className="text-text-secondary-65 absolute top-1/2 left-3 size-3.5 -translate-y-1/2" />
            <Input
              placeholder="Search description, reason, user..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border-border/50 bg-background/50 focus:bg-background h-9 rounded-md pl-8 text-xs transition-all"
            />
          </div>

          <Select
            value={statusFilter}
            onValueChange={(val) => {
              setStatusFilter(val);
              setPage(1);
            }}
          >
            <SelectTrigger className="border-border/50 bg-background/50 h-9 w-36 rounded-md text-xs">
              <Filter className="text-text-secondary-65 mr-1 size-3.5" />
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent className="bg-card border-border/50 rounded-xl text-xs shadow-md">
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value={ReportStatus.PENDING}>Pending</SelectItem>
              <SelectItem value={ReportStatus.UNDER_REVIEW}>Under Review</SelectItem>
              <SelectItem value={ReportStatus.RESOLVED}>Resolved</SelectItem>
              <SelectItem value={ReportStatus.DISMISSED}>Dismissed</SelectItem>
              <SelectItem value={ReportStatus.ESCALATED}>Escalated</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={typeFilter}
            onValueChange={(val) => {
              setTypeFilter(val);
              setPage(1);
            }}
          >
            <SelectTrigger className="border-border/50 bg-background/50 h-9 w-36 rounded-md text-xs">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent className="bg-card border-border/50 rounded-xl text-xs shadow-md">
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value={ReportType.CHAPTER}>Chapter</SelectItem>
              <SelectItem value={ReportType.COMMENT}>Comment</SelectItem>
              <SelectItem value={ReportType.STORY}>Story</SelectItem>
              <SelectItem value={ReportType.USER}>User</SelectItem>
            </SelectContent>
          </Select>

          <Button
            variant="outline"
            size="sm"
            onClick={() => refetch()}
            className="border-border/50 bg-card hover:bg-muted/60 h-9 w-9 rounded-md p-0"
            title="Refresh reports"
          >
            <RefreshCw className={`size-3.5 ${isFetching ? 'animate-spin' : ''}`} />
          </Button>
        </div>
      </div>

      {/* REPORTS LIST TABLE CONTAINER */}
      <div className="border-border/50 bg-card/50 space-y-4 rounded-2xl border p-5 shadow-2xs">
        {isLoading ? (
          <div className="border-border/40 bg-muted/10 flex flex-col items-center justify-center rounded-xl border border-dashed py-16 text-center text-xs">
            <RefreshCw className="mb-2 size-6 animate-spin text-amber-500" />
            <p className="text-text-primary text-sm font-semibold">Loading story reports...</p>
          </div>
        ) : filteredReports.length > 0 ? (
          <div className="flex flex-col gap-3">
            {filteredReports.map((report) => {
              const reporter = report.reporter;

              return (
                <div
                  key={report._id}
                  onClick={() => {
                    setSelectedReport(report);
                    setIsReportDialogOpen(true);
                  }}
                  className="border-border/40 bg-card/50 hover:bg-muted/30 hover:border-border/80 flex cursor-pointer flex-col gap-3 rounded-xl border p-4 shadow-2xs transition-all sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="min-w-0 flex-1 space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      {reportReasonBadge(report.reason as ReportReason)}
                      {reportTypeBadge(report.reportType as ReportType)}
                      {reportStatusBadge(report.status as ReportStatus)}
                    </div>

                    <p className="text-text-primary line-clamp-1 text-sm font-medium">
                      {report.description}
                    </p>

                    <div className="text-text-secondary-65 flex flex-wrap items-center gap-3 text-xs">
                      <div className="flex items-center gap-1.5">
                        <Avatar className="ring-border/30 h-5 w-5 ring-1">
                          <AvatarImage src={reporter?.avatarUrl} />
                          <AvatarFallback className="bg-amber-500/10 text-[9px] font-bold text-amber-600">
                            {(reporter?.username || 'U').charAt(0).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-text-primary/90 font-medium">
                          {reporter?.username || 'Reporter'}
                        </span>
                      </div>

                      <span>·</span>

                      {report.chapter && (
                        <span className="font-mono text-[11px]">
                          Chapter: {report.chapter.title || report.chapter.slug}
                        </span>
                      )}

                      {report.chapter && <span>·</span>}

                      <span className="font-mono text-[11px]">
                        {report.createdAt
                          ? formatDistanceToNow(new Date(report.createdAt), { addSuffix: true })
                          : ''}
                      </span>
                    </div>
                  </div>

                  <div className="flex shrink-0 items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedReport(report);
                        setIsReportDialogOpen(true);
                      }}
                      className="border-border/50 bg-card hover:bg-muted/60 h-8 rounded-md text-xs font-medium shadow-2xs transition-all"
                    >
                      Inspect
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="border-border/40 bg-muted/10 text-text-secondary-65 flex flex-col items-center justify-center rounded-2xl border border-dashed py-16 text-center text-xs">
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500/10">
              <Shield className="size-6 text-amber-500" />
            </div>
            <p className="text-text-primary text-sm font-semibold">No Reports Found</p>
            <p className="text-text-secondary-65 mt-1">
              There are currently no reports filed for this story matching your filters.
            </p>
          </div>
        )}

        {/* Pagination Component */}
        {totalPages > 1 && (
          <div className="border-border/40 flex flex-col items-center justify-between gap-3 border-t pt-4 text-xs sm:flex-row">
            <span className="text-text-secondary-65">
              Page {page} of {totalPages} ({totalDocs} reports total)
            </span>
            <Pagination className="mx-0 w-auto justify-center sm:justify-end">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={(e) => {
                      e.preventDefault();
                      if (page > 1) setPage((p) => Math.max(1, p - 1));
                    }}
                    className={page <= 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                  />
                </PaginationItem>

                {Array.from({ length: totalPages }, (_, i) => i + 1)
                  .filter((p) => p === 1 || p === totalPages || (p >= page - 1 && p <= page + 1))
                  .map((p, idx, arr) => {
                    const prevPage = arr[idx - 1];
                    const showEllipsis = prevPage && p - prevPage > 1;
                    return (
                      <React.Fragment key={p}>
                        {showEllipsis && (
                          <PaginationItem>
                            <PaginationEllipsis />
                          </PaginationItem>
                        )}
                        <PaginationItem>
                          <PaginationLink
                            onClick={(e) => {
                              e.preventDefault();
                              setPage(p);
                            }}
                            isActive={p === page}
                            className="cursor-pointer"
                          >
                            {p}
                          </PaginationLink>
                        </PaginationItem>
                      </React.Fragment>
                    );
                  })}

                <PaginationItem>
                  <PaginationNext
                    onClick={(e) => {
                      e.preventDefault();
                      if (page < totalPages) setPage((p) => Math.min(totalPages, p + 1));
                    }}
                    className={
                      page >= totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </div>

      {/* Detail Dialog */}
      <ReportDetailDialog
        report={selectedReport}
        open={isReportDialogOpen}
        onOpenChange={setIsReportDialogOpen}
        onResolve={handleResolve}
        isSubmitting={resolveMutation.isPending}
      />
    </div>
  );
}

export default ReportsTableSection;
