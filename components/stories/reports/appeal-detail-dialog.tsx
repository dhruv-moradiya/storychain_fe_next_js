'use client';

import { useState } from 'react';

import type { AppealReviewDecision, IAppealItem } from '@/type/report.type';
import { formatDistanceToNow } from 'date-fns';
import { CheckCircle2, ExternalLink, Scale, XCircle } from 'lucide-react';

import { appealPriorityBadge, appealStatusBadge } from '@/components/common/badge';
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

interface AppealDetailDialogProps {
  appeal: IAppealItem | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onReviewSubmit?: (appealId: string, decision: AppealReviewDecision, notes: string) => void;
}

export function AppealDetailDialog({
  appeal,
  open,
  onOpenChange,
  onReviewSubmit,
}: AppealDetailDialogProps) {
  const [reviewNotesInput, setReviewNotesInput] = useState('');

  if (!appeal) return null;

  const appellant = typeof appeal.userId === 'object' ? appeal.userId : null;

  const handleDecision = (decision: AppealReviewDecision) => {
    onReviewSubmit?.(appeal._id, decision, reviewNotesInput);
    setReviewNotesInput('');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-card border-border/50 max-w-xl rounded-2xl p-6 shadow-xl">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-purple-500/20 bg-purple-500/10">
                <Scale className="size-4 text-purple-500" />
              </div>
              <DialogTitle className="text-text-primary font-libreBaskerville text-lg font-bold">
                User Appeal (#{appeal._id.slice(-5)})
              </DialogTitle>
            </div>
            <div className="flex items-center gap-1.5">
              {appealPriorityBadge(appeal.priority)}
              {appealStatusBadge(appeal.status)}
            </div>
          </div>
          <DialogDescription className="text-text-secondary-65 text-xs">
            Review user ban/mute reconsideration request and provide decision.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          {/* Appellant Info */}
          <div className="border-border/40 bg-card flex items-center justify-between gap-3 rounded-xl border p-3 text-xs">
            <div className="flex items-center gap-2.5">
              <Avatar className="ring-border/30 h-8 w-8 ring-1">
                <AvatarImage src={appellant?.avatarUrl} alt={appellant?.username} />
                <AvatarFallback className="bg-purple-500/15 text-xs font-bold text-purple-600">
                  {(appellant?.username || 'U').charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="text-text-primary font-semibold">
                  {appellant?.displayName || appellant?.username || 'Appellant User'}
                </span>
                <span className="text-text-secondary-65 font-mono text-[10px]">
                  @{appellant?.username || 'user'}
                </span>
              </div>
            </div>

            <span className="text-text-secondary-65 font-mono text-[10px]">
              {formatDistanceToNow(new Date(appeal.createdAt), { addSuffix: true })}
            </span>
          </div>

          {/* Appeal Reason & Explanation */}
          <div className="space-y-2">
            <div className="border-border/40 bg-muted/20 flex flex-col gap-1 rounded-xl border p-3 text-xs">
              <span className="text-text-secondary-65 text-[10px] font-medium tracking-wide uppercase">
                Appeal Summary
              </span>
              <span className="text-text-primary font-semibold">{appeal.appealReason}</span>
            </div>

            <div className="space-y-1.5">
              <span className="text-text-secondary-65 text-xs font-semibold tracking-wide uppercase">
                Full Explanation
              </span>
              <div className="border-border/40 bg-background/50 text-text-primary rounded-xl border p-3.5 text-xs leading-relaxed whitespace-pre-wrap">
                {appeal.explanation}
              </div>
            </div>
          </div>

          {/* Evidence Links */}
          {appeal.evidenceUrls && appeal.evidenceUrls.length > 0 && (
            <div className="space-y-1.5 text-xs">
              <span className="text-text-secondary-65 font-semibold tracking-wide uppercase">
                Evidence Provided
              </span>
              <div className="flex flex-col gap-1">
                {appeal.evidenceUrls.map((url, idx) => (
                  <a
                    key={idx}
                    href={url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-brand-blue border-border/40 hover:bg-muted/30 flex items-center gap-1.5 rounded-xl border p-2.5 font-mono text-xs transition-colors"
                  >
                    <ExternalLink className="size-3.5 shrink-0" />
                    <span className="truncate">{url}</span>
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Notes Input */}
          <div className="space-y-1.5">
            <span className="text-text-secondary-65 text-xs font-semibold tracking-wide uppercase">
              Internal Review Notes
            </span>
            <Textarea
              placeholder="Add review notes for co-authors or escalation details..."
              value={reviewNotesInput}
              onChange={(e) => setReviewNotesInput(e.target.value)}
              className="border-border/50 bg-background/50 focus:bg-background min-h-[75px] resize-none rounded-xl text-xs"
            />
          </div>
        </div>

        <DialogFooter className="flex flex-wrap items-center justify-between gap-2 pt-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onOpenChange(false)}
            className="border-border/50 bg-card hover:bg-muted/60 h-9 rounded-xl text-xs font-semibold"
          >
            Close
          </Button>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleDecision('REJECT')}
              className="border-border/50 bg-card hover:bg-destructive/10 text-destructive h-9 rounded-xl text-xs font-semibold"
            >
              <XCircle className="size-4" />
              Reject Appeal
            </Button>
            <Button
              size="sm"
              onClick={() => handleDecision('APPROVE')}
              className="h-9 gap-1.5 rounded-xl text-xs font-semibold"
            >
              <CheckCircle2 className="size-4" />
              Approve Appeal
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default AppealDetailDialog;
