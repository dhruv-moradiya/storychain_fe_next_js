'use client';

import { useState } from 'react';

import type { PayoutRequest, UserPayoutInfo } from '@/type/payout';
import { format } from 'date-fns';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Banknote,
  Building2,
  CheckCircle,
  Clock,
  Coins,
  Loader2,
  Send,
  XCircle,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

interface PayoutSectionProps {
  payoutInfo: UserPayoutInfo;
  payouts: PayoutRequest[];
  availableEarnings: number; // coins available for payout
}

const statusConfig: Record<
  PayoutRequest['status'],
  { icon: typeof Clock; color: string; bg: string; label: string }
> = {
  PENDING: {
    icon: Clock,
    color: 'text-amber-500 dark:text-amber-400',
    bg: 'bg-amber-500/10',
    label: 'Pending',
  },
  APPROVED: {
    icon: CheckCircle,
    color: 'text-secondary',
    bg: 'bg-secondary/10',
    label: 'Approved',
  },
  REJECTED: {
    icon: XCircle,
    color: 'text-red-500 dark:text-red-400',
    bg: 'bg-red-500/10',
    label: 'Rejected',
  },
  PROCESSING: { icon: Loader2, color: 'text-primary', bg: 'bg-primary/10', label: 'Processing' },
  COMPLETED: {
    icon: CheckCircle,
    color: 'text-emerald-500 dark:text-emerald-400',
    bg: 'bg-emerald-500/10',
    label: 'Completed',
  },
};

function formatCoins(n: number): string {
  return new Intl.NumberFormat('en-IN').format(n);
}
function formatINR(paise: number): string {
  return `₹${new Intl.NumberFormat('en-IN').format(paise / 100)}`;
}

