'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import * as React from 'react';

import { IChapterDetailExtended, IChapterVoteNumberType } from '@/type';
import { ReportType } from '@/type/reports';
import NumberFlow from '@number-flow/react';
import {
  BookOpen,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Home,
  Keyboard,
  List,
  Maximize,
  MessageCircle,
  Minimize,
  Settings,
  ThumbsDown,
  ThumbsUp,
} from 'lucide-react';

import { ReportButton } from '@/components/common/report-appeal/report-button';
import toast from '@/components/shared/toast/toast';
import { cn } from '@/lib/utils';
import { useReactToChapter } from '@/services/chapters/chapters.mutation';

interface ChapterReaderOverlayProps {
  chapterData: IChapterDetailExtended;
  storySlug: string;
  isVisible: boolean;
  onNavigate: (slug: string) => void;
  onToggleFullscreen?: () => void;
}

export function ChapterReaderOverlay({
  chapterData,
  storySlug,
  isVisible,
  onNavigate,
  onToggleFullscreen,
}: ChapterReaderOverlayProps) {
  const router = useRouter();
  const reactToChapter = useReactToChapter();

  const {
    votes: { upvotes, downvotes },
    currentUserVote,
    slug,
    previousChapters = [],
    nextChapters = [],
    stats,
  } = chapterData;

  const [voteStatus, setVoteStatus] = React.useState<IChapterVoteNumberType | null>(
    currentUserVote
  );
  const [localUpvotes, setLocalUpvotes] = React.useState(upvotes);
  const [localDownvotes, setLocalDownvotes] = React.useState(downvotes);
  const [isFullscreen, setIsFullscreen] = React.useState(false);

  // Sync fullscreen state
  React.useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const handleReaction = (actionType: 'upvote' | 'downvote', e: React.MouseEvent) => {
    e.stopPropagation();
    if (reactToChapter.isPending) return;

    const previousVoteStatus = voteStatus;
    const previousUpvotes = localUpvotes;
    const previousDownvotes = localDownvotes;

    let newVoteStatus: IChapterVoteNumberType | null = null;
    let newUpvotes = localUpvotes;
    let newDownvotes = localDownvotes;

    if (previousVoteStatus === 1) newUpvotes -= 1;
    else if (previousVoteStatus === -1) newDownvotes -= 1;

    if (actionType === 'upvote' && previousVoteStatus !== 1) {
      newVoteStatus = 1;
      newUpvotes += 1;
    } else if (actionType === 'downvote' && previousVoteStatus !== -1) {
      newVoteStatus = -1;
      newDownvotes += 1;
    }

    setVoteStatus(newVoteStatus);
    setLocalUpvotes(newUpvotes);
    setLocalDownvotes(newDownvotes);

    reactToChapter.mutate(
      { slug, type: actionType },
      {
        onError: () => {
          setVoteStatus(previousVoteStatus);
          setLocalUpvotes(previousUpvotes);
          setLocalDownvotes(previousDownvotes);
        },
      }
    );
  };

  const scrollToTop = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToComments = (e: React.MouseEvent) => {
    e.stopPropagation();
    const commentsEl =
      document.getElementById('comments-section') || document.querySelector('.chapter-comments');
    if (commentsEl) {
      commentsEl.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    }
  };

  const toggleFullscreen = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onToggleFullscreen) {
      onToggleFullscreen();
      return;
    }

    const container = document.getElementById('fullscreen-reader-container');
    const target = container || document.documentElement;

    if (!document.fullscreenElement) {
      target.requestFullscreen().catch(() => {
        toast.error('Fullscreen mode not supported');
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  const prevChapter = previousChapters[0];
  const nextChapter = nextChapters[0];
  const commentsCount = stats?.comments ?? 0;

  return (
    <>
      {/* RIGHT SIDEBAR (FLOATING CONTROL PALETTE AT RIGHT: 0, VERTICALLY CENTERED) */}
      <aside
        className={cn(
          'fixed top-1/2 right-0 z-50 -translate-y-1/2',
          'flex flex-col items-center gap-2',
          'rounded-l-xl border border-r-0',
          'text-popover-foreground border-border bg-popover/80',
          'p-1.5 shadow-2xl backdrop-blur-md',
          'transition-all duration-300 ease-in-out',
          isVisible
            ? 'pointer-events-auto translate-x-0 opacity-100'
            : 'pointer-events-none translate-x-full opacity-0'
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Home */}
        <button
          onClick={() => router.push(`/stories/${storySlug}`)}
          className="hover:bg-accent hover:text-accent-foreground flex h-9 w-9 items-center justify-center rounded-xl transition-colors"
          title="Story Home"
        >
          <Home size={18} />
        </button>

        {/* Reader Top */}
        <button
          onClick={scrollToTop}
          className="hover:bg-accent hover:text-accent-foreground flex h-9 w-9 items-center justify-center rounded-xl transition-colors"
          title="Scroll to Top"
        >
          <BookOpen size={18} />
        </button>

        {/* Chapters list */}
        <Link
          href={`/stories/${storySlug}/chapters`}
          className="hover:bg-accent hover:text-accent-foreground flex h-9 w-9 items-center justify-center rounded-xl transition-colors"
          title="All Chapters"
        >
          <List size={18} />
        </Link>

        {/* Comments with badge */}
        <button
          onClick={scrollToComments}
          className="hover:bg-accent hover:text-accent-foreground relative flex h-9 w-9 items-center justify-center rounded-xl transition-colors"
          title="Comments"
        >
          <MessageCircle size={18} />
          {commentsCount > 0 && (
            <span className="bg-brand-pink-500 text-primary-foreground absolute -top-1 -right-1 flex h-4 min-w-4 items-center justify-center rounded-full px-1 text-[10px] font-bold shadow-xs">
              {commentsCount > 99 ? '99+' : commentsCount}
            </span>
          )}
        </button>

        {/* Settings */}
        <button
          onClick={() => toast.info('Reader Settings active')}
          className="hover:bg-accent hover:text-accent-foreground flex h-9 w-9 items-center justify-center rounded-xl transition-colors"
          title="Settings"
        >
          <Settings size={18} />
        </button>

        {/* Fullscreen */}
        <button
          onClick={toggleFullscreen}
          className="hover:bg-accent hover:text-accent-foreground flex h-9 w-9 items-center justify-center rounded-xl transition-colors"
          title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
        >
          {isFullscreen ? <Minimize size={18} /> : <Maximize size={18} />}
        </button>

        {/* Keyboard Shortcuts */}
        <button
          onClick={() =>
            toast.info('Shortcuts: Double-tap (Desktop) or Single-tap (Mobile) toggles UI')
          }
          className="hover:bg-accent hover:text-accent-foreground flex h-9 w-9 items-center justify-center rounded-xl transition-colors"
          title="Shortcuts"
        >
          <Keyboard size={18} />
        </button>

        {/* Report / Flag */}
        <ReportButton
          reportType={ReportType.CHAPTER}
          relatedChapterSlug={chapterData.slug}
          relatedStorySlug={storySlug}
          relatedTitle={chapterData.title}
          variant="ghost"
          size="icon"
          iconOnly={true}
          className="hover:bg-accent hover:text-accent-foreground flex h-9 w-9 items-center justify-center rounded-xl transition-colors"
        />
      </aside>

      <div
        className={cn(
          'fixed bottom-6 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2',
          'transition-all duration-300 ease-in-out',
          isVisible
            ? 'pointer-events-auto translate-y-0 opacity-100'
            : 'pointer-events-none translate-y-10 opacity-0'
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Main Pill: Chapter Selector & Navigation */}
        <div className="text-popover-foreground border-border flex items-center gap-2 rounded-full border bg-transparent px-3 py-1.5 shadow-2xl backdrop-blur-md sm:px-4 sm:py-2">
          {/* Previous Chapter */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (prevChapter) onNavigate(prevChapter.slug);
            }}
            disabled={!prevChapter}
            className={cn(
              'flex h-7 w-7 items-center justify-center rounded-full transition-colors',
              prevChapter
                ? 'hover:bg-accent hover:text-accent-foreground text-popover-foreground'
                : 'text-muted-foreground/40 cursor-not-allowed'
            )}
            title="Previous Chapter"
          >
            <ChevronLeft size={16} />
          </button>

          {/* Chapter Label / Dropdown Trigger */}
          <Link
            href={`/stories/${storySlug}/chapters`}
            className="text-popover-foreground hover:text-foreground flex items-center gap-1.5 px-2 text-xs font-semibold tracking-wide transition-colors sm:text-sm"
          >
            <span className="line-clamp-1 max-w-30 sm:max-w-45">
              {chapterData.title || 'Chapter'}
            </span>
            <ChevronDown size={14} className="text-muted-foreground" />
          </Link>

          {/* Next Chapter */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (nextChapter) onNavigate(nextChapter.slug);
            }}
            disabled={!nextChapter}
            className={cn(
              'flex h-7 w-7 items-center justify-center rounded-full transition-colors',
              nextChapter
                ? 'hover:bg-accent hover:text-accent-foreground text-popover-foreground'
                : 'text-muted-foreground/40 cursor-not-allowed'
            )}
            title="Next Chapter"
          >
            <ChevronRight size={16} />
          </button>
        </div>

        {/* Like & Dislike Pill */}
        <div className="border-border flex items-center gap-1 rounded-full border bg-transparent px-2 py-1.5 shadow-2xl backdrop-blur-md sm:px-3 sm:py-2">
          {/* Upvote */}
          <button
            onClick={(e) => handleReaction('upvote', e)}
            disabled={reactToChapter.isPending}
            className={cn(
              'flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold transition-all duration-200 active:scale-95',
              voteStatus === 1
                ? 'bg-brand-pink-500 text-primary-foreground'
                : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
            )}
            aria-label="Like chapter"
          >
            <ThumbsUp size={15} className={cn(voteStatus === 1 && 'fill-current')} />
            <span className="font-ibm-plex-mono text-[11px] font-bold">
              <NumberFlow value={localUpvotes} />
            </span>
          </button>

          <div className="bg-border h-4 w-px" />

          {/* Downvote */}
          <button
            onClick={(e) => handleReaction('downvote', e)}
            disabled={reactToChapter.isPending}
            className={cn(
              'flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold transition-all duration-200 active:scale-95',
              voteStatus === -1
                ? 'bg-secondary text-secondary-foreground'
                : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
            )}
            aria-label="Dislike chapter"
          >
            <ThumbsDown size={15} className={cn(voteStatus === -1 && 'fill-current')} />
            <span className="font-ibm-plex-mono text-[11px] font-bold">
              <NumberFlow value={localDownvotes} />
            </span>
          </button>
        </div>

        {/* Scroll To Top Circular Button */}
        <button
          onClick={scrollToTop}
          className="bg-popover text-popover-foreground border-border hover:bg-accent hover:text-accent-foreground flex h-9 w-9 items-center justify-center rounded-full border shadow-2xl backdrop-blur-md transition-all sm:h-10 sm:w-10"
          title="Scroll to Top"
        >
          <ChevronUp size={18} />
        </button>
      </div>
    </>
  );
}
