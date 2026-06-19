'use client';

import { useEffect } from 'react';

import { IChapterDetailExtended } from '@/type';
import { useQuery } from '@tanstack/react-query';
import { ArrowLeft } from 'lucide-react';
import { nanoid } from 'nanoid';

import { ChapterCommentsSection } from '@/components/chapter-read';
import { ChapterReader } from '@/components/common/chapter-reader';
import { DashboardSection } from '@/components/dashboard';
import { Button } from '@/components/ui/button';
import { QueryKey } from '@/lib/query-keys';
import { chapterApi } from '@/services/chapters/chapters-api';
import {
  useRecordReadingSession,
  useStartReadingSession,
} from '@/services/chapters/chapters.mutation';

import { useChapterActions } from './hooks/use-chapter-actions';
import { ChapterPagination } from './navigation/chapter-pagination';

interface ChapterReadClientProps {
  initialData: IChapterDetailExtended;
  storySlug: string;
  chapterSlug: string;
}

export default function ChapterReadClient({
  initialData,
  storySlug,
  chapterSlug,
}: ChapterReadClientProps) {
  const { data: chapter } = useQuery({
    queryKey: QueryKey.chapter.bySlug(chapterSlug),
    queryFn: async () => {
      const res = await chapterApi.getCachedChapterBySlug(chapterSlug);
      return res.data;
    },
    initialData,
  });

  const { mutate: startSession } = useStartReadingSession();
  const { mutate: recordSession } = useRecordReadingSession();

  const {
    // isBookmarked,
    // handleShare,
    // handleBookmark,
    // handleEdit,
    // handleCreatePR,
    handleBack,
    navigateToChapter,
  } = useChapterActions(storySlug, chapterSlug);

  useEffect(() => {
    const sessionId = nanoid();

    // Start session
    startSession({
      storySlug,
      chapterSlug,
      sessionId,
    });

    let lastInteractionTime = Date.now();
    const updateInteraction = () => {
      lastInteractionTime = Date.now();
    };

    const events = ['mousemove', 'keydown', 'scroll', 'click'];
    events.forEach((event) => window.addEventListener(event, updateInteraction));

    const interval = setInterval(() => {
      const isVisible = document.visibilityState === 'visible';
      const hasInteraction = Date.now() - lastInteractionTime < 35000;

      if (isVisible && hasInteraction) {
        recordSession({
          storySlug,
          chapterSlug,
          sessionId,
          duration: 30,
        });
      }
    }, 30000);

    return () => {
      clearInterval(interval);
      events.forEach((event) => window.removeEventListener(event, updateInteraction));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chapterSlug, storySlug]);

  return (
    <DashboardSection className="bg-bg-cream col-span-9 min-h-screen">
      <Button
        variant="ghost"
        size="sm"
        className="border-border/50 hover:border-brand-pink-500/50 hover:bg-brand-pink-500/10! text-text-secondary-65 hover:text-brand-pink-500 mb-5 gap-2"
        onClick={handleBack}
      >
        <ArrowLeft size={14} />
        Back
      </Button>
      <ChapterReader chapter={chapter} variant="full" />

      <ChapterPagination
        previousChapters={chapter.previousChapters}
        nextChapters={chapter.nextChapters}
        onNavigate={navigateToChapter}
      />

      <div className="mt-12">
        <ChapterCommentsSection chapterSlug={chapterSlug} totalCount={chapter.stats.comments} />
      </div>
    </DashboardSection>
  );
}
