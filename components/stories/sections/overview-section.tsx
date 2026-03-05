'use client';

import { useGetStoryOverview } from '@/services/stories/stories.query';
import type { IStoryOverview, IStoryOverviewResponse } from '@/type/story';
import { motion } from 'framer-motion';
import { FileEdit } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
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

  // If initialData is provided (from server prefetch), TanStack Query uses it
  // immediately — no loading state, no extra network request on first render.
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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="mx-auto w-full max-w-4xl space-y-6 px-3 pb-14 sm:space-y-8 sm:px-4"
    >
      {/* Hero Section */}
      <StoryHero story={story} onBack={() => router.push('/')} />

      {/* Stats Section */}
      <StoryStats story={story} />

      {/* Collaborators Section */}
      <CollaboratorsPreview
        collaborators={story.collaborators}
        onOwnerClick={(clerkId) => router.push(`/profile/${clerkId}`)}
        onCollaboratorClick={(clerkId) => router.push(`/profile/${clerkId}`)}
        onViewAll={() => router.push(`/stories/${story.slug}/collaborators`)}
      />

      {/* Chapters Section */}
      <ChapterPreview
        chapters={story.latestChapters}
        onViewAll={() => router.push(`/stories/${story.slug}/chapters`)}
        onStartReading={() => router.push(`/stories/${story.slug}/chapter/1`)}
        onContinueReading={() => router.push(`/stories/${story.slug}/chapter/23`)}
        continueChapter="Ch. 23: The Escape"
      />

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="border-border/30 text-text-secondary-65 flex items-center gap-2 border-t pt-4 text-xs"
      >
        <FileEdit size={14} />
        <span>
          {/* Last updated {format(new Date(story.lastActivityAt || Date.now()), 'MMM dd, yyyy')} */}
        </span>
      </motion.footer>
    </motion.div>
  );
};

export default OverviewSection;
