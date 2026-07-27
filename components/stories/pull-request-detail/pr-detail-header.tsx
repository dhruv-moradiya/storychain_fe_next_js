'use client';

import Link from 'next/link';

import type { IPullRequest } from '@/type';
import { formatDistanceToNow } from 'date-fns';
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Clock,
  Copy,
  Edit2,
  FileText,
  Flag,
  GitBranch,
  GitMerge,
  MoreHorizontal,
} from 'lucide-react';

import { prTypeBadge } from '@/components/common/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

import { PR_STATUS_CONFIG } from './pr-status-configs';

interface PRDetailHeaderProps {
  pullRequest: IPullRequest;
  slug: string;
}

export default function PRDetailHeader({ pullRequest, slug }: PRDetailHeaderProps) {
  const statusConfig = PR_STATUS_CONFIG[pullRequest.status];
  const StatusIcon = statusConfig.icon;
  const canMerge = pullRequest.approvalsStatus.canMerge;

  return (
    <div className="space-y-4">
      {/* Top Navigation Row */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline-editorial"
          size="sm"
          asChild
          className="h-10 cursor-pointer rounded-sm text-xs font-semibold"
        >
          <Link href={`/stories/${slug}/pull-requests`}>
            <ArrowLeft className="size-4" />
            Back to Submit Requests
          </Link>
        </Button>

        <div className="text-text-secondary-65 flex items-center gap-2 font-mono text-xs">
          <span>PR #{pullRequest._id.slice(-4)}</span>
        </div>
      </div>

      {/* Main Header Hero Card */}
      <div className="bg-card border-border/50 flex flex-col gap-5 rounded-sm border p-5 shadow-xs">
        <div className="relative z-10 space-y-4">
          {/* Status Badges & Meta Row */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <div
                className={cn(
                  'flex items-center gap-1.5 rounded-sm px-2.5 py-1 text-xs font-semibold shadow-xs',
                  statusConfig.bgColorLight,
                  statusConfig.color
                )}
              >
                <StatusIcon className="size-3.5" />
                <span className="capitalize">{statusConfig.label}</span>
              </div>

              {prTypeBadge(pullRequest.prType, { size: 'sm' })}

              {pullRequest.isDraft && (
                <Badge
                  variant="outline"
                  className="border-amber-500/30 bg-amber-500/10 text-[10px] text-amber-600"
                >
                  Draft
                </Badge>
              )}
            </div>

            {/* Quick Action Buttons */}
            <div className="flex items-center gap-2">
              {canMerge && (
                <Button
                  size="sm"
                  className="h-10 cursor-pointer rounded-sm font-semibold shadow-xs"
                >
                  <GitMerge className="size-4" />
                  Commit to Story
                </Button>
              )}

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline-editorial"
                    size="icon"
                    className="h-10 w-10 cursor-pointer rounded-sm"
                  >
                    <MoreHorizontal className="size-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-card border-border/50 w-48">
                  <DropdownMenuItem className="cursor-pointer gap-2 text-sm font-medium">
                    <Edit2 className="size-4" />
                    Edit Request
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer gap-2 text-sm font-medium">
                    <Copy className="size-4" />
                    Copy Request ID
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-border/50" />
                  <DropdownMenuItem className="text-destructive cursor-pointer gap-2 text-sm font-medium">
                    <Flag className="size-4" />
                    Report Content
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* PR Title */}
          <h1 className="text-text-primary font-libreBaskerville text-2xl leading-tight font-bold md:text-3xl">
            {pullRequest.title}
          </h1>

          {/* Chapter Branch Flow Visualizer */}
          <div className="border-border/50 bg-muted/20 flex flex-wrap items-center gap-3 rounded-sm border p-3.5 text-sm">
            <div className="text-text-secondary-65 flex items-center gap-1.5 font-medium">
              <BookOpen className="text-brand-blue size-4" />
              <span>Target Chapter:</span>
              <span className="text-text-primary font-semibold">
                {pullRequest.parentChapterSlug}
              </span>
            </div>

            <ArrowRight className="text-text-secondary-65/60 size-4 shrink-0" />

            <div className="flex items-center gap-1.5 font-medium text-emerald-600 dark:text-emerald-400">
              <GitBranch className="size-4" />
              <span>Proposed Chapter:</span>
              <span className="font-semibold">{pullRequest.chapterSlug}</span>
            </div>
          </div>

          {/* Author Attribution & Date Footer */}
          <div className="border-border/50 flex flex-wrap items-center justify-between gap-3 border-t pt-4 text-xs">
            <div className="flex items-center gap-2.5">
              <Avatar className="ring-border/20 h-7 w-7 shrink-0 ring-2">
                <AvatarImage
                  src={pullRequest.author?.avatar}
                  alt={pullRequest.author?.displayName}
                />
                <AvatarFallback className="bg-primary/10 text-primary text-[10px] font-bold">
                  {(pullRequest.author?.displayName || 'A').charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>

              <div className="flex items-center gap-1.5">
                <span className="text-text-primary font-semibold">
                  {pullRequest.author?.displayName || 'Unknown Author'}
                </span>
                <span className="text-text-secondary-65 font-mono text-[11px]">
                  (@{pullRequest.author?.username || 'user'})
                </span>
              </div>
            </div>

            <div className="text-text-secondary-65 flex items-center gap-4 text-xs font-semibold">
              <span className="flex items-center gap-1">
                <Clock className="size-3.5" />
                Submitted{' '}
                {formatDistanceToNow(new Date(pullRequest.createdAt), { addSuffix: true })}
              </span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <FileText className="size-3.5" />
                {pullRequest.content?.wordCount || 0} words
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
