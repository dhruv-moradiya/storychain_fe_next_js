import { TCoinOrderCurrency } from './coin-orders.type';

interface ICoinOrderPayload {
  bundleSlug: string;
  couponCode?: string;
  currency: TCoinOrderCurrency;
}

export type { ICoinOrderPayload };
