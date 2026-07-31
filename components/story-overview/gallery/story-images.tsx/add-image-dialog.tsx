'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { ImageIcon, Loader2, Trash2, Upload } from 'lucide-react';
import { z } from 'zod';

import { toast } from '@/components/shared/toast/toast';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
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
import {
  useAddGalleryImage,
  useGenerateGalleryImageSignature,
} from '@/services/gallery-images/gallery-images.mutation';

const galleryCategories = [
  { value: 'location', label: 'Location' },
  { value: 'character', label: 'Character' },
  { value: 'object', label: 'Object' },
  { value: 'event', label: 'Event' },
  { value: 'theme', label: 'Theme' },
  { value: 'other', label: 'Other' },
] as const;

const addImageSchema = z.object({
  title: z
    .string()
    .min(1, { message: 'Title is required' })
    .max(200, { message: 'Title cannot exceed 200 characters' }),
  caption: z
    .string()
    .max(500, { message: 'Caption cannot exceed 500 characters' })
    .optional()
    .or(z.literal('')),
  category: z.enum(['location', 'character', 'object', 'event', 'theme', 'other']),
  isMoodboard: z.boolean(),
  imageFile: z
    .instanceof(File, { message: 'Image file is required' })
    .refine((file) => file.size <= 5 * 1024 * 1024, {
      message: 'Max file size is 5MB',
    })
    .refine((file) => ['image/jpeg', 'image/png', 'image/webp'].includes(file.type), {
      message: 'Only JPG, PNG and WebP are supported',
    }),
});

type TAddImageValues = z.infer<typeof addImageSchema>;

interface IAddImageDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  storySlug?: string;
  onAddImage?: (data: {
    title: string;
    caption?: string;
    category: 'location' | 'character' | 'object' | 'event' | 'theme' | 'other';
    isMoodboard: boolean;
    imageFile: File;
  }) => void;
}

