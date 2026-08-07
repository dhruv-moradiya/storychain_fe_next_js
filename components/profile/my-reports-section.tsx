'use client';

import * as React from 'react';
import { useState } from 'react';

import { IPopulatedReportDetails, ReportReason, ReportStatus, ReportType } from '@/type/reports';
import { formatDistanceToNow } from 'date-fns';
import {
  CheckCircle,
  Clock,
  FileWarning,
  Flag,
  Info,
  RefreshCw,
  Scale,
  Shield,
} from 'lucide-react';

import AppealDialog from '@/components/common/appeal-dialog';
import { reportReasonBadge, reportStatusBadge, reportTypeBadge } from '@/components/common/badge';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useGetMyReports } from '@/services/reports';

export function MyReportsSection() {
  const [reportFilter, setReportFilter] = useState<ReportStatus | 'ALL'>('ALL');
  const [page, setPage] = useState(1);

  // Modal State
  const [selectedReport, setSelectedReport] = useState<IPopulatedReportDetails | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const queryParams = {
    page,
    limit: 10,
    ...(reportFilter !== 'ALL' && { status: reportFilter }),
  };

  const { data: responseData, isLoading, refetch } = useGetMyReports(queryParams);
  const reports = responseData?.data?.docs || [];
  const totalReports = responseData?.data?.totalDocs || 0;
  const totalPages = responseData?.data?.totalPages || 1;

  const pendingReportsCount = reports.filter(
    (r) => r.status === ReportStatus.PENDING || r.status === ReportStatus.UNDER_REVIEW
  ).length;
  const resolvedReportsCount = reports.filter((r) => r.status === ReportStatus.RESOLVED).length;

  const handleCardClick = (report: IPopulatedReportDetails) => {
    setSelectedReport(report);
    setIsDetailOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="from-brand-pink-500/20 to-brand-orange/20 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br">
            <FileWarning className="text-brand-pink-500 h-5 w-5" />
          </div>
          <div>
            <h1 className="text-text-primary text-lg font-semibold tracking-tight">
              My Reports & Appeals
            </h1>
            <p className="text-text-secondary-65 text-sm">
              Track the status of reports you&apos;ve submitted and any ban appeals
            </p>
          </div>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => refetch()}
          className="border-border/50 bg-card hover:bg-muted/60 h-9 gap-2 rounded-xl text-xs"
        >
          <RefreshCw className="size-3.5" />
          Refresh
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div className="border-border/50 bg-card dark:bg-card/80 rounded-xl border p-4 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="bg-brand-pink-500/10 rounded-xl p-2.5">
              <Flag className="text-brand-pink-500 h-5 w-5" />
            </div>
            <div>
              <p className="text-text-primary text-xl font-bold">{totalReports}</p>
              <p className="text-text-secondary-65 text-xs">Total Reports</p>
            </div>
          </div>
        </div>

        <div className="border-border/50 bg-card dark:bg-card/80 rounded-xl border p-4 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-yellow-500/10 p-2.5">
              <Clock className="h-5 w-5 text-yellow-500" />
            </div>
            <div>
              <p className="text-text-primary text-xl font-bold">{pendingReportsCount}</p>
              <p className="text-text-secondary-65 text-xs">Pending / In Review</p>
            </div>
          </div>
        </div>

        <div className="border-border/50 bg-card dark:bg-card/80 rounded-xl border p-4 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-green-500/10 p-2.5">
              <CheckCircle className="h-5 w-5 text-green-500" />
            </div>
            <div>
              <p className="text-text-primary text-xl font-bold">{resolvedReportsCount}</p>
              <p className="text-text-secondary-65 text-xs">Resolved</p>
            </div>
          </div>
        </div>

        <div className="border-border/50 bg-card dark:bg-card/80 rounded-xl border p-4 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-purple-500/10 p-2.5">
              <Scale className="h-5 w-5 text-purple-500" />
            </div>
            <div>
              <p className="text-text-primary text-xl font-bold">0</p>
              <p className="text-text-secondary-65 text-xs">Appeals</p>
            </div>
          </div>
        </div>
      </div>

      <Tabs defaultValue="reports">
        <TabsList className="bg-muted/30">
          <TabsTrigger
            value="reports"
            className="data-[state=active]:bg-brand-pink-500 gap-2 data-[state=active]:text-white"
          >
            <Flag className="h-4 w-4" />
            My Reports
            {pendingReportsCount > 0 && (
              <Badge variant="secondary" className="ml-1 h-5 px-1.5">
                {pendingReportsCount}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger
            value="appeals"
            className="data-[state=active]:bg-brand-pink-500 gap-2 data-[state=active]:text-white"
          >
            <Scale className="h-4 w-4" />
            My Appeals
          </TabsTrigger>
        </TabsList>

        {/* Reports Tab */}
        <TabsContent value="reports" className="mt-6">
          <div className="border-border/50 bg-card dark:bg-card/80 space-y-4 rounded-xl border p-5 shadow-xs">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-text-primary text-base font-semibold">
                  Reports You&apos;ve Submitted
                </h2>
                <p className="text-text-secondary-65 text-sm">
                  Click on any report to view detailed timeline and resolution notes
                </p>
              </div>
              <Select
                value={reportFilter}
                onValueChange={(v) => {
                  setReportFilter(v as ReportStatus | 'ALL');
                  setPage(1);
                }}
              >
                <SelectTrigger className="border-border/50 bg-background/50 w-[180px] text-xs">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent className="bg-card border-border/50 text-xs shadow-md">
                  <SelectItem value="ALL">All Reports</SelectItem>
                  <SelectItem value={ReportStatus.PENDING}>Pending</SelectItem>
                  <SelectItem value={ReportStatus.UNDER_REVIEW}>Under Review</SelectItem>
                  <SelectItem value={ReportStatus.RESOLVED}>Resolved</SelectItem>
                  <SelectItem value={ReportStatus.DISMISSED}>Dismissed</SelectItem>
                  <SelectItem value={ReportStatus.ESCALATED}>Escalated</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <ScrollArea className="h-[450px] pr-4">
              <div className="space-y-3">
                {isLoading ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center text-xs">
                    <RefreshCw className="text-brand-pink-500 mb-2 size-6 animate-spin" />
                    <p className="text-text-primary text-sm font-semibold">
                      Loading your reports...
                    </p>
                  </div>
                ) : reports.length > 0 ? (
                  reports.map((report) => (
                    <ReportCard
                      key={report._id}
                      report={report}
                      onClick={() => handleCardClick(report)}
                    />
                  ))
                ) : (
                  <EmptyState
                    icon={Flag}
                    title="No reports found"
                    description={
                      reportFilter === 'ALL'
                        ? "You haven't submitted any reports yet"
                        : `No reports matching status "${reportFilter}"`
                    }
                  />
                )}
              </div>
            </ScrollArea>

            {/* Pagination Component */}
            {totalPages > 1 && (
              <div className="border-border/40 flex flex-col items-center justify-between gap-3 border-t pt-4 text-xs sm:flex-row">
                <span className="text-text-secondary-65">
                  Page {page} of {totalPages} ({totalReports} reports total)
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
                      .filter(
                        (p) => p === 1 || p === totalPages || (p >= page - 1 && p <= page + 1)
                      )
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
        </TabsContent>

        {/* Appeals Tab */}
        <TabsContent value="appeals" className="mt-6">
          <div className="border-border/50 bg-card dark:bg-card/80 rounded-xl border p-5 shadow-xs">
            <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-text-primary text-base font-semibold">Your Ban Appeals</h2>
                <p className="text-text-secondary-65 text-sm">
                  Track the status of appeals you&apos;ve submitted
                </p>
              </div>
              <div className="flex items-center gap-3">
                <AppealDialog
                  trigger={
                    <Button size="sm" className="gap-2">
                      <Scale className="h-4 w-4" />
                      New Appeal
                    </Button>
                  }
                />
              </div>
            </div>

            <EmptyState
              icon={Scale}
              title="No appeals active"
              description="You currently have no ban or sanction appeals."
            />
          </div>

          {/* Appeal Info */}
          <div className="border-border/50 bg-card dark:bg-card/80 mt-6 rounded-xl border p-5 shadow-xs">
            <div className="mb-4 flex items-center gap-2">
              <Info className="text-brand-pink-500 h-5 w-5" />
              <h2 className="text-text-primary text-base font-semibold">About Appeals</h2>
            </div>
            <div className="text-text-secondary-65 space-y-4 text-sm">
              <p>
                If you believe your account was banned unfairly, you can submit an appeal for review
                by our moderation team.
              </p>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="bg-muted/30 border-border/40 rounded-lg border p-3">
                  <p className="text-text-primary mb-1 font-medium">Response Time</p>
                  <p>Appeals are typically reviewed within 48-72 hours.</p>
                </div>
                <div className="bg-muted/30 border-border/40 rounded-lg border p-3">
                  <p className="text-text-primary mb-1 font-medium">One Appeal Per Ban</p>
                  <p>You can only submit one appeal per ban. Make it count!</p>
                </div>
                <div className="bg-muted/30 border-border/40 rounded-lg border p-3">
                  <p className="text-text-primary mb-1 font-medium">Provide Evidence</p>
                  <p>Include any relevant context or evidence to support your case.</p>
                </div>
                <div className="bg-muted/30 border-border/40 rounded-lg border p-3">
                  <p className="text-text-primary mb-1 font-medium">Final Decision</p>
                  <p>The moderation team&apos;s decision after review is final.</p>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* User Report Detail Modal */}
      <UserReportDetailModal
        report={selectedReport}
        open={isDetailOpen}
        onOpenChange={setIsDetailOpen}
      />
    </div>
  );
}

interface ReportCardProps {
  report: IPopulatedReportDetails;
  onClick: () => void;
}

function ReportCard({ report, onClick }: ReportCardProps) {
  const targetTitle =
    report.chapter?.title ||
    report.story?.title ||
    (report.targetUser ? `@${report.targetUser.username}` : report.reportType);

  return (
    <div
      onClick={onClick}
      className="border-border/50 bg-background/50 hover:bg-muted/40 hover:border-brand-pink-500/30 cursor-pointer rounded-xl border p-4 shadow-2xs transition-all"
    >
      <div className="mb-3 flex items-start justify-between">
        <div className="flex flex-wrap items-center gap-2">
          {reportReasonBadge(report.reason as ReportReason)}
          {reportTypeBadge(report.reportType as ReportType)}
          {reportStatusBadge(report.status as ReportStatus)}
        </div>
        <span className="text-text-secondary-65 shrink-0 font-mono text-xs">
          {report.createdAt
            ? formatDistanceToNow(new Date(report.createdAt), { addSuffix: true })
            : ''}
        </span>
      </div>

      <p className="text-text-primary mb-1 flex items-center gap-2 text-sm font-medium">
        Target: {targetTitle}
      </p>
      <p className="text-text-secondary-65 mb-3 line-clamp-2 text-sm">{report.description}</p>

      {/* Resolution summary (if resolved) */}
      {report.resolution && (
        <div className="mt-3 rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-3 text-xs">
          <p className="mb-1 flex items-center gap-1 font-semibold text-emerald-600 dark:text-emerald-400">
            <CheckCircle className="h-3.5 w-3.5" />
            Resolution
          </p>
          <p className="text-text-primary text-xs">{report.resolution}</p>
        </div>
      )}
    </div>
  );
}

interface UserReportDetailModalProps {
  report: IPopulatedReportDetails | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function UserReportDetailModal({ report, open, onOpenChange }: UserReportDetailModalProps) {
  if (!report) return null;

  const targetTitle =
    report.chapter?.title ||
    report.story?.title ||
    (report.targetUser ? `@${report.targetUser.username}` : report.reportType);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-card border-border/50 text-card-foreground max-w-lg rounded-2xl p-6 shadow-xl">
        <DialogHeader>
          <div className="flex items-center gap-2.5">
            <div className="border-brand-pink-500/20 bg-brand-pink-500/10 flex h-9 w-9 items-center justify-center rounded-xl border">
              <Shield className="text-brand-pink-500 size-4" />
            </div>
            <div>
              <DialogTitle className="text-text-primary font-libreBaskerville text-lg font-bold">
                Report Details (#{report._id.slice(-6)})
              </DialogTitle>
              <DialogDescription className="text-text-secondary-65 text-xs">
                Submitted{' '}
                {report.createdAt
                  ? formatDistanceToNow(new Date(report.createdAt), { addSuffix: true })
                  : ''}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-4 py-2 text-xs">
          {/* Status & Badges */}
          <div className="grid grid-cols-3 gap-3">
            <div className="border-border/40 bg-muted/20 flex flex-col gap-1 rounded-xl border p-2.5">
              <span className="text-text-secondary-65 text-[10px] font-semibold uppercase">
                Type
              </span>
              <div>{reportTypeBadge(report.reportType as ReportType)}</div>
            </div>
            <div className="border-border/40 bg-muted/20 flex flex-col gap-1 rounded-xl border p-2.5">
              <span className="text-text-secondary-65 text-[10px] font-semibold uppercase">
                Reason
              </span>
              <div>{reportReasonBadge(report.reason as ReportReason)}</div>
            </div>
            <div className="border-border/40 bg-muted/20 flex flex-col gap-1 rounded-xl border p-2.5">
              <span className="text-text-secondary-65 text-[10px] font-semibold uppercase">
                Status
              </span>
              <div>{reportStatusBadge(report.status as ReportStatus)}</div>
            </div>
          </div>

          {/* Target Reference */}
          <div className="border-border/40 bg-muted/10 flex flex-col gap-1.5 rounded-xl border p-3">
            <span className="text-text-secondary-65 text-[10px] font-semibold uppercase">
              Reported Entity
            </span>
            <div className="text-text-primary font-mono text-xs font-semibold">{targetTitle}</div>
            {report.chapter?.slug && (
              <div className="text-text-secondary-65 font-mono text-[11px]">
                Chapter Slug: {report.chapter.slug}
              </div>
            )}
            {report.comment?.content && (
              <div className="text-text-secondary-65 text-[11px] italic">
                &quot;{report.comment.content}&quot;
              </div>
            )}
          </div>

          {/* Report Description */}
          <div className="space-y-1">
            <span className="text-text-secondary-65 text-[10px] font-semibold uppercase">
              Your Description
            </span>
            <div className="border-border/40 bg-background/50 text-text-primary rounded-xl border p-3 leading-relaxed whitespace-pre-wrap">
              {report.description}
            </div>
          </div>

          {/* Moderator Resolution */}
          {report.resolution ? (
            <div className="space-y-1.5 rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-3">
              <div className="flex items-center gap-1.5 font-semibold text-emerald-600 dark:text-emerald-400">
                <CheckCircle className="size-3.5" />
                <span>Moderation Resolution</span>
              </div>
              <p className="text-text-primary text-xs leading-relaxed">{report.resolution}</p>
              {report.actionTaken && (
                <p className="text-text-secondary-65 mt-1 font-mono text-[11px]">
                  Action Taken: <span className="font-semibold">{report.actionTaken}</span>
                </p>
              )}
              {report.resolvedAt && (
                <p className="text-text-secondary-65 mt-0.5 font-mono text-[10px]">
                  Resolved {formatDistanceToNow(new Date(report.resolvedAt), { addSuffix: true })}
                </p>
              )}
            </div>
          ) : (
            <div className="rounded-xl border border-yellow-500/20 bg-yellow-500/10 p-3 text-xs text-yellow-800 dark:text-yellow-200">
              Your report is currently pending review by our moderation team.
            </div>
          )}
        </div>

        <DialogFooter className="pt-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onOpenChange(false)}
            className="border-border/50 bg-card hover:bg-muted/60 h-9 w-full rounded-xl text-xs font-semibold sm:w-auto"
          >
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

interface EmptyStateProps {
  icon: typeof Flag;
  title: string;
  description: string;
}

function EmptyState({ icon: Icon, title, description }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="bg-muted/50 mb-4 rounded-full p-4">
        <Icon className="text-text-secondary-65 h-8 w-8" />
      </div>
      <h3 className="text-text-primary mb-1 font-medium">{title}</h3>
      <p className="text-text-secondary-65 text-sm">{description}</p>
    </div>
  );
}

export default MyReportsSection;
