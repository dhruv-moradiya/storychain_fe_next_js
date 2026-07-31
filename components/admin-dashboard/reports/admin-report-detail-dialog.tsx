'use client';

import { useState } from 'react';

import { IPopulatedReportDetails, ReportActionTaken, ReportStatus } from '@/type/reports';
import { formatDistanceToNow } from 'date-fns';
import { CheckCircle2, Shield, UserX } from 'lucide-react';

import { reportReasonBadge, reportStatusBadge, reportTypeBadge } from '@/components/common/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

interface AdminReportDetailDialogProps {
  report: IPopulatedReportDetails | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUpdateStatus: (
    reportId: string,
    status: ReportStatus.UNDER_REVIEW | ReportStatus.DISMISSED
  ) => void;
  onResolve: (reportId: string, resolution: string, globalAction?: ReportActionTaken) => void;
  onOpenGlobalBan: (userId: string) => void;
  isSubmitting?: boolean;
}

export function AdminReportDetailDialog({
  report,
  open,
  onOpenChange,
  onUpdateStatus,
  onResolve,
  onOpenGlobalBan,
  isSubmitting = false,
}: AdminReportDetailDialogProps) {
  const [resolutionInput, setResolutionInput] = useState('');
  const [selectedGlobalAction, setSelectedGlobalAction] = useState<ReportActionTaken>(
    ReportActionTaken.NONE
  );

  if (!report) return null;

  const reporter = report.reporter;
  const isResolvedOrDismissed =
    report.status === ReportStatus.RESOLVED || report.status === ReportStatus.DISMISSED;

  const handleResolveSubmit = () => {
    onResolve(report._id, resolutionInput, selectedGlobalAction);
    setResolutionInput('');
    setSelectedGlobalAction(ReportActionTaken.NONE);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-card border-border/50 max-w-xl rounded-2xl p-6 shadow-xl">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-rose-500/20 bg-rose-500/10">
                <Shield className="size-4 text-rose-500" />
              </div>
              <DialogTitle className="text-text-primary font-libreBaskerville text-lg font-bold">
                Platform Admin Report (#{report._id.slice(-6)})
              </DialogTitle>
            </div>
          </div>
          <DialogDescription className="text-text-secondary-65 text-xs">
            Platform queue item. Take global action or update report state.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          {/* Metadata Row */}
          <div className="grid grid-cols-3 gap-3 text-xs">
            <div className="border-border/40 bg-muted/20 flex flex-col gap-1.5 rounded-xl border p-3">
              <span className="text-text-secondary-65 text-[10px] font-medium tracking-wide uppercase">
                Type
              </span>
              <div>{reportTypeBadge(report.reportType)}</div>
            </div>

            <div className="border-border/40 bg-muted/20 flex flex-col gap-1.5 rounded-xl border p-3">
              <span className="text-text-secondary-65 text-[10px] font-medium tracking-wide uppercase">
                Reason
              </span>
              <div>{reportReasonBadge(report.reason)}</div>
            </div>

            <div className="border-border/40 bg-muted/20 flex flex-col gap-1.5 rounded-xl border p-3">
              <span className="text-text-secondary-65 text-[10px] font-medium tracking-wide uppercase">
                Status
              </span>
              <div>{reportStatusBadge(report.status)}</div>
            </div>
          </div>

          {/* Reference details */}
          <div className="border-border/40 bg-muted/10 flex flex-col gap-2 rounded-xl border p-3.5 text-xs">
            <span className="text-text-secondary-65 text-[10px] font-semibold tracking-wide uppercase">
              Target Entity Reference
            </span>
            <div className="text-text-primary space-y-1 font-mono text-xs font-medium">
              {report.story && (
                <div>
                  Story:{' '}
                  <span className="text-brand-blue">
                    {report.story.title} ({report.story.slug})
                  </span>
                </div>
              )}
              {report.chapter && (
                <div>
                  Chapter:{' '}
                  <span className="text-brand-blue">
                    {report.chapter.title || report.chapter.slug}
                  </span>
                </div>
              )}
              {report.comment && (
                <div>
                  Comment Content:{' '}
                  <span className="text-text-secondary-65 italic">
                    &quot;{report.comment.content}&quot;
                  </span>
                </div>
              )}
              {report.targetUser && (
                <div className="flex items-center justify-between">
                  <span>
                    Reported User:{' '}
                    <span className="text-brand-blue">@{report.targetUser.username}</span>
                  </span>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => onOpenGlobalBan(report.targetUser!.clerkId)}
                    className="h-7 gap-1 px-2 text-[11px]"
                  >
                    <UserX className="size-3" />
                    Ban Globally
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Reporter Details */}
          <div className="border-border/40 bg-card flex items-center justify-between gap-3 rounded-xl border p-3 text-xs">
            <div className="flex items-center gap-2.5">
              <Avatar className="ring-border/30 h-8 w-8 ring-1">
                <AvatarImage src={reporter?.avatarUrl} alt={reporter?.username} />
                <AvatarFallback className="bg-rose-500/10 text-xs font-bold text-rose-600">
                  {(reporter?.username || 'U').charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="text-text-primary font-semibold">
                  {reporter?.username || 'Anonymous'}
                </span>
                {reporter?.email && (
                  <span className="text-text-secondary-65 font-mono text-[10px]">
                    {reporter.email}
                  </span>
                )}
              </div>
            </div>

            <span className="text-text-secondary-65 font-mono text-[10px]">
              {report.createdAt
                ? formatDistanceToNow(new Date(report.createdAt), { addSuffix: true })
                : ''}
            </span>
          </div>

          {/* Explanation */}
          <div className="space-y-1.5">
            <span className="text-text-secondary-65 text-xs font-semibold tracking-wide uppercase">
              Reporter Description
            </span>
            <div className="border-border/40 bg-background/50 text-text-primary rounded-xl border p-3.5 text-xs leading-relaxed whitespace-pre-wrap">
              {report.description}
            </div>
          </div>

          {/* Previous Resolution */}
          {report.resolution && (
            <div className="space-y-1 rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-3 text-xs">
              <div className="flex items-center gap-1.5 font-semibold text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 className="size-3.5" />
                <span>Global Resolution Summary</span>
              </div>
              <p className="text-text-primary text-xs italic">{report.resolution}</p>
              {report.actionTaken && (
                <p className="text-text-secondary-65 mt-1 font-mono text-[11px]">
                  Global Action: <span className="font-semibold">{report.actionTaken}</span>
                </p>
              )}
            </div>
          )}

          {/* Admin Resolution Section */}
          {!isResolvedOrDismissed && (
            <div className="space-y-3">
              <div className="space-y-1.5">
                <span className="text-text-secondary-65 text-xs font-semibold tracking-wide uppercase">
                  Global Platform Action
                </span>
                <Select
                  value={selectedGlobalAction}
                  onValueChange={(val) => setSelectedGlobalAction(val as ReportActionTaken)}
                >
                  <SelectTrigger className="border-border/50 bg-background/50 h-9 rounded-xl text-xs">
                    <SelectValue placeholder="Select Global Action" />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-border/50 rounded-xl text-xs shadow-md">
                    <SelectItem value={ReportActionTaken.NONE}>None</SelectItem>
                    <SelectItem value={ReportActionTaken.DELETE_CONTENT}>
                      Delete Content Globally
                    </SelectItem>
                    <SelectItem value={ReportActionTaken.OFFICIAL_WARNING}>
                      Issue Official Warning
                    </SelectItem>
                    <SelectItem value={ReportActionTaken.GLOBAL_BAN}>Issue Global Ban</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5">
                <span className="text-text-secondary-65 text-xs font-semibold tracking-wide uppercase">
                  Resolution Notes
                </span>
                <Textarea
                  placeholder="State platform moderation decision..."
                  value={resolutionInput}
                  onChange={(e) => setResolutionInput(e.target.value)}
                  className="border-border/50 bg-background/50 focus:bg-background min-h-18.75 resize-none rounded-xl text-xs"
                />
              </div>
            </div>
          )}
        </div>

        <DialogFooter className="flex flex-wrap items-center justify-between gap-2 pt-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onOpenChange(false)}
            disabled={isSubmitting}
            className="border-border/50 bg-card hover:bg-muted/60 h-9 rounded-xl text-xs font-semibold"
          >
            Close
          </Button>

          {!isResolvedOrDismissed && (
            <div className="flex items-center gap-2">
              {report.status === ReportStatus.PENDING && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onUpdateStatus(report._id, ReportStatus.UNDER_REVIEW)}
                  disabled={isSubmitting}
                  className="border-border/50 bg-card hover:bg-muted/60 h-9 rounded-xl text-xs font-semibold text-blue-600"
                >
                  Mark Under Review
                </Button>
              )}
              <Button
                variant="outline"
                size="sm"
                onClick={() => onUpdateStatus(report._id, ReportStatus.DISMISSED)}
                disabled={isSubmitting}
                className="border-border/50 bg-card hover:bg-muted/60 text-muted-foreground h-9 rounded-xl text-xs font-semibold"
              >
                Dismiss
              </Button>
              <Button
                size="sm"
                onClick={handleResolveSubmit}
                disabled={isSubmitting || !resolutionInput.trim()}
                className="h-9 gap-1.5 rounded-xl bg-rose-600 text-xs font-semibold text-white hover:bg-rose-700"
              >
                <CheckCircle2 className="size-4" />
                Resolve Platform Report
              </Button>
            </div>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default AdminReportDetailDialog;
