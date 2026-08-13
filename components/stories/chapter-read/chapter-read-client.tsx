'use client';

import { useEffect, useRef, useState } from 'react';

import { IChapterDetailExtended } from '@/type';
import { useQuery } from '@tanstack/react-query';
import { ArrowLeft } from 'lucide-react';
import { nanoid } from 'nanoid';

import { ChapterCommentsSection } from '@/components/chapter-read';
import { ChapterReader } from '@/components/common/chapter-reader';
import { DashboardSection } from '@/components/dashboard';
import toast from '@/components/shared/toast/toast';
import { Button } from '@/components/ui/button';
import { QueryKey } from '@/lib/query-keys';
import { cn } from '@/lib/utils';
import { chapterApi } from '@/services/chapters/chapters-api';
import {
  useRecordReadingSession,
  useStartReadingSession,
} from '@/services/chapters/chapters.mutation';

import { ChapterReaderOverlay } from './chapter-reader-overlay';
import { useChapterActions } from './hooks/use-chapter-actions';
import { useHideOnScroll } from './hooks/use-hide-on-scroll';
import { ChapterPagination } from './navigation/chapter-pagination';

interface ChapterReadClientProps {
  initialData: IChapterDetailExtended;
  storySlug: string;
  chapterSlug: string;
  chapterData: IChapterDetailExtended;
}

export default function ChapterReadClient({
  initialData,
  storySlug,
  chapterSlug,
}: ChapterReadClientProps) {
  const {
    isVisible: isOverlayVisible,
    handleContainerClick,
    handleContainerDoubleClick,
  } = useHideOnScroll();
  const fullscreenRef = useRef<HTMLDivElement>(null);

  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const handleToggleFullscreen = () => {
    if (!document.fullscreenElement) {
      const target =
        fullscreenRef.current ||
        document.getElementById('fullscreen-reader-container') ||
        document.documentElement;
      target.requestFullscreen().catch(() => {
        toast.error('Fullscreen mode not supported');
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

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

  const { handleBack, navigateToChapter } = useChapterActions(storySlug, chapterSlug);

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
      recordSession({
        storySlug,
        chapterSlug,
        sessionId,
        duration: 30,
      });

      // if (isVisible && hasInteraction) {
      //   recordSession({
      //     storySlug,
      //     chapterSlug,
      //     sessionId,
      //     duration: 30,
      //   });
      // }
    }, 30000);

    return () => {
      clearInterval(interval);
      events.forEach((event) => window.removeEventListener(event, updateInteraction));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chapterSlug, storySlug]);

  return (
    <DashboardSection
      className={cn(
        'bg-bg-cream col-span-full pb-24 lg:col-span-9 lg:pb-0',
        isFullscreen && 'col-span-full border-none bg-transparent p-0 shadow-none'
      )}
    >
      {!isFullscreen && (
        <Button
          variant="ghost"
          size="sm"
          className="border-border/50 hover:border-brand-pink-500/50 hover:bg-brand-pink-500/10! text-text-secondary-65 hover:text-brand-pink-500 mb-5 gap-2"
          onClick={handleBack}
        >
          <ArrowLeft size={14} />
          Back
        </Button>
      )}

      {/* FULLSCREEN TARGET CONTAINER */}
      <div
        id="fullscreen-reader-container"
        ref={fullscreenRef}
        onClick={handleContainerClick}
        onDoubleClick={handleContainerDoubleClick}
        className={cn(
          'selection:bg-brand-pink-100 bg-bg-cream w-full cursor-pointer transition-all',
          isFullscreen &&
            'bg-bg-cream fixed inset-0 z-9999 overflow-y-auto px-4 py-8 sm:px-12 sm:py-16'
        )}
      >
        <div className="mx-auto w-full max-w-3xl">
          <ChapterReader chapter={chapter} variant="full" isFullscreen={isFullscreen} />
        </div>

        {/* Floating controls inside full screen */}
        <ChapterReaderOverlay
          chapterData={chapter}
          storySlug={storySlug}
          isVisible={isOverlayVisible}
          onNavigate={navigateToChapter}
          onToggleFullscreen={handleToggleFullscreen}
        />
      </div>

      {!isFullscreen && (
        <>
          <ChapterPagination
            previousChapters={chapter.previousChapters}
            nextChapters={chapter.nextChapters}
            onNavigate={navigateToChapter}
          />

          <div id="comments-section" className="chapter-comments mt-12">
            <ChapterCommentsSection
              chapterSlug={chapterSlug}
              storySlug={storySlug}
              totalCount={chapter.stats.comments}
            />
          </div>
        </>
      )}

      {/* Mobile sticky bottom action bar — hidden on desktop */}
      {/* <ChapterMobileBar chapterData={chapterData} storySlug={storySlug} /> */}
    </DashboardSection>
  );
}
