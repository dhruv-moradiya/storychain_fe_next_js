'use client';

import { useParams } from 'next/navigation';
import { useState } from 'react';

import { ChevronDown, ImageIcon, Loader2, Plus } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useGetGalleryImages } from '@/services/gallery-images/gallery-images.query';

import { AddImageDialog } from './add-image-dialog';
import { ExploreToolbar } from './explore-toolbar';
import { IImageItem, ImageCard } from './image-card';
import { ImageCarouselOverlay } from './image-carousel-overlay';

export const StoryImages = () => {
  const params = useParams();
  const rawSlug = params?.slug;
  const storySlug = (Array.isArray(rawSlug) ? rawSlug[0] : rawSlug) || '';

  const { data: apiResponse, isLoading } = useGetGalleryImages(storySlug);
  const apiImages = apiResponse?.data || [];

  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [filter, setFilter] = useState('all');
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const categoryFilterMap: Record<string, string> = {
    location: 'locations',
    character: 'characters',
    object: 'objects',
    event: 'events',
  };

  const items: IImageItem[] = apiImages.map((img) => ({
    id: img._id,
    title: img.title || 'Untitled Image',
    image: img.url,
    chapter: img.chapterSlug ? `Chapter ${img.chapterSlug}` : 'Gallery',
    createdAt: img.createdAt
      ? new Date(img.createdAt).toLocaleDateString('en-US', {
          month: 'short',
          day: '2-digit',
          year: 'numeric',
        })
      : '',
    type: categoryFilterMap[img.category] || img.category,
  }));

  const filteredItems = filter === 'all' ? items : items.filter((item) => item.type === filter);

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
        <Button variant="outline-brand" size="sm" onClick={() => setIsAddDialogOpen(true)}>
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

      {isLoading ? (
        <div className="flex h-48 flex-col items-center justify-center space-y-2">
          <Loader2 className="text-brand-pink-500 h-6 w-6 animate-spin" />
          <p className="text-muted-foreground text-xs font-medium">Loading gallery images...</p>
        </div>
      ) : (
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
              No images found for this category.
            </div>
          )}
        </div>
      )}

      <Button variant="outline-brand" size="sm" className="mx-auto mt-4 w-full py-4">
        View All Images ({items.length})
        <ChevronDown size={14} />
      </Button>

      <ImageCarouselOverlay
        items={filteredItems}
        initialIndex={selectedIndex}
        onClose={() => setSelectedIndex(null)}
      />

      <AddImageDialog
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        storySlug={storySlug}
      />
    </div>
  );
};
