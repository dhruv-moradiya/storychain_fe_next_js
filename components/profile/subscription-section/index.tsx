'use client';

import { Coins } from 'lucide-react';

import { mockUserPayoutInfo, mockUserPayouts } from '@/lib/data/payout-data';
import { mockCoinTransactions, mockCoinWallet } from '@/lib/data/profile-subscription';

import { CoinSpendingCard } from './components/coin-spending-card';
import { CoinTransactionHistory } from './components/coin-transaction-history';
import { CoinWalletCard } from './components/coin-wallet-card';
import { PayoutSection } from './components/payout-section';

export function SubscriptionSection() {
  // In real app, fetch these from API
  const wallet = mockCoinWallet;
  const transactions = mockCoinTransactions;
  const payoutInfo = mockUserPayoutInfo;
  const payouts = mockUserPayouts;

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

      {/* Spending Breakdown + Transaction History side by side */}
      <div className="grid gap-6 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <CoinSpendingCard transactions={transactions} />
        </div>
        <div className="lg:col-span-3">
          <CoinTransactionHistory transactions={transactions} />
        </div>
      </div>
    </section>
  );
}

export default SubscriptionSection;
