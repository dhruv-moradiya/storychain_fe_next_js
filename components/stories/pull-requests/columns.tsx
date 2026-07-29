'use client';

import Link from 'next/link';

import { PRStatus, PRType } from '@/type/pull-request.type';
import { IPullRequestListItem } from '@/type/pull-reuqest/pull-request-response.type';
import { ColumnDef } from '@tanstack/react-table';
import { formatDistanceToNow } from 'date-fns';
import {
  BookOpen,
  Check,
  Clock,
  FileEdit,
  GitMerge,
  GitPullRequest,
  GitPullRequestClosed,
  LucideIcon,
  MessageSquare,
  Plus,
  ShieldAlert,
  ThumbsUp,
  Trash2,
} from 'lucide-react';

import type { BadgeColorKey } from '@/components/common/badge';
import { createBadge as Badge } from '@/components/common/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

// --- Config ---

const STATUS: Record<string, { icon: LucideIcon; color: BadgeColorKey; label: string }> = {
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

const TYPE_ICON: Record<string, LucideIcon> = {
  [PRType.NEW_BRANCH]: Plus,
  [PRType.CONTINUATION]: FileEdit,
  [PRType.EDIT]: Trash2,
};

// --- Columns ---

export const getColumns = (storySlug?: string): ColumnDef<IPullRequestListItem>[] => [
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const statusKey = row.original.status;
      const config = STATUS[statusKey] || {
        icon: GitPullRequest,
        color: 'gray' as BadgeColorKey,
        label: statusKey || 'Unknown',
      };

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
    accessorKey: 'author',
    header: 'Author',
    cell: ({ row }) => {
      const author = row.original.author;
      return (
        <div className="flex items-center gap-2">
          <Avatar className="ring-border h-6 w-6 shrink-0 ring-1">
            <AvatarImage src={author?.avatarUrl} alt={author?.username} />
            <AvatarFallback className="bg-primary/10 text-primary text-[10px] font-bold">
              {author?.username?.[0]?.toUpperCase() || '?'}
            </AvatarFallback>
          </Avatar>
          <span className="text-foreground text-xs font-medium whitespace-nowrap">
            {author?.username || 'Unknown'}
          </span>
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
        <div className="max-w-70 space-y-0.5">
          <div className="flex items-center gap-2">
            <span className="text-foreground line-clamp-1 text-sm font-medium">{pr.title}</span>
            {pr.isDraft && (
              <span className="shrink-0 rounded bg-amber-500/10 px-1.5 py-0.5 text-[10px] font-semibold text-amber-600 dark:text-amber-400">
                Draft
              </span>
            )}
          </div>
          <p className="text-muted-foreground line-clamp-1 font-mono text-xs">
            #{pr._id ? pr._id.slice(-4) : ''}
          </p>
        </div>
      );
    },
  },

  {
    id: 'parentChapter',
    header: 'Parent Chapter',
    cell: ({ row }) => {
      const pr = row.original;
      const sSlug = pr.story?.slug || storySlug;
      const parentSlug =
        pr.parentChapterSlug || pr.chapter?.parentChapter?.slug || pr.chapter?.slug;
      const parentTitle =
        pr.chapter?.parentChapter?.title ||
        pr.chapter?.title ||
        pr.parentChapterSlug ||
        'Root Chapter';

      if (!parentSlug || !sSlug) {
        return <span className="text-muted-foreground text-xs font-medium">{parentTitle}</span>;
      }

      return (
        <Link
          href={`/stories/${sSlug}/chapter/${parentSlug}`}
          onClick={(e) => e.stopPropagation()}
          className="text-primary hover:text-primary/80 flex items-center gap-1.5 text-xs font-medium hover:underline"
        >
          <BookOpen className="text-primary/70 h-3.5 w-3.5 shrink-0" />
          <span className="max-w-36 truncate">{parentTitle}</span>
        </Link>
      );
    },
  },
  {
    accessorKey: 'prType',
    header: 'Type',
    cell: ({ row }) => {
      const type = (row.getValue('prType') as string) || '';
      const Icon = TYPE_ICON[type] || FileEdit;
      return (
        <div className="flex items-center gap-1.5">
          {Badge({
            label: type ? type.replace('_', ' ').toLowerCase() : 'N/A',
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
    accessorKey: 'content',
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
    accessorKey: 'votes',
    header: 'Likes',
    cell: ({ row }) => {
      return (
        <div className="text-muted-foreground flex items-center gap-1.5 text-xs">
          <ThumbsUp className="h-3.5 w-3.5" />
          <span>{row.original.votes?.upvotes || 0}</span>
        </div>
      );
    },
  },
  {
    accessorKey: 'commentCount',
    header: 'Comments',
    cell: ({ row }) => {
      return (
        <div className="text-muted-foreground flex items-center gap-1.5 text-xs">
          <MessageSquare className="h-3.5 w-3.5" />
          <span>{row.original.commentCount || 0}</span>
        </div>
      );
    },
  },
  {
    id: 'approvals',
    header: 'Reviews',
    cell: ({ row }) => {
      const pr = row.original;
      const approvers = pr.approvers || [];
      const blockers = pr.blockers || [];
      const hasReviews = approvers.length > 0 || blockers.length > 0;

      if (!hasReviews) {
        return <span className="text-muted-foreground text-xs italic">No activity</span>;
      }

      return (
        <TooltipProvider>
          <div className="flex items-center -space-x-2">
            {/* Approvers */}
            {approvers.slice(0, 3).map((approver) => (
              <Tooltip key={approver.clerkId || approver.username}>
                <TooltipTrigger asChild>
                  <Avatar className="border-background ring-background h-7 w-7 shrink-0 border-2 shadow-xs ring-2 transition-transform hover:z-20 hover:scale-110">
                    <AvatarImage src={approver.avatarUrl} alt={approver.username} />
                    <AvatarFallback className="bg-emerald-500/15 text-[10px] font-bold text-emerald-600 dark:bg-emerald-500/25 dark:text-emerald-400">
                      {approver.username?.[0]?.toUpperCase() || '?'}
                    </AvatarFallback>
                  </Avatar>
                </TooltipTrigger>
                <TooltipContent side="top">
                  <div className="flex items-center gap-1 text-xs">
                    <span className="font-semibold text-emerald-400">✓</span>
                    <span>Approved by {approver.username}</span>
                  </div>
                </TooltipContent>
              </Tooltip>
            ))}

            {/* Extra approvers counter */}
            {approvers.length > 3 && (
              <div className="bg-muted text-muted-foreground border-background ring-background flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 text-[10px] font-bold shadow-xs ring-2">
                +{approvers.length - 3}
              </div>
            )}

            {/* Blockers / Blocking Review Icon */}
            {blockers.length > 0 && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="border-background relative flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 bg-red-500/15 text-red-600 shadow-xs ring-2 ring-red-500/40 transition-transform hover:z-20 hover:scale-110 dark:bg-red-500/25 dark:text-red-400">
                    <ShieldAlert className="h-3.5 w-3.5 text-red-600 dark:text-red-400" />
                    {blockers.length > 1 && (
                      <span className="ring-background absolute -top-1 -right-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-red-600 text-[8px] font-extrabold text-white ring-1">
                        {blockers.length}
                      </span>
                    )}
                  </div>
                </TooltipTrigger>
                <TooltipContent
                  side="top"
                  className="border-red-500/30 bg-red-950 p-2.5 text-red-100"
                >
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-red-400">
                    <ShieldAlert className="h-3.5 w-3.5" />
                    <span>
                      {blockers.length} Blocking Review{blockers.length > 1 ? 's' : ''}
                    </span>
                  </div>
                  {blockers.map((blocker) => (
                    <div
                      key={blocker.clerkId || blocker.username}
                      className="mt-1 flex items-center gap-1.5 text-[11px] text-red-200"
                    >
                      <Avatar className="h-4 w-4">
                        <AvatarImage src={blocker.avatarUrl} />
                        <AvatarFallback className="bg-red-900 text-[8px] text-red-200">
                          {blocker.username?.[0]?.toUpperCase() || '?'}
                        </AvatarFallback>
                      </Avatar>
                      <span>{blocker.username} (Changes Requested)</span>
                    </div>
                  ))}
                </TooltipContent>
              </Tooltip>
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
      const createdAt = row.original.createdAt;
      return (
        <div className="text-muted-foreground flex items-center gap-1.5 text-xs whitespace-nowrap">
          <Clock className="h-3.5 w-3.5" />
          <span>
            {createdAt ? formatDistanceToNow(new Date(createdAt), { addSuffix: true }) : 'N/A'}
          </span>
        </div>
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
