'use client';

import React from 'react';
import { useFormContext } from 'react-hook-form';

import { CircleEllipsis } from 'lucide-react';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import type { TCharacterFormValues } from './schema';

export function AdditionalDetailsSection() {
  const { register } = useFormContext<TCharacterFormValues>();

  return (
    <div className="border-border/50 space-y-6 rounded-2xl border p-5 md:p-6">
      <div className="flex items-center gap-2">
        <span className="text-brand-pink-500 text-lg font-semibold">
          <CircleEllipsis className="text-brand-pink-500 size-5" />
        </span>
        <h3 className="text-text-primary text-base font-semibold">Additional Details</h3>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {/* Strengths, Weaknesses */}
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <Label htmlFor="strengths" className="text-text-secondary text-xs font-semibold">
              Strengths
            </Label>
            <Input
              id="strengths"
              placeholder="e.g., Brave, Intelligent, Loyal"
              {...register('strengths')}
              className="border-border/50 h-10 w-full rounded-lg bg-transparent text-sm"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="weaknesses" className="text-text-secondary text-xs font-semibold">
              Weaknesses
            </Label>
            <Input
              id="weaknesses"
              placeholder="e.g., Impulsive, Stubborn"
              {...register('weaknesses')}
              className="border-border/50 h-10 w-full rounded-lg bg-transparent text-sm"
            />
          </div>
        </div>

        {/* Greatest Fear, Habits / Quirks */}
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <Label htmlFor="greatestFear" className="text-text-secondary text-xs font-semibold">
              Greatest Fear
            </Label>
            <Input
              id="greatestFear"
              placeholder="e.g., Losing the ones he loves"
              {...register('greatestFear')}
              className="border-border/50 h-10 w-full rounded-lg bg-transparent text-sm"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="habitsQuirks" className="text-text-secondary text-xs font-semibold">
              Habits / Quirks
            </Label>
            <Input
              id="habitsQuirks"
              placeholder="e.g., Sketches ships in his journal"
              {...register('habitsQuirks')}
              className="border-border/50 h-10 w-full rounded-lg bg-transparent text-sm"
            />
          </div>
        </div>

        {/* Secrets */}
        <div className="space-y-1.5">
          <Label htmlFor="secrets" className="text-text-secondary text-xs font-semibold">
            Secrets
          </Label>
          <Input
            id="secrets"
            placeholder="e.g., Knows a hidden sea route"
            {...register('secrets')}
            className="border-border/50 h-10 w-full rounded-lg bg-transparent text-sm"
          />
        </div>
      </div>
    </div>
  );
}
