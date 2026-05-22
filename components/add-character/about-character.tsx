'use client';

import React from 'react';
import { useFormContext } from 'react-hook-form';

import { FileText } from 'lucide-react';

import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

import type { TCharacterFormValues } from './schema';

export function AboutCharacterSection() {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<TCharacterFormValues>();

  const biography = watch('biography') || '';
  const personality = watch('personality') || '';
  const motivation = watch('motivation') || '';

  return (
    <div className="border-border/50 space-y-6 rounded-2xl border p-5 md:p-6">
      <div className="flex items-center gap-2">
        <span className="text-brand-pink-500 text-lg font-semibold">
          <FileText className="text-brand-pink-500 size-5" />
        </span>
        <h3 className="text-text-primary text-base font-semibold">About the Character</h3>
      </div>
      <p className="text-muted-foreground -mt-3 text-xs">
        Describe your character's background, personality, and motivation.
      </p>

      <div className="space-y-5">
        {/* Biography / Background */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="biography" className="text-text-secondary text-xs font-semibold">
              Biography / Background <span className="text-brand-pink-500">*</span>
            </Label>
            <span className="text-muted-foreground text-[10px] font-medium">
              {biography.length} / 1000
            </span>
          </div>
          <Textarea
            id="biography"
            placeholder="Write a brief biography or background story..."
            maxLength={1000}
            rows={4}
            {...register('biography')}
            className="border-border/50 focus-visible:ring-brand-pink-500/30 w-full rounded-lg bg-transparent p-3 text-sm"
          />
          {errors.biography && (
            <p className="text-destructive text-xs font-medium">{errors.biography.message}</p>
          )}
        </div>

        {/* Personality */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="personality" className="text-text-secondary text-xs font-semibold">
              Personality
            </Label>
            <span className="text-muted-foreground text-[10px] font-medium">
              {personality.length} / 500
            </span>
          </div>
          <Textarea
            id="personality"
            placeholder="Describe their personality traits, nature, and behavior..."
            maxLength={500}
            rows={3}
            {...register('personality')}
            className="border-border/50 focus-visible:ring-brand-pink-500/30 w-full rounded-lg bg-transparent p-3 text-sm"
          />
          {errors.personality && (
            <p className="text-destructive text-xs font-medium">{errors.personality.message}</p>
          )}
        </div>

        {/* Motivation / Goal */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="motivation" className="text-text-secondary text-xs font-semibold">
              Motivation / Goal
            </Label>
            <span className="text-muted-foreground text-[10px] font-medium">
              {motivation.length} / 500
            </span>
          </div>
          <Textarea
            id="motivation"
            placeholder="What drives this character? What do they want to achieve?"
            maxLength={500}
            rows={3}
            {...register('motivation')}
            className="border-border/50 focus-visible:ring-brand-pink-500/30 w-full rounded-lg bg-transparent p-3 text-sm"
          />
          {errors.motivation && (
            <p className="text-destructive text-xs font-medium">{errors.motivation.message}</p>
          )}
        </div>
      </div>
    </div>
  );
}
