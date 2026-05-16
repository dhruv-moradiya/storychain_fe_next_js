'use client';

import { useState } from 'react';

import { TipBanner } from '@/components/common/tip-banner';

import { IAlbumItem } from './album/album-card';
import { AlbumDetail } from './album/album-detail';
import { Albums } from './album/albums';
import { Moodboard } from './moodboard/moodboard';
import { StoryImages } from './story-images.tsx/story-images';

export const GalleryTab = () => {
  const [activeAlbum, setActiveAlbum] = useState<IAlbumItem | null>(null);

  if (activeAlbum) {
    return <AlbumDetail album={activeAlbum} onBack={() => setActiveAlbum(null)} />;
  }

  return (
    <div className="space-y-4">
      <StoryImages />

      <Albums onAlbumSelect={setActiveAlbum} />

      <Moodboard />

      <TipBanner title="Tip: Click on an image to view it in full size." />
    </div>
  );
};
