import { TPullRequestType } from './pull-request.type';

export interface ICreatePullRequestRequest {
  title: string;
  description?: string;
  storySlug: string;
  prType: TPullRequestType;
  isDraft?: boolean;
  chapterSlug: string;
  parentChapterSlug: string;
  changes: {
    proposed?: string;
    original?: string;
  };
}
