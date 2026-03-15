'use client';

import { IChapterDetailExtended } from '@/type';
import { type IComment } from '@/type/chapter/chapter-detail.type';

import { ChapterCommentsSection } from '@/components/chapter-read';
import { type ChapterData, ChapterReader } from '@/components/common/chapter-reader';

import { ChapterActionBar } from './actions/chapter-action-bar';
import { ChapterHeader } from './header/chapter-header';
import { useChapterActions } from './hooks/use-chapter-actions';
import { ChapterPagination } from './navigation/chapter-pagination';

interface ChapterReadClientProps {
  chapter: IChapterDetailExtended;
  storySlug: string;
  chapterSlug: string;
  comments: IComment[];
}

export default function ChapterReadClient({
  chapter,
  storySlug,
  chapterSlug,
  comments,
}: ChapterReadClientProps) {
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
  } = useChapterActions(storySlug, chapterSlug);

  // Map IChapterDetailExtended to ChapterData
  const chapterObj: ChapterData = {
    id: chapter._id,
    title: chapter.title,
    content: chapter.content,
    author: {
      id: chapter.authorId,
      name: chapter.author.displayName || chapter.author.username,
      username: chapter.author.username,
      avatar: chapter.author.avatarUrl,
    },
    storyTitle: chapter.storyTitle,
    chapterNumber: chapter.chapterNumber,
    createdAt: chapter.createdAt,
    updatedAt: chapter.updatedAt,
    stats: {
      views: chapter.stats.reads,
      likes: chapter.votes.upvotes,
      comments: chapter.stats.comments,
    },
  };

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

      <main className="mx-auto max-w-2xl px-6 py-12 sm:px-8 lg:py-16">
        <ChapterReader chapter={chapter} variant="full" />

        <ChapterActionBar
          stats={chapterObj.stats}
          userVote={userVote}
          onVote={handleVote}
          onBranch={handleBranch}
        />

        <ChapterPagination
          previousChapters={chapter.previousChapters}
          nextChapters={chapter.nextChapters}
          onNavigate={navigateToChapter}
        />

        <div className="mt-12 px-2 sm:px-4">
          <ChapterCommentsSection
            comments={comments}
            chapterSlug={chapterSlug}
            totalCount={chapterObj.stats?.comments}
          />
        </div>
      </main>
    </div>
  );
}
