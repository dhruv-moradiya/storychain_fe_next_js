import { TChapterReactionType } from './chapter.types';

interface IChapterStartReadingSessionRequest {
  storySlug: string;
  chapterSlug: string;
  sessionId: string;
}

interface IChapterRecordReadingSessionRequest {
  storySlug: string;
  chapterSlug: string;
  sessionId: string;
  duration: number; // Duration in seconds
}

interface ICommentCreateRequest {
  chapterSlug: string;
  content: string;
  parentCommentId?: string | undefined;
}

interface ICommentUpdateRequest {
  commentId: string;
  content: string;
}

interface ICommentDeleteRequest {
  commentId: string;
}

interface IGetCommentsRequest {
  chapterSlug: string;
  limit?: number;
  page?: number;
  parentCommentId?: string;
}

interface IReactToChapterRequest {
  slug: string;
  type: TChapterReactionType;
}

export type {
  IChapterStartReadingSessionRequest,
  IChapterRecordReadingSessionRequest,
  IGetCommentsRequest,
  ICommentCreateRequest,
  ICommentUpdateRequest,
  ICommentDeleteRequest,
  IReactToChapterRequest,
};
