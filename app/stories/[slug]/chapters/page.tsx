import ChaptersSection from '@/components/stories/sections/chapters-section';
import { MOCK_CHAPTERS_DATA } from '@/lib/data/mock-chapters';
import { MOCK_STORY } from '@/lib/data/mock-story';
import type { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  return {
    title: `${MOCK_STORY.title} - Chapters | StoryChain`,
    description: `Explore all chapters for ${MOCK_STORY.title}.`,
    openGraph: {
      url: `/stories/${slug}/chapters`,
    },
  };
}

export default async function ChaptersPage({
  params: _params,
}: {
  params: Promise<{ slug: string }>;
}) {
  // const { slug } = await params;
  return <ChaptersSection initialData={MOCK_CHAPTERS_DATA} />;
}
