'use client';

import { TooltipProvider } from '@/components/ui/tooltip';
import { DashboardContentLayout, DashboardGrid } from '@/components/dashboard';
import { StoryCard, CreateStoryButton } from '@/components/dashboard/sections/stories-section';
import { MOCK_STORIES } from '@/constants/mock-data';

export default function StoriesPage() {
  return (
    <TooltipProvider>
      <DashboardContentLayout maxWidth="7xl" paddingSize="none">
        <DashboardGrid minItemWidth={250} gap="md">
          {/* CREATE STORY BUTTON */}
          <CreateStoryButton />

          {/* STORY CARDS */}
          {MOCK_STORIES.map((story) => (
            <StoryCard key={story.id} story={story} />
          ))}
        </DashboardGrid>
      </DashboardContentLayout>
    </TooltipProvider>
  );
}
