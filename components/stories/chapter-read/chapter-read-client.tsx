'use client';

import { ChapterReader, type ChapterData } from '@/components/common/chapter-reader';
import { ChapterHeader } from './header/chapter-header';
import { ChapterActionBar } from './actions/chapter-action-bar';
import { ChapterPagination } from './navigation/chapter-pagination';
import { useChapterActions } from './hooks/use-chapter-actions';

interface ChapterReadClientProps {
  chapter: ChapterData;
  slug: string;
  chapterSlug: string;
}

export default function ChapterReadClient({ chapter, slug, chapterSlug }: ChapterReadClientProps) {
  const {
    isBookmarked,
    userVote,
    handleShare,
    handleBookmark,
    handleVote,
    handleBranch,
    handleEdit,
    handleCreatePR,
    handleBack,
    navigateToChapter,
  } = useChapterActions(slug, chapterSlug);

  // Mock next chapter for UI demonstration - in a real app, this might come from the server or another hook
  const nextChapter = {
    id: 'next-ch',
    title: 'Chapter 6: Into the Deep',
  };

  return (
    <div className="bg-bg-cream min-h-screen">
      <ChapterHeader
        chapter={chapter}
        isBookmarked={isBookmarked}
        onBack={handleBack}
        onShare={handleShare}
        onBookmark={handleBookmark}
        onEdit={handleEdit}
        onCreatePR={handleCreatePR}
      />

      <main className="mx-auto max-w-2xl px-6 py-12 sm:px-8 lg:py-16">
        <ChapterReader chapter={chapter} variant="full" />

        <ChapterActionBar
          stats={chapter.stats}
          userVote={userVote}
          onVote={handleVote}
          onBranch={handleBranch}
        />

        <ChapterPagination
          parentChapter={chapter.parentChapter}
          nextChapter={nextChapter}
          onNavigate={navigateToChapter}
        />
      </main>
    </div>
  );
}
