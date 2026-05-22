'use client';

import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { Tags, X } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';

import type { TCharacterFormValues } from './schema';

export function TagsSection() {
  const { watch, setValue } = useFormContext<TCharacterFormValues>();
  const [inputValue, setInputValue] = useState('');
  const tags = watch('tags') || [];

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const val = inputValue.trim();
      if (val && !tags.includes(val)) {
        setValue('tags', [...tags, val], { shouldValidate: true });
        setInputValue('');
      }
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setValue(
      'tags',
      tags.filter((t) => t !== tagToRemove),
      { shouldValidate: true }
    );
  };

  return (
    <div className="border-border/50 space-y-4 rounded-2xl border p-5 md:p-6">
      <div className="flex items-center gap-2">
        <span className="text-brand-pink-500 text-lg font-semibold">
          <Tags className="text-brand-pink-500 size-5" />
        </span>
        <h3 className="text-text-primary text-base font-semibold">Tags</h3>
      </div>
      <p className="text-muted-foreground -mt-1.5 text-xs">
        Add tags to help organize your characters.
      </p>

      <div className="space-y-3">
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Add tags..."
          className="border-border/50 h-10 rounded-lg bg-transparent text-sm"
        />
        <p className="text-muted-foreground text-[10px]">Press Enter to add a tag</p>

        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-2">
            {tags.map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="bg-brand-pink-500/10 text-brand-pink-500 hover:bg-brand-pink-500/25 flex items-center gap-1 rounded-full border-none px-2.5 py-1 text-xs font-semibold"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => handleRemoveTag(tag)}
                  className="hover:bg-brand-pink-500/20 rounded-full p-0.5"
                >
                  <X size={12} className="stroke-[2.5]" />
                </button>
              </Badge>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
