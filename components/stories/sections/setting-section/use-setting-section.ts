import { useState } from 'react';
import { toast } from 'sonner';
import type { IStorySettings } from '@/type/story/story.types';
import type { SettingTab } from './setting-section.types';

export function useSettingSection(slug: string | undefined) {
  const [activeTab, setActiveTab] = useState<SettingTab>('general');

  // Mock settings
  const [settings, setSettings] = useState<{
    settings: IStorySettings;
    cardImage?: { url: string };
    coverImage?: { url: string };
  } | null>({
    settings: {
      isPublic: true,
      allowBranching: true,
      requireApproval: true,
      allowComments: true,
      allowVoting: true,
      genres: ['fantasy', 'adventure'],
      contentRating: 'teen',
    },
    cardImage: { url: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400' },
    coverImage: { url: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1200' },
  });

  const isLoading = false;

  const [cardUploading, setCardUploading] = useState(false);
  const [coverUploading, setCoverUploading] = useState(false);
  const [cardPreview, setCardPreview] = useState<string | null>(null);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);

  const handleSettingUpdate = (key: keyof IStorySettings, value: boolean | string) => {
    toast.success(`Updated ${key} to ${value}`);
    setSettings((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        settings: {
          ...prev.settings,
          [key]: value,
        },
      };
    });
  };

  const handleImageUpload = async (file: File, type: 'card' | 'cover') => {
    if (!slug) return;

    if (type === 'card') {
      setCardUploading(true);
      setCardPreview(URL.createObjectURL(file));
      setTimeout(() => {
        setCardUploading(false);
        toast.success('Card image updated');
      }, 1500);
    } else {
      setCoverUploading(true);
      setCoverPreview(URL.createObjectURL(file));
      setTimeout(() => {
        setCoverUploading(false);
        toast.success('Cover image updated');
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
