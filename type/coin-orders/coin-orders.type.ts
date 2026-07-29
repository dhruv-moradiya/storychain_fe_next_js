import { SUPPORTED_CURRENCIES } from '@/components/admin-dashboard/coins-packages/schema/coin-bundle.schema';

import { COIN_ORDER_STATUSES } from './coin-orders-enum';

export type TCoinOrderCurrency = (typeof SUPPORTED_CURRENCIES)[number];
export type TCoinOrderStatus = (typeof COIN_ORDER_STATUSES)[number];
