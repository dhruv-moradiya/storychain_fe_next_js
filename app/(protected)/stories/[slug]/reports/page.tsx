import type { Metadata } from 'next';

import { buildStoryMeta, getCachedStoryOverview } from '@/components/common';
import { ContentLayout } from '@/components/dashboard';
import {
  ReportsHeader,
  ReportsStats,
  ReportsTableSection,
  mockAppeals,
  mockReports,
} from '@/components/stories/reports';

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
    pageLabel: 'Reports & Appeals',
  });
}

export default async function ReportsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const story = await getCachedStoryOverview(slug);

  // In production, fetch actual report & appeal records from backend API using slug
  const reports = mockReports;
  const appeals = mockAppeals;

  const totalReports = reports.length;
  const pendingReports = reports.filter((r) => r.status === 'PENDING').length;
  const resolvedReports = reports.filter((r) => r.status === 'RESOLVED').length;
  const totalAppeals = appeals.length;

  return (
    <ContentLayout centered={true} maxWidth="6xl">
      <div className="space-y-6 py-6">
        <ReportsHeader slug={slug} storyTitle={story?.title} />
        <ReportsStats
          totalReports={totalReports}
          pendingReports={pendingReports}
          resolvedReports={resolvedReports}
          totalAppeals={totalAppeals}
        />
        <ReportsTableSection initialReports={reports} initialAppeals={appeals} slug={slug} />
      </div>
    </ContentLayout>
  );
}
