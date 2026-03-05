import { z } from 'zod';

/**
 * Enums
 */
export const SubmitRequestTypeEnum = z.enum(['new_chapter', 'edit_chapter', 'delete_chapter']);
export type TSubmitRequestType = z.infer<typeof SubmitRequestTypeEnum>;

export const SubmitRequestLabelEnum = z.enum([
  'needs_review',
  'quality_issue',
  'grammar',
  'plot_hole',
  'good_first_submission',
]);
export type TSubmitRequestLabel = z.infer<typeof SubmitRequestLabelEnum>;

/**
 * Main Schema
 */
export const SubmitRequestFormSchema = z.object({
  title: z
    .string()
    .min(3, 'Title must be at least 3 characters')
    .max(120, 'Title cannot exceed 120 characters'),

  description: z
    .string()
    .min(10, 'Description must be at least 10 characters')
    .max(2000, 'Description cannot exceed 2000 characters'),

  submitRequestType: SubmitRequestTypeEnum,

  /**
   * Selection IDs
   */
  storyId: z.string().min(1, 'Please select a story'),
  // chapterId is the chapter being affected (EDIT/DELETE)
  chapterId: z.string().optional(),
  // parentChapterSlug is the chapter after which a new chapter is added (NEW)
  parentChapterSlug: z.string().optional(),

  draftId: z.string().optional(),

  /**
   * Proposed content
   */
  proposedContent: z
    .string()
    .min(1, 'Proposed content is required')
    .max(100000, 'Content too large'),

  /**
   * Labels
   */
  labels: z.array(SubmitRequestLabelEnum).max(10, 'Maximum 10 labels allowed').optional(),

  /**
   * Submit Request Options
   */
  isDraft: z.boolean(),
  autoApproveEnabled: z.boolean(),
});

export type TSubmitRequestFormData = z.infer<typeof SubmitRequestFormSchema>;
