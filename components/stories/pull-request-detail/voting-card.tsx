'use client';

import { useState } from 'react';

import type { IPullRequest } from '@/type';
import NumberFlow from '@number-flow/react';
import { ThumbsDown, ThumbsUp } from 'lucide-react';

import { Button } from '@/components/ui/button';

type VoteDirection = 1 | -1 | null;

interface VotingCardProps {
  votes: IPullRequest['votes'];
}

export default function VotingCard({ votes }: VotingCardProps) {
  const [userVote, setUserVote] = useState<VoteDirection>(null);

  const handleVote = (vote: 1 | -1) => {
    setUserVote(vote === userVote ? null : vote);
  };

  const currentUpvotes = (votes?.upvotes ?? 0) + (userVote === 1 ? 1 : 0);
  const currentDownvotes = (votes?.downvotes ?? 0) + (userVote === -1 ? 1 : 0);
  const netScore = currentUpvotes - currentDownvotes;

  return (
    <div className="bg-card border-border/50 flex flex-col gap-5 rounded-sm border p-5 shadow-xs">
      <div className="flex flex-col gap-1">
        <h3 className="text-text-primary text-base font-semibold">Community Sentiment</h3>
        <p className="text-text-secondary-65 text-xs">Vote on this chapter proposal.</p>
      </div>

      <div className="grid grid-cols-12 gap-3">
        <Button
          variant={userVote === 1 ? 'default' : 'outline-brand-editorial'}
          onClick={() => handleVote(1)}
          className="col-span-6 h-10 cursor-pointer rounded-sm font-semibold"
        >
          <ThumbsUp className="size-4" />
          {userVote === 1 ? 'Liked' : 'Like'}
        </Button>

        <Button
          variant={userVote === -1 ? 'default' : 'outline-brand-editorial'}
          onClick={() => handleVote(-1)}
          className="col-span-6 h-10 cursor-pointer rounded-sm font-semibold"
        >
          <ThumbsDown className="size-4" />
          {userVote === -1 ? 'Disliked' : 'Dislike'}
        </Button>
      </div>

      <div className="border-border/50 flex items-center justify-between gap-1 rounded-sm border p-3 text-sm">
        <div className="text-text-primary flex items-center gap-1.5 font-semibold">
          <ThumbsUp
            className={`size-4 ${userVote === 1 ? 'text-brand-pink-500 fill-brand-pink-500' : 'text-text-secondary-65'}`}
          />
          <NumberFlow value={currentUpvotes} />
        </div>
        <div className="text-text-primary flex items-center gap-1.5 font-semibold">
          <ThumbsDown
            className={`size-4 ${userVote === -1 ? 'text-text-secondary fill-text-secondary' : 'text-text-secondary-65'}`}
          />
          <NumberFlow value={currentDownvotes} />
        </div>
        <div className="text-text-primary flex items-center gap-1.5 font-semibold">
          <span className="text-text-secondary-65 text-xs tracking-wide uppercase">Score</span>
          <NumberFlow value={netScore} />
        </div>
      </div>
    </div>
  );
}
