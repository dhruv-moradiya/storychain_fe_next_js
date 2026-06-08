import { IBaseResponse } from '../base-response.type';

export type BundleType =
  | 'standard'
  | 'seasonal'
  | 'festival'
  | 'limited_time'
  | 'launch_event'
  | 'anniversary'
  | 'creator_partnership'
  | 'flash_sale'
  | 'first_purchase'
  | 'referral_reward';

export type RestrictionType = 'unlimited' | 'one_time' | 'daily' | 'monthly' | 'lifetime';
export type SupportedCurrency = 'INR' | 'USD';

export interface ICoinBundleThumbnail {
  url: string;
  publicId: string;
}

export interface ICoinBundleRestrictions {
  type: RestrictionType;
  dailyLimit: number | null;
  monthlyLimit: number | null;
  lifetimeLimit: number | null;
  firstPurchaseOnly: boolean;
  perUserLimit: number | null;
}

export interface ICoinBundle {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  bundleType: BundleType;
  baseCoins: number;
  bonusCoins: number;
  totalCoins: number;
  inrPrice: number;
  usdPrice?: number;
  currencies: SupportedCurrency[];
  thumbnail: ICoinBundleThumbnail;
  isFeatured: boolean;
  isPopular: boolean;
  displayOrder: number;
  promotionalBadge?: string;
  marketingTagline?: string;
  isActive: boolean;
  isDeleted: boolean;
  deletedAt: string | null;
  startDate?: string;
  endDate?: string;
  startTime?: string;
  endTime?: string;
  timezone: string;
  restrictions: ICoinBundleRestrictions;
  createdBy: string;
  updatedBy: string | null;
  createdAt: string;
  updatedAt: string;
}

// export interface ICoinBundle extends Pick<
//   ICoinBundle,
//   | '_id'
//   | 'name'
//   | 'slug'
//   | 'bundleType'
//   | 'baseCoins'
//   | 'bonusCoins'
//   | 'totalCoins'
//   | 'inrPrice'
//   | 'usdPrice'
//   | 'currencies'
//   | 'displayOrder'
//   | 'isActive'
//   | 'isDeleted'
//   | 'createdAt'
//   | 'updatedAt'
// > {}

export interface ICoinBundleListFilters {
  search?: string;
  isActive?: boolean;
  isDeleted?: boolean;
  bundleType?: BundleType;
  sortBy?: 'displayOrder' | 'createdAt' | 'name';
  sortOrder?: 'asc' | 'desc';
}

export interface ICreateCoinBundlePayload {
  name: string;
  slug?: string;
  description?: string;
  bundleType: BundleType;
  baseCoins: number;
  bonusCoins?: number;
  inrPrice: number;
  usdPrice?: number;
  currencies: SupportedCurrency[];
  thumbnail: ICoinBundleThumbnail;
  isFeatured?: boolean;
  isPopular?: boolean;
  displayOrder?: number;
  promotionalBadge?: string;
  marketingTagline?: string;
  isActive?: boolean;
  startDate?: string;
  endDate?: string;
  startTime?: string;
  endTime?: string;
  timezone?: string;
  restrictions?: {
    type: RestrictionType;
    dailyLimit?: number;
    monthlyLimit?: number;
    lifetimeLimit?: number;
    firstPurchaseOnly?: boolean;
    perUserLimit?: number;
  };
}

export type IUpdateCoinBundlePayload = Partial<Omit<ICreateCoinBundlePayload, 'slug'>>;

export interface ICoinBundleCreateResponse extends IBaseResponse<ICoinBundle> {}
export interface ICoinBundleUpdateResponse extends IBaseResponse<Partial<ICoinBundle>> {}

export interface ICoinBundleListResponse extends IBaseResponse<ICoinBundle[]> {}

export interface ICoinBundleToggleActiveResponse extends IBaseResponse<{
  slug: string;
  isActive: boolean;
  updatedAt: string;
}> {}

export interface ICoinBundleDisplayOrderResponse extends IBaseResponse<{
  slug: string;
  displayOrder: number;
  updatedAt: string;
}> {}

export interface ICoinBundleDeleteResponse extends IBaseResponse<{
  slug: string;
  isDeleted: boolean;
  deletedAt: string;
  deletedBy: string;
}> {}

export interface ICoinBundleThumbnailResponse extends IBaseResponse<{
  slug: string;
  thumbnail: ICoinBundleThumbnail;
  updatedAt: string;
}> {}
