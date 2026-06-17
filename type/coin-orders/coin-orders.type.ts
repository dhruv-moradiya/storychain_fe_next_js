import { SUPPORTED_CURRENCIES } from '@/components/admin-dashboard/coins-packages/schema/coin-bundle.schema';

export type TCoinOrderCurrency = (typeof SUPPORTED_CURRENCIES)[number];
