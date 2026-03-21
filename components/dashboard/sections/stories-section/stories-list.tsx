'use client';

import { ApiError } from '@/components/common';
import { StoryCard } from '@/components/dashboard/sections/stories-section';
import { StoryCardSkeleton } from '@/components/dashboard/sections/stories-section/story-card-skeleton';
import { STALE_TIME } from '@/lib/query-client';
import { useGetUserStories } from '@/services/stories/stories.query';

export function StoriesList() {
  const { data, isLoading, isError, refetch } = useGetUserStories({
    staleTime: STALE_TIME.LONG,
  });
  const stories = data?.data || [];
  console.log('stories', stories);

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
            className="border-border/20 bg-card/30 flex min-h-[220px] w-full items-center justify-center rounded-xl border shadow-sm transition-colors"
          >
            {/* Display text in the middle-ish card (index 3 is the 5th grid cell overall) */}
            {/* {i === 3 && (
              <span className="text-sm font-medium text-text-secondary-65">
                No stories found
              </span>
            )} */}
          </div>
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
