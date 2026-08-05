import { BanType } from './user-enum';

export interface IPaginatedUserQueryParams {
  page?: number;
  limit?: number;
  search?: string;
}

export type TBanType = (typeof BanType)[keyof typeof BanType];
