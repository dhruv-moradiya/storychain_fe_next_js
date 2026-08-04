import { useQuery } from '@tanstack/react-query';

import { IGetAllTransactionsParams, TransactionsApi } from './transactions-api';

export const transactionKeys = {
  all: ['transactions'] as const,
  list: (params?: IGetAllTransactionsParams) => ['transactions', 'list', params] as const,
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
