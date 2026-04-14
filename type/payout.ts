export type PayoutStatus = 'PENDING' | 'APPROVED' | 'REJECTED' | 'PROCESSING' | 'COMPLETED';

export interface PayoutRequest {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  userAvatar?: string;
  coins: number;
  amountINR: number; // derived: coins × 1 in paise
  bankAccountLast4: string;
  ifscCode: string;
  bankName: string;
  status: PayoutStatus;
  requestedAt: Date;
  processedAt?: Date;
  adminNote?: string;
  razorpayPayoutId?: string;
}

export interface UserPayoutInfo {
  bankAccountLast4: string;
  ifscCode: string;
  bankName: string;
  accountHolderName: string;
  isBankLinked: boolean;
}
