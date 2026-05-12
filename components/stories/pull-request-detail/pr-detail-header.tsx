'use client';

import Link from 'next/link';

import type { IPullRequest } from '@/type';
import { ArrowLeft, Copy, Edit2, Flag, MoreHorizontal } from 'lucide-react';

import { prStatusBadge, prTypeBadge, statusBadge, textBadge } from '@/components/common/badge';
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

  return (
    <>
      {/* Back Button */}
      <Button
        variant="ghost"
        size="sm"
        asChild
        className="text-muted-foreground hover:bg-muted/50 mb-6 gap-2 text-sm"
      >
        <Link href={`/stories/${slug}/pull-requests`}>
          <ArrowLeft className="h-4 w-4" />
          Back to Submit Requests
        </Link>
      </Button>

      {/* Header Card */}
      <div className="bg-card border-border/50 rounded-xl border p-6">
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:gap-4">
          {/* Status Icon */}
          <div
            className={cn(
              'flex h-12 w-12 shrink-0 items-center justify-center rounded-xl',
              statusConfig.bgColorLight
            )}
          >
            <StatusIcon className={cn('h-6 w-6', statusConfig.color)} />
          </div>

          {/* Title & Meta Info */}
          <div className="min-w-0 flex-1 space-y-3">
            <h1 className="text-foreground font-libre-baskerville text-2xl leading-tight font-bold">
              {pullRequest.title}
            </h1>

            {/* Badges Row */}
            <div className="flex flex-wrap items-center gap-2.5">
              {prStatusBadge(pullRequest.status, { size: 'sm' })}
              {prTypeBadge(pullRequest.prType, { size: 'sm' })}
              {pullRequest.isDraft && statusBadge('Draft', 'neutral', { size: 'sm' })}
            </div>

            {/* Author Attribution */}
            <p className="text-muted-foreground text-xs tracking-tight">
              <span className="text-foreground bg-muted mr-1.5 rounded-md leading-none font-semibold">
                {pullRequest.author?.displayName || 'Unknown Author'}
              </span>
              <span>wants to merge into</span>
              {textBadge(pullRequest.parentChapterSlug, 'blue', { size: 'xs', className: 'mx-1' })}
            </p>
          </div>

          {/* Header Action Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="bg-card border-border hover:bg-muted shrink-0"
              >
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-card border-border w-48">
              <DropdownMenuItem className="cursor-pointer gap-2 text-sm">
                <Edit2 className="h-4 w-4" />
                Edit PR
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer gap-2 text-sm">
                <Copy className="h-4 w-4" />
                Copy PR ID
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-border" />
              <DropdownMenuItem className="text-destructive cursor-pointer gap-2 text-sm">
                <Flag className="h-4 w-4" />
                Report Content
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </>
  );
}
