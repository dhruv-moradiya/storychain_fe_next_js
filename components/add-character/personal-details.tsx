'use client';

import React from 'react';
import { useFormContext } from 'react-hook-form';

import { User } from 'lucide-react';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import type { TCharacterFormValues } from './schema';

export function PersonalDetailsSection() {
  const { register } = useFormContext<TCharacterFormValues>();

  return (
    <div className="border-border/50 space-y-6 rounded-2xl border p-5 md:p-6">
      <div className="flex items-center gap-2">
        <span className="text-brand-pink-500 text-lg font-semibold">
          <User className="text-brand-pink-500 size-5" />
        </span>
        <h3 className="text-text-primary text-base font-semibold">Personal Details</h3>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {/* Languages */}
        <div className="space-y-2">
          <Label htmlFor="languages" className="text-text-secondary font-semibold">
            Languages
          </Label>
          <Input
            id="languages"
            placeholder="e.g., Gujarati, Hindustani, Some Arabic"
            {...register('languages')}
            className="border-border/50 h-10 w-full rounded-lg bg-transparent"
          />
        </div>

        {/* Birthplace */}
        <div className="space-y-2">
          <Label htmlFor="birthplace" className="text-text-secondary font-semibold">
            Birthplace
          </Label>
          <Input
            id="birthplace"
            placeholder="e.g., Surat, Gujarat"
            {...register('birthplace')}
            className="border-border/50 h-10 w-full rounded-lg bg-transparent"
          />
        </div>

        {/* Family */}
        <div className="space-y-2">
          <Label htmlFor="family" className="text-text-secondary font-semibold">
            Family
          </Label>
          <Input
            id="family"
            placeholder="e.g., Son of Virendrasingh (Merchant)"
            {...register('family')}
            className="border-border/50 h-10 w-full rounded-lg bg-transparent"
          />
        </div>

        {/* Education */}
        <div className="space-y-2">
          <Label htmlFor="education" className="text-text-secondary font-semibold">
            Education
          </Label>
          <Input
            id="education"
            placeholder="e.g., Trained in Trade, Accounting, Navigation"
            {...register('education')}
            className="border-border/50 h-10 w-full rounded-lg bg-transparent"
          />
        </div>
      </div>
    </div>
  );
}
