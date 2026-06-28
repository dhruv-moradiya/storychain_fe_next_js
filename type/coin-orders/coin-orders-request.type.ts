import { TCoinOrderCurrency } from './coin-orders.type';

interface ICoinOrderPayload {
  bundleSlug: string;
  couponCode?: string;
  currency: TCoinOrderCurrency;
}

interface ICoinOrderVerifyPayment {
  razorpayOrderId: string;
  razorpaySignature: string;
  razorpayPaymentId: string;
  coinOrderId: string;
}

export type { ICoinOrderPayload, ICoinOrderVerifyPayment };
