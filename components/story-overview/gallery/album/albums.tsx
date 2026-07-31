'use client';

import { useParams } from 'next/navigation';
import { useState } from 'react';

import { IAlbum } from '@/type/album/album.types';
import { FolderPlus, ImageIcon, Loader2, Plus } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { useDeleteAlbum } from '@/services/albums/albums.mutation';
import { useGetAlbumsByStory } from '@/services/albums/albums.query';

import { AddImagesToAlbumDialog } from './add-images-to-album-dialog';
import { AlbumCard } from './album-card';
import { CreateAlbumDialog } from './create-album-dialog';

export const Albums = ({ onAlbumSelect }: { onAlbumSelect?: (album: IAlbum) => void }) => {
  const params = useParams();
  const rawSlug = params?.slug;
  const storySlug = (Array.isArray(rawSlug) ? rawSlug[0] : rawSlug) || '';

  const { data: apiResponse, isLoading } = useGetAlbumsByStory(storySlug);
  const albums = apiResponse?.data || [];
  const deleteAlbumMutation = useDeleteAlbum(storySlug);

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [albumToEdit, setAlbumToEdit] = useState<IAlbum | null>(null);

  const [isAddImagesOpen, setIsAddImagesOpen] = useState(false);
  const [selectedAlbumForImages, setSelectedAlbumForImages] = useState<IAlbum | null>(null);

  const handleOpenCreate = () => {
    setAlbumToEdit(null);
    setIsCreateOpen(true);
  };

  const handleEditAlbum = (album: IAlbum) => {
    setAlbumToEdit(album);
    setIsCreateOpen(true);
  };

  const handleAddImages = (album: IAlbum) => {
    setSelectedAlbumForImages(album);
    setIsAddImagesOpen(true);
  };

  const handleDeleteAlbum = async (albumId: string) => {
    if (confirm('Are you sure you want to delete this album?')) {
      await deleteAlbumMutation.mutateAsync(albumId);
    }
  };

  return (
    <div className="border-soft relative space-y-4 rounded-2xl border p-6">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="text-text-primary flex items-center gap-2 text-sm font-semibold sm:text-base">
            <ImageIcon size={16} className="text-brand-pink-500 sm:h-4.5 sm:w-4.5" />
            Albums
          </h2>
          <p className="text-text-secondary-65 mt-1 text-xs sm:text-sm">
            Organize your images into themed collections.
          </p>
        </div>
        <Button variant="outline-brand" size="sm" onClick={handleOpenCreate}>
          <Plus size={14} />
          New Album
        </Button>
      </div>

      {isLoading ? (
        <div className="flex h-36 flex-col items-center justify-center space-y-2">
          <Loader2 className="text-brand-pink-500 h-6 w-6 animate-spin" />
          <p className="text-muted-foreground text-xs font-medium">Loading albums...</p>
        </div>
      ) : albums.length === 0 ? (
        <div className="border-border/40 bg-bg-cream/20 flex flex-col items-center justify-center rounded-xl border border-dashed p-8 text-center">
          <div className="bg-brand-pink-500/10 mb-3 flex h-10 w-10 items-center justify-center rounded-full">
            <FolderPlus className="text-brand-pink-500 h-5 w-5" />
          </div>
          <h4 className="text-text-primary text-sm font-semibold">No albums created yet</h4>
          <p className="text-muted-foreground mt-1 max-w-sm text-xs">
            Group your story artwork, character models, and location references into albums.
          </p>
          <Button variant="outline-brand" size="sm" onClick={handleOpenCreate} className="mt-4">
            <Plus size={14} />
            Create First Album
          </Button>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {albums.map((album) => (
            <AlbumCard
              key={album._id}
              album={album}
              onClick={() => onAlbumSelect?.(album)}
              onEdit={handleEditAlbum}
              onAddImages={handleAddImages}
              onDelete={handleDeleteAlbum}
            />
          ))}
        </div>
      )}

      {/* Dialogs */}
      <CreateAlbumDialog
        open={isCreateOpen}
        onOpenChange={setIsCreateOpen}
        storySlug={storySlug}
        albumToEdit={albumToEdit}
      />

      {selectedAlbumForImages && (
        <AddImagesToAlbumDialog
          open={isAddImagesOpen}
          onOpenChange={setIsAddImagesOpen}
          albumId={selectedAlbumForImages._id}
          storySlug={storySlug}
        />
      )}
    </div>
  );
};
