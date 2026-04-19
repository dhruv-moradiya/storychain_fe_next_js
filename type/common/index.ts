export interface IImageAsset {
  url: string;
  publicId: string;
}

export interface IUserBasicWithEmail {
  clerkId: string;
  email: string;
  username: string;
  avatarUrl: string;
}

export interface IUserBasic {
  clerkId: string;
  avatarUrl: string;
  username: string;
}

export interface IVotes {
  upvotes: number;
  downvotes: number;
  score: number;
}

export interface IPagination {
  totalDocs: number;
  limit: number;
  totalPages: number;
  page: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: number | null;
  nextPage: number | null;
}
