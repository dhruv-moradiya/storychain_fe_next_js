'use client';

import { useParams, usePathname, useRouter, useSearchParams } from 'next/navigation';

import { IStoryOverview, IStoryOverviewResponse } from '@/type';
import { BookOpen, GalleryHorizontal, Globe2, Users } from 'lucide-react';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FadeInView } from '@/lib/animations';
import { cn } from '@/lib/utils';
import { useGetStoryOverview } from '@/services/stories/stories.query';

import { CharacterTab } from './characters';
import { GalleryTab } from './gallery';
import { OverviewTab } from './overview/index';
import OverviewSectionError from './overview/overview-section-error';
import OverviewSectionLoading from './overview/overview-section-loading';
import { StoryHero } from './overview/story-hero';
import { WorldTab } from './world';

const triggerClass = cn(
  'data-[state=active]:text-brand-pink-500 [&:after]:bg-brand-pink-500 h-auto! flex-none gap-2 rounded-none px-3 text-xs sm:px-5 sm:text-sm'
);

interface OverviewProps {
  /** Server-prefetched story data passed as TanStack Query initialData */
  initialData?: IStoryOverview;
}

export function Overview({ initialData }: OverviewProps) {
  const router = useRouter();
  const params = useParams();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const slug = params?.slug as string;

  const activeTab = searchParams.get('tab') || 'overview';

  const handleTabChange = (value: string) => {
    const nextParams = new URLSearchParams(searchParams.toString());
    nextParams.set('tab', value);
    nextParams.delete('album'); // Reset active album when changing tabs
    router.push(`${pathname}?${nextParams.toString()}`, { scroll: false });
  };

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
    <div className="mx-auto w-full max-w-6xl space-y-6 px-3 pb-14 sm:space-y-8 sm:px-4">
      <FadeInView>
        <StoryHero story={story} onBack={() => router.back()} />
      </FadeInView>

      <Tabs value={activeTab} onValueChange={handleTabChange} className="space-y-5">
        <TabsList
          variant="line"
          className="border-soft bg-background/60 h-auto! w-full justify-start rounded-[10px]! border px-3 py-2!"
        >
          <TabsTrigger value="overview" className={triggerClass}>
            <BookOpen size={16} />
            Overview
          </TabsTrigger>
          <TabsTrigger value="characters" className={triggerClass}>
            <Users size={16} />
            Characters
          </TabsTrigger>
          <TabsTrigger value="world" className={triggerClass}>
            <Globe2 size={16} />
            World
          </TabsTrigger>
          <TabsTrigger value="gallery" className={triggerClass}>
            <GalleryHorizontal size={16} />
            Gallery
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <OverviewTab story={story} />
        </TabsContent>

        <TabsContent value="characters">
          <CharacterTab slug={slug} />
        </TabsContent>

        <TabsContent value="world">
          <WorldTab story={story} />
        </TabsContent>

        <TabsContent value="gallery">
          <GalleryTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}
