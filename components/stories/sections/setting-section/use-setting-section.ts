import { useUpdateStorySettings } from '@/services/stories/stories.mutation';
import { useGetStorySettings } from '@/services/stories/stories.query';
import type { IStorySettings } from '@/type/story/story.types';
import { useState } from 'react';
import type { SettingTab } from './setting-section.types';

export function useSettingSection(slug: string | undefined) {
  const [activeTab, setActiveTab] = useState<SettingTab>('general');

  // Real data fetching
  const { data: storyData, isLoading } = useGetStorySettings(slug);
  const settings = storyData?.data;

  // Real data mutation
  const updateSettingsMutation = useUpdateStorySettings(slug || '');

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

    // TODO: Implement image upload API integration when needed
    if (type === 'card') {
      setCardUploading(true);
      setCardPreview(URL.createObjectURL(file));
      setTimeout(() => {
        setCardUploading(false);
      }, 1500);
    } else {
      setCoverUploading(true);
      setCoverPreview(URL.createObjectURL(file));
      setTimeout(() => {
        setCoverUploading(false);
      }, 1500);
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
