'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { IAlbum } from '@/type/album/album.types';

import { TipBanner } from '@/components/common/tip-banner';
import { FadeInView } from '@/lib/animations';

import { AlbumDetail } from './album/album-detail';
import { Albums } from './album/albums';
import { Moodboard } from './moodboard/moodboard';
import { StoryImages } from './story-images.tsx/story-images';

export const GalleryTab = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const albumId = searchParams.get('album');

  const handleAlbumSelect = (album: IAlbum) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('album', album._id);
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const handleBack = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete('album');
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  if (albumId) {
    return (
      <FadeInView delay={0.1}>
        <AlbumDetail album={{ _id: albumId } as IAlbum} onBack={handleBack} />
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
