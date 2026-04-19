import { PR_LABELS, PR_STATUSES, PULL_REQUEST_TYPE } from './pull-request.enum';

type TPullRequestType = (typeof PULL_REQUEST_TYPE)[number];

type TPullRequestLabel = (typeof PR_LABELS)[number];

type TPRStatus = (typeof PR_STATUSES)[number];

export type { TPullRequestType, TPullRequestLabel, TPRStatus };
