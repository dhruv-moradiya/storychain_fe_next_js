'use client';

import { useState } from 'react';

import type {
  AppealReviewDecision,
  AppealStatus,
  IAppealItem,
  IReportItem,
  ReportStatus,
} from '@/type/report.type';
import { formatDistanceToNow } from 'date-fns';
import { AlertTriangle, Filter, Scale, Search, Shield } from 'lucide-react';

import {
  appealPriorityBadge,
  appealStatusBadge,
  countBadge,
  reportReasonBadge,
  reportStatusBadge,
  reportTypeBadge,
} from '@/components/common/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import AppealDetailDialog from './appeal-detail-dialog';
import ReportDetailDialog from './report-detail-dialog';

interface ReportsTableSectionProps {
  initialReports: IReportItem[];
  initialAppeals: IAppealItem[];
  slug: string;
}

export function ReportsTableSection({
  initialReports,
  initialAppeals,
  slug,
}: ReportsTableSectionProps) {
  const [reports, setReports] = useState<IReportItem[]>(initialReports);
  const [appeals, setAppeals] = useState<IAppealItem[]>(initialAppeals);
  const [activeTab, setActiveTab] = useState<'reports' | 'appeals'>('reports');

  // Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');

  // Selected for dialog
  const [selectedReport, setSelectedReport] = useState<IReportItem | null>(null);
  const [isReportDialogOpen, setIsReportDialogOpen] = useState(false);

  const [selectedAppeal, setSelectedAppeal] = useState<IAppealItem | null>(null);
  const [isAppealDialogOpen, setIsAppealDialogOpen] = useState(false);

  // Filtered reports
  const filteredReports = reports.filter((r) => {
    const reporterName =
      (typeof r.reporterId === 'object' ? r.reporterId.displayName || r.reporterId.username : '') ||
      '';

    const matchesSearch =
      r.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.reason.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (r.relatedChapterSlug &&
        r.relatedChapterSlug.toLowerCase().includes(searchQuery.toLowerCase())) ||
      reporterName.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'all' || r.status === statusFilter;
    const matchesType = typeFilter === 'all' || r.reportType === typeFilter;

    return matchesSearch && matchesStatus && matchesType;
  });

  // Filtered appeals
  const filteredAppeals = appeals.filter((a) => {
    const username = typeof a.userId === 'object' ? a.userId.username : '';
    const matchesSearch =
      a.appealReason.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.explanation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      username.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'all' || a.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const handleUpdateReportStatus = (
    reportId: string,
    newStatus: ReportStatus,
    resolutionText?: string
  ) => {
    setReports((prev) =>
      prev.map((r) =>
        r._id === reportId
          ? {
              ...r,
              status: newStatus,
              resolution: resolutionText || r.resolution,
              reviewedAt: new Date().toISOString(),
            }
          : r
      )
    );
  };

  const handleAppealReview = (appealId: string, decision: AppealReviewDecision, notes: string) => {
    const newStatus: AppealStatus = decision === 'APPROVE' ? 'APPROVED' : 'REJECTED';
    setAppeals((prev) =>
      prev.map((a) =>
        a._id === appealId
          ? {
              ...a,
              status: newStatus,
              reviewDecision: decision,
              reviewNotes: notes,
              reviewedAt: new Date().toISOString(),
            }
          : a
      )
    );
  };

  return (
    <div className="space-y-6">
      {/* Tabs & Filter Bar Container */}
      <div className="border-border/50 bg-card flex flex-col gap-5 rounded-2xl border p-6 shadow-xs">
        <Tabs
          value={activeTab}
          onValueChange={(v) => setActiveTab(v as 'reports' | 'appeals')}
          className="w-full"
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <TabsList className="bg-muted/40 border-border/40 h-auto flex-nowrap gap-1 rounded-xl border p-1.5">
              <TabsTrigger
                value="reports"
                className="flex items-center gap-2 rounded-lg text-xs font-medium transition-all data-[state=active]:bg-amber-500/10 data-[state=active]:text-amber-600"
              >
                <AlertTriangle className="size-4" />
                <span>Story Reports</span>
                {countBadge(reports.length, 'amber', { size: 'sm', shape: 'pill' })}
              </TabsTrigger>

              <TabsTrigger
                value="appeals"
                className="flex items-center gap-2 rounded-lg text-xs font-medium transition-all data-[state=active]:bg-purple-500/10 data-[state=active]:text-purple-600"
              >
                <Scale className="size-4" />
                <span>User Appeals</span>
                {countBadge(appeals.length, 'purple', { size: 'sm', shape: 'pill' })}
              </TabsTrigger>
            </TabsList>

            {/* Filter Inputs */}
            <div className="flex flex-wrap items-center gap-2.5">
              <div className="relative min-w-[200px] flex-1 sm:w-64">
                <Search className="text-text-secondary-65 absolute top-1/2 left-3 size-3.5 -translate-y-1/2" />
                <Input
                  placeholder="Search reason, slug, user..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="border-border/50 bg-background/50 focus:bg-background h-9 rounded-xl pl-8 text-xs transition-all"
                />
              </div>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="border-border/50 bg-background/50 h-9 w-36 rounded-xl text-xs">
                  <Filter className="text-text-secondary-65 mr-1 size-3.5" />
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent className="bg-card border-border/50 rounded-xl text-xs shadow-md">
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="PENDING">Pending</SelectItem>
                  <SelectItem value="REVIEWED">Reviewed</SelectItem>
                  <SelectItem value="RESOLVED">Resolved</SelectItem>
                  <SelectItem value="DISMISSED">Dismissed</SelectItem>
                </SelectContent>
              </Select>

              {activeTab === 'reports' && (
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger className="border-border/50 bg-background/50 h-9 w-36 rounded-xl text-xs">
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-border/50 rounded-xl text-xs shadow-md">
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="CHAPTER">Chapter</SelectItem>
                    <SelectItem value="COMMENT">Comment</SelectItem>
                    <SelectItem value="STORY">Story</SelectItem>
                    <SelectItem value="USER">User</SelectItem>
                  </SelectContent>
                </Select>
              )}
            </div>
          </div>

          {/* REPORTS TAB */}
          <TabsContent value="reports" className="mt-5 space-y-4">
            {filteredReports.length > 0 ? (
              <div className="flex flex-col gap-3">
                {filteredReports.map((report) => {
                  const reporter = typeof report.reporterId === 'object' ? report.reporterId : null;

                  return (
                    <div
                      key={report._id}
                      onClick={() => {
                        setSelectedReport(report);
                        setIsReportDialogOpen(true);
                      }}
                      className="border-border/40 bg-card hover:bg-muted/30 hover:border-border/80 flex cursor-pointer flex-col gap-3 rounded-xl border p-4 shadow-2xs transition-all sm:flex-row sm:items-center sm:justify-between"
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
                              <AvatarFallback className="bg-amber-500/10 text-[9px] font-bold text-amber-600">
                                {(reporter?.username || 'U').charAt(0).toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                            <span className="text-text-primary/90 font-medium">
                              {reporter?.displayName || reporter?.username || 'Reporter'}
                            </span>
                          </div>

                          <span>·</span>

                          {report.relatedChapterSlug && (
                            <span className="font-mono text-[11px]">
                              Chapter: {report.relatedChapterSlug}
                            </span>
                          )}

                          {report.relatedChapterSlug && <span>·</span>}

                          <span className="font-mono text-[11px]">
                            {formatDistanceToNow(new Date(report.createdAt), { addSuffix: true })}
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
                          className="border-border/50 bg-card hover:bg-muted/60 h-8 rounded-lg text-xs font-medium shadow-2xs transition-all"
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
                  There are currently no reports matching your filters.
                </p>
              </div>
            )}
          </TabsContent>

          {/* APPEALS TAB */}
          <TabsContent value="appeals" className="mt-5 space-y-4">
            {filteredAppeals.length > 0 ? (
              <div className="flex flex-col gap-3">
                {filteredAppeals.map((appeal) => {
                  const appellant = typeof appeal.userId === 'object' ? appeal.userId : null;

                  return (
                    <div
                      key={appeal._id}
                      onClick={() => {
                        setSelectedAppeal(appeal);
                        setIsAppealDialogOpen(true);
                      }}
                      className="border-border/40 bg-card hover:bg-muted/30 hover:border-border/80 flex cursor-pointer flex-col gap-3 rounded-xl border p-4 shadow-2xs transition-all sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div className="min-w-0 flex-1 space-y-2">
                        <div className="flex flex-wrap items-center gap-2">
                          {appealPriorityBadge(appeal.priority)}
                          {appealStatusBadge(appeal.status)}
                        </div>

                        <p className="text-text-primary line-clamp-1 text-sm font-medium">
                          {appeal.appealReason}
                        </p>

                        <div className="text-text-secondary-65 flex flex-wrap items-center gap-3 text-xs">
                          <div className="flex items-center gap-1.5">
                            <Avatar className="ring-border/30 h-5 w-5 ring-1">
                              <AvatarImage src={appellant?.avatarUrl} />
                              <AvatarFallback className="bg-purple-500/10 text-[9px] font-bold text-purple-600">
                                {(appellant?.username || 'U').charAt(0).toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                            <span className="text-text-primary/90 font-medium">
                              {appellant?.displayName || appellant?.username || 'Appellant'}
                            </span>
                          </div>

                          <span>·</span>

                          <span className="font-mono text-[11px]">
                            {formatDistanceToNow(new Date(appeal.createdAt), { addSuffix: true })}
                          </span>
                        </div>
                      </div>

                      <div className="flex shrink-0 items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedAppeal(appeal);
                            setIsAppealDialogOpen(true);
                          }}
                          className="border-border/50 bg-card hover:bg-muted/60 h-8 rounded-lg text-xs font-medium shadow-2xs transition-all"
                        >
                          Review Appeal
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="border-border/40 bg-muted/10 text-text-secondary-65 flex flex-col items-center justify-center rounded-2xl border border-dashed py-16 text-center text-xs">
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-500/10">
                  <Scale className="size-6 text-purple-500" />
                </div>
                <p className="text-text-primary text-sm font-semibold">No User Appeals Found</p>
                <p className="text-text-secondary-65 mt-1">
                  No moderation ban or mute appeals submitted.
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>

      {/* Dialogs */}
      <ReportDetailDialog
        report={selectedReport}
        open={isReportDialogOpen}
        onOpenChange={setIsReportDialogOpen}
        onStatusUpdate={handleUpdateReportStatus}
      />

      <AppealDetailDialog
        appeal={selectedAppeal}
        open={isAppealDialogOpen}
        onOpenChange={setIsAppealDialogOpen}
        onReviewSubmit={handleAppealReview}
      />
    </div>
  );
}

export default ReportsTableSection;
