import { DashboardContentLayout, DashboardGrid } from '@/components/dashboard';
import { CreateStoryButton } from '@/components/dashboard/sections/stories-section';
import { StoryCardSkeleton } from '@/components/dashboard/sections/stories-section/story-card-skeleton';

export default function StoriesLoading() {
  return (
    <DashboardContentLayout maxWidth="7xl" paddingSize="sm">
      <DashboardGrid minItemWidth={250} gap="md">
        {/* CREATE STORY BUTTON */}
        <CreateStoryButton />

        {/* LOADING SKELETONS */}
        {Array.from({ length: 8 }).map((_, i) => (
          <StoryCardSkeleton key={i} />
        ))}
      </DashboardGrid>
    </DashboardContentLayout>
  );
}
