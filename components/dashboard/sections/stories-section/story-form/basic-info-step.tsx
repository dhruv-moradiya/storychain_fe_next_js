'use client';

import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { Controller, useFormContext, useWatch } from 'react-hook-form';

import { Hash } from 'lucide-react';
import { slugify } from 'transliteration';

import { TagBadge } from '@/components/common/badge';
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from '@/components/ui/input-group';
import { type TStoryFormValues } from '@/lib/schemas/story.schema';

export const BasicInfoStep = memo(() => {
  const { control, setValue, getValues } = useFormContext<TStoryFormValues>();

  const title = useWatch({ name: 'title' });
  const slug = useWatch({ name: 'slug' });
  const tags = useWatch({ name: 'tags' }) || [];

  const [tagInput, setTagInput] = useState('');
  const tagInputRef = useRef<HTMLInputElement>(null);

  // Auto-generate slug from title
  useEffect(() => {
    if (!title?.trim()) {
      setValue('slug', '', { shouldDirty: true });
      return;
    }

    const generatedSlug = slugify(title, {
      lowercase: true,
      separator: '-',
    });

    setValue('slug', generatedSlug, { shouldDirty: true });
  }, [title, setValue]);

  const handleAddTag = useCallback(() => {
    const trimmedTag = tagInput.trim().toLowerCase();
    if (!trimmedTag) {
      setTagInput('');
      return;
    }

    const currentTags = getValues('tags') || [];
    if (!currentTags.includes(trimmedTag)) {
      setValue('tags', [...currentTags, trimmedTag], { shouldValidate: true });
    }
    setTagInput('');
  }, [tagInput, getValues, setValue]);

  const handleRemoveTag = useCallback(
    (tagToRemove: string) => {
      const currentTags = getValues('tags') || [];
      setValue(
        'tags',
        currentTags.filter((t: string) => t !== tagToRemove),
        { shouldValidate: true }
      );
    },
    [getValues, setValue]
  );

  const handleTagKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        e.stopPropagation();
        handleAddTag();
      } else if (e.key === 'Backspace' && tagInput === '') {
        const currentTags = getValues('tags') || [];
        if (currentTags.length > 0) {
          handleRemoveTag(currentTags[currentTags.length - 1]);
        }
      } else if (e.key === ',' || e.key === ' ') {
        e.preventDefault();
        handleAddTag();
      }
    },
    [handleAddTag, handleRemoveTag, tagInput, getValues]
  );

  const handleTagInputBlur = useCallback(() => {
    if (tagInput.trim()) {
      handleAddTag();
    }
  }, [tagInput, handleAddTag]);

  return (
    <FieldGroup className="space-y-5">
      {/* Story Title */}
      <Controller
        name="title"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="title">Story Title</FieldLabel>
            <Input
              {...field}
              id="title"
              aria-invalid={fieldState.invalid}
              placeholder="Enter your story title..."
            />
            {slug && (
              <FieldDescription>
                URL: <span className="text-brand-pink-500 font-ibm-plex-mono">/stories/{slug}</span>
              </FieldDescription>
            )}
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      {/* Description */}
      <Controller
        name="description"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="description">Description</FieldLabel>
            <InputGroup>
              <InputGroupTextarea
                {...field}
                value={field.value || ''}
                id="description"
                placeholder="Write a compelling description for your story..."
                className="min-h-24 resize-none"
                aria-invalid={fieldState.invalid}
              />
              <InputGroupAddon align="block-end">
                <InputGroupText className="tabular-nums">
                  {field.value?.length || 0}/2000
                </InputGroupText>
              </InputGroupAddon>
            </InputGroup>
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      {/* Tags */}
      <Controller
        name="tags"
        control={control}
        render={({ fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="tags">
              Tags <span className="text-text-secondary-65 font-normal">(optional)</span>
            </FieldLabel>
            <div
              className="border-input focus-within:border-ring focus-within:ring-ring/50 dark:bg-input/30 flex w-full cursor-text flex-wrap items-center gap-2 rounded-md border bg-transparent px-3 text-sm shadow-xs transition-[color,box-shadow] outline-none focus-within:ring-[3px]"
              onClick={() => tagInputRef.current?.focus()}
            >
              {tags.map((tag: string) => (
                <TagBadge
                  key={tag}
                  label={tag}
                  icon={Hash}
                  color="pink"
                  onRemove={() => handleRemoveTag(tag)}
                />
              ))}
              <Input
                ref={tagInputRef}
                id="tags"
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleTagKeyDown}
                onBlur={handleTagInputBlur}
                placeholder={tags.length === 0 ? 'Add tags...' : ''}
                className="min-w-[80px] flex-1 border-0 bg-transparent px-0 text-sm shadow-none placeholder:text-gray-400 focus-visible:ring-0"
              />
            </div>
            <FieldDescription>Press Enter, Space, or Comma to add a tag</FieldDescription>
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
    </FieldGroup>
  );
});

BasicInfoStep.displayName = 'BasicInfoStep';