export function PayoutSection({ payoutInfo, payouts, availableEarnings }: PayoutSectionProps) {
  const [requestAmount, setRequestAmount] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const coinsToRequest = Number(requestAmount) || 0;
  const hasPendingPayout = payouts.some((p) => p.status === 'PENDING');
  const canRequest =
    coinsToRequest >= 50 && coinsToRequest <= availableEarnings && !hasPendingPayout;

  const handleSubmit = () => {
    if (!canRequest) return;
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setRequestAmount('');
      setTimeout(() => setSubmitSuccess(false), 3000);
    }, 1500);
  };

  const sortedPayouts = [...payouts].sort(
    (a, b) => b.requestedAt.getTime() - a.requestedAt.getTime()
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.15 }}
      className="border-border/50 bg-card rounded-2xl border p-6"
    >
      {/* Header */}
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10">
          <Banknote className="h-5 w-5 text-emerald-500" />
        </div>
        <div>
          <h3 className="text-foreground font-semibold">Payout Requests</h3>
          <p className="text-muted-foreground mt-0.5 text-xs">
            Withdraw your earned coins to your bank account
          </p>
        </div>
      </div>

      {/* Available earnings + Bank info */}
      <div className="mb-6 grid gap-4 sm:grid-cols-2">
        <div className="bg-muted/20 border-border/40 rounded-xl border p-4">
          <p className="text-muted-foreground mb-1 text-xs">Available for Payout</p>
          <div className="flex items-center gap-2">
            <Coins className="h-4 w-4 text-amber-500" />
            <span className="text-foreground font-libre-baskerville text-xl font-bold">
              {formatCoins(availableEarnings)}
            </span>
            <span className="text-muted-foreground text-xs">coins</span>
          </div>
          <p className="text-muted-foreground mt-1 text-[10px]">
            ≈ {formatINR(availableEarnings * 100)} equivalent
          </p>
        </div>

        <div className="bg-muted/20 border-border/40 rounded-xl border p-4">
          <p className="text-muted-foreground mb-1 text-xs">Linked Bank Account</p>
          {payoutInfo.isBankLinked ? (
            <div className="flex items-center gap-2">
              <Building2 className="text-muted-foreground h-4 w-4" />
              <div>
                <p className="text-foreground text-sm font-medium">
                  {payoutInfo.bankName} •••• {payoutInfo.bankAccountLast4}
                </p>
                <p className="text-muted-foreground text-[10px]">
                  IFSC: {payoutInfo.ifscCode} · {payoutInfo.accountHolderName}
                </p>
              </div>
            </div>
          ) : (
            <p className="text-muted-foreground text-sm">
              No bank account linked yet.{' '}
              <span className="text-primary cursor-pointer font-medium">Link now →</span>
            </p>
          )}
        </div>
      </div>

      {/* Request Form */}
      <div className="bg-muted/10 border-border/40 mb-6 rounded-xl border p-4">
        <p className="text-foreground mb-3 text-sm font-semibold">Request a Payout</p>

        {hasPendingPayout && (
          <div className="mb-3 flex items-center gap-2 rounded-lg bg-amber-500/10 px-3 py-2 text-amber-600 dark:text-amber-400">
            <Clock className="h-4 w-4 shrink-0" />
            <span className="text-xs">
              You have a pending payout request. Please wait for it to be processed.
            </span>
          </div>
        )}

        {submitSuccess && (
          <div className="mb-3 flex items-center gap-2 rounded-lg bg-emerald-500/10 px-3 py-2 text-emerald-600 dark:text-emerald-400">
            <CheckCircle className="h-4 w-4 shrink-0" />
            <span className="text-xs">Payout request submitted successfully!</span>
          </div>
        )}

        <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
          <div className="flex-1">
            <label className="text-muted-foreground mb-1.5 block text-xs font-medium">
              Coins to withdraw (min 50)
            </label>
            <Input
              type="number"
              placeholder="e.g. 200"
              value={requestAmount}
              onChange={(e) => setRequestAmount(e.target.value)}
              disabled={hasPendingPayout || !payoutInfo.isBankLinked}
              className="bg-card border-border/50"
              min={50}
              max={availableEarnings}
            />
            {coinsToRequest > 0 && (
              <p className="text-muted-foreground mt-1 text-[10px]">
                You will receive ≈ {formatINR(coinsToRequest * 100)} in your bank account
              </p>
            )}
          </div>
          <Button
            onClick={handleSubmit}
            disabled={!canRequest || isSubmitting}
            className="text-primary-foreground gap-2 bg-emerald-600 hover:bg-emerald-700"
          >
            {isSubmitting ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
            {isSubmitting ? 'Submitting...' : 'Request Payout'}
          </Button>
        </div>
      </div>

      {/* Payout History */}
      <div>
        <div className="mb-3 flex items-center justify-between">
          <h4 className="text-foreground text-sm font-semibold">Payout History</h4>
          <span className="text-muted-foreground text-xs">
            {payouts.length} request{payouts.length !== 1 ? 's' : ''}
          </span>
        </div>

        {sortedPayouts.length === 0 ? (
          <div className="text-muted-foreground bg-muted/10 rounded-xl py-8 text-center text-sm">
            No payout requests yet. Earn coins from your stories and request a withdrawal.
          </div>
        ) : (
          <ScrollArea className="h-[200px]">
            <div className="space-y-2 pr-4">
              {sortedPayouts.map((payout, index) => {
                const config = statusConfig[payout.status];
                const StatusIcon = config.icon;

                return (
                  <motion.div
                    key={payout.id}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.25, delay: index * 0.04 }}
                    className="group border-border/40 bg-muted/10 hover:bg-muted/20 flex items-center gap-3 rounded-xl border p-3 transition-all duration-200"
                  >
                    <div
                      className={cn(
                        'flex h-9 w-9 shrink-0 items-center justify-center rounded-lg',
                        config.bg
                      )}
                    >
                      <StatusIcon
                        className={cn(
                          'h-4 w-4',
                          config.color,
                          payout.status === 'PROCESSING' && 'animate-spin'
                        )}
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <p className="text-foreground text-sm font-medium">
                          {formatCoins(payout.coins)} coins
                        </p>
                        <ArrowRight className="text-muted-foreground h-3 w-3" />
                        <p className="text-muted-foreground text-xs">
                          {formatINR(payout.amountINR)}
                        </p>
                      </div>
                      <p className="text-muted-foreground text-xs">
                        {format(payout.requestedAt, 'MMM dd, yyyy')}
                        {payout.adminNote && ` · ${payout.adminNote}`}
                      </p>
                    </div>
                    <div
                      className={cn(
                        'flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium',
                        config.bg,
                        config.color
                      )}
                    >
                      {config.label}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </ScrollArea>
        )}
      </div>
    </motion.div>
  );
}
