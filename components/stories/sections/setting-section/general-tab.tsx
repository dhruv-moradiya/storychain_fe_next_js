'use client';

import { motion } from 'framer-motion';
import { BookOpen, Globe, Lock, Star } from 'lucide-react';

import { contentRatingBadge, genresBadges } from '@/components/common/badge';

import { BadgeRow, SettingCard, ToggleRow } from './setting-components';
import type { SettingTabProps } from './setting-section.types';

export function GeneralTab({ settings, onSettingUpdate }: SettingTabProps) {
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
    </motion.div>
  );
}
