'use client';

import { formatDistanceToNow } from 'date-fns';
import { motion } from 'framer-motion';
import {
  AlertCircle,
  ArrowRight,
  BookOpen,
  Check,
  FileEdit,
  GitMerge,
  GitPullRequest,
  GitPullRequestClosed,
  MessageSquare,
  Plus,
  ThumbsDown,
  ThumbsUp,
  Trash2,
  type LucideIcon,
} from 'lucide-react';

import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import type { IPullRequest, PRStatus, PRType } from '@/type/pull-request.type';

/* -------------------------------- Config -------------------------------- */

const STATUS: Record<PRStatus, { icon: LucideIcon; color: string; bg: string; label: string }> = {
  OPEN: {
    icon: GitPullRequest,
    color: 'text-green-600',
    bg: 'bg-green-500/10',
    label: 'Open',
  },
  APPROVED: {
    icon: Check,
    color: 'text-blue-600',
    bg: 'bg-blue-500/10',
    label: 'Approved',
  },
  MERGED: {
    icon: GitMerge,
    color: 'text-purple-600',
    bg: 'bg-purple-500/10',
    label: 'Merged',
  },
  REJECTED: {
    icon: GitPullRequestClosed,
    color: 'text-red-600',
    bg: 'bg-red-500/10',
    label: 'Rejected',
  },
  CLOSED: {
    icon: GitPullRequestClosed,
    color: 'text-slate-500',
    bg: 'bg-slate-500/10',
    label: 'Closed',
  },
};

const TYPE_ICON: Record<PRType, LucideIcon> = {
  NEW_CHAPTER: Plus,
  EDIT_CHAPTER: FileEdit,
  DELETE_CHAPTER: Trash2,
};

/* -------------------------------- Component -------------------------------- */

interface PRCardProps {
  pullRequest: IPullRequest;
  onClick?: () => void;
}

export function PRCard({ pullRequest, onClick }: PRCardProps) {
  const StatusConfig = STATUS[pullRequest.status];
  const StatusIcon = StatusConfig.icon;
  const TypeIcon = TYPE_ICON[pullRequest.prType];

  return (
    <TooltipProvider>
      <motion.div
        transition={{ duration: 0.2 }}
        onClick={onClick}
        className="group hover:border-brand-pink-500 relative cursor-pointer border-l-4 border-transparent p-4 transition-all"
      >
        <div className="flex items-start gap-4">
          {/* Status Icon container */}
          <div
            className={cn(
              'flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-colors',
              StatusConfig.bg,
              StatusConfig.color
            )}
          >
            <StatusIcon className="h-5 w-5" />
          </div>

          {/* Main Content */}
          <div className="min-w-0 flex-1 space-y-3">
            {/* Header: Title & Badges */}
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1">
                <h3 className="text-text-primary group-hover:text-brand-pink-500 line-clamp-1 text-base font-semibold transition-colors">
                  {pullRequest.title}
                </h3>
                <div className="text-text-secondary-65 flex items-center gap-2 text-xs">
                  <span className="text-text-primary font-medium">
                    #{pullRequest._id.slice(-4)}
                  </span>
                  <span>•</span>
                  <span>{pullRequest.author?.displayName || pullRequest.author?.username}</span>
                  <span>•</span>
                  <span>
                    {formatDistanceToNow(new Date(pullRequest.createdAt), {
                      addSuffix: true,
                    })}
                  </span>
                </div>
              </div>

              {/* Status Badge */}
              <Badge
                variant="outline"
                className={cn(
                  'border-0 px-2.5 py-0.5 text-xs font-semibold tracking-wide uppercase shadow-none',
                  StatusConfig.bg,
                  StatusConfig.color
                )}
              >
                {StatusConfig.label}
              </Badge>
            </div>

            {/* Context: Story & Chapter */}
            <div className="text-text-secondary-65 flex items-center gap-2 text-xs">
              <BookOpen className="h-3.5 w-3.5" />
              <span className="max-w-[150px] truncate font-medium">{pullRequest.story?.title}</span>
              <ArrowRight className="text-text-secondary-65/50 h-3 w-3" />
              <span className="text-text-primary max-w-[150px] truncate font-medium">
                {pullRequest.chapter?.title}
              </span>
            </div>

            {/* Footer: Metrics & Approvals */}
            <div className="flex items-center justify-between pt-1">
              {/* Left: Type & Changes */}
              <div className="flex items-center gap-4">
                <div className="text-text-secondary-65 bg-cream-95/50 border-border/30 flex items-center gap-1.5 rounded-md border px-2 py-1 text-xs">
                  <TypeIcon className="h-3.5 w-3.5" />
                  <span className="capitalize">
                    {pullRequest.prType.replace('_', ' ').toLowerCase()}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-xs font-medium">
                  <span className="rounded bg-green-500/5 px-1.5 py-0.5 text-green-600">
                    +{pullRequest.changes.additionsCount}
                  </span>
                  <span className="rounded bg-red-500/5 px-1.5 py-0.5 text-red-600">
                    -{pullRequest.changes.deletionsCount || 0}
                  </span>
                </div>
              </div>

              {/* Right: Engagement & Approvals */}
              <div className="flex items-center gap-6">
                {/* Engagement Stats */}
                <div className="text-text-secondary-65 flex items-center gap-4 text-xs">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="hover:text-brand-blue flex items-center gap-1 transition-colors">
                        <ThumbsUp className="h-3.5 w-3.5" />
                        <span>{pullRequest.votes.upvotes}</span>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>Upvotes</TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="flex items-center gap-1 transition-colors hover:text-red-500">
                        <ThumbsDown className="h-3.5 w-3.5" />
                        <span>{pullRequest.votes.downvotes}</span>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>Downvotes</TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="hover:text-brand-pink-500 flex items-center gap-1 transition-colors">
                        <MessageSquare className="h-3.5 w-3.5" />
                        <span>{pullRequest.commentCount}</span>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>Comments</TooltipContent>
                  </Tooltip>
                </div>

                {/* Approvers */}
                <div className="flex -space-x-2">
                  {pullRequest.approvalsStatus.approvers.slice(0, 3).map((_, i) => (
                    <Tooltip key={i}>
                      <TooltipTrigger asChild>
                        <Avatar className="border-bg-cream ring-border/10 h-6 w-6 cursor-help border-2 ring-1 transition-transform hover:z-10 hover:scale-110">
                          <AvatarImage
                            src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i}`}
                          />
                        </Avatar>
                      </TooltipTrigger>
                      <TooltipContent>Approver {i + 1}</TooltipContent>
                    </Tooltip>
                  ))}
                  {pullRequest.approvalsStatus.blockers.length > 0 && (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="bg-bg-cream relative z-10 flex h-6 w-6 items-center justify-center rounded-full border-2 border-red-100 shadow-sm">
                          <AlertCircle className="h-3.5 w-3.5 text-red-500" />
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        {pullRequest.approvalsStatus.blockers.length} blocking review(s)
                      </TooltipContent>
                    </Tooltip>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </TooltipProvider>
  );
}
