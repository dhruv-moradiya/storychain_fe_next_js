'use client';

import * as React from 'react';
import { useState } from 'react';

import {
  IBanUserGloballyPayload,
  IPopulatedReportDetails,
  ReportActionTaken,
  ReportStatus,
  ReportType,
} from '@/type/reports';
import { formatDistanceToNow } from 'date-fns';
import { Filter, RefreshCw, Search, Shield, ShieldAlert, UserX } from 'lucide-react';

import {
  countBadge,
  reportReasonBadge,
  reportStatusBadge,
  reportTypeBadge,
} from '@/components/common/badge';
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
import {
  useBanUserGloballyMutation,
  useGetAdminReports,
  useResolveAdminReportMutation,
  useUpdateAdminReportStatusMutation,
} from '@/services/reports';

import AdminBanUserDialog from './admin-ban-user-dialog';
import AdminReportDetailDialog from './admin-report-detail-dialog';

export function AdminReportsTableSection() {
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');

  const queryParams = {
    page,
    limit: 10,
    ...(statusFilter !== 'all' && { status: statusFilter as ReportStatus }),
    ...(typeFilter !== 'all' && { reportType: typeFilter as ReportType }),
  };

  const { data: responseData, isLoading, isFetching, refetch } = useGetAdminReports(queryParams);
  const updateStatusMutation = useUpdateAdminReportStatusMutation();
  const resolveAdminMutation = useResolveAdminReportMutation();
  const banUserGloballyMutation = useBanUserGloballyMutation();

  const paginatedDocs = responseData?.data?.docs || [];
  const totalDocs = responseData?.data?.totalDocs || 0;
  const totalPages = responseData?.data?.totalPages || 1;

  // Selected for modals
  const [selectedReport, setSelectedReport] = useState<IPopulatedReportDetails | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const [banUserId, setBanUserId] = useState<string | null>(null);
  const [isBanOpen, setIsBanOpen] = useState(false);

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

  const handleUpdateStatus = (
    reportId: string,
    status: ReportStatus.UNDER_REVIEW | ReportStatus.DISMISSED
  ) => {
    updateStatusMutation.mutate(
      { reportId, payload: { status } },
      {
        onSuccess: () => {
          setIsDetailOpen(false);
        },
      }
    );
  };

  const handleResolve = (
    reportId: string,
    resolution: string,
    globalAction?: ReportActionTaken
  ) => {
    resolveAdminMutation.mutate(
      {
        reportId,
        payload: { resolution, globalAction },
      },
      {
        onSuccess: () => {
          setIsDetailOpen(false);
        },
      }
    );
  };

  const handleBanUser = (userId: string, payload: IBanUserGloballyPayload) => {
    banUserGloballyMutation.mutate(
      { userId, payload },
      {
        onSuccess: () => {
          setIsBanOpen(false);
        },
      }
    );
  };

  return (
    <div className="space-y-6">
      {/* Top Filter Container */}
      <div className="border-border/ flex flex-col gap-5 rounded-2xl border p-6 shadow-xs">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-text-primary flex items-center gap-2 text-sm font-semibold">
            <ShieldAlert className="size-4 text-rose-500" />
            <span>Platform Moderation Queue</span>
            {countBadge(totalDocs, 'rose', { size: 'sm', shape: 'pill' })}
          </div>

          {/* Filter Bar */}
          <div className="flex flex-wrap items-center gap-2.5">
            <div className="relative min-w-50 flex-1 sm:w-64">
              <Search className="text-text-secondary-65 absolute top-1/2 left-3 size-3.5 -translate-y-1/2" />
              <Input
                placeholder="Search report details, user..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="border-border/50 bg-background/50 focus:bg-background h-9 rounded-xl pl-8 text-xs transition-all"
              />
            </div>

            <Select
              value={statusFilter}
              onValueChange={(val) => {
                setStatusFilter(val);
                setPage(1);
              }}
            >
              <SelectTrigger className="border-border/50 bg-background/50 h-9 w-36 rounded-xl text-xs">
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
              <SelectTrigger className="border-border/50 bg-background/50 h-9 w-36 rounded-xl text-xs">
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
              className="border-border/50 bg-card hover:bg-muted/60 h-9 w-9 rounded-xl p-0"
              title="Refresh queue"
            >
              <RefreshCw className={`size-3.5 ${isFetching ? 'animate-spin' : ''}`} />
            </Button>
          </div>
        </div>

        {/* REPORTS LIST */}
        <div className="mt-2 space-y-4">
          {isLoading ? (
            <div className="border-border/40 bg-muted/10 flex flex-col items-center justify-center rounded-2xl border border-dashed py-16 text-center text-xs">
              <RefreshCw className="mb-2 size-6 animate-spin text-rose-500" />
              <p className="text-text-primary text-sm font-semibold">Loading platform queue...</p>
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
                      setIsDetailOpen(true);
                    }}
                    className="border-border/40 hover:bg-muted/30 hover:border-border/80 flex cursor-pointer flex-col gap-3 rounded-xl border p-4 shadow-2xs transition-all sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div className="min-w-0 flex-1 space-y-2">
                      <div className="flex flex-wrap items-center gap-2">
                        {reportReasonBadge(report.reason)}
                        {reportTypeBadge(report.reportType)}
                        {reportStatusBadge(report.status)}
                      </div>

                      <p className="text-text-primary line-clamp-1 text-sm font-medium">
                        {report.description}
                      </p>

                      <div className="text-text-secondary-65 flex flex-wrap items-center gap-3 text-xs">
                        <div className="flex items-center gap-1.5">
                          <Avatar className="ring-border/30 h-5 w-5 ring-1">
                            <AvatarImage src={reporter?.avatarUrl} />
                            <AvatarFallback className="bg-rose-500/10 text-[9px] font-bold text-rose-600">
                              {(reporter?.username || 'U').charAt(0).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-text-primary/90 font-medium">
                            {reporter?.username || 'Reporter'}
                          </span>
                        </div>

                        <span>·</span>

                        <span className="font-mono text-[11px]">
                          {report.createdAt
                            ? formatDistanceToNow(new Date(report.createdAt), { addSuffix: true })
                            : ''}
                        </span>
                      </div>
                    </div>

                    <div className="flex shrink-0 items-center gap-2">
                      {report.targetUser && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            setBanUserId(report.targetUser!.clerkId);
                            setIsBanOpen(true);
                          }}
                          className="h-8 gap-1 text-xs text-rose-600 hover:bg-rose-500/10"
                        >
                          <UserX className="size-3.5" />
                          Ban User
                        </Button>
                      )}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedReport(report);
                          setIsDetailOpen(true);
                        }}
                        className="border-border/50 bg-card hover:bg-muted/60 h-8 rounded-lg text-xs font-medium shadow-2xs transition-all"
                      >
                        Inspect & Action
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="border-border/40 bg-muted/10 text-text-secondary-65 flex flex-col items-center justify-center rounded-2xl border border-dashed py-16 text-center text-xs">
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-500/10">
                <Shield className="size-6 text-rose-500" />
              </div>
              <p className="text-text-primary text-sm font-semibold">No Platform Reports</p>
              <p className="text-text-secondary-65 mt-1">
                There are currently no reports in the admin queue matching your filters.
              </p>
            </div>
          )}
        </div>

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

      {/* Dialogs */}
      <AdminReportDetailDialog
        report={selectedReport}
        open={isDetailOpen}
        onOpenChange={setIsDetailOpen}
        onUpdateStatus={handleUpdateStatus}
        onResolve={handleResolve}
        onOpenGlobalBan={(uid) => {
          setBanUserId(uid);
          setIsBanOpen(true);
        }}
        isSubmitting={updateStatusMutation.isPending || resolveAdminMutation.isPending}
      />

      <AdminBanUserDialog
        userId={banUserId}
        open={isBanOpen}
        onOpenChange={setIsBanOpen}
        onBanSubmit={handleBanUser}
        isSubmitting={banUserGloballyMutation.isPending}
      />
    </div>
  );
}

export default AdminReportsTableSection;
