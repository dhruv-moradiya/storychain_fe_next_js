'use client';

import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Control, useController } from 'react-hook-form';

import { ImagePlus, Loader2, Trash2, UploadCloud } from 'lucide-react';

import { useUploadCoinBundleThumbnail } from '@/services/coin-bundles/coin-bundles.mutation';

import { CoinBundleFormInput } from '../../schema/coin-bundle.schema';

interface ThumbnailSectionProps {
  control: Control<CoinBundleFormInput, unknown>;
  /** Called whenever the upload-in-progress state changes so the parent can block submission. */
  onUploadingChange?: (isUploading: boolean) => void;
}

export function ThumbnailSection({ control, onUploadingChange }: ThumbnailSectionProps) {
  const { field, fieldState } = useController({ control, name: 'thumbnail' });
  const uploadMutation = useUploadCoinBundleThumbnail();

  const [localPreview, setLocalPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const currentUrl =
    field.value?.url && field.value.url.startsWith('http') ? field.value.url : null;
  const displayImage = localPreview ?? currentUrl;
  const isUploading = uploadMutation.isPending;

  // Notify parent whenever upload state changes
  useEffect(() => {
    onUploadingChange?.(isUploading);
  }, [isUploading, onUploadingChange]);

  const handleFileSelected = useCallback(
    async (file: File) => {
      // Show instant local preview
      const objectUrl = URL.createObjectURL(file);
      setLocalPreview(objectUrl);

      try {
        // Upload: sign → cloudinary → return { url, publicId }
        const result = await uploadMutation.mutateAsync({ file });
        // Store final Cloudinary URL in form state
        field.onChange({ url: result.url, publicId: result.publicId });
        // Revoke the blob URL now we have the real one
        URL.revokeObjectURL(objectUrl);
        setLocalPreview(null);
      } catch {
        // mutation's onError already shows a toast; revert preview
        URL.revokeObjectURL(objectUrl);
        setLocalPreview(null);
      }
    },
    [field, uploadMutation]
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFileSelected(file);
    // Reset input so the same file can be re-selected
    e.target.value = '';
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) handleFileSelected(file);
  };

  const handleRemove = () => {
    field.onChange(undefined);
    setLocalPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="flex flex-col gap-3">
      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        id="bundle-thumbnail-input"
        type="file"
        hidden
        accept="image/jpeg,image/png,image/webp,image/gif"
        disabled={isUploading}
        onChange={handleInputChange}
      />

      {displayImage ? (
        /* ── Preview State ─────────────────────────────────────────────── */
        <div className="group relative h-48 w-full overflow-hidden rounded-xl border">
          <Image
            src={displayImage}
            alt="Bundle thumbnail"
            fill
            className="object-cover transition-opacity"
            style={{ opacity: isUploading ? 0.5 : 1 }}
            unoptimized={!!localPreview} // blob URLs aren't processed by Next/Image
          />

          {/* Uploading overlay */}
          {isUploading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/40">
              <div className="flex items-center gap-2 rounded-lg bg-white px-4 py-2 shadow-lg">
                <Loader2 size={15} className="text-primary animate-spin" />
                <span className="text-sm font-medium">Uploading…</span>
              </div>
            </div>
          )}

          {/* Hover overlay — change / remove */}
          {!isUploading && (
            <div className="absolute inset-0 flex items-center justify-center gap-3 bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center gap-1.5 rounded-lg bg-white px-3 py-1.5 text-sm font-medium shadow hover:bg-gray-50"
              >
                <ImagePlus size={14} />
                Change
              </button>
              <button
                type="button"
                onClick={handleRemove}
                className="flex items-center gap-1.5 rounded-lg bg-rose-600 px-3 py-1.5 text-sm font-medium text-white shadow hover:bg-rose-700"
              >
                <Trash2 size={14} />
                Remove
              </button>
            </div>
          )}
        </div>
      ) : (
        /* ── Empty / Drop Zone ─────────────────────────────────────────── */
        <div
          role="button"
          tabIndex={0}
          aria-label="Upload thumbnail"
          onClick={() => !isUploading && fileInputRef.current?.click()}
          onKeyDown={(e) => e.key === 'Enter' && fileInputRef.current?.click()}
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
          className="border-border-soft hover:border-primary/40 hover:bg-muted/30 flex h-48 w-full cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed transition-colors"
        >
          <div className="bg-primary/10 flex h-12 w-12 items-center justify-center rounded-xl">
            <UploadCloud size={22} className="text-primary" />
          </div>
          <div className="text-center">
            <p className="text-text-primary text-sm font-medium">Click or drag & drop to upload</p>
            <p className="text-text-secondary-65 mt-0.5 text-xs">
              JPEG, PNG, WebP or GIF · Max 5 MB
            </p>
          </div>
        </div>
      )}

      {/* Info row — success */}
      {currentUrl && !isUploading && (
        <div className="flex items-center gap-2">
          <div className="flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500/10">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          </div>
          <span className="text-text-secondary-65 truncate text-xs">Uploaded to Cloudinary</span>
        </div>
      )}

      {/* Validation error */}
      {fieldState.error && !isUploading && !currentUrl && (
        <p className="text-destructive text-[0.8rem] font-medium">
          {fieldState.error.message ?? 'Thumbnail is required'}
        </p>
      )}
    </div>
  );
}
