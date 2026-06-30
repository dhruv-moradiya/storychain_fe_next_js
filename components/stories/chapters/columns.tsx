'use client';

import { ColumnDef, Row } from '@tanstack/react-table';
import {
  AlertTriangle,
  ChevronDown,
  ChevronRight,
  Coins,
  Eye,
  Flag,
  GitBranch,
  GitPullRequest,
  Lock,
  MessageSquare,
  ThumbsDown,
  ThumbsUp,
  Unlock,
} from 'lucide-react';

import createBadge, { chapterStatusBadge } from '@/components/common/badge';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

import type { IChapterTableRow, IChaptersTableContext } from './types';

// ─────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────

function formatNumber(num: number): string {
  if (!num) return '0';
  if (num >= 1_000_000) return (num / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M';
  if (num >= 1_000) return (num / 1_000).toFixed(1).replace(/\.0$/, '') + 'k';
  return num.toString();
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

// ─────────────────────────────────────────────
// SHARED COLUMNS (always shown)
// ─────────────────────────────────────────────

const expandColumn: ColumnDef<IChapterTableRow> = {
  id: 'expand',
  header: () => null,
  size: 48,
  cell: ({ row }: { row: Row<IChapterTableRow> }) => {
    const hasChildren = row.original.subRows && row.original.subRows.length > 0;
    const depth = row.original.depth;

    return (
      <div className="flex items-center" style={{ paddingLeft: `${depth * 20}px` }}>
        {hasChildren ? (
          <Button
            variant="ghost"
            size="icon-xs"
            onClick={(e) => {
              e.stopPropagation();
              row.toggleExpanded();
            }}
            className={cn(
              'text-text-secondary-65 hover:text-text-primary hover:bg-muted/40 h-6 w-6 shrink-0 rounded-md transition-all duration-200',
              row.getIsExpanded() && 'bg-brand-pink-500/10 text-brand-pink-500'
            )}
            aria-label={row.getIsExpanded() ? 'Collapse row' : 'Expand row'}
          >
            {row.getIsExpanded() ? (
              <ChevronDown className="h-3.5 w-3.5" />
            ) : (
              <ChevronRight className="h-3.5 w-3.5" />
            )}
          </Button>
        ) : (
          <div className="h-6 w-6 shrink-0" />
        )}
      </div>
    );
  },
};

const lockStatusColumn: ColumnDef<IChapterTableRow> = {
  id: 'lockStatus',
  header: () => <span className="flex items-center gap-1">Access</span>,
  size: 80,
  cell: ({ row }: { row: Row<IChapterTableRow> }) => {
    const { coinPrice, isUnlock } = row.original;
    const isFree = coinPrice === 0;
    const isUnlocked = isFree || isUnlock;

    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="flex items-center justify-center">
              {isUnlocked ? (
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500/10">
                  <Unlock className="h-3.5 w-3.5 text-emerald-500" />
                </div>
              ) : (
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-amber-500/10">
                  <Lock className="h-3.5 w-3.5 text-amber-500" />
                </div>
              )}
            </div>
          </TooltipTrigger>
          <TooltipContent>
            {isUnlocked
              ? isFree
                ? 'Free chapter'
                : 'Unlocked by you'
              : `Locked — costs ${coinPrice} coins to unlock`}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  },
};

const coinPriceColumn: ColumnDef<IChapterTableRow> = {
  id: 'coinPrice',
  header: () => <span className="flex items-center gap-1">Coins</span>,
  size: 90,
  cell: ({ row }: { row: Row<IChapterTableRow> }) => {
    const { coinPrice, isUnlock } = row.original;

    if (coinPrice === 0) {
      return <span className="text-text-secondary-50 text-xs">Free</span>;
    }

    return (
      <div className="flex items-center gap-1">
        <Coins className="h-3.5 w-3.5 text-amber-400" />
        <span
          className={cn('text-xs font-semibold', isUnlock ? 'text-emerald-500' : 'text-amber-500')}
        >
          {coinPrice}
        </span>
        {isUnlock && <span className="text-text-secondary-50 text-[10px]">(paid)</span>}
      </div>
    );
  },
};

const titleColumn: ColumnDef<IChapterTableRow> = {
  id: 'title',
  accessorKey: 'title',
  header: 'Chapter',
  size: 280,
  cell: ({ row }: { row: Row<IChapterTableRow> }) => {
    const { title, chapterNumber, depth, isEnding, pullRequest } = row.original;

    return (
      <div className="flex min-w-0 gap-1">
        <div className="flex items-center gap-1.5">
          {chapterNumber && (
            <span className="text-text-secondary-50 shrink-0 font-mono text-[10px]">
              #{chapterNumber}
            </span>
          )}
          <span
            className={cn(
              'truncate text-sm font-medium',
              depth === 0 ? 'text-text-primary' : 'text-text-primary/80'
            )}
          >
            {title}
          </span>
        </div>
        <div className="flex items-center gap-1">
          {isEnding && (
            <Badge
              variant="outline"
              className="border-brand-pink-500/30 text-brand-pink-500 bg-brand-pink-500/5 h-4 gap-0.5 px-1 text-[9px]"
            >
              <Flag className="h-2 w-2" />
              Ending
            </Badge>
          )}
          {pullRequest.isPR && (
            <>
              {createBadge({
                color: 'orange',
                icon: GitPullRequest,
                label: 'pr',
                mono: true,
                size: 'sm',
              })}
            </>
          )}
        </div>
      </div>
    );
  },
};

const statusColumn: ColumnDef<IChapterTableRow> = {
  id: 'status',
  accessorKey: 'status',
  header: 'Status',
  size: 150,
  cell: ({ row }: { row: Row<IChapterTableRow> }) => {
    const { status } = row.original;
    return (
      <div>{chapterStatusBadge(status.toUpperCase(), { size: 'sm', className: 'uppercase' })}</div>
    );
  },
};

const authorColumn: ColumnDef<IChapterTableRow> = {
  id: 'author',
  accessorKey: 'authorName',
  header: 'Author',
  size: 120,
  cell: ({ row }: { row: Row<IChapterTableRow> }) => {
    const { authorName } = row.original;
    return <span className="text-text-primary/80 truncate text-sm">{authorName}</span>;
  },
};

const votesColumn: ColumnDef<IChapterTableRow> = {
  id: 'votes',
  header: 'Votes',
  size: 110,
  cell: ({ row }: { row: Row<IChapterTableRow> }) => {
    const { votes } = row.original;
    return (
      <div className="flex items-center gap-2">
        <div className="text-text-secondary-65 flex items-center gap-0.5 text-xs">
          <ThumbsUp className="h-3 w-3 text-emerald-500" />
          {formatNumber(votes.upvotes)}
        </div>
        <div className="text-text-secondary-65 flex items-center gap-0.5 text-xs">
          <ThumbsDown className="h-3 w-3 text-red-400" />
          {formatNumber(votes.downvotes)}
        </div>
      </div>
    );
  },
};

const statsColumn: ColumnDef<IChapterTableRow> = {
  id: 'stats',
  header: 'Stats',
  size: 150,
  cell: ({ row }: { row: Row<IChapterTableRow> }) => {
    const { stats } = row.original;
    return (
      <div className="flex items-center gap-2.5">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="text-text-secondary-65 flex items-center gap-0.5 text-xs">
                <Eye className="h-3 w-3" />
                {formatNumber(stats.reads)}
              </div>
            </TooltipTrigger>
            <TooltipContent>Reads</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <div className="text-text-secondary-65 flex items-center gap-0.5 text-xs">
                <MessageSquare className="h-3 w-3" />
                {formatNumber(stats.comments)}
              </div>
            </TooltipTrigger>
            <TooltipContent>Comments</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <div className="text-text-secondary-65 flex items-center gap-0.5 text-xs">
                <GitBranch className="h-3 w-3" />
                {formatNumber(stats.childBranches)}
              </div>
            </TooltipTrigger>
            <TooltipContent>Child Branches</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    );
  },
};

const depthColumn: ColumnDef<IChapterTableRow> = {
  id: 'depth',
  header: 'Depth',
  size: 70,
  cell: ({ row }: { row: Row<IChapterTableRow> }) => {
    const { depth } = row.original;
    return (
      <Badge
        variant="outline"
        className="text-text-secondary-65 border-border/40 h-5 px-1.5 font-mono text-[10px]"
      >
        L{depth}
      </Badge>
    );
  },
};

// ─────────────────────────────────────────────
// OWNER / PRIVILEGED ONLY COLUMNS
// ─────────────────────────────────────────────

const engagementColumn: ColumnDef<IChapterTableRow> = {
  id: 'engagement',
  header: 'Engagement',
  size: 120,
  cell: ({ row }: { row: Row<IChapterTableRow> }) => {
    const { engagementScore, completionRate } = row.original.stats;
    const color =
      engagementScore >= 80
        ? 'text-emerald-500'
        : engagementScore >= 50
          ? 'text-amber-500'
          : 'text-red-400';

    return (
      <div className="flex flex-col gap-0.5">
        <div className={cn('text-xs font-semibold', color)}>{engagementScore}/100</div>
        <div className="text-text-secondary-50 text-[10px]">
          {completionRate.toFixed(1)}% complete
        </div>
      </div>
    );
  },
};

const moderationColumn: ColumnDef<IChapterTableRow> = {
  id: 'moderation',
  header: 'Moderation',
  size: 110,
  cell: ({ row }: { row: Row<IChapterTableRow> }) => {
    const { isFlagged, reportCount } = row.original;
    if (!isFlagged && reportCount === 0) {
      return <span className="text-text-secondary-50 text-xs">Clean</span>;
    }
    return (
      <div className="flex flex-col gap-0.5">
        {isFlagged && (
          <Badge
            variant="outline"
            className="h-5 w-fit gap-0.5 border-red-400/30 bg-red-500/5 px-1 text-[11px] text-red-500"
          >
            <AlertTriangle className="h-3 w-3" />
            Flagged
          </Badge>
        )}
        {reportCount > 0 && (
          <span className="text-text-secondary-65 text-[10px]">
            {reportCount} report{reportCount !== 1 ? 's' : ''}
          </span>
        )}
      </div>
    );
  },
};

const versionColumn: ColumnDef<IChapterTableRow> = {
  id: 'version',
  header: 'Ver.',
  size: 70,
  cell: ({ row }: { row: Row<IChapterTableRow> }) => (
    <span className="text-text-secondary-50 font-mono text-xs">v{row.original.version}</span>
  ),
};

const updatedAtColumn: ColumnDef<IChapterTableRow> = {
  id: 'updatedAt',
  header: 'Updated',
  size: 110,
  cell: ({ row }: { row: Row<IChapterTableRow> }) => (
    <span className="text-text-secondary-50 text-xs">{formatDate(row.original.updatedAt)}</span>
  ),
};

// ─────────────────────────────────────────────
// Column factory based on role
// ─────────────────────────────────────────────

export function buildChapterColumns(context: IChaptersTableContext): ColumnDef<IChapterTableRow>[] {
  const { isOwnerOrPrivileged } = context;

  const baseColumns: ColumnDef<IChapterTableRow>[] = [
    // expandColumn,
    lockStatusColumn,
    coinPriceColumn,
    titleColumn,
    statusColumn,
    authorColumn,
    votesColumn,
    statsColumn,
    depthColumn,
  ];

  if (isOwnerOrPrivileged) {
    return [...baseColumns, engagementColumn, moderationColumn, versionColumn, updatedAtColumn];
  }

  return baseColumns;
}
