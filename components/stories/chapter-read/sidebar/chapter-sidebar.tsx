'use client';

import * as React from 'react';

import { IChapterDetailExtended, IChapterVoteNumberType } from '@/type';
import NumberFlow from '@number-flow/react';
import { Bookmark, Facebook, Instagram, List, ThumbsDown, ThumbsUp, Twitter } from 'lucide-react';

import { CopyButton } from '@/components/copy-button';
import toast from '@/components/shared/toast/toast';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useReactToChapter } from '@/services/chapters/chapters.mutation';

interface ChapterSidebarProps {
  chapterData: IChapterDetailExtended;
}

export function ChapterSidebar({ chapterData }: ChapterSidebarProps) {
  const reactToChapter = useReactToChapter();
  const {
    votes: { upvotes, downvotes, score },
    currentUserVote,
  } = chapterData;

  const [voteStatus, setVoteStatus] = React.useState<IChapterVoteNumberType | null>(
    currentUserVote
  );
  const [localUpvotes, setLocalUpvotes] = React.useState(upvotes);
  const [localDownvotes, setLocalDownvotes] = React.useState(downvotes);
  const [localScore, setLocalScore] = React.useState(score);
  const [saved, setSaved] = React.useState(false);

  const handleReaction = (actionType: 'upvote' | 'downvote') => {
    if (reactToChapter.isPending) return;

    const previousVoteStatus = voteStatus;
    const previousUpvotes = localUpvotes;
    const previousDownvotes = localDownvotes;

    // Optimistic update
    let newVoteStatus: IChapterVoteNumberType | null = null;
    let newUpvotes = localUpvotes;
    let newDownvotes = localDownvotes;

    // Remove previous vote if exists
    if (previousVoteStatus === 1) {
      newUpvotes -= 1;
    } else if (previousVoteStatus === -1) {
      newDownvotes -= 1;
    }

    // Apply new vote if it's different from the one clicked
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
    setLocalScore(newUpvotes - newDownvotes);

    reactToChapter.mutate(
      {
        slug: chapterData.slug,
        type: actionType,
      },
      {
        onError: () => {
          setVoteStatus(previousVoteStatus);
          setLocalUpvotes(previousUpvotes);
          setLocalDownvotes(previousDownvotes);
          setLocalScore(previousUpvotes - previousDownvotes);
        },
      }
    );
  };

  const handleSave = () => {
    if (saved) {
      setSaved(false);
      toast.success('Removed from library');
    } else {
      setSaved(true);
      toast.success('Saved chapter to library!');
    }
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard!');
    } catch {
      toast.error('Failed to copy link');
    }
  };

  const shareOnInstagram = () => {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.instagram.com/share?url=${url}`, '_blank');
  };

  const shareOnTwitter = () => {
    const text = encodeURIComponent('Check out this awesome story chapter on StoryChain!');
    const url = encodeURIComponent(window.location.href);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank');
  };

  const shareOnFacebook = () => {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
  };

  return (
    <div className="space-y-6">
      {/* CHAPTER PROGRESS + LIKE SAVE BUTTON */}
      <div className="border-border/50 flex flex-col gap-6 rounded-sm border p-5 shadow-xs">
        {/* Progress */}
        <div className="flex flex-col gap-2.5">
          <div className="text-text-secondary-65 flex items-center justify-between text-xs font-semibold tracking-wide uppercase">
            <span>Chapter Progress</span>
            <span>45%</span>
          </div>
          <Progress value={45} className="h-2" />
        </div>

        {/* View All Chapters Button */}
        <Button
          variant="outline-editorial"
          className="h-10 w-full cursor-pointer rounded-sm text-sm font-semibold"
        >
          <List className="size-4" />
          View All Chapters
        </Button>

        <hr className="border-border/30" />

        {/* Share Actions (Image 2 style) */}
        <div className="flex flex-col gap-3">
          <span className="text-text-secondary-65 text-xs font-semibold tracking-wide uppercase">
            Share Chapter
          </span>
          <div className="grid grid-cols-4 gap-2">
            <Button
              variant="outline-editorial"
              size="icon"
              onClick={shareOnInstagram}
              className="h-10 w-full cursor-pointer rounded-sm [&_svg]:size-5"
              title="Copy Link"
            >
              <Instagram />
            </Button>
            <Button
              variant="outline-editorial"
              size="icon"
              onClick={shareOnTwitter}
              className="h-10 w-full cursor-pointer rounded-sm [&_svg]:size-5"
              title="Share on Twitter"
            >
              <Twitter className="fill-current text-inherit" />
            </Button>
            <Button
              variant="outline-editorial"
              size="icon"
              onClick={shareOnFacebook}
              className="h-10 w-full cursor-pointer rounded-sm [&_svg]:size-5"
              title="Share on Facebook"
            >
              <Facebook className="fill-current text-inherit" />
            </Button>
            <CopyButton
              text="Text 1"
              className="relative h-10 w-full cursor-pointer rounded-sm [&_svg]:size-5"
              variant="outline-editorial"
              size="icon-sm"
              onClick={copyLink}
            />
          </div>
        </div>
      </div>

      {/* FEEDBACK */}
      <div className="border-border/50 flex flex-col gap-6 rounded-sm border p-5 shadow-xs">
        <div className="flex flex-col gap-2.5">
          <h3 className="text-text-primary text-lg font-semibold">Do you like this chapter?</h3>
          <p className="text-text-secondary-65 text-sm">Your feedback helps the author grow.</p>
        </div>

        {/* LIKE DISLIKE BUTTON */}
        <div className="grid grid-cols-12 gap-3">
          {/* Like */}
          <Button
            variant={voteStatus === 1 ? 'default' : 'outline-brand-editorial'}
            onClick={() => handleReaction('upvote')}
            className="col-span-6 h-10 rounded-sm"
          >
            <ThumbsUp className="size-4" />
            {voteStatus === 1 ? 'Liked' : 'Like'}
          </Button>

          {/* Dislike */}
          <Button
            variant={voteStatus === -1 ? 'default' : 'outline-brand-editorial'}
            onClick={() => handleReaction('downvote')}
            className="col-span-6 h-10 rounded-sm"
          >
            <ThumbsDown className="size-4" />
            {voteStatus === -1 ? 'Disliked' : 'Dislike'}
          </Button>

          {/* Save */}
          <Button
            variant={saved ? 'default' : 'outline-editorial'}
            onClick={handleSave}
            className={`col-span-12 h-10 flex-1 cursor-pointer rounded-sm text-sm font-semibold transition-all duration-300 ${
              saved
                ? 'bg-text-secondary hover:bg-text-secondary/90 dark:hover:bg-white/2/90 text-white shadow-sm dark:bg-white/2'
                : ''
            }`}
          >
            <Bookmark className="size-4" />
            {saved ? 'Saved' : 'Save Chapter'}
          </Button>
        </div>

        {/* ALL STATS */}
        <div className="border-border/50 flex items-center justify-between gap-1 rounded-sm border p-3 text-sm">
          <div className="text-text-primary flex items-center gap-1.5 font-semibold">
            <ThumbsUp
              className={`size-4 ${voteStatus === 1 ? 'text-brand-pink-500 fill-brand-pink-500' : 'text-text-secondary-65'}`}
            />
            <NumberFlow value={localUpvotes} />
          </div>
          <div className="text-text-primary flex items-center gap-1.5 font-semibold">
            <ThumbsDown
              className={`size-4 ${voteStatus === -1 ? 'text-text-secondary fill-text-secondary' : 'text-text-secondary-65'}`}
            />
            <NumberFlow value={localDownvotes} />
          </div>
          <div className="text-text-primary flex items-center gap-1.5 font-semibold">
            <span className="text-text-secondary-65 text-xs tracking-wide uppercase">Score</span>
            <NumberFlow value={localScore} />
          </div>
        </div>
      </div>

      {/* COMMUNITY GUIDELINES */}
      <div className="border-border/50 flex flex-col gap-6 rounded-sm border p-5 shadow-xs">
        <div className="flex flex-col gap-2.5">
          <h3 className="text-text-primary text-lg font-semibold">Community guidelines</h3>

          <ul className="text-text-secondary-65 list-disc pl-5 text-sm">
            <li className="mb-2">Be respectful of the author and other readers</li>
            <li className="mb-2">Keep the conversation constructive</li>
            <li className="mb-2">Do not post any offensive content</li>
            <li className="mb-2">Do not post any spam content</li>
            <li className="mb-2">Do not post any hate speech</li>
          </ul>

          <Button
            variant="outline-editorial"
            className="h-10 w-full cursor-pointer rounded-sm text-sm font-semibold"
          >
            Read full guidelines
          </Button>
        </div>
      </div>
    </div>
  );
}
