import { COIN_TX_DIRECTIONS, COIN_TX_TYPES } from './transaction-enum';

export type TCoinTxType = (typeof COIN_TX_TYPES)[number];
export type TCoinTxDirection = (typeof COIN_TX_DIRECTIONS)[number];

export interface ICoinTransaction {
  _id: string;
  userId: string;
  type: TCoinTxType;
  /** Always positive — direction indicates credit or debit */
  amount: number;
  direction: TCoinTxDirection;

  /** wallet.balance snapshot before this transaction */
  balanceBefore: number;
  /** wallet.balance snapshot after this transaction */
  balanceAfter: number;

  // Context refs — only the relevant fields are set per transaction type
  coinOrderId?: string;
  withdrawalRequestId?: string;
  /** Set for CHAPTER_UNLOCK and CHAPTER_EARN */
  chapterSlug?: string;
  /** Set for story-related transactions */
  storySlug?: string;
  /** Set for REFERRAL_REWARD */
  referredUserId?: string;
  couponId?: string;

  /** Human-readable reason */
  note?: string;
  /** Extra context, e.g. roleShare breakdown for CHAPTER_EARN */
  metadata?: Record<string, unknown>;

  createdAt: Date;
  updatedAt: Date;
}
