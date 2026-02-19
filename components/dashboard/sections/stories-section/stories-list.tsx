'use client';

import { useGetUserStories } from '@/services/stories/stories.query';
import { StoryCard } from '@/components/dashboard/sections/stories-section';
import { STALE_TIME } from '@/lib/query-client';

export function StoriesList() {
  const { data } = useGetUserStories({
    staleTime: STALE_TIME.LONG,
  });
  const stories = data?.data || [];

  return (
    <>
      {stories.map((story) => (
        <StoryCard key={story._id} story={story} />
      ))}
    </>
  );
}
