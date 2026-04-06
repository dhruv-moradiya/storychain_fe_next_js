import { Metadata } from 'next';

import { ContentLayout, DashboardGrid } from '@/components/dashboard';
import CreateStoryButton from '@/components/dashboard/sections/stories-section/create-story-button';
import { StoriesList } from '@/components/dashboard/sections/stories-section/stories-list';
import { TooltipProvider } from '@/components/ui/tooltip';

export const metadata: Metadata = {
  title: 'My Stories | Support',
  description: 'Manage and create your stories on the support platform.',
};

export default function StoriesPage() {
  return (
    <TooltipProvider>
      <ContentLayout maxWidth="7xl" paddingSize="sm">
        <DashboardGrid minItemWidth={250} gap="md">
          <CreateStoryButton />
          <StoriesList />
        </DashboardGrid>
      </ContentLayout>
    </TooltipProvider>
  );
}
