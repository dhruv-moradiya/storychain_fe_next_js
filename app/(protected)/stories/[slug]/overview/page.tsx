import { cache } from 'react';
import type { Metadata } from 'next';
import OverviewSection from '@/components/stories/sections/overview-section';
import { getStoryOverviewQueryFn } from '@/services/stories/stories.query';
import { buildStoryMeta } from '@/components/common';
import type { IStoryOverview } from '@/type/story';

// React.cache deduplicates this fetch so generateMetadata and the page
// share a single network request per render cycle.
const getStoryOverview = cache(async (slug: string) => {
  try {
    const res = await getStoryOverviewQueryFn(slug);
    return res.data as IStoryOverview;
  } catch {
    return null;
  }
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const story = await getStoryOverview(slug);

  return buildStoryMeta({
    title: story?.title ?? slug,
    description: story?.description ?? '',
    rawDescription: story?.description,
    slug,
    coverImageUrl: story?.coverImage?.url,
    pageLabel: 'Overview',
  });
}

export default async function OverviewPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  // Prefetch on the server so the client component gets initialData
  // and avoids a loading flash. React.cache ensures this reuses the
  // same fetch result from generateMetadata above.
  const story = await getStoryOverview(slug);

  return <OverviewSection initialData={story ?? undefined} />;
}
