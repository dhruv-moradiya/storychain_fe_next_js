enum CoinOrderStatus {
  PENDING = 'pending',
  PAID = 'paid',
  FAILED = 'failed',
  REFUNDED = 'refunded',
}

enum SupportedCurrency {
  INR = 'INR',
  USD = 'USD',
}

const COIN_ORDER_STATUSES = ['pending', 'paid', 'failed', 'refunded'] as const;

export { COIN_ORDER_STATUSES, CoinOrderStatus, SupportedCurrency };
