import { IBaseResponse } from '..';
import { TCoinOrderCurrency, TCoinOrderStatus } from '../coin-orders/coin-orders.type';
import { ICoinTransaction } from './transaction.types';

export interface ITransactionUser {
  clerkId: string;
  username: string;
  email: string;
  avatarUrl: string;
}

export interface ITransactionOrder {
  id: string;

  baseCoins: number;
  bonusCoins: number;
  totalCoins: number;

  currency: TCoinOrderCurrency;
  finalAmount: number;

  razorpayOrderId: string;
  status: TCoinOrderStatus;
}

export interface ITransaction extends ICoinTransaction {
  user: ITransactionUser | null;
  order: ITransactionOrder | null;
}

export interface ITransactionResponse extends IBaseResponse<ITransaction[]> {}

export interface IWalletFinancialSummary {
  currentCoinBalance: number;
  totalCoinsPurchased: number;
  totalCoinsSpent: number;
  totalAmountSpent: number;
  totalWithdrawn: number;
  pendingWithdrawals: number;
}

export interface IUserTransactionsWithSummary {
  summary: IWalletFinancialSummary;
  transactions: ITransaction[];
}

export interface IUserTransactionsResponse extends IBaseResponse<IUserTransactionsWithSummary> {}
