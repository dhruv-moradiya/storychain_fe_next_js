import { z } from 'zod';

// ---------------------------------------------------------------------------
// Enums
// ---------------------------------------------------------------------------

export const PullRequestTypeEnum = z.enum(['new_chapter', 'edit_chapter', 'delete_chapter']);
export type TPullRequestType = z.infer<typeof PullRequestTypeEnum>;

export const SubmitRequestLabelEnum = z.enum([
  'needs_review',
  'quality_issue',
  'grammar',
  'plot_hole',
  'good_first_submission',
]);
export type TPullRequestLabel = z.infer<typeof SubmitRequestLabelEnum>;

// ---------------------------------------------------------------------------
// Form Schema
// ---------------------------------------------------------------------------

export const SubmitRequestFormSchema = z.object({
  // SR metadata
  title: z
    .string()
    .min(3, 'Title must be at least 3 characters')
    .max(120, 'Title cannot exceed 120 characters'),

  description: z
    .string()
    .min(10, 'Description must be at least 10 characters')
    .max(2000, 'Description cannot exceed 2000 characters'),

  PullRequestType: PullRequestTypeEnum,

  // Slug-based selection (no IDs)
  storySlug: z.string().min(1, 'Please select a story'),

  /**
   * chapterSlug: the chapter being edited or deleted (EDIT / DELETE)
   * parentChapterSlug: the chapter after which a new chapter is inserted (NEW)
   */
  chapterSlug: z.string().optional(),
  parentChapterSlug: z.string().optional(),

  // Draft
  draftId: z.string().optional(),

  // Proposed content
  proposedContent: z
    .string()
    .min(1, 'Proposed content is required')
    .max(100_000, 'Content too large'),

  // Labels
  labels: z.array(SubmitRequestLabelEnum).max(10, 'Maximum 10 labels allowed').optional(),

  // SR options
  isDraft: z.boolean(),
  autoApproveEnabled: z.boolean(),
});

export type TSubmitRequestFormData = z.infer<typeof SubmitRequestFormSchema>;
