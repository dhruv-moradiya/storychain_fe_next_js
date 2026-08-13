import type { IStorySettings, TStoryStatus } from '@/type/story/story.types';

export interface SettingTabProps {
  settings: IStorySettings;
  onSettingUpdate: <K extends keyof IStorySettings>(key: K, value: IStorySettings[K]) => void;
  slug?: string;
  status?: TStoryStatus;
}

export interface ImageUploadState {
  preview: string | null;
  uploading: boolean;
}

export type SettingTab = 'general' | 'appearance' | 'collaboration' | 'notifications' | 'danger';
