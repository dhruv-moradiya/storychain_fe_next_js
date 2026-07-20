'use client';

import Image from 'next/image';
import { useState } from 'react';

import { ArrowLeft, Edit2, Ellipsis, Plus, Share2 } from 'lucide-react';

import createBadge from '@/components/common/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

import { ExploreToolbar } from '../story-images.tsx/explore-toolbar';
import { ImageCard } from '../story-images.tsx/image-card';
import { ImageCarouselOverlay } from '../story-images.tsx/image-carousel-overlay';
import { IAlbumItem } from './album-card';

interface IAlbumDetailProps {
  album: IAlbumItem;
  onBack: () => void;
}

export const AlbumDetail = ({ album, onBack }: IAlbumDetailProps) => {
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [filter, setFilter] = useState('all');
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  // Generate some dummy images for the album
  const albumImages = Array.from({ length: album.imagesCount }).map((_, i) => ({
    id: i + 1,
    title: `${album.title} Image ${i + 1}`,
    image: album.image,
    chapter: `Chapter ${Math.floor(i / 3) + 1}`,
    createdAt: `May ${14 + (i % 3)}, 2026`,
    type: ['locations', 'characters', 'objects', 'events'][i % 4],
  }));

  const filteredItems =
    filter === 'all' ? albumImages : albumImages.filter((item) => item.type === filter);

  return (
    <div className="space-y-6">
      {/* Header Back Button */}
      <div>
        <Button
          variant="ghost"
          size="sm"
          onClick={onBack}
          className="text-text-secondary-65 hover:text-text-primary -ml-3"
        >
          <ArrowLeft size={16} className="mr-1" />
          Back to Albums
        </Button>
      </div>

      {/* Album Info Header */}
      <div className="flex flex-col gap-6">
        {/* Album Details */}
        <div className="flex flex-1 flex-col justify-center">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <h1 className="text-text-primary font-serif text-2xl font-bold">{album.title}</h1>
              <Button variant="ghost" size="icon" className="text-text-secondary-65 h-8 w-8">
                <Edit2 size={14} />
              </Button>
            </div>

            <div className="hidden items-center gap-2 md:flex">
              <Button variant="outline" size="sm" className="h-9">
                <Ellipsis size={14} />
              </Button>
              <Button variant="outline" size="sm" className="h-9">
                <Share2 size={14} className="mr-2" />
                Share
              </Button>
              <Button className="bg-brand-pink-500 hover:bg-brand-pink-600 h-9 px-4 text-white">
                <Plus size={14} className="mr-2" />
                Add Images
              </Button>
            </div>
          </div>

          <p className="text-text-secondary-65 mt-3 max-w-2xl text-sm leading-relaxed">
            A collection of images, references, and visual inspiration for{' '}
            {album.title.toLowerCase()}.
          </p>

          <div className="text-text-secondary-65 mt-4 flex items-center gap-3 text-xs">
            <span>{album.imagesCount} Images</span>
            <span>•</span>
            <span>Created May 14, 2026</span>
            <span>•</span>
            <span>Updated May 16, 2026</span>
          </div>

          <div className="mt-4 flex items-center gap-2">
            {createBadge({ label: 'Public', size: 'xs', color: 'gray' })}
            {createBadge({ label: 'You', size: 'xs', color: 'gray' })}
          </div>

          {/* Mobile Buttons */}
          <div className="mt-6 flex w-full items-center gap-2 md:hidden">
            <Button className="bg-brand-pink-500 hover:bg-brand-pink-600 h-9 flex-1 text-white">
              <Plus size={14} className="mr-2" />
              Add Images
            </Button>
            <Button variant="outline" size="sm" className="h-9">
              <Share2 size={14} />
            </Button>
            <Button variant="outline" size="sm" className="h-9">
              <Ellipsis size={14} />
            </Button>
          </div>
        </div>
      </div>

      {/* Toolbar & Filter */}
      <div className="pt-4">
        <ExploreToolbar
          view={view}
          onViewChange={setView}
          filter={filter}
          onFilterChange={setFilter}
        />
      </div>

      {/* Images Grid */}
      <div
        className={cn(
          view === 'grid'
            ? 'grid grid-cols-[repeat(auto-fill,minmax(min(250px,100%),1fr))] gap-4'
            : 'flex flex-col gap-4'
        )}
      >
        {filteredItems.map((item, index) => (
          <div key={item.id} onClick={() => setSelectedIndex(index)} className="cursor-pointer">
            <ImageCard item={item} view={view} />
          </div>
        ))}
        {filteredItems.length === 0 && (
          <div className="text-text-secondary-65 col-span-full py-8 text-center text-sm">
            No images found for this category in this album.
          </div>
        )}
      </div>

      <ImageCarouselOverlay
        items={filteredItems}
        initialIndex={selectedIndex}
        onClose={() => setSelectedIndex(null)}
      />
    </div>
  );
};
