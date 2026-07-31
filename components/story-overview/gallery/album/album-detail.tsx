'use client';

import { useParams } from 'next/navigation';
import { useState } from 'react';

import { IAlbum } from '@/type/album/album.types';
import { ArrowLeft, Edit2, Loader2, Plus, Trash2 } from 'lucide-react';

import createBadge from '@/components/common/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useDeleteAlbum } from '@/services/albums/albums.mutation';
import { useGetAlbumById } from '@/services/albums/albums.query';

import { ExploreToolbar } from '../story-images.tsx/explore-toolbar';
import { IImageItem, ImageCard } from '../story-images.tsx/image-card';
import { ImageCarouselOverlay } from '../story-images.tsx/image-carousel-overlay';
import { AddImagesToAlbumDialog } from './add-images-to-album-dialog';
import { CreateAlbumDialog } from './create-album-dialog';

interface IAlbumDetailProps {
  album: IAlbum;
  onBack: () => void;
}

export const AlbumDetail = ({ album, onBack }: IAlbumDetailProps) => {
  const params = useParams();
  const rawSlug = params?.slug;
  const storySlug = (Array.isArray(rawSlug) ? rawSlug[0] : rawSlug) || '';

  const { data: apiResponse, isLoading } = useGetAlbumById(album._id);
  const albumData = apiResponse?.data || album;
  const albumImages = apiResponse?.data?.images || [];

  const deleteAlbumMutation = useDeleteAlbum(storySlug);

  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [filter, setFilter] = useState('all');
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isAddImagesOpen, setIsAddImagesOpen] = useState(false);

  const categoryFilterMap: Record<string, string> = {
    location: 'locations',
    character: 'characters',
    object: 'objects',
    event: 'events',
  };

  const items: IImageItem[] = albumImages.map((img) => ({
    id: img._id,
    title: img.title || 'Untitled Image',
    image: img.url,
    chapter: img.chapterSlug ? `Chapter ${img.chapterSlug}` : 'Album Item',
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

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this album?')) {
      await deleteAlbumMutation.mutateAsync(album._id);
      onBack();
    }
  };

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
        <div className="flex flex-1 flex-col justify-center">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <h1 className="text-text-primary font-serif text-2xl font-bold">{albumData.title}</h1>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsEditOpen(true)}
                className="text-text-secondary-65 h-8 w-8"
              >
                <Edit2 size={14} />
              </Button>
            </div>

            <div className="hidden items-center gap-2 md:flex">
              <Button
                variant="outline"
                size="sm"
                onClick={handleDelete}
                className="text-destructive hover:bg-destructive/10 hover:text-destructive h-9"
              >
                <Trash2 size={14} className="mr-1.5" />
                Delete Album
              </Button>
              <Button
                onClick={() => setIsAddImagesOpen(true)}
                className="bg-brand-pink-500 hover:bg-brand-pink-600 h-9 px-4 text-white"
              >
                <Plus size={14} className="mr-2" />
                Add Images
              </Button>
            </div>
          </div>

          {albumData.description && (
            <p className="text-text-secondary-65 mt-3 max-w-2xl text-sm leading-relaxed">
              {albumData.description}
            </p>
          )}

          <div className="text-text-secondary-65 mt-4 flex items-center gap-3 text-xs">
            <span>
              {items.length} {items.length === 1 ? 'Image' : 'Images'}
            </span>
            <span>•</span>
            <span>
              Created{' '}
              {new Date(albumData.createdAt).toLocaleDateString('en-US', {
                month: 'short',
                day: '2-digit',
                year: 'numeric',
              })}
            </span>
          </div>

          <div className="mt-4 flex items-center gap-2">
            {createBadge({
              label: albumData.visibility?.replace('_', ' ') || 'public',
              size: 'xs',
              color: albumData.visibility === 'public' ? 'emerald' : 'gray',
            })}
          </div>

          {/* Mobile Buttons */}
          <div className="mt-6 flex w-full items-center gap-2 md:hidden">
            <Button
              onClick={() => setIsAddImagesOpen(true)}
              className="bg-brand-pink-500 hover:bg-brand-pink-600 h-9 flex-1 text-white"
            >
              <Plus size={14} className="mr-2" />
              Add Images
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleDelete}
              className="text-destructive h-9"
            >
              <Trash2 size={14} />
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
      {isLoading ? (
        <div className="flex h-48 flex-col items-center justify-center space-y-2">
          <Loader2 className="text-brand-pink-500 h-6 w-6 animate-spin" />
          <p className="text-muted-foreground text-xs font-medium">Loading album images...</p>
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
              No images found in this album.
            </div>
          )}
        </div>
      )}

      <ImageCarouselOverlay
        items={filteredItems}
        initialIndex={selectedIndex}
        onClose={() => setSelectedIndex(null)}
      />

      <CreateAlbumDialog
        open={isEditOpen}
        onOpenChange={setIsEditOpen}
        storySlug={storySlug}
        albumToEdit={albumData}
      />

      <AddImagesToAlbumDialog
        open={isAddImagesOpen}
        onOpenChange={setIsAddImagesOpen}
        albumId={albumData._id}
        storySlug={storySlug}
        existingImageIds={albumImages.map((img) => img._id)}
      />
    </div>
  );
};
