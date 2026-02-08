import { ChapterReadClient } from '@/components/stories/chapter-read';
import { MOCK_CHAPTER } from '@/components/stories/chapter-read/mock-data';
import type { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; chapterSlug: string }>;
}): Promise<Metadata> {
  const { slug, chapterSlug } = await params;
  // In a real app, fetch chapter details here
  return {
    title: `Chapter ${chapterSlug} - ${slug} | StoryChain`,
    description: `Read Chapter ${chapterSlug} of ${slug} on StoryChain.`,
  };
}

export default async function ChapterPage({
  params,
}: {
  params: Promise<{ slug: string; chapterSlug: string }>;
}) {
  const { slug, chapterSlug } = await params;

  // Simulate server-side fetching
  const chapter = MOCK_CHAPTER;

  return <ChapterReadClient chapter={chapter} slug={slug} chapterSlug={chapterSlug} />;
}
