'use client';

import { useGetUserStories } from '@/services/stories/stories.query';
import { StoryCard } from '@/components/dashboard/sections/stories-section';

export function StoriesList() {
  const { data } = useGetUserStories();
  const stories = data?.data || [];

  return (
    <>
      {stories.map((story) => (
        <StoryCard key={story._id} story={story} />
      ))}
    </>
  );
}
