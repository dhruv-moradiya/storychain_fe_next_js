import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

import { buildStoryMeta, getCachedStoryOverview } from '@/components/common';

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
  });
}

export default async function StoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  redirect(`/stories/${slug}/overview`);
}
