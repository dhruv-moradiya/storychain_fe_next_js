'use client';

import { useState } from 'react';

import type { IReportItem, ReportStatus } from '@/type/report.type';
import { formatDistanceToNow } from 'date-fns';
import { CheckCircle2, Shield } from 'lucide-react';

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
import { Textarea } from '@/components/ui/textarea';

interface ReportDetailDialogProps {
  report: IReportItem | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onStatusUpdate: (reportId: string, newStatus: ReportStatus, resolutionText?: string) => void;
}

export function ReportDetailDialog({
  report,
  open,
  onOpenChange,
  onStatusUpdate,
}: ReportDetailDialogProps) {
  const [resolutionInput, setResolutionInput] = useState('');

  if (!report) return null;

  const reporter = typeof report.reporterId === 'object' ? report.reporterId : null;

  const handleAction = (status: ReportStatus) => {
    onStatusUpdate(report._id, status, resolutionInput);
    setResolutionInput('');
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
                Report Details (#{report._id.slice(-5)})
              </DialogTitle>
            </div>
          </div>
          <DialogDescription className="text-text-secondary-65 text-xs">
            Review reported content and take moderation actions for this story.
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

          {/* Related Target Details */}
          <div className="border-border/40 bg-muted/10 flex flex-col gap-2 rounded-xl border p-3.5 text-xs">
            <span className="text-text-secondary-65 text-[10px] font-semibold tracking-wide uppercase">
              Target Reference
            </span>
            <div className="text-text-primary space-y-1 font-mono text-xs font-medium">
              {report.relatedChapterSlug && (
                <div>
                  Chapter Slug: <span className="text-brand-blue">{report.relatedChapterSlug}</span>
                </div>
              )}
              {report.relatedCommentId && (
                <div>
                  Comment ID: <span className="text-brand-blue">{report.relatedCommentId}</span>
                </div>
              )}
              {report.relatedUserId && (
                <div>
                  User ID: <span className="text-brand-blue">{report.relatedUserId}</span>
                </div>
              )}
              {report.relatedStorySlug && (
                <div>
                  Story Slug: <span className="text-brand-blue">{report.relatedStorySlug}</span>
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
                  {reporter?.displayName || reporter?.username || 'Anonymous Reporter'}
                </span>
                <span className="text-text-secondary-65 font-mono text-[10px]">
                  @{reporter?.username || 'reporter'}
                </span>
              </div>
            </div>

            <span className="text-text-secondary-65 font-mono text-[10px]">
              {formatDistanceToNow(new Date(report.createdAt), { addSuffix: true })}
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

          {/* Existing Resolution Notes if resolved */}
          {report.resolution && (
            <div className="space-y-1 rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-3 text-xs">
              <div className="flex items-center gap-1.5 font-semibold text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 className="size-3.5" />
                <span>Previous Resolution Notes</span>
              </div>
              <p className="text-text-primary text-xs italic">{report.resolution}</p>
            </div>
          )}

          {/* Resolution Input Box */}
          {report.status !== 'RESOLVED' && report.status !== 'DISMISSED' && (
            <div className="space-y-1.5">
              <span className="text-text-secondary-65 text-xs font-semibold tracking-wide uppercase">
                Add Resolution / Note
              </span>
              <Textarea
                placeholder="Specify action taken or reason for dismissal..."
                value={resolutionInput}
                onChange={(e) => setResolutionInput(e.target.value)}
                className="border-border/50 bg-background/50 focus:bg-background min-h-[75px] resize-none rounded-xl text-xs"
              />
            </div>
          )}
        </div>

        <DialogFooter className="flex flex-wrap items-center justify-between gap-2 pt-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onOpenChange(false)}
            className="border-border/50 bg-card hover:bg-muted/60 h-9 rounded-xl text-xs font-semibold"
          >
            Cancel
          </Button>

          {report.status !== 'RESOLVED' && report.status !== 'DISMISSED' && (
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleAction('DISMISSED')}
                className="border-border/50 bg-card hover:bg-muted/60 text-muted-foreground h-9 rounded-xl text-xs font-semibold"
              >
                Dismiss Report
              </Button>
              <Button
                size="sm"
                onClick={() => handleAction('RESOLVED')}
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
