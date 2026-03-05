'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { IChapterDetail } from '@/type/chapter/chapter-detail.type';
import { formatDistance } from 'date-fns';
import {
  CalendarDays,
  CheckCircle2,
  Clock,
  GitMerge,
  GitPullRequest,
  User,
  XCircle,
} from 'lucide-react';

interface ChapterPRStatusProps {
  chapter: IChapterDetail;
}

const PR_STATUS_CONFIG = {
  pending: {
    label: 'Pending Review',
    color: 'border-amber-200 bg-amber-50 text-amber-700',
    icon: Clock,
    description: 'This chapter is awaiting review by a collaborator.',
  },
  approved: {
    label: 'Approved',
    color: 'border-emerald-200 bg-emerald-50 text-emerald-700',
    icon: CheckCircle2,
    description: 'This chapter has been approved and is ready to be merged.',
  },
  rejected: {
    label: 'Rejected',
    color: 'border-red-200 bg-red-50 text-red-600',
    icon: XCircle,
    description: 'This chapter was rejected. See the reason below.',
  },
  merged: {
    label: 'Merged',
    color: 'border-violet-200 bg-violet-50 text-violet-700',
    icon: GitMerge,
    description: 'This pull request has been merged into the story.',
  },
};

export function ChapterPRStatus({ chapter }: ChapterPRStatusProps) {
  const { pullRequest } = chapter;

  if (!pullRequest.isPR || !pullRequest.status) return null;

  const config =
    PR_STATUS_CONFIG[pullRequest.status as keyof typeof PR_STATUS_CONFIG] ??
    PR_STATUS_CONFIG.pending;
  const StatusIcon = config.icon;

  const submittedAt = pullRequest.submittedAt
    ? formatDistance(new Date(pullRequest.submittedAt), new Date(), { addSuffix: true })
    : null;

  const reviewedAt = pullRequest.reviewedAt
    ? formatDistance(new Date(pullRequest.reviewedAt), new Date(), { addSuffix: true })
    : null;

  return (
    <div className={`space-y-3 rounded-xl border p-4 ${config.color}`}>
      {/* Header */}
      <div className="flex items-center gap-2">
        <GitPullRequest size={15} />
        <span className="text-sm font-semibold">Pull Request</span>
        <Badge variant="outline" className={`ml-auto h-5 gap-1 px-2 text-[10px] ${config.color}`}>
          <StatusIcon size={10} />
          {config.label}
        </Badge>
      </div>

      <Separator className="opacity-40" />

      <p className="text-xs opacity-80">{config.description}</p>

      {/* Metadata */}
      <div className="space-y-2 text-xs">
        {submittedAt && (
          <div className="flex items-center gap-2 opacity-75">
            <CalendarDays size={12} />
            <span>Submitted {submittedAt}</span>
          </div>
        )}

        {pullRequest.reviewedBy && (
          <div className="flex items-center gap-2 opacity-75">
            <User size={12} />
            <span>Reviewed by {pullRequest.reviewedBy}</span>
            {reviewedAt && <span className="opacity-60">· {reviewedAt}</span>}
          </div>
        )}

        {pullRequest.rejectionReason && pullRequest.status === 'rejected' && (
          <div className="mt-2 rounded-lg border border-red-200 bg-red-50/60 p-2.5 text-red-700">
            <p className="mb-0.5 text-[11px] font-semibold">Rejection Reason</p>
            <p className="text-xs opacity-90">{pullRequest.rejectionReason}</p>
          </div>
        )}
      </div>

      {pullRequest.status === 'pending' && (
        <div className="flex gap-2 pt-1">
          <Button
            size="sm"
            className="h-7 flex-1 bg-emerald-600 text-xs text-white hover:bg-emerald-700"
            aria-label="Approve pull request"
          >
            <CheckCircle2 size={12} className="mr-1" />
            Approve
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="h-7 flex-1 border-red-200 text-xs text-red-600 hover:bg-red-50"
            aria-label="Reject pull request"
          >
            <XCircle size={12} className="mr-1" />
            Reject
          </Button>
        </div>
      )}
    </div>
  );
}

export default ChapterPRStatus;
