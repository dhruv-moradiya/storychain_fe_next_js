'use client';

import { useRouter } from 'next/navigation';
import { useMemo, useRef, useState } from 'react';

import { motion, useInView } from 'framer-motion';
import {
  ArrowRight,
  Coins,
  Eye,
  Lock,
  ThumbsUp,
  TrendingDown,
  TrendingUp,
  Unlock,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

import type { TopChapter } from '../analytics.types';

interface TopChaptersProps {
  chapters: TopChapter[];
  slug: string;
}

type SortBy = 'reads' | 'unlocks' | 'upvotes';

export function TopChapters({ chapters, slug }: TopChaptersProps) {
  const [sortBy, setSortBy] = useState<SortBy>('reads');
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });
  const router = useRouter();

  const sortedChapters = useMemo(() => {
    return [...chapters].sort((a, b) => {
      if (sortBy === 'unlocks') return (b.unlocks || 0) - (a.unlocks || 0);
      if (sortBy === 'upvotes') return (b.upvotes || 0) - (a.upvotes || 0);
      return b.reads - a.reads;
    });
  }, [chapters, sortBy]);

  return (
    <motion.div
      ref={sectionRef}
      initial={{ opacity: 0, y: 10 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className="border-border/50 bg-cream-95 rounded-xl border p-4"
    >
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-text-primary flex items-center gap-2 text-sm font-semibold tracking-wide uppercase">
            <div className="bg-brand-blue h-1 w-1 rounded-full" />
            Popular Chapters & Unlocks
          </h3>
          <p className="text-text-secondary-65 text-xs">
            Most popular chapters by reads, user unlocks, and upvotes
          </p>
        </div>

        <div className="border-border/50 bg-cream-90/80 flex items-center rounded-lg border p-0.5 text-xs">
          <button
            onClick={() => setSortBy('reads')}
            className={cn(
              'rounded-md px-2 py-0.5 text-[11px] font-medium transition-all',
              sortBy === 'reads'
                ? 'bg-cream-95 text-brand-pink-500 font-semibold shadow-sm'
                : 'text-text-secondary-65 hover:text-text-primary'
            )}
          >
            Reads
          </button>
          <button
            onClick={() => setSortBy('unlocks')}
            className={cn(
              'rounded-md px-2 py-0.5 text-[11px] font-medium transition-all',
              sortBy === 'unlocks'
                ? 'bg-cream-95 font-semibold text-amber-600 shadow-sm'
                : 'text-text-secondary-65 hover:text-text-primary'
            )}
          >
            Unlocks
          </button>
          <button
            onClick={() => setSortBy('upvotes')}
            className={cn(
              'rounded-md px-2 py-0.5 text-[11px] font-medium transition-all',
              sortBy === 'upvotes'
                ? 'bg-cream-95 text-brand-blue font-semibold shadow-sm'
                : 'text-text-secondary-65 hover:text-text-primary'
            )}
          >
            Upvotes
          </button>
        </div>
      </div>

      <div className="space-y-2">
        {sortedChapters.map((chapter, index) => {
          const isPositive = chapter.change >= 0;

          return (
            <motion.div
              key={chapter.id}
              initial={{ opacity: 0, x: -10 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
              transition={{ duration: 0.3, delay: 0.05 + index * 0.04 }}
              className="group border-border/50 bg-cream-90/50 hover:border-brand-pink-500/30 hover:bg-cream-90 flex items-center gap-3 rounded-lg border p-2.5 transition-all"
            >
              {/* Rank */}
              <div className="bg-cream-95 text-text-primary flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold shadow-xs">
                #{index + 1}
              </div>

              {/* Chapter Info */}
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  <p className="text-text-primary truncate text-xs font-semibold">
                    Ch. {chapter.chapterNumber}: {chapter.title}
                  </p>
                  {chapter.isLocked ? (
                    <span className="py-0.2 flex shrink-0 items-center gap-0.5 rounded bg-amber-500/10 px-1.5 text-[10px] font-bold text-amber-600">
                      <Lock className="h-2.5 w-2.5" />
                      Locked
                    </span>
                  ) : (
                    <span className="py-0.2 flex shrink-0 items-center gap-0.5 rounded bg-green-500/10 px-1.5 text-[10px] font-bold text-green-600">
                      <Unlock className="h-2.5 w-2.5" />
                      Free
                    </span>
                  )}
                </div>

                <div className="text-text-secondary-65 mt-1 flex flex-wrap items-center gap-3 text-[11px]">
                  <span className="flex items-center gap-1">
                    <Eye className="text-brand-pink-500 h-3 w-3" />
                    {chapter.reads.toLocaleString()} reads
                  </span>

                  {chapter.unlocks > 0 && (
                    <span className="flex items-center gap-1 font-medium text-amber-600">
                      <Coins className="h-3 w-3" />
                      {chapter.unlocks} unlocks
                    </span>
                  )}

                  {chapter.upvotes > 0 && (
                    <span className="text-brand-blue flex items-center gap-1 font-medium">
                      <ThumbsUp className="h-3 w-3" />
                      {chapter.upvotes} upvotes
                    </span>
                  )}

                  <span
                    className={cn(
                      'ml-auto flex items-center gap-0.5 text-[10px] font-medium',
                      isPositive ? 'text-green-600' : 'text-red-500'
                    )}
                  >
                    {isPositive ? (
                      <TrendingUp className="h-3 w-3" />
                    ) : (
                      <TrendingDown className="h-3 w-3" />
                    )}
                    {isPositive ? '+' : ''}
                    {chapter.change}%
                  </span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <Button
        variant="ghost"
        className="text-brand-pink-500 hover:bg-brand-pink-500/10 hover:text-brand-pink-600 mt-3 h-8 w-full justify-center gap-2 text-xs font-medium"
        onClick={() => router.push(`/stories/${slug}/chapters`)}
      >
        View All Story Chapters
        <ArrowRight className="h-3.5 w-3.5" />
      </Button>
    </motion.div>
  );
}
