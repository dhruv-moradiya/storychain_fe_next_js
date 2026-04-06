'use client';

import { IPullRequest, PRStatus, PRType } from '@/type/pull-request.type';
import { ColumnDef } from '@tanstack/react-table';
import { formatDistanceToNow } from 'date-fns';
import {
  AlertCircle,
  Check,
  FileEdit,
  GitMerge,
  GitPullRequest,
  GitPullRequestClosed,
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

export const columns: ColumnDef<IPullRequest>[] = [
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({}) => {
      const config = STATUS['approved'];

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
            className: 'min-w-[80px] capitalize  !bg-transparent text-start',
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
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-text-primary font-playfair line-clamp-1 text-sm font-medium">
              {pr.title}
            </span>
            <span className="text-text-secondary-65 text-xs">#{pr._id.slice(-4)}</span>
          </div>
          <div className="text-text-secondary-65 flex items-center gap-1.5 text-xs">
            <span className="font-playfair">Gojo Satoru</span>
            <span>•</span>
            <span className="text-text-primary font-playfair max-w-37.5 truncate font-medium">
              Chapter 5: Jujutsu Kaisen
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
            className: 'capitalize text-text-secondary-65 font-normal',
          })}
        </div>
      );
    },
  },
  {
    accessorKey: 'changes',
    header: 'Changes',
    cell: ({ row }) => {
      const changes = row.original.content;
      return (
        <div className="grid grid-cols-2 gap-1">
          {Badge({
            label: `+${changes?.proposed || ''}`,
            color: 'emerald',
            size: 'sm',
            style: 'soft',
            mono: true,
          })}
          {Badge({
            label: `-${changes.wordCount || 0}`,
            color: 'rose',
            size: 'sm',
            style: 'soft',
            mono: true,
          })}
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
          <div className="text-text-secondary-65 flex items-center gap-3 text-xs">
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="hover:text-brand-blue flex items-center gap-1 transition-colors">
                  <ThumbsUp className="h-3.5 w-3.5" />
                  <span>{pr.votes.upvotes}</span>
                </div>
              </TooltipTrigger>
              <TooltipContent>Upvotes</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-center gap-1 transition-colors hover:text-red-500">
                  <ThumbsDown className="h-3.5 w-3.5" />
                  <span>{pr.votes.downvotes}</span>
                </div>
              </TooltipTrigger>
              <TooltipContent>Downvotes</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="hover:text-brand-pink-500 flex items-center gap-1 transition-colors">
                  <MessageSquare className="h-3.5 w-3.5" />
                  <span>{pr.commentCount}</span>
                </div>
              </TooltipTrigger>
              <TooltipContent>Comments</TooltipContent>
            </Tooltip>
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
          <div className="flex -space-x-2">
            {pr.approvalsStatus.approvers.slice(0, 3).map((_, i) => (
              <Tooltip key={i}>
                <TooltipTrigger asChild>
                  <Avatar className="border-bg-cream ring-border/10 h-6 w-6 cursor-help border-2 ring-1 transition-transform hover:z-10 hover:scale-110">
                    <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i}`} />
                  </Avatar>
                </TooltipTrigger>
                <TooltipContent>Approver {i + 1}</TooltipContent>
              </Tooltip>
            ))}
            {pr.approvalsStatus.blockers.length > 0 && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="bg-bg-cream relative z-10 flex h-6 w-6 items-center justify-center rounded-full border-2 border-red-100 shadow-sm">
                    <AlertCircle className="h-3.5 w-3.5 text-red-500" />
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  {pr.approvalsStatus.blockers.length} blocking reviews
                </TooltipContent>
              </Tooltip>
            )}
            {pr.approvalsStatus.approvers.length === 0 &&
              pr.approvalsStatus.blockers.length === 0 && (
                <span className="text-text-secondary-65 text-xs">-</span>
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
        <span className="text-text-secondary-65 text-xs whitespace-nowrap">
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
          className="text-brand-pink-500 hover:text-brand-pink-600 hover:bg-brand-pink-500/5 h-8 px-2 text-xs"
        >
          View
        </Button>
      );
    },
  },
];
