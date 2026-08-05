'use client';

import { useParams, useRouter } from 'next/navigation';
import * as React from 'react';
import { useState } from 'react';

import { ITransaction } from '@/type/transaction/transaction-response';
import { format } from 'date-fns';

import { TransactionDetailDialog } from '@/components/admin-dashboard/transactions/transaction-detail-dialog';
import { coinTxDirectionBadge, coinTxTypeBadge } from '@/components/common/badge';
import { CopyButton } from '@/components/copy-button';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { cn } from '@/lib/utils';
import { useGetUserTransactions } from '@/services/transactions/transactions.query';

export const RecentTransactions = () => {
  const params = useParams();
  const router = useRouter();
  const userId = (params?.id as string) || '';

  const [selectedTransaction, setSelectedTransaction] = useState<ITransaction | null>(null);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);

  const { data: responseData, isLoading, isError } = useGetUserTransactions(userId);
  const transactions = responseData?.data?.transactions || [];
  const firstFiveTransactions = transactions.slice(0, 5);

  const getTransactionDetails = (tx: ITransaction) => {
    if (tx.note) return tx.note;
    if (tx.storySlug) return `Story: ${tx.storySlug}`;
    if (tx.chapterSlug) return `Chapter: ${tx.chapterSlug}`;
    if (tx.coinOrderId) return `Order ID: ${tx.coinOrderId.slice(0, 12)}...`;
    return '-';
  };

  const getFormattedDate = (dateVal: string | Date) => {
    try {
      return format(new Date(dateVal), 'MMM dd, yyyy · hh:mm a');
    } catch {
      return String(dateVal);
    }
  };

  const getAmountSpent = (tx: ITransaction) => {
    if (tx.order && typeof tx.order.finalAmount === 'number') {
      return `₹${(tx.order.finalAmount / 100).toLocaleString('en-IN', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`;
    }
    return '-';
  };

  const handleSelectTx = (tx: ITransaction) => {
    setSelectedTransaction(tx);
    setIsDetailDialogOpen(true);
  };

  return (
    <div className="border-border/50 bg-cream-95/80 dark:bg-card/50 relative col-span-8 overflow-hidden rounded-xl border p-6 shadow-2xs">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h3 className="text-text-primary text-lg font-bold">Recent Transactions</h3>
          {transactions.length > 0 && (
            <span className="bg-primary/10 text-primary rounded-full px-2 py-0.5 font-mono text-[11px] font-semibold">
              {transactions.length}
            </span>
          )}
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => router.push(`/dashboard/users/${userId}/transactions`)}
          disabled={isLoading || transactions.length === 0}
          className="border-border/80 bg-background text-text-primary hover:bg-brand-warm-beige/20 flex h-9 cursor-pointer items-center justify-center rounded-lg px-4 text-xs font-semibold shadow-2xs transition-all duration-200 hover:shadow-xs active:scale-98"
        >
          View All
        </Button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <Table className="w-full min-w-125">
          <TableHeader>
            <TableRow className="border-border/20 border-b hover:bg-transparent">
              <TableHead className="text-text-secondary-65 pb-3 text-xs font-semibold">
                Date &amp; Time
              </TableHead>
              <TableHead className="text-text-secondary-65 pb-3 text-xs font-semibold">
                Transaction ID
              </TableHead>
              <TableHead className="text-text-secondary-65 pb-3 text-xs font-semibold">
                Type
              </TableHead>
              <TableHead className="text-text-secondary-65 pb-3 text-xs font-semibold">
                Details
              </TableHead>
              <TableHead className="text-text-secondary-65 pb-3 text-xs font-semibold">
                Coins
              </TableHead>
              <TableHead className="text-text-secondary-65 pb-3 text-xs font-semibold">
                Amount
              </TableHead>
              <TableHead className="text-text-secondary-65 pb-3 text-xs font-semibold">
                Direction
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              Array.from({ length: 5 }).map((_, index) => (
                <TableRow key={index} className="border-border/10">
                  <TableCell className="py-3.5">
                    <Skeleton className="h-4 w-28" />
                  </TableCell>
                  <TableCell className="py-3.5">
                    <Skeleton className="h-4 w-24" />
                  </TableCell>
                  <TableCell className="py-3.5">
                    <Skeleton className="h-4 w-20" />
                  </TableCell>
                  <TableCell className="py-3.5">
                    <Skeleton className="h-4 w-32" />
                  </TableCell>
                  <TableCell className="py-3.5">
                    <Skeleton className="h-4 w-16" />
                  </TableCell>
                  <TableCell className="py-3.5">
                    <Skeleton className="h-4 w-16" />
                  </TableCell>
                  <TableCell className="py-3.5">
                    <Skeleton className="h-4 w-16" />
                  </TableCell>
                </TableRow>
              ))
            ) : isError ? (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="py-8 text-center text-xs font-medium text-rose-500"
                >
                  Failed to load transactions.
                </TableCell>
              </TableRow>
            ) : firstFiveTransactions.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-text-secondary-50 py-8 text-center text-xs">
                  No transactions found for this user.
                </TableCell>
              </TableRow>
            ) : (
              firstFiveTransactions.map((txn) => {
                const isCredit = txn.direction === 'credit';

                return (
                  <TableRow
                    key={txn._id}
                    onClick={() => handleSelectTx(txn)}
                    className="border-border/10 hover:bg-muted/10 cursor-pointer transition-colors last:border-0"
                  >
                    <TableCell className="text-text-secondary-65 py-3.5 text-xs whitespace-nowrap">
                      {getFormattedDate(txn.createdAt)}
                    </TableCell>
                    <TableCell className="py-3.5">
                      <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                        <CopyButton
                          text={txn._id}
                          size="icon-xs"
                          className="text-text-secondary-50 h-4 w-4 hover:bg-transparent"
                        />
                        <span className="text-text-secondary-65 font-mono text-xs font-semibold whitespace-nowrap">
                          {txn._id ? `${txn._id.slice(0, 12)}...` : 'N/A'}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="py-3.5">{coinTxTypeBadge(txn.type)}</TableCell>
                    <TableCell
                      className="text-text-primary max-w-40 truncate py-3.5 text-xs font-semibold whitespace-nowrap"
                      title={getTransactionDetails(txn)}
                    >
                      {getTransactionDetails(txn)}
                    </TableCell>
                    <TableCell
                      className={cn(
                        'py-3.5 font-mono text-xs font-bold whitespace-nowrap',
                        isCredit
                          ? 'text-emerald-500 dark:text-emerald-400'
                          : 'text-rose-500 dark:text-rose-400'
                      )}
                    >
                      {isCredit ? '+' : '-'}
                      {txn.amount?.toLocaleString() ?? 0}
                    </TableCell>
                    <TableCell className="text-text-secondary-65 py-3.5 font-mono text-xs font-semibold whitespace-nowrap">
                      {getAmountSpent(txn)}
                    </TableCell>
                    <TableCell className="py-3.5">{coinTxDirectionBadge(txn.direction)}</TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>

      {/* Transaction Detail Dialog */}
      <TransactionDetailDialog
        transaction={selectedTransaction}
        open={isDetailDialogOpen}
        onOpenChange={setIsDetailDialogOpen}
      />
    </div>
  );
};
