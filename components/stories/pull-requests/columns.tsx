'use client';

import { IPullRequest, PRStatus, PRType } from '@/type/pull-request.type';
import { IPullRequestListItem } from '@/type/pull-reuqest/pull-request-response.type';
import { AvatarFallback } from '@radix-ui/react-avatar';
import { ColumnDef } from '@tanstack/react-table';
import { formatDistanceToNow } from 'date-fns';
import {
  AlertCircle,
  Check,
  ChevronDownCircleIcon,
  ChevronRightIcon,
  Clock,
  FileEdit,
  GitMerge,
  GitPullRequest,
  GitPullRequestClosed,
  Info,
  LucideIcon,
  MessageSquare,
  Plus,
  ThumbsDown,
  ThumbsUp,
  Trash2,
} from 'lucide-react';

import type { BadgeColorKey } from '@/components/common/badge';
import { createBadge as Badge } from '@/components/common/badge';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

// --- Config ---

const STATUS: Record<PRStatus, { icon: LucideIcon; color: BadgeColorKey; label: string }> = {
  [PRStatus.OPEN]: {
    icon: GitPullRequest,
    color: 'success',
    label: 'Open',
  },
  [PRStatus.APPROVED]: {
    icon: Check,
    color: 'blue',
    label: 'Approved',
  },
  [PRStatus.MERGED]: {
    icon: GitMerge,
    color: 'purple',
    label: 'Merged',
  },
  [PRStatus.CLOSED]: {
    icon: GitPullRequestClosed,
    color: 'slate',
    label: 'Closed',
  },
};

const TYPE_ICON: Record<PRType, LucideIcon> = {
  [PRType.NEW_BRANCH]: Plus,
  [PRType.CONTINUATION]: FileEdit,
  [PRType.EDIT]: Trash2,
};

// --- Columns ---

