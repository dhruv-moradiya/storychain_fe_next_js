import { IChapterTreeItem } from '@/components/stories/sections/tree-section/types/canvas.types';
import { IStoryStats, IStorySettings, TStoryContentRating, TStoryStatus } from '.';
import { IBaseResponse } from '../base-response.type';

interface IUserStories {
  _id: string;
  title: string;
  slug: string;
  description: string;

  coverImage?: {
    url: string;
    publicId: string;
  };

  cardImage?: {
    url: string;
    publicId: string;
  };

  creatorId: string;

  stats: IStoryStats;

  tags: string[];
  genres: string[];
  contentRating: TStoryContentRating;

  status: TStoryStatus;

  trendingScore: number;
  lastActivityAt: Date;
  publishedAt: Date;

  createdAt: Date;
  updatedAt: Date;
}

interface IUserStoriesResponse extends IBaseResponse<IUserStories[]> {}

interface IStoryTreeResponse extends IBaseResponse<{ chapters: IChapterTreeItem[] }> {}

interface IStorySettingsResponse extends IBaseResponse<{
  settings: IStorySettings;
  coverImage?: { url: string; publicId: string };
  cardImage?: { url: string; publicId: string };
}> {}

export type { IUserStories, IUserStoriesResponse, IStoryTreeResponse, IStorySettingsResponse };
