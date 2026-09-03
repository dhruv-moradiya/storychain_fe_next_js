import type { Metadata } from 'next';

import { buildStoryMeta, getCachedStoryOverview } from '@/components/common';
import SubmitRequestsSection from '@/components/stories/pull-requests/submit-requests-section';
import { PullRequestApi } from '@/services/pull-requests/pull-requests.api';

const listPullRequests = async (slug: string) => {
  try {
    const res = await PullRequestApi.listStoryPullRequests(slug, 1, 10);
    return res.data;
  } catch {
    return null;
  }
};

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
    pageLabel: 'Submit Requests',
  });
}

export default async function SubmitRequestsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const list = await listPullRequests(slug); // Prefetch pull request data if needed for metadata

  return (
    <div className="container mx-auto py-8">
      <SubmitRequestsSection slug={slug} list={list?.data || undefined} />
    </div>
  );
}
