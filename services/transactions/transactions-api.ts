import { IBaseResponse } from '@/type/base-response.type';
import { ITransaction } from '@/type/transaction/transaction-response';

import apiClient from '@/lib/api-client';

export interface IGetAllTransactionsParams {
  page?: number;
  limit?: number;
  type?: string;
  direction?: string;
  userId?: string;
  search?: string;
}

export interface IPaginatedTransactionResponseData {
  docs: ITransaction[];
  totalDocs: number;
  limit: number;
  page: number;
  totalPages: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: number | null;
  nextPage: number | null;
}

export const TransactionsApi = {
  getAllTransactions: async (params?: IGetAllTransactionsParams) => {
    return await apiClient.get<IBaseResponse<IPaginatedTransactionResponseData>>('/transactions', {
      params,
    });
  },
};
