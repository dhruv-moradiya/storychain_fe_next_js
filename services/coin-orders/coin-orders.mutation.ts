import {
  ICoinOrderPayload,
  ICoinOrderVerifyPayment,
} from '@/type/coin-orders/coin-orders-request.type';
import { useMutation } from '@tanstack/react-query';

import { CoinOrderAPi } from './coin-orders.api';

export const useCreateCoinOrder = () => {
  return useMutation({
    mutationFn: (payload: ICoinOrderPayload) => CoinOrderAPi.createOrder(payload),
  });
};

export const useCoinOrderVerifyPayment = () => {
  return useMutation({
    mutationFn: (payload: ICoinOrderVerifyPayment) => CoinOrderAPi.verifyPayment(payload),
  });
};
