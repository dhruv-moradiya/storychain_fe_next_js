import { z } from 'zod';
import { BaseSubmitRequestSchema, SubmitRequestTypeEnum } from './submit-request.api.schema';

const BaseFormShape = BaseSubmitRequestSchema.pick({
  title: true,
  description: true,
  prType: true,
  storyId: true,
  labels: true,
  isDraft: true,
});

export const SubmitRequestFormSchema = BaseFormShape.extend({
  proposedContent: z.string(),
  originalContent: z.string(),
  autoApproveEnabled: z.boolean(),
  draftId: z.string(),
  chapterSlug: z.string(),
  parentChapterSlug: z.string(),
}).superRefine((data, ctx) => {
  if (data.prType === SubmitRequestTypeEnum.enum.new_chapter) {
    if (!data.parentChapterSlug) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['parentChapterSlug'],
        message: 'Please select where to insert chapter',
      });
    }
    if (!data.proposedContent) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['proposedContent'],
        message: 'Proposed content is required',
      });
    }
  }

  if (data.prType === SubmitRequestTypeEnum.enum.edit_chapter) {
    if (!data.chapterSlug) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['chapterSlug'],
        message: 'Please select a chapter',
      });
    }
    if (!data.originalContent) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['originalContent'],
        message: 'Original content is required',
      });
    }
    if (!data.proposedContent) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['proposedContent'],
        message: 'Proposed content is required',
      });
    }
  }

  if (data.prType === SubmitRequestTypeEnum.enum.delete_chapter && !data.chapterSlug) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ['chapterSlug'],
      message: 'Please select a chapter',
    });
  }
});

export type TSubmitRequestFormData = z.infer<typeof SubmitRequestFormSchema>;
