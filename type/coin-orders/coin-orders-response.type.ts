import { IBaseResponse } from '../base-response.type';

interface ICreateCoinOrderResponse extends IBaseResponse<{
  coinOrderId: string;
  razorpayOrderId: string;
  amount: string | number;
  currency: string;
  bundle: {
    slug: string;
    name: string;
    totalCoins: number;
    baseCoins: number;
    bonusCoins: number;
  };
}> {}

export type { ICreateCoinOrderResponse };
