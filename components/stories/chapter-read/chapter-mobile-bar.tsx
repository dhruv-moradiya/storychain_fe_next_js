'use client';

import Link from 'next/link';
import * as React from 'react';

import { IChapterDetailExtended, IChapterVoteNumberType } from '@/type';
import NumberFlow from '@number-flow/react';
import { Bookmark, List, ThumbsDown, ThumbsUp } from 'lucide-react';

import { ShareMenu } from '@/components/share-menu';
import { cn } from '@/lib/utils';
import { useReactToChapter } from '@/services/chapters/chapters.mutation';

interface ChapterMobileBarProps {
  chapterData: IChapterDetailExtended;
  storySlug: string;
}

export function ChapterMobileBar({ chapterData, storySlug }: ChapterMobileBarProps) {
  const reactToChapter = useReactToChapter();
  const {
    votes: { upvotes, downvotes },
    currentUserVote,
    title,
    slug,
  } = chapterData;

  const [voteStatus, setVoteStatus] = React.useState<IChapterVoteNumberType | null>(
    currentUserVote
  );
  const [localUpvotes, setLocalUpvotes] = React.useState(upvotes);
  const [localDownvotes, setLocalDownvotes] = React.useState(downvotes);
  const [saved, setSaved] = React.useState(false);

  const handleReaction = (actionType: 'upvote' | 'downvote') => {
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

  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';

  return (
    /* Only visible on mobile/tablet (below lg) */
    <div className="fixed right-0 -bottom-6 left-0 z-50 lg:hidden">
      {/* Backdrop blur bar */}
      <div className="border-border/40 bg-bg-cream/90 dark:bg-bg-cream/95 flex items-center justify-around gap-1 border-t px-3 py-2 shadow-xl backdrop-blur-xl">
        {/* Like button */}
        <button
          onClick={() => handleReaction('upvote')}
          disabled={reactToChapter.isPending}
          className={cn(
            'flex flex-1 flex-col items-center gap-0.5 rounded-xl px-2 py-2 transition-all duration-200 active:scale-95',
            voteStatus === 1
              ? 'text-brand-pink-500'
              : 'text-text-secondary-65 hover:text-brand-pink-500'
          )}
          aria-label="Like chapter"
        >
          <ThumbsUp
            size={20}
            className={cn('transition-all duration-200', voteStatus === 1 && 'fill-brand-pink-500')}
          />
          <span className="font-ibm-plex-mono text-[10px] font-bold">
            <NumberFlow value={localUpvotes} />
          </span>
        </button>

        {/* Divider */}
        <div className="bg-border/60 h-8 w-px" />

        {/* Dislike button */}
        <button
          onClick={() => handleReaction('downvote')}
          disabled={reactToChapter.isPending}
          className={cn(
            'flex flex-1 flex-col items-center gap-0.5 rounded-xl px-2 py-2 transition-all duration-200 active:scale-95',
            voteStatus === -1
              ? 'text-text-secondary'
              : 'text-text-secondary-65 hover:text-text-secondary'
          )}
          aria-label="Dislike chapter"
        >
          <ThumbsDown
            size={20}
            className={cn(
              'transition-all duration-200',
              voteStatus === -1 && 'fill-text-secondary'
            )}
          />
          <span className="font-ibm-plex-mono text-[10px] font-bold">
            <NumberFlow value={localDownvotes} />
          </span>
        </button>

        {/* Divider */}
        <div className="bg-border/60 h-8 w-px" />

        {/* Save button */}
        <button
          onClick={() => setSaved((prev) => !prev)}
          className={cn(
            'flex flex-1 flex-col items-center gap-0.5 rounded-xl px-2 py-2 transition-all duration-200 active:scale-95',
            saved ? 'text-brand-pink-500' : 'text-text-secondary-65 hover:text-brand-pink-500'
          )}
          aria-label={saved ? 'Unsave chapter' : 'Save chapter'}
        >
          <Bookmark
            size={20}
            className={cn('transition-all duration-200', saved && 'fill-brand-pink-500')}
          />
          <span className="font-ibm-plex-mono text-[10px] font-bold">
            {saved ? 'Saved' : 'Save'}
          </span>
        </button>

        {/* Divider */}
        <div className="bg-border/60 h-8 w-px" />

        {/* Share button */}
        <div className="flex flex-1 flex-col items-center gap-0.5 py-1">
          <ShareMenu title={title} url={shareUrl} />
          <span className="font-ibm-plex-mono text-text-secondary-65 text-[10px] font-bold">
            Share
          </span>
        </div>

        {/* Divider */}
        <div className="bg-border/60 h-8 w-px" />

        {/* View chapters */}
        <Link
          href={`/stories/${storySlug}/chapters`}
          className="text-text-secondary-65 hover:text-text-primary flex flex-1 flex-col items-center gap-0.5 rounded-xl px-2 py-2 transition-all duration-200 active:scale-95"
          aria-label="View all chapters"
        >
          <List size={20} />
          <span className="font-ibm-plex-mono text-[10px] font-bold">Chapters</span>
        </Link>
      </div>

      {/* Safe area spacer for devices with home indicator */}
      <div className="bg-bg-cream/90 dark:bg-bg-cream/95 h-safe-area-inset-bottom" />
    </div>
  );
}
