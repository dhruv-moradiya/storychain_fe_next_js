import { TSubmitRequestFormData } from './submit-request.form.schema';
import { TSubmitRequestApiPayload } from './submit-request.api.schema';

export function mapFormToSubmitRequest(data: TSubmitRequestFormData): TSubmitRequestApiPayload {
  const basePayload = {
    title: data.title,
    description: data.description,
    storyId: data.storyId,
    labels: data.labels,
    isDraft: data.isDraft,
    autoApproveEnabled: data.autoApproveEnabled,
  };

  if (data.prType === 'new_chapter') {
    return {
      ...basePayload,
      prType: 'new_chapter',
      parentChapterSlug: data.parentChapterSlug,
      draftId: data.draftId || undefined,
      proposedContent: data.proposedContent,
    };
  }

  if (data.prType === 'edit_chapter') {
    return {
      ...basePayload,
      prType: 'edit_chapter',
      chapterSlug: data.chapterSlug,
      draftId: data.draftId || undefined,
      originalContent: data.originalContent,
      proposedContent: data.proposedContent,
    };
  }

  return {
    ...basePayload,
    prType: 'delete_chapter',
    chapterSlug: data.chapterSlug,
    originalContent: data.originalContent || undefined,
  };
}
