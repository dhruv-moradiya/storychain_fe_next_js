'use client';

import { useState } from 'react';

import type { TStoryStatus } from '@/type/story/story.types';
import { motion } from 'framer-motion';
import { Activity, BookOpen, Coins, Globe, Loader2, Lock, Star } from 'lucide-react';

import { contentRatingBadge, genresBadges, storyStatusBadge } from '@/components/common/badge';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useUpdateStoryStatus } from '@/services/stories/stories.mutation';

import { BadgeRow, BaseRow, SettingCard, ToggleRow } from './setting-components';
import type { SettingTabProps } from './setting-section.types';

const STATUS_OPTIONS: { value: TStoryStatus; label: string }[] = [
  { value: 'draft', label: 'Draft' },
  { value: 'published', label: 'Published' },
  { value: 'archived', label: 'Archived' },
  { value: 'deleted', label: 'Deleted' },
];

export function GeneralTab({ settings, onSettingUpdate, slug, status }: SettingTabProps) {
  const [pendingStatus, setPendingStatus] = useState<TStoryStatus | null>(null);
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const updateStatusMutation = useUpdateStoryStatus(slug || '');

  const currentStatus = pendingStatus || status || 'draft';

  const handleStatusSelectChange = (val: string) => {
    const nextStatus = val as TStoryStatus;
    if (nextStatus === status) return;
    setPendingStatus(nextStatus);
    setIsAlertOpen(true);
  };

  const handleConfirmStatusChange = () => {
    if (!pendingStatus) return;
    updateStatusMutation.mutate(pendingStatus, {
      onSettled: () => {
        setIsAlertOpen(false);
        setPendingStatus(null);
      },
    });
  };

  const handleCancelStatusChange = () => {
    setIsAlertOpen(false);
    setPendingStatus(null);
  };

  const getStatusChangeWarning = (newStatus: TStoryStatus | null) => {
    switch (newStatus) {
      case 'published':
        return 'Publishing your story will make it accessible to readers according to your visibility settings.';
      case 'archived':
        return 'Archiving your story will hide it from active discovery, but current state and history will be preserved.';
      case 'deleted':
        return 'Deleting your story will mark it as deleted. This action may restrict further interactions.';
      case 'draft':
        return 'Reverting your story to draft will hide it from readers while you work on updates.';
      default:
        return 'Are you sure you want to change the story status?';
    }
  };

  return (
    <motion.div className="space-y-4">
      {/* Story Info */}
      <SettingCard
        title="Story Information"
        description="Basic details about your story"
        index={0.1}
      >
        <BadgeRow icon={<BookOpen size={18} />} label="Genre">
          {genresBadges(settings.genres, { size: 'sm' })}
        </BadgeRow>
        <BadgeRow icon={<Star size={18} />} label="Content Rating">
          {contentRatingBadge(settings.contentRating, { size: 'sm' })}
        </BadgeRow>
      </SettingCard>

      {/* Status & Monetization */}
      <SettingCard
        title="Status & Monetization"
        description="Manage your story's lifecycle status and monetization preferences"
        index={0.2}
      >
        <BaseRow
          icon={<Activity size={18} />}
          label="Story Status"
          description="Current publishing state of your story"
          action={
            <Select
              value={currentStatus}
              onValueChange={handleStatusSelectChange}
              disabled={updateStatusMutation.isPending}
            >
              <SelectTrigger className="w-[140px] capitalize">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                {STATUS_OPTIONS.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value} className="capitalize">
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          }
        />
        <ToggleRow
          icon={<Coins size={18} />}
          label="Monetization Enabled"
          description="Allow readers to tip or unlock premium chapters using coins"
          checked={settings.monetizationEnabled ?? false}
          onChange={(v) => onSettingUpdate('monetizationEnabled', v)}
        />
      </SettingCard>

      {/* Visibility */}
      <SettingCard
        title="Visibility & Access"
        description="Control who can see and interact with your story"
        index={0.3}
      >
        <ToggleRow
          icon={settings.isPublic ? <Globe size={18} /> : <Lock size={18} />}
          label="Public Visibility"
          description={
            settings.isPublic
              ? 'Anyone can find and read your story'
              : 'Only collaborators can access your story'
          }
          checked={settings.isPublic}
          onChange={(v) => onSettingUpdate('isPublic', v)}
        />
      </SettingCard>

      {/* Confirmation Alert Dialog */}
      <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
        <AlertDialogContent className="bg-card border-border/50 max-w-md rounded-2xl p-6 shadow-xl">
          <AlertDialogHeader className="text-left sm:text-left">
            <div className="flex items-center gap-3">
              <div className="border-brand-pink-500/20 bg-brand-pink-500/10 text-brand-pink-500 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border">
                <Activity className="size-5" />
              </div>
              <div>
                <AlertDialogTitle className="text-text-primary font-sans text-lg font-bold tracking-tight">
                  Change Story Status?
                </AlertDialogTitle>
                <AlertDialogDescription className="text-text-secondary-65 text-xs">
                  Confirming will update the visibility and state of your story.
                </AlertDialogDescription>
              </div>
            </div>
          </AlertDialogHeader>

          {/* Status transition callout box */}
          <div className="flex flex-col gap-3 rounded-xl p-4 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-text-secondary-75 font-medium">Status Change:</span>
              <div className="flex items-center gap-2 font-semibold">
                {status &&
                  storyStatusBadge(status, {
                    size: 'sm',
                    className: 'uppercase',
                  })}
                <span className="text-text-secondary-50">➔</span>
                {pendingStatus &&
                  storyStatusBadge(pendingStatus, {
                    size: 'sm',
                    className: 'uppercase',
                  })}
              </div>
            </div>

            <div className="border-border/30 text-text-secondary border-t pt-2.5 leading-relaxed">
              {getStatusChangeWarning(pendingStatus)}
            </div>
          </div>

          <AlertDialogFooter className="mt-2 flex items-center justify-end gap-2">
            <AlertDialogCancel
              variant="outline-editorial"
              onClick={handleCancelStatusChange}
              disabled={updateStatusMutation.isPending}
              className="cursor-pointer rounded-sm"
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmStatusChange}
              disabled={updateStatusMutation.isPending}
              className="bg-brand-pink-500 hover:bg-brand-pink-600 cursor-pointer rounded-sm font-medium text-white shadow-xs"
            >
              {updateStatusMutation.isPending ? (
                <>
                  <Loader2 className="mr-1.5 size-4 animate-spin" />
                  Updating...
                </>
              ) : (
                'Confirm Change'
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </motion.div>
  );
}
