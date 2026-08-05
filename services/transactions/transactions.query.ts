import { useQuery } from '@tanstack/react-query';

import {
  IGetAllTransactionsParams,
  IGetMyPurchasesParams,
  TransactionsApi,
} from './transactions-api';

export const transactionKeys = {
  all: ['transactions'] as const,
  list: (params?: IGetAllTransactionsParams) => ['transactions', 'list', params] as const,
  myPurchases: (params?: IGetMyPurchasesParams) => ['transactions', 'myPurchases', params] as const,
  userTransactions: (userId: string) => ['transactions', 'user', userId] as const,
};

export const useGetAllTransactions = (params?: IGetAllTransactionsParams) => {
  return useQuery({
    queryKey: transactionKeys.list(params),
    queryFn: async () => {
      const response = await TransactionsApi.getAllTransactions(params);
      return response.data;
    },
  });
};

export const useGetMyPurchases = (params?: IGetMyPurchasesParams) => {
  return useQuery({
    queryKey: transactionKeys.myPurchases(params),
    queryFn: async () => {
      const response = await TransactionsApi.getMyPurchases(params);
      return response.data;
    },
  });
};

export const useGetUserTransactions = (userId?: string) => {
  return useQuery({
    queryKey: transactionKeys.userTransactions(userId!),
    queryFn: async () => {
      const response = await TransactionsApi.getUserTransactions(userId!);
      return response.data;
    },
    enabled: Boolean(userId),
  });
};
