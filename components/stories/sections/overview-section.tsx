'use client';

import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import React from 'react';

import type { IStoryOverview, IStoryOverviewResponse } from '@/type/story';
import { formatDate } from 'date-fns';
import {
  BookOpen,
  Brain,
  BriefcaseBusiness,
  CalendarDays,
  FileEdit,
  GalleryHorizontal,
  Globe2,
  ImageIcon,
  Plus,
  Sparkles,
  Target,
  UserRound,
  Users,
} from 'lucide-react';

import createBadge from '@/components/common/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
    <div className="mx-auto w-full max-w-5xl space-y-6 px-3 pb-14 sm:space-y-8 sm:px-4">
      {/* Hero Section */}
      <FadeInView>
        <StoryHero story={story} onBack={() => router.back()} />
      </FadeInView>

      {/* Overview Section's Tabs */}
      <Tabs defaultValue="overview" className="h-auto! space-y-6">
        <TabsList
          variant="line"
          className="border-soft bg-background/60 h-auto! w-full justify-start rounded-[10px]! border px-3 py-2!"
        >
          <TabsTrigger
            value="overview"
            className="data-[state=active]:text-brand-pink-500 [&:after]:bg-brand-pink-500 h-auto! flex-none gap-2 rounded-none px-3 text-xs sm:px-5 sm:text-sm"
          >
            <BookOpen size={16} />
            Overview
          </TabsTrigger>
          <TabsTrigger
            value="characters"
            className="data-[state=active]:text-brand-pink-500 [&:after]:bg-brand-pink-500 h-auto! flex-none gap-2 rounded-none px-3 text-xs sm:px-5 sm:text-sm"
          >
            <Users size={16} />
            Characters
          </TabsTrigger>
          <TabsTrigger
            value="world"
            className="data-[state=active]:text-brand-pink-500 [&:after]:bg-brand-pink-500 h-auto! flex-none gap-2 rounded-none px-3 text-xs sm:px-5 sm:text-sm"
          >
            <Globe2 size={16} />
            World
          </TabsTrigger>
          <TabsTrigger
            value="gallery"
            className="data-[state=active]:text-brand-pink-500 [&:after]:bg-brand-pink-500 h-auto! flex-none gap-2 rounded-none px-3 text-xs sm:px-5 sm:text-sm"
          >
            <GalleryHorizontal size={16} />
            Gallery
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6 sm:space-y-8">
          {/* About + Stats Section */}
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
        </TabsContent>

        <TabsContent value="characters">
          <CharactersTab />
        </TabsContent>

        <TabsContent value="world">
          <WorldTab story={story} />
        </TabsContent>

        <TabsContent value="gallery">
          <GalleryTab story={story} />
        </TabsContent>
      </Tabs>

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

