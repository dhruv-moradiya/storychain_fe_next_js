import { ChapterReadClient } from '@/components/stories/chapter-read';
import { MOCK_CHAPTER } from '@/components/stories/chapter-read/mock-data';
import { MOCK_COMMENTS } from '@/lib/data/mock-chapter-detail';
import { buildChapterMeta } from '@/components/common';
import type { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; chapterSlug: string }>;
}): Promise<Metadata> {
  const { slug, chapterSlug } = await params;
  // TODO: replace with real chapter fetch
  return buildChapterMeta({
    storyTitle: slug,
    storySlug: slug,
    chapterTitle: chapterSlug,
    chapterSlug,
  });
}

export default async function ChapterPage({
  params,
}: {
  params: Promise<{ slug: string; chapterSlug: string }>;
}) {
  const { slug, chapterSlug } = await params;

  // Simulate server-side fetching
  const chapter = MOCK_CHAPTER;

  const comments = MOCK_COMMENTS;

  return (
    <ChapterReadClient
      chapter={chapter}
      slug={slug}
      chapterSlug={chapterSlug}
      comments={comments}
    />
  );
}
