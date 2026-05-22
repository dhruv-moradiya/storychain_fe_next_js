'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { TipBanner } from '@/components/common/tip-banner';
import { FadeInView } from '@/lib/animations';

import { IAlbumItem } from './album/album-card';
import { AlbumDetail } from './album/album-detail';
import { Albums, albumItems } from './album/albums';
import { Moodboard } from './moodboard/moodboard';
import { StoryImages } from './story-images.tsx/story-images';

export const GalleryTab = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const albumId = searchParams.get('album');
  const activeAlbum = albumItems.find((item) => String(item.id) === albumId) || null;

  const handleAlbumSelect = (album: IAlbumItem) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('album', String(album.id));
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const handleBack = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete('album');
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  if (activeAlbum) {
    return (
      <FadeInView delay={0.1}>
        <AlbumDetail album={activeAlbum} onBack={handleBack} />
      </FadeInView>
    );
  }

  return (
    <FadeInView delay={0.1}>
      <div className="space-y-4">
        <StoryImages />

        <Albums onAlbumSelect={handleAlbumSelect} />

        <Moodboard />

        <TipBanner title="Tip: Click on an image to view it in full size." />
      </div>
    </FadeInView>
  );
};
