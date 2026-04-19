'use client';

import { ApiError } from '@/components/common';
import { StoryCardSkeleton } from '@/components/dashboard/sections/stories-section/story-card-skeleton';
import { STALE_TIME } from '@/lib/query-client';
import { useGetUserStories } from '@/services/stories/stories.query';

import StoryCard from './story-card';

export function StoriesList() {
  console.log('Stories list component render.');
  const { data, isLoading, isError, refetch, error } = useGetUserStories({
    staleTime: STALE_TIME.LONG,
  });
  console.log('data', error);
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
      <>
        {Array.from({ length: 7 }).map((_, i) => (
          <div
            key={i}
            className="border-border/20 bg-card/30 flex min-h-55 w-full items-center justify-center rounded-xl border shadow-sm transition-colors"
          ></div>
        ))}
      </>
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
