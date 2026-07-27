import { FileEdit, Plus } from 'lucide-react';

import { TPullRequestType } from './submit-request.schema';

// ---------------------------------------------------------------------------
// Submit Request type config (for the TypeStep cards)
// ---------------------------------------------------------------------------

export interface PullRequestTypeConfig {
  value: TPullRequestType;
  label: string;
  description: string;
  icon: React.ElementType;
  colorClass: string;
  bgClass: string;
}

export const PULL_REQUEST_TYPES: PullRequestTypeConfig[] = [
  {
    value: 'new_branch',
    label: 'New Branch',
    description: 'Add a new branch to the story',
    icon: Plus,
    colorClass: 'text-[#10b981]',
    bgClass: 'bg-[#10b981]/15',
  },
  {
    value: 'continuation',
    label: 'Continuation',
    description: 'Continue the story flow',
    icon: Plus,
    colorClass: 'text-brand-purple',
    bgClass: 'bg-brand-purple/15',
  },
  {
    value: 'edit',
    label: 'Edit Chapter',
    description: 'Propose changes to an existing chapter',
    icon: FileEdit,
    colorClass: 'text-brand-blue',
    bgClass: 'bg-brand-blue/15',
  },
];

// ---------------------------------------------------------------------------
// Data shapes for stories / chapters / drafts
// ---------------------------------------------------------------------------

export interface StoryOption {
  /** Unique slug (used as the form value) */
  slug: string;
  title: string;
  genre: string;
  chapterCount: number;
}

export interface ChapterOption {
  /** Unique slug (used as the form value) */
  slug: string;
  title: string;
  order: number;
  content?: string;
}

export interface DraftOption {
  id: string;
  title: string;
  content: string;
  updatedAt: string;
  wordCount: number;
  storySlug?: string;
  parentChapterSlug?: string;
}
