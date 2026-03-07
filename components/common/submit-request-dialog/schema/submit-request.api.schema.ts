import { z } from 'zod';

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

export const BaseSubmitRequestSchema = z.strictObject({
  title: z
    .string()
    .min(3, 'Title must be at least 3 characters')
    .max(120, 'Title cannot exceed 120 characters'),
  description: z
    .string()
    .min(10, 'Description must be at least 10 characters')
    .max(2000, 'Description cannot exceed 2000 characters'),
  prType: SubmitRequestTypeEnum,
  storyId: z.string().min(1, 'Please select a story'),
  labels: z.array(SubmitRequestLabelEnum).max(10, 'Maximum 10 labels allowed'),
  isDraft: z.boolean(),
  autoApproveEnabled: z.boolean(),
});

const NewChapterSubmitRequestSchema = BaseSubmitRequestSchema.extend({
  prType: z.literal('new_chapter'),
  parentChapterSlug: z.string().min(1, 'Please select where to insert chapter'),
  draftId: z.string().min(1).optional(),
  proposedContent: z
    .string()
    .min(1, 'Proposed content is required')
    .max(100000, 'Content too large'),
});

const EditChapterSubmitRequestSchema = BaseSubmitRequestSchema.extend({
  prType: z.literal('edit_chapter'),
  chapterSlug: z.string().min(1, 'Please select a chapter'),
  draftId: z.string().min(1).optional(),
  originalContent: z.string().min(1, 'Original content is required'),
  proposedContent: z
    .string()
    .min(1, 'Proposed content is required')
    .max(100000, 'Content too large'),
});

const DeleteChapterSubmitRequestSchema = BaseSubmitRequestSchema.extend({
  prType: z.literal('delete_chapter'),
  chapterSlug: z.string().min(1, 'Please select a chapter'),
  originalContent: z.string().min(1, 'Original content is required').optional(),
});

export const SubmitRequestApiSchema = z.discriminatedUnion('prType', [
  NewChapterSubmitRequestSchema,
  EditChapterSubmitRequestSchema,
  DeleteChapterSubmitRequestSchema,
]);

export type TSubmitRequestApiPayload = z.infer<typeof SubmitRequestApiSchema>;
