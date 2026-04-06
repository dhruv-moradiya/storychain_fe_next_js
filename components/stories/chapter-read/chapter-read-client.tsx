'use client';

import { useEffect } from 'react';

import { IChapterDetailExtended } from '@/type';
import { type IComment } from '@/type/chapter/chapter-detail.type';
import { useQuery } from '@tanstack/react-query';
import { nanoid } from 'nanoid';

import { ChapterCommentsSection } from '@/components/chapter-read';
import { ChapterReader } from '@/components/common/chapter-reader';
import { QueryKey } from '@/lib/query-keys';
import { chapterApi } from '@/services/chapters/chapters-api';
import {
  useRecordReadingSession,
  useStartReadingSession,
} from '@/services/chapters/chapters.mutation';

import { ChapterHeader } from './header/chapter-header';
import { useChapterActions } from './hooks/use-chapter-actions';
import { ChapterPagination } from './navigation/chapter-pagination';

interface ChapterReadClientProps {
  initialData: IChapterDetailExtended;
  storySlug: string;
  chapterSlug: string;
  comments: IComment[];
}

export default function ChapterReadClient({
  initialData,
  storySlug,
  chapterSlug,
  comments,
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
    isBookmarked,
    handleShare,
    handleBookmark,
    handleEdit,
    handleCreatePR,
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
    <div className="bg-bg-cream min-h-screen">
      <ChapterHeader
        isBookmarked={isBookmarked}
        onBack={handleBack}
        onShare={handleShare}
        onBookmark={handleBookmark}
        onEdit={handleEdit}
        onCreatePR={handleCreatePR}
      />

      <main className="mx-auto max-w-4xl px-5 py-10 sm:px-8 md:px-10 lg:px-12 lg:py-16">
        <ChapterReader chapter={chapter} variant="full" />

        {/* <ChapterActionBar
          stats={chapter.stats}
          userVote={userVote}
          onVote={handleVote}
          onBranch={handleBranch}
        /> */}

        <ChapterPagination
          previousChapters={chapter.previousChapters}
          nextChapters={chapter.nextChapters}
          onNavigate={navigateToChapter}
        />

        <div className="mt-12 px-2 sm:px-4">
          <ChapterCommentsSection
            comments={comments}
            chapterSlug={chapterSlug}
            totalCount={chapter.stats.comments}
          />
        </div>
      </main>
    </div>
  );
}
