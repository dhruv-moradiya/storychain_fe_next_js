'use client';

import { useState } from 'react';

import { IChapterDetail } from '@/type/chapter/chapter-detail.type';
import { ThumbsDown, ThumbsUp } from 'lucide-react';
import posthog from 'posthog-js';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ChapterVotePanelProps {
  chapter: IChapterDetail;
}

export function ChapterVotePanel({ chapter }: ChapterVotePanelProps) {
  const [userVote, setUserVote] = useState<'up' | 'down' | null>(null);
  const [votes, setVotes] = useState({
    upvotes: chapter.votes.upvotes,
    downvotes: chapter.votes.downvotes,
  });

  function handleUpvote() {
    if (userVote === 'up') {
      setUserVote(null);
      setVotes((v) => ({ ...v, upvotes: v.upvotes - 1 }));
    } else {
      setVotes((v) => ({
        upvotes: v.upvotes + 1,
        downvotes: userVote === 'down' ? v.downvotes - 1 : v.downvotes,
      }));
      setUserVote('up');
      posthog.capture('chapter_upvoted');
    }
  }

  function handleDownvote() {
    if (userVote === 'down') {
      setUserVote(null);
      setVotes((v) => ({ ...v, downvotes: v.downvotes - 1 }));
    } else {
      setVotes((v) => ({
        downvotes: v.downvotes + 1,
        upvotes: userVote === 'up' ? v.upvotes - 1 : v.upvotes,
      }));
      setUserVote('down');
      posthog.capture('chapter_downvoted');
    }
  }

  const score = votes.upvotes - votes.downvotes;
  const scoreColor =
    score > 0 ? 'text-emerald-600' : score < 0 ? 'text-red-500' : 'text-muted-foreground';

  return (
    <div className="bg-card/40 border-border/40 flex items-center gap-1 rounded-full border p-1.5 shadow-xs backdrop-blur-sm">
      <Button
        variant="ghost"
        size="sm"
        onClick={handleUpvote}
        className={cn(
          'h-10 gap-2 rounded-full px-4 text-xs font-bold transition-all duration-200',
          userVote === 'up'
            ? 'bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20'
            : 'text-muted-foreground/60 hover:bg-emerald-500/5 hover:text-emerald-600'
        )}
      >
        <ThumbsUp
          size={14}
          className={cn(
            'transition-transform duration-200',
            userVote === 'up' && 'fill-emerald-600'
          )}
        />
        <span>{votes.upvotes}</span>
      </Button>

      <div className="bg-border/40 mx-1 h-4 w-px" />

      <span
        className={cn(
          'font-ibm-plex-mono min-w-[32px] text-center text-[13px] font-bold',
          scoreColor
        )}
      >
        {score > 0 ? `+${score}` : score}
      </span>

      <div className="bg-border/40 mx-1 h-4 w-px" />

      <Button
        variant="ghost"
        size="sm"
        onClick={handleDownvote}
        className={cn(
          'h-10 gap-2 rounded-full px-4 text-xs font-bold transition-all duration-200',
          userVote === 'down'
            ? 'bg-red-500/10 text-red-600 hover:bg-red-500/20'
            : 'text-muted-foreground/60 hover:bg-red-500/5 hover:text-red-600'
        )}
      >
        <ThumbsDown
          size={14}
          className={cn('transition-transform duration-200', userVote === 'down' && 'fill-red-600')}
        />
        <span>{votes.downvotes}</span>
      </Button>
    </div>
  );
}

export default ChapterVotePanel;
