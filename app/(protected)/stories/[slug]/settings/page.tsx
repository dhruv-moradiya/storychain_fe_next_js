import type { Metadata } from 'next';

import { buildStoryMeta, getCachedStoryOverview } from '@/components/common';
import SettingSection from '@/components/stories/sections/setting-section';

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
    pageLabel: 'Settings',
  });
}

export default async function SettingsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  return (
    <div className="container mx-auto py-8">
      <SettingSection slug={slug} />
    </div>
  );
}
