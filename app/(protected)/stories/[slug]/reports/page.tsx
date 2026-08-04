import type { Metadata } from 'next';

import { buildStoryMeta, getCachedStoryOverview } from '@/components/common';
import { ContentLayout } from '@/components/dashboard';
import { ReportsTableSection } from '@/components/stories/reports';

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
    pageLabel: 'Story Moderation Reports',
  });
}

export default async function ReportsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  return (
    <ContentLayout centered={true} maxWidth="9xl">
      <ReportsTableSection slug={slug} />
    </ContentLayout>
  );
}
