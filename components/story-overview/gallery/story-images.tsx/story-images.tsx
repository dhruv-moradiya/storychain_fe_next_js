'use client';

import { useState } from 'react';

import { ChevronDown, ImageIcon, Plus } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

import { ExploreToolbar } from './explore-toolbar';
import { ImageCard } from './image-card';

export const StoryImages = () => {
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [filter, setFilter] = useState('all');

  const filteredItems =
    filter === 'all' ? galleryItems : galleryItems.filter((item) => item.type === filter);

  return (
    <div className="border-soft space-y-4 rounded-2xl border p-6">
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
        <Button variant="outline-brand" size="sm">
          <Plus size={14} />
          Add Image
        </Button>
      </div>

      <ExploreToolbar
        view={view}
        onViewChange={setView}
        filter={filter}
        onFilterChange={setFilter}
      />

      <div
        className={cn(
          view === 'grid'
            ? 'grid grid-cols-[repeat(auto-fill,minmax(min(250px,100%),1fr))] gap-4'
            : 'flex flex-col gap-4'
        )}
      >
        {filteredItems.map((item) => (
          <ImageCard key={item.id} item={item} view={view} />
        ))}
        {filteredItems.length === 0 && (
          <div className="text-text-secondary-65 col-span-full py-8 text-center text-sm">
            No images found for this category.
          </div>
        )}
      </div>

      <Button variant="outline-brand" size="sm" className="mx-auto mt-4 w-full py-4">
        View All Images (32)
        <ChevronDown size={14} />
      </Button>
    </div>
  );
};

const galleryItems = [
  {
    id: 1,
    title: 'A merchant ship at sunset',
    image: 'https://i.pinimg.com/1200x/14/f3/3d/14f33df448691ebc5fa86a5f8480df05.jpg',
    chapter: 'Chapter 1',
    createdAt: 'Mar 15, 2023',
    type: 'locations',
  },
  {
    id: 2,
    title: 'Ancient ruins beneath the moonlight',
    image: 'https://i.pinimg.com/control1/736x/b0/35/31/b035314c4e0e4582468f62278e0a19a1.jpg',
    chapter: 'Chapter 2',
    createdAt: 'Apr 02, 2023',
    type: 'locations',
  },
  {
    id: 3,
    title: 'The floating kingdom skyline',
    image: 'https://i.pinimg.com/736x/ed/6a/34/ed6a34d97fdc66f2347f5e0936c51d4c.jpg',
    chapter: 'Chapter 3',
    createdAt: 'May 11, 2023',
    type: 'locations',
  },
  {
    id: 4,
    title: 'A warrior standing in snowfall',
    image: 'https://i.pinimg.com/736x/02/b8/74/02b8743b9f902d9a2e863256ec203905.jpg',
    chapter: 'Chapter 4',
    createdAt: 'Jun 18, 2023',
    type: 'characters',
  },
  {
    id: 5,
    title: 'Royal palace interior concept',
    image: 'https://i.pinimg.com/736x/c4/87/db/c487db4148c5b76510d5032c5fd9755e.jpg',
    chapter: 'Chapter 5',
    createdAt: 'Jul 07, 2023',
    type: 'locations',
  },
  {
    id: 6,
    title: 'The hidden forest entrance',
    image: 'https://i.pinimg.com/control1/1200x/ea/90/8a/ea908a32586625a2a59bc13543745381.jpg',
    chapter: 'Chapter 6',
    createdAt: 'Aug 21, 2023',
    type: 'events',
  },
];
