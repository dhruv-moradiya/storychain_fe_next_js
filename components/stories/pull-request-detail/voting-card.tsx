'use client';

import { useState } from 'react';

import type { IPullRequest } from '@/type';
import NumberFlow from '@number-flow/react';
import { ThumbsDown, ThumbsUp } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type VoteDirection = 1 | -1 | null;

interface VotingCardProps {
  votes: IPullRequest['votes'];
}

export default function VotingCard({ votes }: VotingCardProps) {
  const [userVote, setUserVote] = useState<VoteDirection>(null);

  const handleVote = (vote: 1 | -1) => {
    setUserVote(vote === userVote ? null : vote);
  };

  return (
    <div className="bg-card border-border/50 group hover:border-primary/30 overflow-hidden rounded-xl border p-4 transition-all hover:shadow-md">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-foreground font-libre-baskerville text-sm font-semibold">
          Community Sentiment
        </h3>
      </div>
      <div className="flex items-center gap-3">
        <Button variant={userVote === 1 ? 'default' : 'outline'} onClick={() => handleVote(1)}>
          <ThumbsUp className="h-5 w-5" />
          <NumberFlow value={votes.upvotes} />
        </Button>
        <Button
          size="lg"
          variant={userVote === -1 ? 'destructive' : 'outline'}
          onClick={() => handleVote(-1)}
        >
          <ThumbsDown className="h-5 w-5" />
          <NumberFlow value={votes.downvotes} />
        </Button>
      </div>

      <div className="border-border/40 mt-4 flex items-baseline justify-between border-t pt-3">
        <span className="text-muted-foreground text-xs font-medium">Net Reputation</span>
        <span
          className={cn(
            'font-libre-baskerville leading-none font-bold',
            votes.score > 0
              ? 'text-emerald-500'
              : votes.score < 0
                ? 'text-destructive'
                : 'text-foreground'
          )}
        >
          {votes.score > 0 ? '+' : ''}
          <NumberFlow value={votes.score} />
        </span>
      </div>
    </div>
  );
}
