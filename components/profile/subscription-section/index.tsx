'use client';

import { Coins } from 'lucide-react';

import { mockUserPayoutInfo, mockUserPayouts } from '@/lib/data/payout-data';
import { mockCoinWallet } from '@/lib/data/profile-subscription';
import { useGetMyPurchases } from '@/services/transactions/transactions.query';

import { CoinTransactionHistory } from './components/coin-transaction-history';
import { CoinWalletCard } from './components/coin-wallet-card';
import { PayoutSection } from './components/payout-section';

export function SubscriptionSection() {
  const { data: myPurchasesData, isLoading: isPurchasesLoading } = useGetMyPurchases();

  const wallet = mockCoinWallet;
  const payoutInfo = mockUserPayoutInfo;
  const payouts = mockUserPayouts;

  const transactions = myPurchasesData?.data?.docs || [];

  return (
    <section className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center gap-3">
        <div className="from-primary/20 to-accent/20 flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br">
          <Coins className="text-primary h-5 w-5" />
        </div>
        <div>
          <h2 className="text-foreground text-lg font-semibold">Coin Wallet</h2>
          <p className="text-muted-foreground text-sm">
            Manage your coins, payouts, and transactions
          </p>
        </div>
      </div>

      {/* Coin Wallet Balance */}
      <CoinWalletCard wallet={wallet} />

      {/* Payout Requests */}
      <PayoutSection
        payoutInfo={payoutInfo}
        payouts={payouts}
        availableEarnings={wallet.totalEarned}
      />

      {/* Transaction History */}
      <div className="w-full">
        <CoinTransactionHistory transactions={transactions} isLoading={isPurchasesLoading} />
      </div>
    </section>
  );
}

export default SubscriptionSection;
