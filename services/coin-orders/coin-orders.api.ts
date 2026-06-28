import {
  ICoinOrderPayload,
  ICoinOrderVerifyPayment,
} from '@/type/coin-orders/coin-orders-request.type';
import { ICreateCoinOrderResponse } from '@/type/coin-orders/coin-orders-response.type';
import { AxiosResponse } from 'axios';

import apiClient from '@/lib/api-client';

const CoinOrderAPi = {
  createOrder: async (
    payload: ICoinOrderPayload
  ): Promise<AxiosResponse<ICreateCoinOrderResponse>> => {
    return await apiClient.post<ICreateCoinOrderResponse>('/coin-orders', payload);
  },

  verifyPayment: async (payload: ICoinOrderVerifyPayment) => {
    return await apiClient.post('/coin-orders/verify-payment', payload);
  },
};

export { CoinOrderAPi };
