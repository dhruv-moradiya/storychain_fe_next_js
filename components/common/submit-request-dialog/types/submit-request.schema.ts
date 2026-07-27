import { z } from 'zod';

// ---------------------------------------------------------------------------
// Enums
// ---------------------------------------------------------------------------

export const PullRequestTypeEnum = z.enum(['new_branch', 'continuation', 'edit']);
export type TPullRequestType = z.infer<typeof PullRequestTypeEnum>;

// ---------------------------------------------------------------------------
// Form Schema
// ---------------------------------------------------------------------------

export const SubmitRequestFormSchema = z.object({
  // SR metadata
  title: z.string().optional(),
  description: z.string().optional(),
  PullRequestType: PullRequestTypeEnum.optional(),

  // Slug-based selection (no IDs)
  storySlug: z.string().optional(),

  chapterSlug: z.string().optional(),
  parentChapterSlug: z.string().optional(),

  // Draft
  draftId: z.string().optional(),

  // Proposed content
  proposedContent: z.string().optional(),

  // SR options
  isDraft: z.boolean(),
  autoApproveEnabled: z.boolean(),
});

export type TSubmitRequestFormData = z.infer<typeof SubmitRequestFormSchema>;
