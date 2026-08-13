'use client';

import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { IAlbum } from '@/type/album/album.types';
import { zodResolver } from '@hookform/resolvers/zod';
import { FolderPlus, Loader2 } from 'lucide-react';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  ResponsiveDialog,
  ResponsiveDialogBody,
  ResponsiveDialogContent,
  ResponsiveDialogDescription,
  ResponsiveDialogFooter,
  ResponsiveDialogHeader,
  ResponsiveDialogTitle,
} from '@/components/ui/responsive-dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useCreateAlbum, useUpdateAlbum } from '@/services/albums/albums.mutation';

const albumVisibilityOptions = [
  { value: 'public', label: 'Public - Anyone can view' },
  { value: 'collaborators_only', label: 'Collaborators Only' },
  { value: 'private', label: 'Private - Only me' },
] as const;

const albumFormSchema = z.object({
  title: z
    .string()
    .min(1, { message: 'Title is required' })
    .max(60, { message: 'Title cannot exceed 60 characters' }),
  description: z
    .string()
    .max(200, { message: 'Description cannot exceed 200 characters' })
    .optional()
    .or(z.literal('')),
  visibility: z.enum(['public', 'private', 'collaborators_only']),
});

type TAlbumFormValues = z.infer<typeof albumFormSchema>;

interface ICreateAlbumDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  storySlug: string;
  albumToEdit?: IAlbum | null;
}

export const CreateAlbumDialog = ({
  open,
  onOpenChange,
  storySlug,
  albumToEdit,
}: ICreateAlbumDialogProps) => {
  const isEditing = Boolean(albumToEdit);
  const createAlbum = useCreateAlbum(storySlug);
  const updateAlbum = useUpdateAlbum(albumToEdit?._id || '', storySlug);

  const {
    register,
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<TAlbumFormValues>({
    resolver: zodResolver(albumFormSchema),
    defaultValues: {
      title: '',
      description: '',
      visibility: 'public',
    },
    mode: 'onBlur',
  });

  const isPending = isSubmitting || createAlbum.isPending || updateAlbum.isPending;
  const titleText = watch('title') || '';
  const descriptionText = watch('description') || '';

  useEffect(() => {
    if (albumToEdit) {
      reset({
        title: albumToEdit.title || '',
        description: albumToEdit.description || '',
        visibility: albumToEdit.visibility || 'public',
      });
    } else {
      reset({
        title: '',
        description: '',
        visibility: 'public',
      });
    }
  }, [albumToEdit, reset, open]);

  const handleOpenChange = (isOpen: boolean) => {
    onOpenChange(isOpen);
    if (!isOpen) {
      reset();
    }
  };

  const onSubmit = async (data: TAlbumFormValues) => {
    try {
      if (isEditing && albumToEdit) {
        await updateAlbum.mutateAsync({
          title: data.title,
          description: data.description,
          visibility: data.visibility,
        });
      } else {
        await createAlbum.mutateAsync({
          title: data.title,
          description: data.description,
          visibility: data.visibility,
        });
      }
      handleOpenChange(false);
    } catch (err) {
      console.error('Error saving album:', err);
    }
  };

  return (
    <ResponsiveDialog open={open} onOpenChange={handleOpenChange}>
      <ResponsiveDialogContent className="bg-bg-cream max-w-md" showCloseButton={true}>
        <ResponsiveDialogHeader className="border-border/50 border-b px-6 py-4">
          <ResponsiveDialogTitle className="text-text-primary text-lg font-semibold">
            {isEditing ? 'Edit Album' : 'Create New Album'}
          </ResponsiveDialogTitle>
          <ResponsiveDialogDescription>
            {isEditing
              ? 'Update album details and visibility settings.'
              : 'Organize your story images into themed collections.'}
          </ResponsiveDialogDescription>
        </ResponsiveDialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 px-6 py-4">
          <ResponsiveDialogBody className="space-y-4 py-0">
            {/* Title Field */}
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="album-title" className="text-text-secondary font-semibold">
                  Album Title <span className="text-brand-pink-500">*</span>
                </Label>
                <span className="text-muted-foreground text-xs">{titleText.length}/60</span>
              </div>
              <Input
                id="album-title"
                placeholder="e.g., Ports & Cities"
                {...register('title')}
                className="border-border/50 h-10 w-full rounded-lg bg-transparent"
              />
              {errors.title && (
                <p className="text-destructive text-xs font-medium">{errors.title.message}</p>
              )}
            </div>

            {/* Description Field */}
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="album-description" className="text-text-secondary font-semibold">
                  Description
                </Label>
                <span className="text-muted-foreground text-xs">{descriptionText.length}/200</span>
              </div>
              <Textarea
                id="album-description"
                placeholder="Brief description of this collection..."
                {...register('description')}
                className="border-border/50 min-h-20 w-full resize-none rounded-lg bg-transparent"
              />
              {errors.description && (
                <p className="text-destructive text-xs font-medium">{errors.description.message}</p>
              )}
            </div>

            {/* Visibility Field */}
            <div className="space-y-2">
              <Label htmlFor="album-visibility" className="text-text-secondary font-semibold">
                Visibility
              </Label>
              <Controller
                name="visibility"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="border-border/50 flex h-10 w-full justify-between rounded-lg bg-transparent">
                      <SelectValue placeholder="Select visibility" />
                    </SelectTrigger>
                    <SelectContent className="bg-card border shadow-lg">
                      {albumVisibilityOptions.map((opt) => (
                        <SelectItem key={opt.value} value={opt.value}>
                          {opt.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
          </ResponsiveDialogBody>

          <ResponsiveDialogFooter className="border-border/50 border-t pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => handleOpenChange(false)}
              className="border-border/60 text-text-secondary hover:bg-muted/50 h-10 px-5"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isPending}
              className="bg-brand-pink-500 hover:bg-brand-pink-600 h-10 min-w-[120px] gap-2 px-5 text-white shadow-sm transition-all hover:shadow-md"
            >
              {isPending ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <FolderPlus className="h-4 w-4" />
                  {isEditing ? 'Save Changes' : 'Create Album'}
                </>
              )}
            </Button>
          </ResponsiveDialogFooter>
        </form>
      </ResponsiveDialogContent>
    </ResponsiveDialog>
  );
};
