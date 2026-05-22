'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { BookOpen, Eye, FileText, Image as ImageIcon, Users } from 'lucide-react';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FadeInView } from '@/lib/animations';
import { cn } from '@/lib/utils';

import { CharacterAbout } from './about';
import { CharacterAppearances } from './appearances';
import { CharacterAttributes } from './attributes-radar';
import { CharacterHero } from './hero';
import { CharacterQuickFacts } from './quick-facts';
import { CharacterRelationships } from './relationships';
import { CharacterTimeline } from './timeline';

const triggerClass = cn(
  'data-[state=active]:text-brand-pink-500 [&:after]:bg-brand-pink-500 h-auto! flex-none gap-2 rounded-none px-3 text-xs sm:px-5 sm:text-sm'
);

interface CharacterDetailProps {
  slug: string;
  characterId: string;
}

export function CharacterDetail({ slug, characterId }: CharacterDetailProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const activeTab = searchParams.get('tab') || 'overview';

  const handleTabChange = (value: string) => {
    const nextParams = new URLSearchParams(searchParams.toString());
    nextParams.set('tab', value);
    router.push(`${pathname}?${nextParams.toString()}`, { scroll: false });
  };

  return (
    <div className="mx-auto w-full max-w-6xl space-y-6 px-3 pb-14 sm:space-y-8 sm:px-4">
      {/* Hero Section */}
      <FadeInView>
        <CharacterHero slug={slug} />
      </FadeInView>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={handleTabChange} className="space-y-5">
        <TabsList
          variant="line"
          className="border-soft bg-background/60 scrollbar-none h-auto! w-full justify-start overflow-x-auto rounded-[10px]! border px-3 py-2!"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          <TabsTrigger value="overview" className={triggerClass}>
            <BookOpen size={16} />
            Overview
          </TabsTrigger>
          <TabsTrigger value="relationships" className={triggerClass}>
            <Users size={16} />
            Relationships
          </TabsTrigger>
          <TabsTrigger value="appearances" className={triggerClass}>
            <Eye size={16} />
            Appearances
          </TabsTrigger>
          <TabsTrigger value="notes" className={triggerClass}>
            <FileText size={16} />
            Notes
          </TabsTrigger>
          <TabsTrigger value="gallery" className={triggerClass}>
            <ImageIcon size={16} />
            Gallery
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab Content */}
        <TabsContent value="overview" className="space-y-6">
          {/* Grid layout for About & Traits */}
          <FadeInView delay={0.1}>
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <div className="space-y-6">
                <CharacterAbout />
              </div>
              <div className="space-y-6">
                <CharacterAttributes />
                <CharacterQuickFacts />
              </div>
            </div>
          </FadeInView>

          {/* Relationships scroll row */}
          <FadeInView delay={0.15}>
            <CharacterRelationships />
          </FadeInView>

          {/* Bottom row: Timeline and Appearances */}
          <FadeInView delay={0.2}>
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <CharacterTimeline />
              <CharacterAppearances />
            </div>
          </FadeInView>
        </TabsContent>

        {/* Dummy/Static views for other sub-tabs when clicked directly */}
        <TabsContent value="relationships">
          <FadeInView delay={0.1}>
            <CharacterRelationships />
          </FadeInView>
        </TabsContent>

        <TabsContent value="appearances" className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <FadeInView delay={0.1}>
            <CharacterTimeline />
          </FadeInView>
          <FadeInView delay={0.1}>
            <CharacterAppearances />
          </FadeInView>
        </TabsContent>

        <TabsContent value="notes">
          <FadeInView delay={0.1}>
            <div className="border-soft bg-background/50 space-y-3 rounded-2xl border p-8 text-center">
              <FileText className="text-brand-pink-500 mx-auto h-10 w-10 opacity-70" />
              <h3 className="text-text-primary text-sm font-bold">Character Notes</h3>
              <p className="text-text-secondary-65 mx-auto max-w-sm text-xs">
                Add private notes, lore details, and development drafts for {characterId}.
              </p>
            </div>
          </FadeInView>
        </TabsContent>

        <TabsContent value="gallery">
          <FadeInView delay={0.1}>
            <div className="border-soft bg-background/50 space-y-3 rounded-2xl border p-8 text-center">
              <ImageIcon className="text-brand-pink-500 mx-auto h-10 w-10 opacity-70" />
              <h3 className="text-text-primary text-sm font-bold">Character Gallery</h3>
              <p className="text-text-secondary-65 mx-auto max-w-sm text-xs">
                Upload art, reference sheets, and scenes featuring this character.
              </p>
            </div>
          </FadeInView>
        </TabsContent>
      </Tabs>

      {/* Footer metadata */}
      <div className="text-text-secondary-65 border-soft border-t pt-4 text-[10px] font-medium">
        Last updated Mar 18, 2026 by dhruv
      </div>
    </div>
  );
}
