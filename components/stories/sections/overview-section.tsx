'use client';

import { motion } from 'framer-motion';
import { formatDistanceToNow, format } from 'date-fns';
import { FileEdit } from 'lucide-react';
import { useRouter } from 'next/navigation';
import {
  OverviewSectionError,
  OverviewSectionLoading,
  StoryHero,
  StoryStats,
  CollaboratorsPreview,
  ChapterPreview,
} from './overview-section/index';
import { StoryCollaboratorRole, type IStory, type IStoryCollaboratorInfo } from '@/type/story';

interface OverviewSectionProps {
  story: IStory & { collaborators: IStoryCollaboratorInfo[] };
  inlineStats: {
    totalChapters: number;
    totalReads: string;
    totalVotes: string;
    totalContributors: number;
    rating: string;
    ratingVotes: number;
    progressPercent: number;
    estimatedChapters: number;
    startedAt: string;
  };
  latestChapters: {
    title: string;
    reads: string;
    comments: number;
    likes: number;
    date: string;
    authorName: string;
    authorRole: string;
    authorAvatar: string;
  }[];
  isLoading?: boolean;
  error?: Error | null;
}

const OverviewSection = ({
  story,
  inlineStats,
  latestChapters,
  isLoading = false,
  error = null,
}: OverviewSectionProps) => {
  const router = useRouter();

  if (isLoading) return <OverviewSectionLoading />;
  if (error) return <OverviewSectionError message={error.message} />;
  if (!story) return <OverviewSectionError message="Story not found." />;

  const storyOwner = story.collaborators.find((c) => c.role === StoryCollaboratorRole.OWNER);
  const collaborators = story.collaborators.filter((c) => c.role !== StoryCollaboratorRole.OWNER);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="mx-auto w-full max-w-4xl space-y-6 px-3 pb-14 sm:space-y-8 sm:px-4"
    >
      {/* Hero Section */}
      <StoryHero
        coverImage={story.coverImage?.url}
        title={story.title}
        slug={story.slug}
        status={story.status}
        genres={story.genres}
        contentRating={story.contentRating}
        totalVotes={inlineStats.totalVotes}
        onBack={() => router.push('/')}
      />

      {/* Stats Section */}
      <StoryStats
        description={story.description}
        stats={{
          ...inlineStats,
          updatedAgo: formatDistanceToNow(new Date(story.lastActivityAt), { addSuffix: true }),
        }}
        status={story.status}
      />

      {/* Collaborators Section */}
      <CollaboratorsPreview
        owner={storyOwner}
        collaborators={collaborators}
        onOwnerClick={(clerkId) => router.push(`/profile/${clerkId}`)}
        onCollaboratorClick={(clerkId) => router.push(`/profile/${clerkId}`)}
        onViewAll={() => router.push(`/stories/${story.slug}/collaborators`)}
      />

      {/* Chapters Section */}
      <ChapterPreview
        chapters={latestChapters}
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
        <span>Last updated {format(new Date(story.lastActivityAt), 'MMM dd, yyyy')}</span>
      </motion.footer>
    </motion.div>
  );
};

export default OverviewSection;
