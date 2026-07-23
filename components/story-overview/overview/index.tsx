'use client';

import { useRouter } from 'next/navigation';

import type { IStoryOverview } from '@/type/story';
import { formatDate } from 'date-fns';
import { FileEdit } from 'lucide-react';

import { FadeInView } from '@/lib/animations';

import { ChapterPreview } from './chapter-preview';
import { CollaboratorsPreview } from './collaborators-preview';
import { StoryStats } from './story-stats';

export const OverviewTab = ({ story }: { story: IStoryOverview }) => {
  const router = useRouter();

  return (
    <div className="mx-auto w-full max-w-6xl space-y-6 px-3 pb-14 sm:space-y-8 sm:px-4">
      <FadeInView delay={0.1}>
        <StoryStats story={story} />
      </FadeInView>

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
        <ChapterPreview
          chapters={story.latestChapters}
          storySlug={story.slug}
          continueChapter="Ch. 23: The Escape"
        />
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
