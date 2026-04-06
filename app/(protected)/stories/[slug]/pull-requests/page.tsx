import type { Metadata } from 'next';

import { buildStorySubPageMeta } from '@/components/common';
import SubmitRequestsSection from '@/components/stories/pull-requests/submit-requests-section';

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

  return (
    <div className="container mx-auto py-8">
      <SubmitRequestsSection slug={slug} />
    </div>
  );
}
