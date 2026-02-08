import AnalyticsSection from '@/components/stories/sections/analytics-section';
import type { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  return {
    title: `Analytics - ${slug} | StoryChain`,
    description: `View analytics for the story ${slug}`,
  };
}

export default async function AnalyticsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  return (
    <div className="container mx-auto py-8">
      <AnalyticsSection slug={slug} />
    </div>
  );
}
