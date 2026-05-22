'use client';

import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import { BookOpen, Upload } from 'lucide-react';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { CHARACTER_ROLES, CHARACTER_STATUSES, type TCharacterFormValues } from './schema';

export function BasicInfoSection() {
  const {
    register,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext<TCharacterFormValues>();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageValue = watch('image');
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!imageValue) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setPreviewUrl(null);
      return;
    }

    if (imageValue instanceof File) {
      const objectUrl = URL.createObjectURL(imageValue);
      setPreviewUrl(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    } else if (typeof imageValue === 'string') {
      setPreviewUrl(imageValue);
    }
  }, [imageValue]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue('image', file, { shouldValidate: true });
    }
  };

  const handleTriggerUpload = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="border-border/50 space-y-6 rounded-2xl border p-5 md:p-6">
      <div className="flex items-center gap-2">
        <span className="text-brand-pink-500 text-lg font-semibold">
          <BookOpen className="text-brand-pink-500 size-5" />
        </span>
        <h3 className="text-text-primary text-base font-semibold">Basic Information</h3>
      </div>

      {/* Image Upload */}
      <div className="flex flex-col items-center gap-3">
        <input
          type="file"
          accept="image/jpeg,image/png,image/webp"
          className="hidden"
          ref={fileInputRef}
          onChange={handleImageChange}
        />
        <div
          onClick={handleTriggerUpload}
          className="border-border/60 hover:border-brand-pink-500 bg-bg-cream/40 hover:bg-bg-cream/80 group relative flex h-28 w-28 cursor-pointer flex-col items-center justify-center overflow-hidden rounded-full border-2 border-dashed transition-all"
        >
          {previewUrl ? (
            <Image
              src={previewUrl}
              alt="Avatar preview"
              fill
              className="object-cover"
              sizes="112px"
            />
          ) : (
            <div className="flex flex-col items-center p-2 text-center">
              <Upload className="text-muted-foreground group-hover:text-brand-pink-500 h-5 w-5 transition-colors" />
              <span className="text-muted-foreground mt-1 text-[10px] font-medium">
                Upload Image
              </span>
            </div>
          )}
        </div>
        <p className="text-muted-foreground text-center text-[10px]">JPG, PNG or WebP. Max 5MB</p>
        {errors.image && (
          <span className="text-destructive mt-1 text-xs font-medium">
            {errors.image.message as string}
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 gap-4">
        {/* Full Name */}
        <div className="space-y-2">
          <Label htmlFor="fullName" className="text-text-secondary text-xs font-semibold">
            Full Name <span className="text-brand-pink-500">*</span>
          </Label>
          <Input
            id="fullName"
            placeholder="e.g., Aarav Virendrasingh"
            {...register('fullName')}
            className="border-border/50 h-10 w-full rounded-lg bg-transparent"
          />
          {errors.fullName && (
            <p className="text-destructive text-xs font-medium">{errors.fullName.message}</p>
          )}
        </div>

        {/* Title */}
        <div className="space-y-2">
          <Label htmlFor="title" className="text-text-secondary text-xs font-semibold">
            Title / Nickname
          </Label>
          <Input
            id="title"
            placeholder="e.g., The Young Merchant"
            {...register('title')}
            className="border-border/50 h-10 w-full rounded-lg bg-transparent"
          />
          {errors.title && (
            <p className="text-destructive text-xs font-medium">{errors.title.message}</p>
          )}
        </div>

        {/* Role in Story */}
        <div className="space-y-2">
          <Label htmlFor="role" className="text-text-secondary text-xs font-semibold">
            Role in Story <span className="text-brand-pink-500">*</span>
          </Label>
          <Controller
            name="role"
            control={control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value || ''}>
                <SelectTrigger className="border-border/50 flex h-10 w-full justify-between rounded-lg bg-transparent">
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent position="popper" className="bg-card border shadow-lg">
                  {CHARACTER_ROLES.map((role) => (
                    <SelectItem key={role} value={role}>
                      {role}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.role && (
            <p className="text-destructive text-xs font-medium">{errors.role.message}</p>
          )}
        </div>

        {/* Age and Gender */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="age" className="text-text-secondary text-xs font-semibold">
              Age
            </Label>
            <Input
              id="age"
              placeholder="e.g., 22"
              {...register('age')}
              className="border-border/50 h-10 w-full rounded-lg bg-transparent"
            />
            {errors.age && (
              <p className="text-destructive text-xs font-medium">{errors.age.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="gender" className="text-text-secondary text-xs font-semibold">
              Gender
            </Label>
            <Controller
              name="gender"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value || ''}>
                  <SelectTrigger className="border-border/50 flex h-10 w-full justify-between rounded-lg bg-transparent">
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent position="popper" className="bg-card border shadow-lg">
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Female">Female</SelectItem>
                    <SelectItem value="Non-binary">Non-binary</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                    <SelectItem value="Unknown">Unknown</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </div>
        </div>

        {/* Nationality */}
        <div className="space-y-2">
          <Label htmlFor="nationality" className="text-text-secondary text-xs font-semibold">
            Nationality
          </Label>
          <Input
            id="nationality"
            placeholder="e.g., Indian (Gujarati)"
            {...register('nationality')}
            className="border-border/50 h-10 w-full rounded-lg bg-transparent"
          />
        </div>

        {/* Occupation */}
        <div className="space-y-2">
          <Label htmlFor="occupation" className="text-text-secondary text-xs font-semibold">
            Occupation
          </Label>
          <Input
            id="occupation"
            placeholder="e.g., Merchant"
            {...register('occupation')}
            className="border-border/50 h-10 w-full rounded-lg bg-transparent"
          />
        </div>

        {/* Status */}
        <div className="space-y-2">
          <Label htmlFor="status" className="text-text-secondary text-xs font-semibold">
            Status in Story
          </Label>
          <Controller
            name="status"
            control={control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value || ''}>
                <SelectTrigger className="border-border/50 flex h-10 w-full justify-between rounded-lg bg-transparent">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent position="popper" className="bg-card border shadow-lg">
                  {CHARACTER_STATUSES.map((status) => (
                    <SelectItem key={status} value={status}>
                      {status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </div>
      </div>
    </div>
  );
}