function CharactersTab() {
  return (
    <div className="border-soft space-y-4 rounded-xl border p-4 sm:p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="text-text-primary flex items-center gap-2 text-sm font-semibold sm:text-base">
            <Users size={16} className="text-brand-pink-500 sm:h-4.5 sm:w-4.5" />
            Characters
          </h2>
          <p className="text-foreground/60 mt-1 text-xs font-medium sm:text-sm">
            Meet the people who bring this story to life.
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          className="border-brand-pink-500/40 text-brand-pink-500 hover:bg-brand-pink-500/10 hover:text-brand-pink-500 rounded-sm!"
        >
          <Plus size={14} />
          Add Character
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {[1, 2, 3].map((character) => (
          <div
            key={character}
            className="bg-background border-border hover:border-primary/30 flex flex-col rounded-2xl border p-5 transition-all hover:shadow-sm"
          >
            {/* Top */}
            <div className="flex flex-col items-center text-center">
              <div className="relative mb-4 h-24 w-24 overflow-hidden rounded-full border">
                <Image
                  src="https://i.pinimg.com/736x/c4/cf/77/c4cf77c049226340d430cbe8a4391c69.jpg"
                  alt="Aarav"
                  fill
                  sizes="96px"
                  className="object-cover"
                />
              </div>

              <h3 className="text-foreground text-xl font-semibold">Aarav</h3>

              <div className="mt-2">
                {createBadge({
                  label: 'Protagonist',
                  size: 'xs',
                  color: 'emerald',
                  mono: true,
                })}
              </div>

              <p className="text-muted-foreground mt-4 line-clamp-3 text-sm leading-6">
                A young Gujarati merchant who discovers hidden secrets about the ships arriving at
                night.
              </p>
            </div>

            {/* Info */}
            <div className="divide-border/50 mt-6 divide-y rounded-lg">
              <InfoItem
                icon={<UserRound size={14} className="text-primary" />}
                label="Role"
                value="Protagonist"
              />

              <InfoItem
                icon={<CalendarDays size={14} className="text-primary" />}
                label="Age"
                value="22"
              />

              <InfoItem
                icon={<BriefcaseBusiness size={14} className="text-primary" />}
                label="Occupation"
                value="Merchant"
              />

              <InfoItem
                icon={<Brain size={14} className="text-primary" />}
                label="Personality"
                value="Curious, Brave"
              />

              <InfoItem
                icon={<Target size={14} className="text-primary" />}
                label="Goal"
                value="Protect family"
              />
            </div>

            {/* Button */}
            <Button
              variant="outline"
              size="sm"
              className="text-primary border-primary/30 hover:bg-primary/5 hover:text-primary mt-6 w-full rounded-md!"
            >
              View Details
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}

interface InfoItemProps {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
  className?: string;
}

const InfoItem: React.FC<InfoItemProps> = ({ icon, label, value, className = '' }) => {
  return (
    <div className={`flex items-center justify-between gap-4 py-2 ${className}`}>
      <div className="flex min-w-0 items-center gap-2">
        <span className="shrink-0">{icon}</span>

        <span className="text-foreground/60 truncate text-sm font-medium">{label}</span>
      </div>

      <div className="text-foreground/90 text-right text-sm">{value}</div>
    </div>
  );
};

function WorldTab({ story }: { story: IStoryOverview }) {
  const worldItems = [
    { label: 'Genre', value: story.settings.genres.join(', ') || 'Not set' },
    { label: 'Content Rating', value: story.settings.contentRating },
    { label: 'Visibility', value: story.settings.isPublic ? 'Public' : 'Private' },
    { label: 'Branching', value: story.settings.allowBranching ? 'Allowed' : 'Locked' },
  ];

  return (
    <div className="border-soft space-y-4 rounded-xl border p-4 sm:p-5">
      <div>
        <h2 className="text-text-primary flex items-center gap-2 text-sm font-semibold sm:text-base">
          <Globe2 size={16} className="text-brand-pink-500 sm:h-4.5 sm:w-4.5" />
          About the World
        </h2>
        <p className="text-text-secondary-65 mt-1 text-xs sm:text-sm">
          The setting, tone, and rules behind this story.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {worldItems.map((item) => (
          <div key={item.label} className="border-soft rounded-lg border p-4">
            <p className="text-text-secondary-65 text-xs">{item.label}</p>
            <p className="text-text-primary mt-1 text-sm font-semibold">{item.value}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-3 lg:grid-cols-2">
        <div className="border-soft rounded-lg border p-4">
          <h3 className="text-text-primary text-sm font-semibold">World Description</h3>
          <div
            className="text-text-secondary mt-2 text-sm leading-6"
            dangerouslySetInnerHTML={{ __html: story.description }}
          />
        </div>
        <div className="border-soft rounded-lg border p-4">
          <h3 className="text-text-primary text-sm font-semibold">Key Elements</h3>
          <div className="mt-2 flex flex-wrap gap-2">
            {story.tags.length > 0 ? (
              story.tags.map((tag) => (
                <span
                  key={tag}
                  className="border-brand-pink-500/25 bg-brand-pink-500/5 text-brand-pink-500 rounded-full border px-3 py-1 text-xs"
                >
                  {tag}
                </span>
              ))
            ) : (
              <p className="text-text-secondary-65 text-sm">No story tags added yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function GalleryTab({ story }: { story: IStoryOverview }) {
  const images = [
    story.coverImage?.url ? { title: 'Cover Image', url: story.coverImage.url } : null,
    story.cardImage?.url ? { title: 'Card Image', url: story.cardImage.url } : null,
  ].filter(Boolean) as { title: string; url: string }[];

  return (
    <div className="border-soft space-y-4 rounded-xl border p-4 sm:p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="text-text-primary flex items-center gap-2 text-sm font-semibold sm:text-base">
            <ImageIcon size={16} className="text-brand-pink-500 sm:h-4.5 sm:w-4.5" />
            Story Gallery
          </h2>
          <p className="text-text-secondary-65 mt-1 text-xs sm:text-sm">
            Visual inspiration and important story images.
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          className="border-brand-pink-500/40 text-brand-pink-500 hover:bg-brand-pink-500/10"
        >
          <Plus size={14} />
          Add Image
        </Button>
      </div>

      {images.length > 0 ? (
        <div className="grid gap-3 sm:grid-cols-2">
          {images.map((image) => (
            <div key={image.title} className="border-soft overflow-hidden rounded-xl border">
              <div className="relative aspect-video">
                <Image
                  src={image.url}
                  alt={image.title}
                  fill
                  sizes="(min-width: 640px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="p-3">
                <h3 className="text-text-primary text-sm font-semibold">{image.title}</h3>
                <p className="text-text-secondary-65 mt-1 flex items-center gap-1 text-xs">
                  <Sparkles size={12} />
                  {story.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="border-soft bg-muted/30 flex min-h-40 items-center justify-center rounded-xl border border-dashed p-6 text-center">
          <p className="text-text-secondary-65 text-sm">No gallery images added yet.</p>
        </div>
      )}
    </div>
  );
}
