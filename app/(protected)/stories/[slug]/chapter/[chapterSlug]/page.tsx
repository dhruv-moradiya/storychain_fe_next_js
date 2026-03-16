import type { Metadata } from 'next';

import { buildChapterMeta } from '@/components/common';
import { ChapterReadClient } from '@/components/stories/chapter-read';
import { MOCK_COMMENTS } from '@/lib/data/mock-chapter-detail';
import { chapterApi } from '@/services/chapters/chapters-api';

interface IChapterPageProps {
  params: Promise<{ slug: string; chapterSlug: string }>;
}

export async function generateMetadata({ params }: IChapterPageProps): Promise<Metadata> {
  const { slug, chapterSlug } = await params;

  try {
    const response = await chapterApi.getCachedChapterBySlug(chapterSlug);
    const chapter = response.data;

    return buildChapterMeta({
      storySlug: slug,
      chapterTitle: chapter.title,
      chapterSlug,
      description: chapter.content,
      author: {
        clerkId: chapter.authorId,
        username: chapter.author.username,
        avatarUrl: chapter.author.avatarUrl,
        displayName: chapter.author.displayName,
      },
    });
  } catch (_error) {
    return buildChapterMeta({
      storySlug: slug,
      chapterTitle: chapterSlug,
      chapterSlug,
    });
  }
}

export default async function ChapterPage({ params }: IChapterPageProps) {
  const { slug: storySlug, chapterSlug } = await params;

  const chapterDetail = await chapterApi.getCachedChapterBySlug(chapterSlug);

  const comments = MOCK_COMMENTS;

  return (
    <ChapterReadClient
      initialData={chapterDetail.data}
      storySlug={storySlug}
      chapterSlug={chapterSlug}
      comments={comments}
    />
  );
}
