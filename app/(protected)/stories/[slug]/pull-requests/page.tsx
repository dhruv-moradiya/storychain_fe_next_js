import type { Metadata } from 'next';

import { buildStorySubPageMeta } from '@/components/common';
import SubmitRequestsSection from '@/components/stories/pull-requests/submit-requests-section';
import { PullRequestApi } from '@/services/pull-requests/pull-requests.api';

const listPullRequests = async () => {
  try {
    const res = await PullRequestApi.listStoryPullRequests(1, 10);
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
  return buildStorySubPageMeta(slug, 'Submit Requests');
}

export default async function SubmitRequestsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const list = await listPullRequests(); // Prefetch pull request data if needed for metadata

  return (
    <div className="container mx-auto py-8">
      <SubmitRequestsSection slug={slug} list={list?.data || undefined} />
    </div>
  );
}
