import type { TChapterStatus } from './chapter/chapter.types';

export interface IChapterNode {
  _id: string;
  title: string;
  storyId: string;
  status: TChapterStatus;

  reportCount: number;
  prId: string | null;

  isFlagged: boolean;

  children: IChapterNode[];

  parentChapterId?: string | null;
  ancestorIds: string[];
  depth: number;

  author: {
    username: string;
    clerkId: string;
    avatarUrl: string;
  };

  votes: {
    upvotes: number;
    downvotes: number;
    score: number;
  };

  isEnding: boolean;

  version: number;

  stats: {
    reads: number;
    comments: number;
    childBranches: number;
  };

  createdAt: Date;
  updatedAt: Date;
}

export interface IChapterNodeData extends IChapterNode, Record<string, unknown> {
  onCommentClick: (nodeId: string) => void;
}
