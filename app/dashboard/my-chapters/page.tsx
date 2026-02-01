'use client';

import { DashboardContentLayout, DashboardGrid } from '@/components/dashboard';
import { MyChapterCard } from '@/components/dashboard/sections/my-chapters';
import { MOCK_CHAPTERS } from '@/constants/mock-data';

export default function MyChaptersPage() {
  if (MOCK_CHAPTERS.length === 0) {
    return (
      <DashboardContentLayout maxWidth="5xl" paddingSize="none">
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="text-muted-foreground mb-4 text-6xl">📝</div>
          <h3 className="mb-2 text-lg font-semibold">No chapters yet</h3>
          <p className="text-muted-foreground text-sm">Start writing by contributing to a story!</p>
        </div>
      </DashboardContentLayout>
    );
  }

  return (
    <DashboardContentLayout maxWidth="7xl" paddingSize="none">
      <DashboardGrid minItemWidth={250} gap="md">
        {MOCK_CHAPTERS.map((chapter) => (
          <MyChapterCard key={chapter.id} chapter={chapter} />
        ))}
      </DashboardGrid>
    </DashboardContentLayout>
  );
}
