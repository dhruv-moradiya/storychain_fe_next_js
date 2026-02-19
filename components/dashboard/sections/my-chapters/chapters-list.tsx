'use client';

import { useGetUserChapters } from '@/services/chapters/chapters.query';
import { MyChapterCard } from './my-chapter-card';
import { ChapterCardSkeleton } from './chapter-card-skeleton';
import { STALE_TIME } from '@/lib/query-client';

export function ChaptersList() {
  const { data, isLoading } = useGetUserChapters({
    staleTime: STALE_TIME.LONG,
  });
  console.log('data', data);

  const chapters = data?.data || [];

  if (isLoading) {
    return (
      <>
        {Array.from({ length: 6 }).map((_, i) => (
          <ChapterCardSkeleton key={i} />
        ))}
      </>
    );
  }

  if (!chapters.length) {
    return (
      <div className="col-span-full flex flex-col items-center justify-center py-20 text-center">
        <div className="text-muted-foreground mb-4 text-6xl">📝</div>
        <h3 className="mb-2 text-lg font-semibold">No chapters yet</h3>
        <p className="text-muted-foreground text-sm">Start writing by contributing to a story!</p>
      </div>
    );
  }

  return (
    <>
      {chapters.map((chapter) => (
        <MyChapterCard key={chapter.id} chapter={chapter} />
      ))}
    </>
  );
}
