import { ContentLayout, DashboardGrid } from '@/components/dashboard';
import { ChaptersList } from '@/components/dashboard/sections/my-chapters';
import { TooltipProvider } from '@/components/ui/tooltip';

export default function ChaptersPage() {
  return (
    <TooltipProvider>
      <ContentLayout maxWidth="7xl" paddingSize="none">
        <DashboardGrid minItemWidth={250} gap="md">
          <ChaptersList />
        </DashboardGrid>
      </ContentLayout>
    </TooltipProvider>
  );
}
