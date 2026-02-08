import SubmitRequestsSection from '@/components/stories/submit-requests/submit-requests-section';
import type { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  return {
    title: `Submit Requests - ${slug} | StoryChain`,
    description: `Manage chapter contributions and merge requests for ${slug}`,
  };
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
