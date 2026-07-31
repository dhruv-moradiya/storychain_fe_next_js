'use client';

import Image from 'next/image';
import React, { useState } from 'react';

import { Check, Images, Loader2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  ResponsiveDialog,
  ResponsiveDialogBody,
  ResponsiveDialogContent,
  ResponsiveDialogDescription,
  ResponsiveDialogFooter,
  ResponsiveDialogHeader,
  ResponsiveDialogTitle,
} from '@/components/ui/responsive-dialog';
import { useAddImagesToAlbum } from '@/services/albums/albums.mutation';
import { useGetGalleryImages } from '@/services/gallery-images/gallery-images.query';

interface IAddImagesToAlbumDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  albumId: string;
  storySlug: string;
  existingImageIds?: string[];
}

export const AddImagesToAlbumDialog = ({
  open,
  onOpenChange,
  albumId,
  storySlug,
  existingImageIds = [],
}: IAddImagesToAlbumDialogProps) => {
  const [selectedIds, setSelectedIds] = useState<string[]>(existingImageIds);
  const { data: apiResponse, isLoading } = useGetGalleryImages(storySlug);
  const galleryImages = apiResponse?.data || [];
  const addImagesMutation = useAddImagesToAlbum(albumId, storySlug);

  const handleToggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSave = async () => {
    if (selectedIds.length === 0) return;
    try {
      await addImagesMutation.mutateAsync({ imageIds: selectedIds });
      onOpenChange(false);
    } catch (err) {
      console.error('Error adding images to album:', err);
    }
  };

  return (
    <ResponsiveDialog open={open} onOpenChange={onOpenChange}>
      <ResponsiveDialogContent className="bg-bg-cream max-w-xl" showCloseButton={true}>
        <ResponsiveDialogHeader className="border-border/50 border-b px-6 py-4">
          <ResponsiveDialogTitle className="text-text-primary text-lg font-semibold">
            Add Images to Album
          </ResponsiveDialogTitle>
          <ResponsiveDialogDescription>
            Select images from your story gallery to include in this album.
          </ResponsiveDialogDescription>
        </ResponsiveDialogHeader>

        <ResponsiveDialogBody className="max-h-[60vh] overflow-y-auto px-6 py-4">
          {isLoading ? (
            <div className="flex h-40 flex-col items-center justify-center space-y-2">
              <Loader2 className="text-brand-pink-500 h-6 w-6 animate-spin" />
              <p className="text-muted-foreground text-xs font-medium">Loading story images...</p>
            </div>
          ) : galleryImages.length === 0 ? (
            <div className="flex h-40 flex-col items-center justify-center text-center">
              <Images className="text-muted-foreground mb-2 h-8 w-8" />
              <p className="text-text-primary text-sm font-semibold">No story images found</p>
              <p className="text-muted-foreground mt-1 text-xs">
                Upload images to your story gallery first before adding them to albums.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
              {galleryImages.map((img) => {
                const isSelected = selectedIds.includes(img._id);
                return (
                  <div
                    key={img._id}
                    onClick={() => handleToggleSelect(img._id)}
                    className={`group relative aspect-square cursor-pointer overflow-hidden rounded-xl border-2 transition-all ${
                      isSelected
                        ? 'border-brand-pink-500 ring-brand-pink-500/20 ring-4'
                        : 'border-border/50 hover:border-brand-pink-500/40'
                    }`}
                  >
                    <Image
                      src={img.url}
                      alt={img.title || 'Gallery item'}
                      fill
                      className="object-cover"
                    />
                    {isSelected && (
                      <div className="bg-brand-pink-500 absolute top-2 right-2 flex h-6 w-6 items-center justify-center rounded-full text-white shadow-sm">
                        <Check size={14} className="stroke-3" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </ResponsiveDialogBody>

        <ResponsiveDialogFooter className="border-border/50 border-t px-6 py-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="border-border/60 text-text-secondary hover:bg-muted/50 h-10 px-5"
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={handleSave}
            disabled={addImagesMutation.isPending || selectedIds.length === 0}
            className="bg-brand-pink-500 hover:bg-brand-pink-600 h-10 min-w-[130px] gap-2 px-5 text-white shadow-sm transition-all hover:shadow-md"
          >
            {addImagesMutation.isPending ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Adding...
              </>
            ) : (
              `Add ${selectedIds.length} Image${selectedIds.length === 1 ? '' : 's'}`
            )}
          </Button>
        </ResponsiveDialogFooter>
      </ResponsiveDialogContent>
    </ResponsiveDialog>
  );
};
