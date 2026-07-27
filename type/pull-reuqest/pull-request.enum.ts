enum PullRequestType {
  NEW_BRANCH = 'new_branch',
  CONTINUATION = 'continuation',
  EDIT = 'edit',
}

const PULL_REQUEST_TYPE = ['new_branch', 'continuation', 'edit'] as const;

enum PRLabel {
  NEEDS_REVIEW = 'needs_review',
  QUALITY_ISSUE = 'quality_issue',
  GRAMMAR = 'grammar',
  PLOT_HOLE = 'plot_hole',
  GOOD_FIRST_SUBMISSION = 'good_first_submission',
}

const PR_LABELS = [
  'needs_review',
  'quality_issue',
  'grammar',
  'plot_hole',
  'good_first_submission',
] as const;

enum PRStatus {
  OPEN = 'open',
  APPROVED = 'approved',
  CLOSED = 'closed',
  MERGED = 'merged',
}

const PR_STATUSES = ['open', 'approved', 'closed', 'merged'] as const;

export { PullRequestType, PULL_REQUEST_TYPE, PRLabel, PR_LABELS, PRStatus, PR_STATUSES };
