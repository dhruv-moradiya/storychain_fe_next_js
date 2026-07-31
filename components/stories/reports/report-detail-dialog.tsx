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

interface ReportDetailDialogProps {
  report: IPopulatedReportDetails | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onResolve: (
    reportId: string,
    status: ReportStatus.RESOLVED | ReportStatus.DISMISSED,
    resolution: string,
    actionTaken?: ReportActionTaken
  ) => void;
  isSubmitting?: boolean;
}

export function ReportDetailDialog({
  report,
  open,
  onOpenChange,
  onResolve,
  isSubmitting = false,
}: ReportDetailDialogProps) {
  const [resolutionInput, setResolutionInput] = useState('');
  const [selectedAction, setSelectedAction] = useState<ReportActionTaken>(ReportActionTaken.NONE);

  if (!report) return null;

  const reporter = report.reporter;
  const isResolvedOrDismissed =
    report.status === ReportStatus.RESOLVED || report.status === ReportStatus.DISMISSED;

  const handleAction = (status: ReportStatus.RESOLVED | ReportStatus.DISMISSED) => {
    onResolve(report._id, status, resolutionInput, selectedAction);
    setResolutionInput('');
    setSelectedAction(ReportActionTaken.NONE);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-card border-border/50 max-w-xl rounded-2xl p-6 shadow-xl">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-amber-500/20 bg-amber-500/10">
                <Shield className="size-4 text-amber-500" />
              </div>
              <DialogTitle className="text-text-primary font-libreBaskerville text-lg font-bold">
                Report Details (#{report._id.slice(-6)})
              </DialogTitle>
            </div>
          </div>
          <DialogDescription className="text-text-secondary-65 text-xs">
            Review reported content and execute story moderation resolution.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          {/* Metadata Row */}
          <div className="grid grid-cols-3 gap-3 text-xs">
            <div className="border-border/40 bg-muted/20 flex flex-col gap-1.5 rounded-xl border p-3">
              <span className="text-text-secondary-65 text-[10px] font-medium tracking-wide uppercase">
                Target Type
              </span>
              <div>{reportTypeBadge(report.reportType)}</div>
            </div>

            <div className="border-border/40 bg-muted/20 flex flex-col gap-1.5 rounded-xl border p-3">
              <span className="text-text-secondary-65 text-[10px] font-medium tracking-wide uppercase">
                Report Reason
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

          {/* Target Reference Details */}
          <div className="border-border/40 bg-muted/10 flex flex-col gap-2 rounded-xl border p-3.5 text-xs">
            <span className="text-text-secondary-65 text-[10px] font-semibold tracking-wide uppercase">
              Target Reference
            </span>
            <div className="text-text-primary space-y-1 font-mono text-xs font-medium">
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
              {report.story && (
                <div>
                  Story Title: <span className="text-brand-blue">{report.story.title}</span>
                </div>
              )}
              {report.reportType === 'USER' && report.targetUser && (
                <div>
                  Reported User:{' '}
                  <span className="text-brand-blue">@{report.targetUser.username}</span>
                </div>
              )}
            </div>
          </div>

          {/* Reporter Info */}
          <div className="border-border/40 bg-card flex items-center justify-between gap-3 rounded-xl border p-3 text-xs">
            <div className="flex items-center gap-2.5">
              <Avatar className="ring-border/30 h-8 w-8 ring-1">
                <AvatarImage src={reporter?.avatarUrl} alt={reporter?.username} />
                <AvatarFallback className="bg-amber-500/10 text-xs font-bold text-amber-600">
                  {(reporter?.username || 'U').charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="text-text-primary font-semibold">
                  {reporter?.username || 'Anonymous Reporter'}
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

          {/* Description */}
          <div className="space-y-1.5">
            <span className="text-text-secondary-65 text-xs font-semibold tracking-wide uppercase">
              Report Explanation
            </span>
            <div className="border-border/40 bg-background/50 text-text-primary rounded-xl border p-3.5 text-xs leading-relaxed whitespace-pre-wrap">
              {report.description}
            </div>
          </div>

          {/* Previous Resolution details if resolved */}
          {report.resolution && (
            <div className="space-y-1 rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-3 text-xs">
              <div className="flex items-center gap-1.5 font-semibold text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 className="size-3.5" />
                <span>Resolution Note</span>
              </div>
              <p className="text-text-primary text-xs italic">{report.resolution}</p>
              {report.actionTaken && (
                <p className="text-text-secondary-65 mt-1 font-mono text-[11px]">
                  Action Taken: <span className="font-semibold">{report.actionTaken}</span>
                </p>
              )}
            </div>
          )}

          {/* Resolution Input Box & Action Select for active reports */}
          {!isResolvedOrDismissed && (
            <div className="space-y-3">
              <div className="space-y-1.5">
                <span className="text-text-secondary-65 text-xs font-semibold tracking-wide uppercase">
                  Moderation Action
                </span>
                <Select
                  value={selectedAction}
                  onValueChange={(val) => setSelectedAction(val as ReportActionTaken)}
                >
                  <SelectTrigger className="border-border/50 bg-background/50 h-9 rounded-xl text-xs">
                    <SelectValue placeholder="Select Action" />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-border/50 rounded-xl text-xs shadow-md">
                    <SelectItem value={ReportActionTaken.NONE}>No Content Action (None)</SelectItem>
                    <SelectItem value={ReportActionTaken.DELETE_COMMENT}>Delete Comment</SelectItem>
                    <SelectItem value={ReportActionTaken.FLAG_CHAPTER}>
                      Flag / Hide Chapter
                    </SelectItem>
                    <SelectItem value={ReportActionTaken.BAN_FROM_STORY}>
                      Ban User From Story
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5">
                <span className="text-text-secondary-65 text-xs font-semibold tracking-wide uppercase">
                  Resolution Note / Rationale
                </span>
                <Textarea
                  placeholder="Describe your reasoning or action details..."
                  value={resolutionInput}
                  onChange={(e) => setResolutionInput(e.target.value)}
                  className="border-border/50 bg-background/50 focus:bg-background min-h-[75px] resize-none rounded-xl text-xs"
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
            Cancel
          </Button>

          {!isResolvedOrDismissed && (
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleAction(ReportStatus.DISMISSED)}
                disabled={isSubmitting}
                className="border-border/50 bg-card hover:bg-muted/60 text-muted-foreground h-9 rounded-xl text-xs font-semibold"
              >
                Dismiss Report
              </Button>
              <Button
                size="sm"
                onClick={() => handleAction(ReportStatus.RESOLVED)}
                disabled={isSubmitting || !resolutionInput.trim()}
                className="h-9 gap-1.5 rounded-xl text-xs font-semibold"
              >
                <CheckCircle2 className="size-4" />
                Resolve Report
              </Button>
            </div>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default ReportDetailDialog;
