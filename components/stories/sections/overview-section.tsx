'use client';

import { useParams, useRouter } from 'next/navigation';

import type { IStoryOverview, IStoryOverviewResponse } from '@/type/story';
import { formatDate } from 'date-fns';
import { FileEdit } from 'lucide-react';

import { FadeInView } from '@/lib/animations';
import { useGetStoryOverview } from '@/services/stories/stories.query';

import {
  ChapterPreview,
  CollaboratorsPreview,
  OverviewSectionError,
  OverviewSectionLoading,
  StoryHero,
  StoryStats,
} from './overview-section/index';

interface OverviewSectionProps {
  /** Server-prefetched story data passed as TanStack Query initialData */
  initialData?: IStoryOverview;
}

const OverviewSection = ({ initialData }: OverviewSectionProps) => {
  const router = useRouter();
  const params = useParams();
  const slug = params?.slug as string;

  const tanstackInitialData: IStoryOverviewResponse | undefined = initialData
    ? { data: initialData, success: true, message: '', code: '' }
    : undefined;

  const { data, isLoading, error } = useGetStoryOverview(slug, {
    initialData: tanstackInitialData,
  });

  const story = data?.data as IStoryOverview | undefined;

  if (isLoading) return <OverviewSectionLoading />;
  if (error) return <OverviewSectionError message={error.message} />;
  if (!story) return <OverviewSectionError message="Story not found." />;

  return (
    <div className="mx-auto w-full max-w-4xl space-y-6 px-3 pb-14 sm:space-y-8 sm:px-4">
      {/* Hero Section */}
      <FadeInView>
        <StoryHero story={story} onBack={() => router.back()} />
      </FadeInView>

      {/* Stats Section */}
      <FadeInView delay={0.1}>
        <StoryStats story={story} />
      </FadeInView>

      {/* Collaborators Section */}
      <FadeInView delay={0.1}>
        <CollaboratorsPreview
          collaborators={story.collaborators}
          onOwnerClick={(clerkId) => router.push(`/profile/${clerkId}`)}
          onCollaboratorClick={(clerkId) => router.push(`/profile/${clerkId}`)}
          onViewAll={() => router.push(`/stories/${story.slug}/collaborators`)}
        />
      </FadeInView>

      {/* Chapters Section */}
      <FadeInView delay={0.1}>
        <ChapterPreview chapters={story.latestChapters} continueChapter="Ch. 23: The Escape" />
      </FadeInView>

      {/* Footer */}
      <FadeInView
        as="footer"
        delay={0.15}
        className="border-border/30 text-text-secondary-65 flex items-center gap-2 border-t pt-4 text-xs"
      >
        <FileEdit size={14} />
        <span>Last updated {formatDate(story.lastActivityAt, 'MMM dd, yyyy')}</span>
      </FadeInView>
    </div>
  );
};

export default OverviewSection;
