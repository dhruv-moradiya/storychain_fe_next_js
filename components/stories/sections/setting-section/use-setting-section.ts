import { useState } from 'react';

import type { IStorySettings } from '@/type/story/story.types';

import { useUpdateStorySettings, useUploadStoryImage } from '@/services/stories/stories.mutation';
import { useGetStorySettings } from '@/services/stories/stories.query';

import type { SettingTab } from './setting-section.types';

export function useSettingSection(slug: string | undefined) {
  const [activeTab, setActiveTab] = useState<SettingTab>('general');

  // Real data fetching
  const { data: storyData, isLoading } = useGetStorySettings(slug);
  const settings = storyData?.data;

  // Real data mutation
  const updateSettingsMutation = useUpdateStorySettings(slug || '');
  const uploadImageMutation = useUploadStoryImage(slug || '');

  const [cardUploading, setCardUploading] = useState(false);
  const [coverUploading, setCoverUploading] = useState(false);
  const [cardPreview, setCardPreview] = useState<string | null>(null);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);

  const handleSettingUpdate = <K extends keyof IStorySettings>(
    key: K,
    value: IStorySettings[K]
  ) => {
    if (!settings?.settings) return;

    // Send the full settings object to prevent overwriting other fields with defaults
    const updatedSettings = {
      ...settings.settings,
      [key]: value,
    };

    updateSettingsMutation.mutate(updatedSettings);
  };

  const handleImageUpload = async (file: File, type: 'card' | 'cover') => {
    if (!slug) return;

    if (type === 'card') {
      setCardUploading(true);
      setCardPreview(URL.createObjectURL(file));
      uploadImageMutation.mutate(
        { file, type },
        {
          onSettled: () => {
            setCardUploading(false);
            setCardPreview(null);
          },
        }
      );
    } else {
      setCoverUploading(true);
      setCoverPreview(URL.createObjectURL(file));
      uploadImageMutation.mutate(
        { file, type },
        {
          onSettled: () => {
            setCoverUploading(false);
            setCoverPreview(null);
          },
        }
      );
    }
  };

  return {
    // State
    activeTab,
    setActiveTab,
    settings,
    isLoading,

    // Image upload state
    cardPreview,
    coverPreview,
    cardUploading,
    coverUploading,

    // Handlers
    handleSettingUpdate,
    handleImageUpload,
    setCardPreview,
    setCoverPreview,
  };
}
