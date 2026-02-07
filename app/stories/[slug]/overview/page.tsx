import OverviewSection from '@/components/stories/sections/overview-section';
import { MOCK_STORY, MOCK_INLINE_STATS, MOCK_LATEST_CHAPTERS } from '@/lib/data/mock-story';
import type { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  return {
    title: `${MOCK_STORY.title} - Overview | StoryChain`,
    description: MOCK_STORY.description.replace(/<[^>]*>?/gm, '').substring(0, 160), // Strip HTML
    openGraph: {
      title: MOCK_STORY.title,
      description: MOCK_STORY.description.replace(/<[^>]*>?/gm, '').substring(0, 160),
      images: [MOCK_STORY.coverImage?.url || ''],
      url: `/stories/${slug}/overview`,
    },
  };
}

export default async function OverviewPage({
  params: _params,
}: {
  params: Promise<{ slug: string }>;
}) {
  // Simulate data fetching
  // const { slug } = await params;
  // const story = await getStoryBySlug(slug);

  return (
    <OverviewSection
      story={MOCK_STORY}
      inlineStats={MOCK_INLINE_STATS}
      latestChapters={MOCK_LATEST_CHAPTERS}
    />
  );
}
