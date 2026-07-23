'use client';

import { BookOpen, Sparkles } from 'lucide-react';

import { ApiError } from '@/components/common';
import { StoryCardSkeleton } from '@/components/dashboard/sections/stories-section/story-card-skeleton';
import { STALE_TIME } from '@/lib/query-client';
import { useGetUserStories } from '@/services/stories/stories.query';

import StoryCard from './story-card';

export function StoriesList() {
  const { data, isLoading, isError, refetch } = useGetUserStories({
    staleTime: STALE_TIME.LONG,
  });

  const stories = data?.data || [];

  if (isLoading) {
    return (
      <>
        {Array.from({ length: 7 }).map((_, i) => (
          <StoryCardSkeleton key={i} />
        ))}
      </>
    );
  }

  if (isError) {
    return (
      <div className="col-span-full">
        <ApiError
          message="Failed to load your stories. Please check your connection and try again."
          onRetry={refetch}
        />
      </div>
    );
  }

  if (stories.length === 0) {
    return (
      <div className="border-border/50 bg-card/40 flex min-h-55 w-full flex-col items-center justify-center gap-3 rounded-xl border p-6 text-center shadow-xs backdrop-blur-sm sm:col-span-2 lg:col-span-3">
        <div className="border-brand-pink-500/20 bg-brand-pink-500/10 text-brand-pink-500 relative flex h-12 w-12 items-center justify-center rounded-2xl border shadow-xs">
          <BookOpen className="h-6 w-6" />
          <Sparkles className="text-brand-pink-400 absolute -top-1 -right-1 h-3.5 w-3.5 animate-pulse" />
        </div>
        <div className="space-y-1">
          <h3 className="text-text-primary text-base font-semibold">No stories created yet</h3>
          <p className="text-text-secondary-65 max-w-sm text-xs leading-relaxed">
            Your story library is empty. Use the{' '}
            <span className="text-brand-pink-500 font-semibold">
              &ldquo;Create from Blank&rdquo;
            </span>{' '}
            button to craft your first story!
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      {stories.map((story) => (
        <StoryCard key={story.slug} story={story} />
      ))}
    </>
  );
}
