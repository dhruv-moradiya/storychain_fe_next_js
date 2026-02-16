import { IStoryStats, TStoryContentRating, TStoryStatus } from '.';
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

export type { IUserStories, IUserStoriesResponse };
