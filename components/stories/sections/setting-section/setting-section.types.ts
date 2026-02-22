import type { IStorySettings } from '@/type/story/story.types';

export interface SettingTabProps {
  settings: IStorySettings;
  onSettingUpdate: <K extends keyof IStorySettings>(key: K, value: IStorySettings[K]) => void;
}

export interface ImageUploadState {
  preview: string | null;
  uploading: boolean;
}

export type SettingTab = 'general' | 'appearance' | 'collaboration' | 'notifications' | 'danger';
