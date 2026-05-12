import type { Metadata } from 'next';

import { buildStorySubPageMeta } from '@/components/common';
import PRDetailHeader from '@/components/stories/pull-request-detail/pr-detail-header';
import PRDetailSidebar from '@/components/stories/pull-request-detail/pr-detail-sidebar';
import {
  staticComments,
  staticPullRequest,
  staticReviews,
  staticTimeline,
} from '@/components/stories/pull-request-detail/pr-detail-static-data';
import PRDetailTabs from '@/components/stories/pull-request-detail/pr-detail-tabs';
import { TooltipProvider } from '@/components/ui/tooltip';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; id: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  return buildStorySubPageMeta(slug, 'Submit Requests');
}

export default async function PullRequestDetailPage({
  params,
}: {
  params: Promise<{ slug: string; id: string }>;
}) {
  const { slug } = await params;

  // TODO: Fetch actual PR data using slug + id from API
  const pullRequest = staticPullRequest;
  const comments = staticComments;
  const reviews = staticReviews;
  const timeline = staticTimeline;

  return (
    <TooltipProvider>
      <div className="mx-auto max-w-6xl space-y-4 px-4 py-8 transition-colors duration-500">
        <PRDetailHeader pullRequest={pullRequest} slug={slug} />

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <PRDetailTabs
              pullRequest={pullRequest}
              comments={comments}
              reviews={reviews}
              timeline={timeline}
            />
          </div>

          <PRDetailSidebar pullRequest={pullRequest} />
        </div>
      </div>
    </TooltipProvider>
  );
}
