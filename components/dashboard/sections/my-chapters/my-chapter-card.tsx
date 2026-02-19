'use client';

import {
  ArrowRight,
  BookOpen,
  Eye,
  GitBranch,
  GitPullRequest,
  MessageSquare,
  ThumbsUp,
  Flag,
  AlertTriangle,
} from 'lucide-react';
import { formatDistance } from 'date-fns';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { chapterStatusBadge } from '@/components/common/badge';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

// Static chapter type updated to match Schema
import { IUserChapters } from '@/type/chapter/chapter-response.type';

interface MyChapterCardProps {
  chapter: IUserChapters;
}

// Helper to format numbers
function formatNumber(num: number): string {
  if (!num) return '0';
  if (num >= 1000) {
    return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'k';
  }
  return num.toString();
}

export function MyChapterCard({ chapter }: MyChapterCardProps) {
  const updatedAt = formatDistance(new Date(chapter.updatedAt), new Date(), { addSuffix: true });

  // Calculate score directly in component
  const score = (chapter.votes?.upvotes || 0) - (chapter.votes?.downvotes || 0);

  // Normalize status to uppercase for the badge utility
  // Handle empty or undefined status gracefully
  const normalizedStatus = (chapter.status || 'DRAFT').toUpperCase();

  return (
    <TooltipProvider>
      <Link
        href={`/stories/${chapter.storySlug}/chapters/${chapter.slug}`}
        className="block h-full"
        prefetch={false}
      >
        <div className="group/chapter-card bg-card/50 relative flex h-full cursor-pointer flex-col overflow-hidden rounded-[14px] p-1.5 transition-all duration-300">
          {/* ✨ HOVER GRADIENT OVERLAY */}
          <div className="from-primary/5 via-secondary/10 to-primary/10 pointer-events-none absolute inset-0 bg-linear-to-br opacity-0 transition-opacity duration-500 group-hover/chapter-card:opacity-100" />

          {/* CARD CONTENT */}
          <div className="relative flex flex-1 flex-col justify-between gap-2 rounded-[12px] border p-3 shadow">
            {/* TOP ACCENT */}
            <div className="bg-secondary absolute inset-x-16 top-0 h-[2px] rounded-b-full" />

            {/* TOP ROW: Story Title & Chapter # */}
            <div className="mb-2 flex items-center gap-2">
              <div className="flex size-8 shrink-0 items-center justify-center rounded-full border">
                <BookOpen size={16} className="text-muted-foreground" />
              </div>
              <div className="flex min-w-0 flex-col">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="text-muted-foreground font-ibm-plex-mono truncate text-xs">
                      {chapter.storySlug || 'Unknown Story'}
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>{chapter.storySlug}</TooltipContent>
                </Tooltip>
                {chapter.displayNumber && (
                  <span className="text-muted-foreground/80 font-mono text-[10px]">
                    Ch. {chapter.displayNumber}
                  </span>
                )}
              </div>
              <div className="ml-auto flex items-center gap-1">
                <span className="text-muted-foreground bg-muted/50 flex items-center gap-0.5 rounded-full px-1.5 py-0.5 text-[9px] font-semibold">
                  v{chapter.version}
                </span>
              </div>
            </div>

            {/* STATUS & BADGES ROW */}
            <div className="mb-2 flex flex-col gap-2">
              <div className="flex flex-wrap items-center gap-2">
                <div className="self-start">
                  {chapterStatusBadge(normalizedStatus, {
                    size: 'xs',
                    className: 'uppercase',
                  })}
                </div>

                {chapter.isEnding && (
                  <Badge
                    variant="outline"
                    className="border-primary/20 text-primary bg-primary/5 h-5 gap-1 px-1.5 text-[10px]"
                  >
                    <Flag size={8} /> Ending
                  </Badge>
                )}

                {chapter.pullRequest?.isPR && (
                  <Badge
                    variant="outline"
                    className="h-5 gap-1 border-amber-200 bg-amber-50 px-1.5 text-[10px] text-amber-600"
                  >
                    <GitPullRequest size={8} /> PR
                  </Badge>
                )}
              </div>

              {/* MAIN TITLE */}
              <h3 className="line-clamp-2 min-h-10 text-[15px] leading-tight font-medium">
                {chapter.title}
              </h3>

              {/* MODERATION BADGES */}
              {(chapter.isFlagged || (chapter.reportCount || 0) > 0) && (
                <div className="flex flex-wrap items-center gap-2">
                  {chapter.isFlagged && (
                    <Badge
                      variant="outline"
                      className="h-5 gap-1 border-red-200 bg-red-50 px-1.5 text-[10px] text-red-600"
                    >
                      <AlertTriangle size={8} /> Flagged
                    </Badge>
                  )}

                  {(chapter.reportCount || 0) > 0 && !chapter.isFlagged && (
                    <Badge
                      variant="outline"
                      className="h-5 gap-1 border-orange-200 bg-orange-50 px-1.5 text-[10px] text-orange-600"
                    >
                      <AlertTriangle size={8} /> {chapter.reportCount} Reports
                    </Badge>
                  )}
                </div>
              )}
            </div>

            {/* STATS ROW */}
            <div className="border-border/50 mt-auto flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-dashed pt-2 text-[11px]">
              {/* Reads */}
              <div className="text-muted-foreground flex items-center gap-1">
                <Eye size={12} />
                {formatNumber(chapter.stats.reads)}
              </div>

              {/* Votes/Score */}
              <div className="text-muted-foreground flex items-center gap-1">
                <ThumbsUp size={12} />
                {formatNumber(score)}
              </div>

              {/* Comments */}
              <div className="text-muted-foreground flex items-center gap-1">
                <MessageSquare size={12} />
                {formatNumber(chapter.stats.comments)}
              </div>

              {/* Branches */}
              {chapter.stats.childBranches > 0 && (
                <div className="text-muted-foreground flex items-center gap-1">
                  <GitBranch size={12} />
                  {chapter.stats.childBranches}
                </div>
              )}
            </div>
          </div>

          {/* FOOTER */}
          <div className="relative mt-1.5 h-5 overflow-hidden">
            <span className="text-muted-foreground absolute top-0 left-1 text-[11px] transition-transform ease-[cubic-bezier(0.2,0.4,0,1)] group-hover/chapter-card:-translate-x-[calc(100%+4px)]">
              Updated {updatedAt}
            </span>

            <span className="absolute top-0 right-0 flex translate-x-full items-center gap-1 text-[11px] transition-transform ease-[cubic-bezier(0.2,0.4,0,1)] group-hover/chapter-card:-translate-x-2">
              Open Chapter <ArrowRight size={12} />
            </span>
          </div>
        </div>
      </Link>
    </TooltipProvider>
  );
}

export default MyChapterCard;