export const getColumns = (): ColumnDef<IPullRequestListItem>[] => [
  {
    header: '',
    id: 'expander',
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="hover:bg-primary/5 h-8 w-8 p-0"
            onClick={(e) => {
              e.stopPropagation();
              row.toggleExpanded();
            }}
          >
            {row.getIsExpanded() ? (
              <ChevronDownCircleIcon className="text-primary h-4 w-4 transition-transform" />
            ) : (
              <ChevronRightIcon className="text-muted-foreground h-4 w-4 transition-transform" />
            )}
          </Button>
        </div>
      );
    },
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const config = STATUS[row.original.status];

      return (
        <div className="flex items-center gap-2">
          {Badge({
            label: config.label,
            icon: config.icon,
            color: config.color,
            size: 'sm',
            shape: 'rounded',
            style: 'soft',
            uppercase: true,
            mono: true,
            className: 'min-w-[80px] capitalize !bg-transparent text-start',
          })}
        </div>
      );
    },
  },
  {
    accessorKey: 'title',
    header: 'Request Details',
    cell: ({ row }) => {
      const pr = row.original;
      return (
        <div className="max-w-70 space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-foreground line-clamp-1 text-sm font-medium">{pr.title}</span>
            <span className="text-muted-foreground shrink-0 text-xs">#{pr._id.slice(-4)}</span>
          </div>
          <div className="text-muted-foreground line-clamp-1 flex items-center gap-1.5 text-xs">
            <span className="">{pr.author?.username}</span>
            <span>•</span>
            <span className="text-foreground max-w-37.5 truncate font-medium">
              {pr.chapter?.title}
            </span>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: 'prType',
    header: 'Type',
    cell: ({ row }) => {
      const type = row.getValue('prType') as PRType;
      const Icon = TYPE_ICON[type];
      return (
        <div className="flex items-center gap-1.5">
          {Badge({
            label: type.replace('_', ' ').toLowerCase(),
            icon: Icon,
            color: 'gray',
            size: 'sm',
            style: 'ghost',
            className: 'capitalize text-muted-foreground font-normal',
          })}
        </div>
      );
    },
  },
  {
    accessorKey: 'changes',
    header: 'Summary',
    cell: ({ row }) => {
      const changes = row.original.content || {};
      return (
        <div className="flex flex-col items-start gap-0.5">
          <span className="text-foreground text-xs font-medium">
            {changes.wordCount || 0} words
          </span>
          <span className="text-muted-foreground text-xs">
            {changes.readingMinutes || 0} min read
          </span>
        </div>
      );
    },
  },
  {
    id: 'engagement',
    header: 'Engagement',
    cell: ({ row }) => {
      const pr = row.original;
      return (
        <TooltipProvider>
          <div className="text-muted-foreground flex flex-wrap items-center gap-3 text-xs">
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="hover:text-secondary flex items-center gap-1 transition-colors">
                  <ThumbsUp className="h-3.5 w-3.5" />
                  <span>{pr.votes?.upvotes || 0}</span>
                </div>
              </TooltipTrigger>
              <TooltipContent>Upvotes</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="hover:text-destructive flex items-center gap-1 transition-colors">
                  <ThumbsDown className="h-3.5 w-3.5" />
                  <span>{pr.votes?.downvotes || 0}</span>
                </div>
              </TooltipTrigger>
              <TooltipContent>Downvotes</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="hover:text-primary flex items-center gap-1 transition-colors">
                  <MessageSquare className="h-3.5 w-3.5" />
                  <span>{pr.commentCount || 0}</span>
                </div>
              </TooltipTrigger>
              <TooltipContent>Comments</TooltipContent>
            </Tooltip>
            {pr.autoApprove && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="hover:text-accent flex items-center gap-1 transition-colors">
                    <Clock className="h-3.5 w-3.5" />
                    <span>
                      {pr.autoApprove.threshold || 0} / {pr.autoApprove.timeWindow || 0}d
                    </span>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  Auto-Approve: {pr.autoApprove.threshold} votes within {pr.autoApprove.timeWindow}{' '}
                  days
                </TooltipContent>
              </Tooltip>
            )}
          </div>
        </TooltipProvider>
      );
    },
  },
  {
    id: 'approvals',
    header: 'Reviews',
    cell: ({ row }) => {
      const pr = row.original;
      return (
        <TooltipProvider>
          <div className="flex items-center">
            {pr.approvers.length > 0 || pr.blockers.length > 0 ? (
              <div className="flex items-center -space-x-3">
                {/* Approvers */}
                {pr.approvers.slice(0, 4).map((approver) => (
                  <Tooltip key={approver.clerkId}>
                    <TooltipTrigger asChild>
                      <Avatar className="border-background h-8 w-8 border-2 shadow-sm">
                        <AvatarImage src={approver.avatarUrl} />
                        <AvatarFallback className="flex items-center justify-center text-xs font-medium">
                          {approver.username?.[0]?.toUpperCase() || '?'}
                        </AvatarFallback>
                      </Avatar>
                    </TooltipTrigger>
                    <TooltipContent side="top">{approver.username}</TooltipContent>
                  </Tooltip>
                ))}

                {/* Extra approvers */}
                {pr.approvers.length > 4 && (
                  <div className="bg-muted border-background flex h-8 w-8 items-center justify-center rounded-full border-2 text-xs font-medium">
                    +{pr.approvers.length - 4}
                  </div>
                )}

                {/* Blockers */}
                {pr.blockers.length > 0 && (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Avatar className="border-background h-8 w-8 border-2 bg-red-100 text-red-600">
                        <AvatarFallback className="flex items-center justify-center">
                          <Info className="h-4 w-4" />
                        </AvatarFallback>
                      </Avatar>
                    </TooltipTrigger>
                    <TooltipContent side="top">
                      {pr.blockers.length} blocking review
                      {pr.blockers.length > 1 ? 's' : ''}
                    </TooltipContent>
                  </Tooltip>
                )}
              </div>
            ) : (
              <span className="text-muted-foreground text-xs italic">No activity</span>
            )}
          </div>
        </TooltipProvider>
      );
    },
  },
  {
    accessorKey: 'createdAt',
    header: 'Created',
    cell: ({ row }) => {
      return (
        <span className="text-muted-foreground text-xs whitespace-nowrap">
          {formatDistanceToNow(new Date(row.original.createdAt), { addSuffix: true })}
        </span>
      );
    },
  },
  {
    id: 'actions',
    cell: ({}) => {
      return (
        <Button
          variant="ghost"
          size="sm"
          className="text-primary hover:text-primary/80 hover:bg-primary/5 h-8 px-2 text-xs font-medium"
        >
          View
        </Button>
      );
    },
  },
];
