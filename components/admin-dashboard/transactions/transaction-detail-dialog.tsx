'use client';

import { ITransaction } from '@/type/transaction/transaction-response';
import { format } from 'date-fns';
import { ArrowDownLeft, ArrowUpRight, BookOpen, Coins, Layers } from 'lucide-react';

import { coinTxDirectionBadge, coinTxTypeBadge } from '@/components/common/badge';
import { CopyButton } from '@/components/copy-button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { getInitials } from '@/lib/utils';

interface TransactionDetailDialogProps {
  transaction: ITransaction | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function TransactionDetailDialog({
  transaction,
  open,
  onOpenChange,
}: TransactionDetailDialogProps) {
  if (!transaction) return null;

  const isCredit = transaction.direction === 'credit';
  const user = transaction.user;
  const order = transaction.order;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-card border-border/50 max-w-lg rounded-2xl p-6 shadow-xl">
        <DialogHeader className="text-left sm:text-left">
          <div className="flex items-center gap-3">
            <div
              className={`flex h-11 w-11 items-center justify-center rounded-2xl border ${
                isCredit
                  ? 'border-emerald-500/20 bg-emerald-500/10 text-emerald-500'
                  : 'border-rose-500/20 bg-rose-500/10 text-rose-500'
              }`}
            >
              {isCredit ? (
                <ArrowDownLeft className="size-6" />
              ) : (
                <ArrowUpRight className="size-6" />
              )}
            </div>
            <div>
              <DialogTitle className="text-text-primary text-lg font-bold tracking-tight">
                Transaction Details
              </DialogTitle>
              <DialogDescription className="text-text-secondary-65 flex items-center gap-1.5 font-mono text-xs">
                <span>ID: {transaction._id}</span>
                <CopyButton text={transaction._id} size="icon-xs" className="h-4 w-4" />
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-4 py-2">
          {/* Status & Type Badges Bar */}
          <div className="border-border/40 bg-muted/20 flex flex-wrap items-center justify-between gap-2 rounded-xl border p-3">
            <div className="flex items-center gap-2">
              {coinTxTypeBadge(transaction.type)}
              {coinTxDirectionBadge(transaction.direction)}
            </div>
            <span className="text-text-secondary-65 font-mono text-xs">
              {transaction.createdAt
                ? format(new Date(transaction.createdAt), 'MMM dd, yyyy · hh:mm a')
                : 'N/A'}
            </span>
          </div>

          {/* Amount Card */}
          <div className="border-border/50 from-background via-muted/10 to-background space-y-3 rounded-2xl border bg-linear-to-br p-4">
            <div className="flex items-center justify-between">
              <span className="text-text-secondary-65 text-xs font-semibold tracking-wider uppercase">
                Transaction Value
              </span>
              <div className="flex items-center gap-1">
                <Coins className="size-4 text-amber-500" />
                <span
                  className={`font-mono text-xl font-extrabold ${
                    isCredit ? 'text-emerald-500' : 'text-rose-500'
                  }`}
                >
                  {isCredit ? '+' : '-'}
                  {transaction.amount?.toLocaleString()} Coins
                </span>
              </div>
            </div>

            {/* Wallet Balance Snapshot */}
            <div className="border-border/30 grid grid-cols-2 gap-3 border-t pt-2 text-xs">
              <div className="space-y-0.5">
                <span className="text-text-secondary-50 text-[11px]">Balance Before</span>
                <p className="text-text-primary font-mono font-semibold">
                  {transaction.balanceBefore?.toLocaleString() ?? 0} Coins
                </p>
              </div>
              <div className="space-y-0.5">
                <span className="text-text-secondary-50 text-[11px]">Balance After</span>
                <p className="text-text-primary font-mono font-semibold">
                  {transaction.balanceAfter?.toLocaleString() ?? 0} Coins
                </p>
              </div>
            </div>
          </div>

          {/* User Info Card */}
          {user && (
            <div className="space-y-2">
              <span className="text-text-secondary-65 text-[11px] font-bold tracking-wider uppercase">
                Account Holder
              </span>
              <div className="border-border/40 bg-card flex items-center gap-3 rounded-xl border p-3">
                <Avatar className="ring-border/40 h-10 w-10 ring-1">
                  {user.avatarUrl && <AvatarImage src={user.avatarUrl} alt={user.username} />}
                  <AvatarFallback className="bg-primary/10 text-primary text-xs font-bold">
                    {getInitials(user.username || user.email || 'User')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex min-w-0 flex-1 flex-col">
                  <span className="text-text-primary truncate text-sm font-semibold">
                    {user.username || 'User'}
                  </span>
                  <span className="text-text-secondary-65 truncate text-xs">{user.email}</span>
                </div>
                <div className="text-text-secondary-50 flex items-center gap-1 font-mono text-[11px]">
                  <span>{user.clerkId.slice(0, 10)}...</span>
                  <CopyButton text={user.clerkId} size="icon-xs" className="h-4 w-4" />
                </div>
              </div>
            </div>
          )}

          {/* Order Details Card (If Purchase Order Exists) */}
          {order && (
            <div className="space-y-2">
              <span className="text-text-secondary-65 text-[11px] font-bold tracking-wider uppercase">
                Razorpay Purchase Order
              </span>
              <div className="border-border/40 bg-card space-y-2 rounded-xl border p-3 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-text-secondary-65">Amount Paid:</span>
                  <span className="text-text-primary font-mono font-bold">
                    {order.currency === 'INR' ? '₹' : order.currency}{' '}
                    {(order.finalAmount / 100).toLocaleString('en-IN', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-text-secondary-65">Coin Breakdown:</span>
                  <span className="text-text-primary font-mono">
                    {order.baseCoins} base + {order.bonusCoins} bonus = {order.totalCoins} total
                  </span>
                </div>
                {order.razorpayOrderId && (
                  <div className="border-border/30 flex items-center justify-between border-t pt-1">
                    <span className="text-text-secondary-65">Razorpay Order ID:</span>
                    <div className="text-text-primary flex items-center gap-1 font-mono">
                      <span>{order.razorpayOrderId}</span>
                      <CopyButton text={order.razorpayOrderId} size="icon-xs" className="h-4 w-4" />
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Contextual Notes & References */}
          {(transaction.storySlug || transaction.chapterSlug || transaction.note) && (
            <div className="space-y-2">
              <span className="text-text-secondary-65 text-[11px] font-bold tracking-wider uppercase">
                Transaction Context
              </span>
              <div className="border-border/40 bg-muted/10 space-y-1.5 rounded-xl border p-3 text-xs">
                {transaction.storySlug && (
                  <div className="flex items-center gap-2">
                    <BookOpen className="size-3.5 shrink-0 text-indigo-500" />
                    <span className="text-text-secondary-65">Story:</span>
                    <code className="text-text-primary font-mono">{transaction.storySlug}</code>
                  </div>
                )}
                {transaction.chapterSlug && (
                  <div className="flex items-center gap-2">
                    <Layers className="size-3.5 shrink-0 text-emerald-500" />
                    <span className="text-text-secondary-65">Chapter:</span>
                    <code className="text-text-primary font-mono">{transaction.chapterSlug}</code>
                  </div>
                )}
                {transaction.note && (
                  <div className="text-text-secondary-65 pt-1 leading-relaxed italic">
                    "{transaction.note}"
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-end pt-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => onOpenChange(false)}
            className="border-border/50 rounded-xl text-xs font-semibold"
          >
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default TransactionDetailDialog;
