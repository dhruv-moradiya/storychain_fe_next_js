import type { Metadata } from 'next';
import { Suspense } from 'react';

import { buildStoryMeta, getCachedStoryOverview } from '@/components/common';
import { Overview } from '@/components/story-overview/overview';
import OverviewSectionLoading from '@/components/story-overview/overview/overview-section-loading';

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
    pageLabel: 'Overview',
  });
}

export default async function OverviewPage({}: { params: Promise<{ slug: string }> }) {
  // const { slug } = await params;
  // Prefetch on the server so the client component gets initialData
  // and avoids a loading flash. React.cache ensures this reuses the
  // same fetch result from generateMetadata above.
  // const story = await getStoryOverview(slug);

  return (
    <Suspense fallback={<OverviewSectionLoading />}>
      <Overview />
    </Suspense>
  );
}
