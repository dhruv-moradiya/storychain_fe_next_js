'use client';

import { ReportType } from '@/type/reports';
import {
  ArrowLeft,
  Bookmark,
  BookmarkCheck,
  Edit,
  GitPullRequest,
  MoreHorizontal,
  Share2,
} from 'lucide-react';

import { ReportButton } from '@/components/common/report-appeal/report-button';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface IChapterHeaderProps {
  isBookmarked: boolean;
  onBack: () => void;
  onShare: () => void;
  onBookmark: () => void;
  onEdit: () => void;
  onCreatePR: () => void;
  storySlug?: string;
  chapterSlug?: string;
  chapterTitle?: string;
}

export function ChapterHeader({
  isBookmarked,
  onBack,
  onShare,
  onBookmark,
  onEdit,
  onCreatePR,
  storySlug,
  chapterSlug,
  chapterTitle,
}: IChapterHeaderProps) {
  return (
    <header className="border-border/50 bg-bg-cream sticky top-0 z-10 border-b">
      <div className="mx-auto flex h-14 max-w-4xl items-center justify-between px-4">
        {/* Left - Back Button */}
        <Button variant="ghost" size="sm" onClick={onBack} className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          <span className="hidden sm:inline">Back</span>
        </Button>

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

          <ReportButton
            reportType={ReportType.CHAPTER}
            relatedChapterSlug={chapterSlug}
            relatedStorySlug={storySlug}
            relatedTitle={chapterTitle}
            variant="ghost"
            size="icon"
            className="text-text-secondary-65 h-8 w-8 rounded-lg transition-all hover:bg-amber-500/10 hover:text-amber-600"
          />

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
        </div>
      </div>
    </header>
  );
}

export default ChapterHeader;
