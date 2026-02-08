'use client';

import { ThumbsUp, MessageSquare, GitBranch } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { ChapterData } from '@/components/common/chapter-reader';

interface ChapterActionBarProps {
  stats: ChapterData['stats'];
  userVote: 'up' | 'down' | null;
  onVote: (vote: 'up' | 'down') => void;
  onBranch: () => void;
}

export function ChapterActionBar({ stats, userVote, onVote, onBranch }: ChapterActionBarProps) {
  const likesCount = (stats?.likes || 0) + (userVote === 'up' ? 1 : 0);

  return (
    <div className="mt-12 flex items-center justify-center gap-4">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onVote('up')}
        className={cn(
          'h-9 gap-2 rounded-full px-4',
          userVote === 'up' && 'bg-brand-pink-500/10 text-brand-pink-500'
        )}
      >
        <ThumbsUp className={cn('h-4 w-4', userVote === 'up' && 'fill-current')} />
        <span>{likesCount}</span>
      </Button>

      <Button variant="ghost" size="sm" className="h-9 gap-2 rounded-full px-4">
        <MessageSquare className="h-4 w-4" />
        <span>{stats?.comments || 0}</span>
      </Button>

      <Button
        onClick={onBranch}
        className="bg-brand-pink-500 hover:bg-brand-pink-600 h-9 gap-2 rounded-full px-5 text-white"
      >
        <GitBranch className="h-4 w-4" />
        Write a Branch
      </Button>
    </div>
  );
}
