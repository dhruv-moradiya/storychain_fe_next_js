'use client';

import { useRouter } from 'next/navigation';

import { Handle, Position } from '@xyflow/react';
import {
  Clock,
  Coins,
  Eye,
  Flag,
  GitBranch,
  GitPullRequest,
  Lock,
  MessageCircle,
  Plus,
  Sparkles,
  ThumbsDown,
  ThumbsUp,
  Unlock,
} from 'lucide-react';

import { chapterStatusBadge } from '@/components/common/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

import { IChapterNodeProps } from '../types/canvas.types';

export const ChapterCardNode = ({
  id,
  data,
  selected,
  targetPosition = Position.Left,
}: IChapterNodeProps) => {
  const router = useRouter();
  const isPopular = (data.stats?.reads ?? 0) > 500 || (data.votes?.upvotes ?? 0) > 50;

  const formatNumber = (num: number = 0): string => {
    if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}k`;
    return num.toString();
  };

  const formatTimeAgo = (dateStr?: string | Date): string => {
    if (!dateStr) return 'Recently';
    const now = new Date();
    const then = new Date(dateStr);
    const diffMs = now.getTime() - then.getTime();
    if (isNaN(diffMs)) return 'Recently';
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays}d ago`;
    return `${Math.floor(diffDays / 7)}w ago`;
  };

  const isFree = !data.coinPrice || data.coinPrice === 0;
  const isUnlocked = isFree || !!data.isUnlock;

  return (
    <div
      className={cn(
        'group bg-bg-cream relative w-72 rounded-xl transition-all duration-300',
        'border shadow-sm',
        selected
          ? 'border-brand-pink-500 shadow-brand-pink-500/10 ring-brand-pink-500/30 shadow-md ring-1'
          : 'border-brand-pink-500/20 hover:border-brand-pink-500/40 hover:shadow-md'
      )}
    >
      {/* Handles */}
      {targetPosition === Position.Left ? (
        <>
          <Handle
            type="target"
            position={Position.Left}
            className="border-bg-cream! bg-brand-pink-500! h-2.5! w-2.5! rounded-full! border-2!"
          />
          <Handle
            type="source"
            position={Position.Right}
            className="border-bg-cream! bg-brand-pink-500! h-2.5! w-2.5! rounded-full! border-2!"
          />
        </>
      ) : (
        <>
          <Handle
            type="target"
            position={Position.Top}
            className="border-bg-cream! bg-brand-pink-500! -top-1.5! h-2.5! w-2.5! rounded-full! border-2!"
          />
          <Handle
            type="source"
            position={Position.Bottom}
            className="border-bg-cream! bg-brand-pink-500! -bottom-1.5! h-2.5! w-2.5! rounded-full! border-2!"
          />
        </>
      )}

      {/* Card Content */}
      <div className="relative z-10 p-3.5">
        {/* Header Row: Badges & Quick Action */}
        <div className="flex items-center justify-between gap-1.5">
          {/* Access / Coin Status & Popular Badge */}
          <div className="flex flex-wrap items-center gap-1.5">
            {isFree ? (
              <div className="flex items-center gap-1 rounded border border-emerald-500/20 bg-emerald-500/10 px-1.5 py-0.5 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">
                <Unlock className="h-2.5 w-2.5 text-emerald-500" />
                <span>Free</span>
              </div>
            ) : isUnlocked ? (
              <div className="flex items-center gap-1 rounded border border-emerald-500/20 bg-emerald-500/10 px-1.5 py-0.5 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">
                <Unlock className="h-2.5 w-2.5 text-emerald-500" />
                <span>Unlocked ({data.coinPrice})</span>
              </div>
            ) : (
              <div className="flex items-center gap-1 rounded border border-amber-500/20 bg-amber-500/10 px-1.5 py-0.5 text-[10px] font-semibold text-amber-600 dark:text-amber-400">
                <Lock className="h-2.5 w-2.5 text-amber-500" />
                <Coins className="h-2.5 w-2.5 text-amber-500" />
                <span>Paid ({data.coinPrice})</span>
              </div>
            )}

            {isPopular && (
              <div className="from-brand-orange/15 to-brand-pink-500/15 flex items-center gap-0.5 rounded-full bg-linear-to-r px-1.5 py-0.5">
                <Sparkles className="text-brand-orange h-2.5 w-2.5" />
              </div>
            )}
          </div>

          {/* Status Badges + Quick-add button */}
          <div className="flex items-center gap-1">
            {data.status &&
              chapterStatusBadge(data.status, { size: 'sm', className: 'text-[9px] px-1.5 py-0' })}

            {(!!data.prId ||
              !!(data as unknown as { pullRequest?: { isPR?: boolean } }).pullRequest?.isPR) && (
              <Badge
                variant="outline"
                className="h-4 gap-0.5 border-amber-500/30 bg-amber-500/10 px-1 text-[9px] text-amber-600"
              >
                <GitPullRequest className="h-2 w-2" />
                PR
              </Badge>
            )}

            {data.isEnding && (
              <div className="bg-badge-success/10 text-badge-success flex items-center gap-0.5 rounded-full px-1.5 py-0.5">
                <Flag className="h-2.5 w-2.5" />
                <span className="text-[9px] font-semibold">End</span>
              </div>
            )}

            {/* Quick-add child chapter - visible on hover */}
            {!data.isEnding && (
              <button
                type="button"
                title="Add child chapter"
                onClick={(e) => {
                  e.stopPropagation();
                  const slug = data.storySlug;
                  if (!slug) return;
                  const params = new URLSearchParams({
                    mode: 'new',
                    parentChapterSlug: data.slug,
                    storySlug: slug,
                  });
                  router.push(`/stories/${slug}/builder?${params.toString()}`);
                }}
                className="hover:bg-brand-pink-500/10 hover:text-brand-pink-500 text-text-secondary-65 flex items-center justify-center rounded-full p-0.5 opacity-0 transition-all group-hover:opacity-100"
              >
                <Plus className="h-3 w-3" strokeWidth={2.5} />
              </button>
            )}
          </div>
        </div>

        {/* Title */}
        <h3 className="font-libreBaskerville text-text-primary mt-2 line-clamp-1 text-[13px] leading-tight font-semibold">
          {data.title}
        </h3>

        {/* Metadata Details Row */}
        <div className="text-text-secondary-65 mt-2 flex items-center justify-between text-[10px]">
          {/* Level indicator */}
          <span className="text-text-secondary-50 font-mono text-[10px]">Level {data.depth}</span>

          {/* Upvotes & Downvotes */}
          <div className="flex items-center gap-2 font-medium">
            <div className="flex items-center gap-0.5 text-emerald-600">
              <ThumbsUp className="h-2.5 w-2.5" />
              <span>{formatNumber(data.votes?.upvotes)}</span>
            </div>
            <div className="flex items-center gap-0.5 text-red-500">
              <ThumbsDown className="h-2.5 w-2.5" />
              <span>{formatNumber(data.votes?.downvotes)}</span>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="bg-border/50 my-2.5 h-px" />

        {/* Footer Row: Author & Stats */}
        <div className="flex items-center justify-between">
          {/* Author */}
          <div className="flex min-w-0 items-center gap-1.5">
            <Avatar className="h-5 w-5 shrink-0 ring-1 ring-black/5">
              <AvatarImage src={data.author?.avatarUrl} alt={data.author?.username || 'Author'} />
              <AvatarFallback className="from-brand-blue/20 to-brand-pink-500/20 text-text-primary bg-linear-to-br text-[8px] font-semibold">
                {(data.author?.username || 'A').charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex min-w-0 flex-col">
              <span className="text-text-primary truncate text-[10px] leading-none font-medium">
                {data.author?.username || 'Anonymous'}
              </span>
              <span className="text-text-secondary-65 mt-0.5 flex items-center gap-0.5 text-[8px]">
                <Clock className="h-2 w-2" />
                {formatTimeAgo(data.createdAt)}
              </span>
            </div>
          </div>

          {/* Stats */}
          <div className="flex shrink-0 items-center gap-2">
            <div
              className="text-text-secondary-65 hover:text-brand-blue flex items-center gap-0.5 transition-colors"
              title="Reads"
            >
              <Eye className="h-3 w-3" />
              <span className="text-[10px] font-medium">{formatNumber(data.stats?.reads)}</span>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                data.onCommentClick?.(id);
              }}
              className="text-text-secondary-65 hover:text-brand-pink-500 flex items-center gap-0.5 transition-colors"
              title="Comments"
            >
              <MessageCircle className="h-3 w-3" />
              <span className="text-[10px] font-medium">{formatNumber(data.stats?.comments)}</span>
            </button>
            <div
              className="text-text-secondary-65 flex items-center gap-0.5 transition-colors hover:text-purple-500"
              title="Child Branches"
            >
              <GitBranch className="h-3 w-3" />
              <span className="text-[10px] font-medium">
                {formatNumber(data.stats?.childBranches)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChapterCardNode;
