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

export type { IChapterStartReadingSessionRequest, IChapterRecordReadingSessionRequest };
