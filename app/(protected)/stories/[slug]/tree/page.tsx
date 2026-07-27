import type { Metadata } from 'next';

import { buildStoryMeta, getCachedStoryOverview } from '@/components/common';
import { FlowCanvas } from '@/components/stories/sections/tree-section';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const story = await getCachedStoryOverview(slug);

  return buildStoryMeta({
    title: story?.title ?? slug,
    description: story?.description ?? '',
    rawDescription: story?.description,
    slug,
    cardImageUrl: story?.cardImage?.url,
    coverImageUrl: story?.coverImage?.url,
    author: story?.creator?.username,
    genres: story?.settings?.genres || story?.genres,
    stats: story?.stats,
    pageLabel: 'Tree',
  });
}

export default function StoryTreePage() {
  return (
    <div>
      <FlowCanvas />
    </div>
  );
}
