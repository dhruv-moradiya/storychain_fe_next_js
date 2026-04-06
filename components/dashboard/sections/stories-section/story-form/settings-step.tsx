'use client';

import { memo } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import { GitBranch, Globe, Lock, MessageSquare, Shield, ThumbsUp } from 'lucide-react';

import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { CONTENT_RATINGS, type TStoryFormValues } from '@/lib/schemas/story.schema';
import { cn } from '@/lib/utils';

import { GenrePicker } from './genre-picker';

export const SettingsStep = memo(() => {
  const { control } = useFormContext<TStoryFormValues>();

  return (
    <FieldGroup className="space-y-5">
      {/* Genre Multi-Select */}
      <Controller
        name="settings.genres"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel>
              Genres <span className="text-text-secondary-65 font-normal">(up to 5)</span>
            </FieldLabel>
            <GenrePicker
              value={field.value}
              onChange={field.onChange}
              maxSelections={5}
              error={fieldState.error?.message}
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      {/* Content Rating & Visibility */}
      <div className="grid grid-cols-2 gap-4">
        {/* Content Rating Select */}
        <Controller
          name="settings.contentRating"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>Content Rating</FieldLabel>
              <Select value={field.value || 'general'} onValueChange={field.onChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select rating" />
                </SelectTrigger>
                <SelectContent>
                  {CONTENT_RATINGS.map((r) => (
                    <SelectItem key={r.value} value={r.value}>
                      <span>{r.label}</span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        {/* Visibility */}
        <Controller
          name="settings.isPublic"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>Visibility</FieldLabel>
              <Select
                value={field.value !== false ? 'public' : 'private'}
                onValueChange={(v) => field.onChange(v === 'public')}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Visibility" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="public">
                    <div className="flex items-center gap-2">
                      <Globe className="h-3.5 w-3.5" />
                      <span>Public</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="private">
                    <div className="flex items-center gap-2">
                      <Lock className="h-3.5 w-3.5" />
                      <span>Private</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </div>

      {/* Toggle Settings */}
      <div className="space-y-1">
        <FieldLabel className="text-text-primary mb-2 block text-sm font-medium">
          Story Settings
        </FieldLabel>
        <div className="bg-cream-95/30 divide-y divide-black/5 rounded-xl border border-black/10">
          <Controller
            name="settings.allowBranching"
            control={control}
            render={({ field }) => (
              <SettingToggle
                icon={GitBranch}
                label="Allow Branching"
                description="Let readers create alternate story paths"
                checked={field.value !== false}
                onCheckedChange={field.onChange}
              />
            )}
          />

          <Controller
            name="settings.requireApproval"
            control={control}
            render={({ field }) => (
              <SettingToggle
                icon={Shield}
                label="Require Approval"
                description="Review contributions before publishing"
                checked={field.value || false}
                onCheckedChange={field.onChange}
              />
            )}
          />

          <Controller
            name="settings.allowComments"
            control={control}
            render={({ field }) => (
              <SettingToggle
                icon={MessageSquare}
                label="Allow Comments"
                description="Allow readers to discuss chapters"
                checked={field.value !== false}
                onCheckedChange={field.onChange}
              />
            )}
          />

          <Controller
            name="settings.allowVoting"
            control={control}
            render={({ field }) => (
              <SettingToggle
                icon={ThumbsUp}
                label="Allow Voting"
                description="Let readers vote on chapters"
                checked={field.value !== false}
                onCheckedChange={field.onChange}
              />
            )}
          />
        </div>
      </div>
    </FieldGroup>
  );
});

SettingsStep.displayName = 'SettingsStep';

// Setting Toggle Component
type SettingToggleProps = {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  description: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
};

const SettingToggle = memo(
  ({ icon: Icon, label, description, checked, onCheckedChange }: SettingToggleProps) => {
    return (
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          <div
            className={cn(
              'flex h-8 w-8 items-center justify-center rounded-lg transition-colors',
              checked
                ? 'bg-brand-pink-500/10 text-brand-pink-500'
                : 'text-text-secondary-65 bg-black/5'
            )}
          >
            <Icon className="h-4 w-4" />
          </div>
          <div>
            <p className="text-text-primary text-sm font-medium">{label}</p>
            <p className="text-text-secondary-65 text-xs">{description}</p>
          </div>
        </div>
        <Switch checked={checked} onCheckedChange={onCheckedChange} />
      </div>
    );
  }
);

SettingToggle.displayName = 'SettingToggle';
