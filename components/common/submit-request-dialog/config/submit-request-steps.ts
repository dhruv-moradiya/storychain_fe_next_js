import { TSubmitRequestFormData } from '../schema/submit-request.form.schema';
import { ContentPreviewStep } from '../steps/content-preview-step';
import { DetailStep } from '../steps/detail-step';
import { ReviewStep } from '../steps/review-step';
import { SelectionStep } from '../steps/selection-step';
import { TypeStep } from '../steps/type-step';
import { SubmitRequestStepConfig } from '../types/submit-request-dialog.types';

const defineFields = <T extends readonly (keyof TSubmitRequestFormData)[]>(fields: T) => fields;

const TYPE_FIELDS = defineFields(['prType']);
const DETAILS_FIELDS = defineFields(['title', 'description', 'proposedContent', 'originalContent']);
const REVIEW_FIELDS = defineFields(['labels', 'isDraft', 'autoApproveEnabled']);
const SELECTION_FIELDS = defineFields(['storyId', 'draftId', 'chapterSlug', 'parentChapterSlug']);
const PREVIEW_FIELDS = defineFields(['proposedContent', 'originalContent']);

export function getSteps(hasContext: boolean): readonly SubmitRequestStepConfig[] {
  const common: readonly SubmitRequestStepConfig[] = [
    { name: 'Type', fields: TYPE_FIELDS, component: TypeStep },
    { name: 'Details', fields: DETAILS_FIELDS, component: DetailStep },
    { name: 'Preview', fields: PREVIEW_FIELDS, component: ContentPreviewStep },
    { name: 'Review', fields: REVIEW_FIELDS, component: ReviewStep },
  ];

  if (hasContext) {
    return common;
  }

  return [
    common[0],
    { name: 'Select', fields: SELECTION_FIELDS, component: SelectionStep },
    ...common.slice(1),
  ];
}

export function getDynamicFields(
  stepName: SubmitRequestStepConfig['name'],
  formData: TSubmitRequestFormData
): readonly (keyof TSubmitRequestFormData)[] {
  if (stepName === 'Details') {
    if (formData.prType === 'delete_chapter') {
      return ['title', 'description'];
    }

    if (formData.prType === 'new_chapter') {
      return ['title', 'description', 'proposedContent'];
    }

    return ['title', 'description', 'originalContent', 'proposedContent'];
  }

  if (stepName === 'Select') {
    if (formData.prType === 'new_chapter') {
      return ['storyId', 'draftId', 'parentChapterSlug'];
    }

    if (formData.prType === 'edit_chapter') {
      return ['storyId', 'draftId', 'chapterSlug'];
    }

    return ['storyId', 'chapterSlug'];
  }

  return [];
}
