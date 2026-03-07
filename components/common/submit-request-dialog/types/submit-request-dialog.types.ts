import { FileEdit, Plus, Trash2 } from 'lucide-react';
import { ComponentType } from 'react';
import { TSubmitRequestFormData } from '../schema/submit-request.form.schema';
import {
  TSubmitRequestApiPayload,
  TSubmitRequestLabel,
  TSubmitRequestType,
} from '../schema/submit-request.api.schema';

export interface SubmitRequestDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit?: (data: TSubmitRequestApiPayload) => void;
  storyId?: string;
  storyTitle?: string;
  storySlug?: string;
  parentChapterSlug?: string;
  parentChapterTitle?: string;
  draftId?: string;
  draftTitle?: string;
  draftContent?: string;
  chapterId?: string;
  submitRequestType?: TSubmitRequestType;
}

export interface SubmitRequestTypeConfig {
  value: TSubmitRequestType;
  label: string;
  description: string;
  icon: ComponentType<{ className?: string }>;
  colorClass: string;
  bgClass: string;
}

export interface DraftOption {
  id: string;
  title: string;
  content: string;
  updatedAt: string;
  wordCount: number;
  storySlug?: string;
}

export interface ChapterOption {
  id: string;
  title: string;
  order: number;
  content?: string;
}

export interface StoryOption {
  id: string;
  title: string;
  slug: string;
  genre: string;
  chapterCount: number;
}

export interface SubmitRequestDialogContextData {
  stories: StoryOption[];
  chapters: ChapterOption[];
  drafts: DraftOption[];
}

export interface SubmitRequestStepProps {
  context: SubmitRequestDialogContextData;
  hasContext: boolean;
}

export interface SubmitRequestStepConfig {
  name: string;
  fields: readonly (keyof TSubmitRequestFormData)[];
  component: ComponentType<SubmitRequestStepProps>;
}

export const SUBMIT_REQUEST_TYPES: readonly SubmitRequestTypeConfig[] = [
  {
    value: 'new_chapter',
    label: 'New Chapter',
    description: 'Add a new chapter to the story',
    icon: Plus,
    colorClass: 'text-[#10b981]',
    bgClass: 'bg-[#10b981]/15',
  },
  {
    value: 'edit_chapter',
    label: 'Edit Chapter',
    description: 'Propose changes to an existing chapter',
    icon: FileEdit,
    colorClass: 'text-brand-blue',
    bgClass: 'bg-brand-blue/15',
  },
  {
    value: 'delete_chapter',
    label: 'Delete Chapter',
    description: 'Request removal of a chapter',
    icon: Trash2,
    colorClass: 'text-[#ef4444]',
    bgClass: 'bg-[#ef4444]/15',
  },
];

export const LABELS: readonly { value: TSubmitRequestLabel; label: string }[] = [
  { value: 'needs_review', label: 'Needs Review' },
  { value: 'quality_issue', label: 'Quality Issue' },
  { value: 'grammar', label: 'Grammar' },
  { value: 'plot_hole', label: 'Plot Hole' },
  { value: 'good_first_submission', label: 'Good First Submission' },
];

export const MOCK_DIALOG_CONTEXT: SubmitRequestDialogContextData = {
  stories: [
    {
      id: 's1',
      title: 'The Whispering Woods',
      slug: 'whispering-woods',
      genre: 'Fantasy',
      chapterCount: 4,
    },
    {
      id: 's2',
      title: 'Neon Shadows',
      slug: 'neon-shadows',
      genre: 'Cyberpunk',
      chapterCount: 2,
    },
  ],
  chapters: [
    { id: 'root', title: 'Story Introduction', order: 0, content: 'Opening scene for context.' },
    { id: 'c1', title: 'The Silent Grove', order: 1, content: 'The woods were unusually quiet.' },
  ],
  drafts: [
    {
      id: 'd1',
      title: 'New Chapter Draft',
      content: 'The woods were darker than usual today...',
      updatedAt: '2024-03-04',
      wordCount: 156,
      storySlug: 'whispering-woods',
    },
  ],
};
