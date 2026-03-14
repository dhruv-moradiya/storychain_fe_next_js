import { DashboardContentLayout, DashboardGrid } from '@/components/dashboard';
import { CreateStoryButton, StoriesList } from '@/components/dashboard/sections/stories-section';
import { TooltipProvider } from '@/components/ui/tooltip';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'My Stories | Support',
  description: 'Manage and create your stories on the support platform.',
};

export default function StoriesPage() {
  return (
    <TooltipProvider>
      <DashboardContentLayout maxWidth="7xl" paddingSize="sm">
        <DashboardGrid minItemWidth={250} gap="md">
          {/* CREATE STORY BUTTON */}
          <CreateStoryButton />

          {/* STORY CARDS */}
          <StoriesList />
        </DashboardGrid>
      </DashboardContentLayout>
    </TooltipProvider>
  );
}
