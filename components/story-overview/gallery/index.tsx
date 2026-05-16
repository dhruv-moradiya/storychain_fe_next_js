'use client';

import { TipBanner } from '@/components/common/tip-banner';

import { Albums } from './album/albums';
import { Moodboard } from './moodboard/moodboard';
import { StoryImages } from './story-images.tsx/story-images';

export const GalleryTab = () => {
  return (
    <div className="space-y-4">
      <StoryImages />

      <Albums />

      <Moodboard />

      <TipBanner title="Tip: Click on an image to view it in full size." />
    </div>
  );
};
