'use client';

import {
  ArrowLeft,
  Share2,
  Bookmark,
  BookmarkCheck,
  MoreHorizontal,
  Edit,
  GitPullRequest,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { statusBadge } from '@/components/common/badge';
import { ReportButton } from '@/components/common/report-appeal';
import type { ChapterData } from '@/components/common/chapter-reader';

interface ChapterHeaderProps {
  chapter: ChapterData;
  isBookmarked: boolean;
  onBack: () => void;
  onShare: () => void;
  onBookmark: () => void;
  onEdit: () => void;
  onCreatePR: () => void;
}

export function ChapterHeader({
  chapter,
  isBookmarked,
  onBack,
  onShare,
  onBookmark,
  onEdit,
  onCreatePR,
}: ChapterHeaderProps) {
  return (
    <header className="border-border/50 bg-bg-cream sticky top-0 z-10 border-b">
      <div className="mx-auto flex h-14 max-w-4xl items-center justify-between px-4">
        {/* Left - Back Button */}
        <Button variant="ghost" size="sm" onClick={onBack} className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          <span className="hidden sm:inline">Back</span>
        </Button>

        {/* Center - Story Title */}
        <div className="flex items-center gap-2 text-sm">
          <span className="text-muted-foreground max-w-[150px] truncate sm:max-w-[250px]">
            {chapter.storyTitle}
          </span>
          {chapter.chapterNumber && (
            <>
              <span className="text-muted-foreground">/</span>
              {statusBadge(`Ch. ${chapter.chapterNumber}`, 'neutral', {
                size: 'xs',
                shape: 'pill',
                style: 'soft',
              })}
            </>
          )}
        </div>

        {/* Right - Actions */}
        <div className="flex items-center gap-1">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" onClick={onShare}>
                  <Share2 className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Share</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" onClick={onBookmark}>
                  {isBookmarked ? (
                    <BookmarkCheck className="text-primary h-4 w-4" />
                  ) : (
                    <Bookmark className="h-4 w-4" />
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent>{isBookmarked ? 'Remove bookmark' : 'Bookmark'}</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={onEdit} className="gap-2">
                <Edit className="h-4 w-4" />
                Edit Chapter
              </DropdownMenuItem>
              <DropdownMenuItem onClick={onCreatePR} className="gap-2">
                <GitPullRequest className="h-4 w-4" />
                Create Submit Request
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <ReportButton reportType="CHAPTER" relatedId={chapter.id} relatedTitle={chapter.title} />
        </div>
      </div>
    </header>
  );
}
