export type PaymentStatus = 'SUCCESS' | 'FAILED' | 'PENDING' | 'REFUNDED';
export type PaymentMethod = 'UPI' | 'CARD' | 'NET_BANKING' | 'WALLET';

export interface CoinWallet {
  balance: number;
  totalEarned: number;
  totalSpent: number;
  lifetimePurchased: number;
}

export interface CoinTransaction {
  id: string;
  date: Date;
  type: 'PURCHASE' | 'SPEND' | 'EARN' | 'BONUS';
  coins: number;
  description: string;
  status: PaymentStatus;
  method?: PaymentMethod;
  amountPaid?: number; // in paise/cents (only for purchases)
  currency?: 'INR' | 'USD';
  invoiceUrl?: string;
}

export interface CoinSpendBreakdown {
  category: string;
  coinsSpent: number;
  icon: string; // icon key
  color: string;
  bgColor: string;
}
