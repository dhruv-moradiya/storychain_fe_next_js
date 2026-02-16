import { DashboardContentLayout, DashboardGrid } from '@/components/dashboard';
import { CreateStoryButton, StoriesList } from '@/components/dashboard/sections/stories-section';
import { TooltipProvider } from '@/components/ui/tooltip';
import { getUserStoriesQueryFn, storyKeys } from '@/services/stories/stories.query';
import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'My Stories | Support',
  description: 'Manage and create your stories on the support platform.',
};

export default async function StoriesPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: storyKeys.my(),
    queryFn: getUserStoriesQueryFn,
  });

  return (
    <TooltipProvider>
      <DashboardContentLayout maxWidth="7xl" paddingSize="sm">
        <DashboardGrid minItemWidth={250} gap="md">
          {/* CREATE STORY BUTTON */}
          <CreateStoryButton />

          {/* STORY CARDS */}
          <HydrationBoundary state={dehydrate(queryClient)}>
            <StoriesList />
          </HydrationBoundary>
        </DashboardGrid>
      </DashboardContentLayout>
    </TooltipProvider>
  );
}
