'use client';

import { useGetUserStories } from '@/services/stories/stories.query';
import { StoryCard } from '@/components/dashboard/sections/stories-section';
import { StoryCardSkeleton } from '@/components/dashboard/sections/stories-section/story-card-skeleton';
import { ApiError } from '@/components/common';
import { STALE_TIME } from '@/lib/query-client';

export function StoriesList() {
  const { data, isLoading, isError, refetch } = useGetUserStories({
    staleTime: STALE_TIME.LONG,
  });
  const stories = data?.data || [];

  if (isLoading) {
    return (
      <>
        {Array.from({ length: 6 }).map((_, i) => (
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

  return (
    <>
      {stories.map((story) => (
        <StoryCard key={story._id} story={story} />
      ))}
    </>
  );
}
