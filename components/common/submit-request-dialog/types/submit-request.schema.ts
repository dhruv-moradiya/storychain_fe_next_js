import { z } from 'zod';

/**
 * Enums
 */
export const PRTypeEnum = z.enum(['new_chapter', 'edit_chapter', 'delete_chapter']);

export const PRLabelEnum = z.enum(['feature', 'fix', 'content', 'improvement', 'refactor']);

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

  submitRequestType: PRTypeEnum,

  /**
   * Story Info
   */
  storyId: z.string().min(1, 'Story ID is required'),

  storyTitle: z.string().min(1, 'Story title is required').max(200, 'Story title too long'),

  storySlug: z
    .string()
    .min(1, 'Story slug is required')
    .regex(/^[a-z0-9-]+$/, 'Story slug must contain only lowercase letters, numbers, and hyphens'),

  /**
   * Chapter Info
   */
  chapterId: z.string().min(1, 'Chapter ID is required'),

  parentChapterId: z.string().optional(),

  parentChapterTitle: z.string().optional(),

  /**
   * Draft Info (for new chapter)
   */
  draftId: z.string().optional(),

  draftTitle: z.string().max(200, 'Draft title cannot exceed 200 characters').optional(),

  draftContent: z.string().max(100000, 'Draft content too large').optional(),

  /**
   * Proposed change
   */
  proposedContent: z
    .string()
    .min(1, 'Proposed content is required')
    .max(100000, 'Content too large'),

  /**
   * Labels
   */
  labels: z.array(PRLabelEnum).max(10, 'Maximum 10 labels allowed'),

  /**
   * PR Options
   */
  isDraft: z.boolean(),

  autoApproveEnabled: z.boolean(),
});
/**
 * Conditional validation
 */
/*.superRefine((data, ctx) => {
    if (data.prType === 'new_chapter') {
      if (!data.draftId) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Draft ID is required for new chapter PR',
          path: ['draftId'],
        });
      }

      if (!data.draftTitle) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Draft title is required for new chapter PR',
          path: ['draftTitle'],
        });
      }

      if (!data.draftContent) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Draft content is required for new chapter PR',
          path: ['draftContent'],
        });
      }
    }
  });*/

/**
 * Type inference
 */
export type TSubmitRequestFormData = z.infer<typeof SubmitRequestFormSchema>;
