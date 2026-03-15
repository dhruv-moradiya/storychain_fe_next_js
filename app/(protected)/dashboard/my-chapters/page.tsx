import { DashboardContentLayout, DashboardGrid } from '@/components/dashboard';
import { ChaptersList } from '@/components/dashboard/sections/my-chapters';
import { TooltipProvider } from '@/components/ui/tooltip';

export default function MyChaptersPage() {
  return (
    <TooltipProvider>
      <DashboardContentLayout maxWidth="7xl" paddingSize="none">
        <DashboardGrid minItemWidth={250} gap="md">
          <ChaptersList />
        </DashboardGrid>
      </DashboardContentLayout>
    </TooltipProvider>
  );
}
