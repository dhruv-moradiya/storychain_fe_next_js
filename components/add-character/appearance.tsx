'use client';

import React from 'react';
import { useFormContext } from 'react-hook-form';

import { Sparkles } from 'lucide-react';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import type { TCharacterFormValues } from './schema';

export function AppearanceSection() {
  const { register } = useFormContext<TCharacterFormValues>();

  return (
    <div className="border-border/50 space-y-6 rounded-2xl border p-5 md:p-6">
      <div className="flex items-center gap-2">
        <span className="text-brand-pink-500 text-lg font-semibold">
          <Sparkles className="text-brand-pink-500 size-5" />
        </span>
        <h3 className="text-text-primary text-base font-semibold">Appearance</h3>
      </div>
      <p className="text-muted-foreground -mt-3 text-xs">Describe how your character looks.</p>

      <div className="grid grid-cols-1 gap-4">
        {/* Height, Build, Hair */}
        <div className="grid grid-cols-3 gap-3">
          <div className="space-y-1.5">
            <Label htmlFor="height" className="text-text-secondary text-xs font-semibold">
              Height
            </Label>
            <Input
              id="height"
              placeholder={'e.g., 5\'10"'}
              {...register('appearance.height')}
              className="border-border/50 h-10 w-full rounded-lg bg-transparent text-sm"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="build" className="text-text-secondary text-xs font-semibold">
              Build
            </Label>
            <Input
              id="build"
              placeholder="e.g., Lean"
              {...register('appearance.build')}
              className="border-border/50 h-10 w-full rounded-lg bg-transparent text-sm"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="hair" className="text-text-secondary text-xs font-semibold">
              Hair
            </Label>
            <Input
              id="hair"
              placeholder="e.g., Black, Wavy"
              {...register('appearance.hair')}
              className="border-border/50 h-10 w-full rounded-lg bg-transparent text-sm"
            />
          </div>
        </div>

        {/* Eyes, Distinctive Features */}
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <Label htmlFor="eyes" className="text-text-secondary text-xs font-semibold">
              Eyes
            </Label>
            <Input
              id="eyes"
              placeholder="e.g., Dark Brown"
              {...register('appearance.eyes')}
              className="border-border/50 h-10 w-full rounded-lg bg-transparent text-sm"
            />
          </div>
          <div className="space-y-1.5">
            <Label
              htmlFor="distinctiveFeatures"
              className="text-text-secondary text-xs font-semibold"
            >
              Distinctive Features
            </Label>
            <Input
              id="distinctiveFeatures"
              placeholder="e.g., Scar on left eyebrow"
              {...register('appearance.distinctiveFeatures')}
              className="border-border/50 h-10 w-full rounded-lg bg-transparent text-sm"
            />
          </div>
        </div>

        {/* Clothing Style */}
        <div className="space-y-1.5">
          <Label htmlFor="clothingStyle" className="text-text-secondary text-xs font-semibold">
            Clothing Style
          </Label>
          <Input
            id="clothingStyle"
            placeholder="e.g., Traditional merchant attire"
            {...register('appearance.clothingStyle')}
            className="border-border/50 h-10 w-full rounded-lg bg-transparent text-sm"
          />
        </div>
      </div>
    </div>
  );
}
