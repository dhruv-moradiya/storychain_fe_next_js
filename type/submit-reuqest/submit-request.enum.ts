enum SubmitRequestType {
  NEW_CHAPTER = 'new_chapter',
  EDIT_CHAPTER = 'edit_chapter',
  DELETE_CHAPTER = 'delete_chapter',
}

const SUBMIT_REQUEST_TYPE = ['new_chapter', 'edit_chapter', 'delete_chapter'] as const;

enum SRLabel {
  NEEDS_REVIEW = 'needs_review',
  QUALITY_ISSUE = 'quality_issue',
  GRAMMAR = 'grammar',
  PLOT_HOLE = 'plot_hole',
  GOOD_FIRST_SUBMISSION = 'good_first_submission',
}

const SR_LABELS = [
  'needs_review',
  'quality_issue',
  'grammar',
  'plot_hole',
  'good_first_submission',
] as const;

export { SubmitRequestType, SUBMIT_REQUEST_TYPE, SRLabel, SR_LABELS };