export const AddImageDialog = ({
  open,
  onOpenChange,
  storySlug = '',
  onAddImage,
}: IAddImageDialogProps) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const generateSignature = useGenerateGalleryImageSignature(storySlug);
  const addGalleryImage = useAddGalleryImage(storySlug);

  const {
    register,
    control,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TAddImageValues>({
    resolver: zodResolver(addImageSchema),
    defaultValues: {
      title: '',
      caption: '',
      category: 'other',
      isMoodboard: false,
    },
    mode: 'onBlur',
  });

  const isPending = isSubmitting || generateSignature.isPending || addGalleryImage.isPending;

  const imageFile = watch('imageFile');
  const titleText = watch('title') || '';
  const captionText = watch('caption') || '';

  useEffect(() => {
    if (!imageFile) {
      setPreviewUrl(null);
      return;
    }
    const objectUrl = URL.createObjectURL(imageFile);
    setPreviewUrl(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [imageFile]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue('imageFile', file, { shouldValidate: true });
    }
  };

  const handleRemoveImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setValue('imageFile', undefined as unknown as File, { shouldValidate: true });
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleOpenChange = (isOpen: boolean) => {
    onOpenChange(isOpen);
    if (!isOpen) {
      reset();
      setPreviewUrl(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const onSubmit = async (data: TAddImageValues) => {
    if (onAddImage) {
      onAddImage(data);
    }

    if (storySlug) {
      try {
        // 1. Get Cloudinary signature
        const signatureRes = await generateSignature.mutateAsync();
        const uploadURL = signatureRes.data.data?.uploadURL;

        if (!uploadURL) {
          toast.error('Failed to get upload signature');
          return;
        }

        // 2. Upload file to Cloudinary
        const url = new URL(uploadURL);
        const searchParams = url.searchParams;

        const formData = new FormData();
        formData.append('file', data.imageFile);

        const timestamp = searchParams.get('timestamp');
        const signature = searchParams.get('signature');
        const apiKey = searchParams.get('api_key');
        const folder = searchParams.get('folder');
        const eager = searchParams.get('eager');

        if (timestamp) formData.append('timestamp', timestamp);
        if (signature) formData.append('signature', signature);
        if (apiKey) formData.append('api_key', apiKey);
        if (folder) formData.append('folder', folder);
        if (eager) formData.append('eager', eager);

        const uploadEndpoint = `${url.origin}${url.pathname}`;
        const cloudinaryRes = await fetch(uploadEndpoint, {
          method: 'POST',
          body: formData,
        });

        if (!cloudinaryRes.ok) {
          toast.error('Failed to upload image asset');
          return;
        }

        const cloudinaryData = await cloudinaryRes.json();

        // 3. Post payload to /gallery-images/slug/:storyslug
        await addGalleryImage.mutateAsync({
          url: cloudinaryData.secure_url,
          publicId: cloudinaryData.public_id,
          title: data.title,
          caption: data.caption,
          category: data.category,
          isMoodboard: data.isMoodboard,
        });
      } catch (err) {
        console.error('Error uploading gallery image:', err);
      }
    }

    handleOpenChange(false);
  };

  return (
    <ResponsiveDialog open={open} onOpenChange={handleOpenChange}>
      <ResponsiveDialogContent className="bg-bg-cream max-w-md" showCloseButton={true}>
        <ResponsiveDialogHeader className="border-border/50 border-b px-6 py-4">
          <ResponsiveDialogTitle className="text-text-primary text-lg font-semibold">
            Add Story Image
          </ResponsiveDialogTitle>
          <ResponsiveDialogDescription>
            Upload a visual reference, conceptual art, or inspiration image.
          </ResponsiveDialogDescription>
        </ResponsiveDialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 px-6 py-4">
          <ResponsiveDialogBody className="space-y-4 py-0">
            {/* Image Upload Area */}
            <div className="space-y-2">
              <Label className="text-text-secondary font-semibold">
                Image <span className="text-brand-pink-500">*</span>
              </Label>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/jpeg,image/png,image/webp"
                className="hidden"
              />
              <div
                onClick={() => fileInputRef.current?.click()}
                className={`border-border/60 hover:border-brand-pink-500 bg-bg-cream/40 hover:bg-bg-cream/80 relative flex aspect-video w-full cursor-pointer flex-col items-center justify-center overflow-hidden rounded-xl border-2 border-dashed transition-all ${
                  errors.imageFile ? 'border-destructive/60' : ''
                }`}
              >
                {previewUrl ? (
                  <div className="relative h-full w-full">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={previewUrl} alt="Preview" className="h-full w-full object-cover" />
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      className="absolute top-2 right-2 h-8 w-8"
                      onClick={handleRemoveImage}
                    >
                      <Trash2 size={14} />
                    </Button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center p-4 text-center">
                    <Upload className="text-muted-foreground group-hover:text-brand-pink-500 mb-2 h-8 w-8 transition-colors" />
                    <span className="text-text-secondary text-sm font-semibold">
                      Click to upload an image
                    </span>
                    <span className="text-muted-foreground mt-1 text-xs">
                      Supports JPG, PNG or WebP up to 5MB
                    </span>
                  </div>
                )}
              </div>
              {errors.imageFile && (
                <p className="text-destructive text-xs font-medium">{errors.imageFile.message}</p>
              )}
            </div>

            {/* Title Field */}
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="title" className="text-text-secondary font-semibold">
                  Title <span className="text-brand-pink-500">*</span>
                </Label>
                <span className="text-muted-foreground text-xs">{titleText.length}/200</span>
              </div>
              <Input
                id="title"
                placeholder="e.g., Whispering Woods Path"
                {...register('title')}
                className="border-border/50 h-10 w-full rounded-lg bg-transparent"
              />
              {errors.title && (
                <p className="text-destructive text-xs font-medium">{errors.title.message}</p>
              )}
            </div>

            {/* Category Field */}
            <div className="space-y-2">
              <Label htmlFor="category" className="text-text-secondary font-semibold">
                Category <span className="text-brand-pink-500">*</span>
              </Label>
              <Controller
                name="category"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="border-border/50 flex h-10 w-full justify-between rounded-lg bg-transparent">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent className="bg-card border shadow-lg">
                      {galleryCategories.map((cat) => (
                        <SelectItem key={cat.value} value={cat.value}>
                          {cat.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.category && (
                <p className="text-destructive text-xs font-medium">{errors.category.message}</p>
              )}
            </div>

            {/* Caption Field */}
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="caption" className="text-text-secondary font-semibold">
                  Caption / Description
                </Label>
                <span className="text-muted-foreground text-xs">{captionText.length}/500</span>
              </div>
              <Textarea
                id="caption"
                placeholder="Enter an optional short description or details..."
                {...register('caption')}
                className="border-border/50 min-h-20 w-full resize-none rounded-lg bg-transparent"
              />
              {errors.caption && (
                <p className="text-destructive text-xs font-medium">{errors.caption.message}</p>
              )}
            </div>

            {/* Is Moodboard Checkbox */}
            <div className="flex items-center gap-2 pt-1">
              <Controller
                name="isMoodboard"
                control={control}
                render={({ field }) => (
                  <Checkbox
                    id="isMoodboard"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                )}
              />
              <Label
                htmlFor="isMoodboard"
                className="text-text-secondary cursor-pointer text-sm font-medium"
              >
                Add to Moodboard
              </Label>
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
                  Uploading...
                </>
              ) : (
                <>
                  <ImageIcon className="h-4 w-4" />
                  Add Image
                </>
              )}
            </Button>
          </ResponsiveDialogFooter>
        </form>
      </ResponsiveDialogContent>
    </ResponsiveDialog>
  );
};
