'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import * as React from 'react';
import { useState } from 'react';

import { COIN_TX_TYPES } from '@/type/transaction/transaction-enum';
import { ITransaction } from '@/type/transaction/transaction-response';
import { format } from 'date-fns';
import { ArrowLeft, Filter, Receipt, RefreshCw, Search } from 'lucide-react';

import { TransactionDetailDialog } from '@/components/admin-dashboard/transactions/transaction-detail-dialog';
import { coinTxDirectionBadge, coinTxTypeBadge } from '@/components/common/badge';
import { CopyButton } from '@/components/copy-button';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
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

export const UserTransactionsTable = () => {
  const params = useParams();
  const userId = (params?.id as string) || '';

  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [directionFilter, setDirectionFilter] = useState<string>('all');

  const [selectedTransaction, setSelectedTransaction] = useState<ITransaction | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const {
    data: responseData,
    isLoading,
    isFetching,
    isError,
    refetch,
  } = useGetUserTransactions(userId);
  const allTransactions = responseData?.data?.transactions || [];

  // Client side filtering for user transactions
  const filteredTransactions = React.useMemo(() => {
    return allTransactions.filter((tx) => {
      // Type filter
      if (typeFilter !== 'all' && tx.type !== typeFilter) {
        return false;
      }
      // Direction filter
      if (directionFilter !== 'all' && tx.direction !== directionFilter) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const noteMatch = tx.note?.toLowerCase().includes(query);
        const typeMatch = tx.type?.toLowerCase().includes(query);
        const storyMatch = tx.storySlug?.toLowerCase().includes(query);
        const chapterMatch = tx.chapterSlug?.toLowerCase().includes(query);
        const orderIdMatch = tx.coinOrderId?.toLowerCase().includes(query);
        const txIdMatch = tx._id?.toLowerCase().includes(query);

        if (
          !noteMatch &&
          !typeMatch &&
          !storyMatch &&
          !chapterMatch &&
          !orderIdMatch &&
          !txIdMatch
        ) {
          return false;
        }
      }
      return true;
    });
  }, [allTransactions, searchQuery, typeFilter, directionFilter]);

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
    setIsDetailOpen(true);
  };

  return (
    <div className="w-full space-y-6">
      {/* Top Header Navigation */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="icon"
            asChild
            className="border-border/50 bg-card hover:bg-muted/60 h-9 w-9 rounded-xl shadow-2xs"
          >
            <Link href={`/dashboard/users/${userId}`}>
              <ArrowLeft className="size-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-text-primary flex items-center gap-2.5 text-xl font-bold tracking-tight sm:text-2xl">
              <span>User Transactions</span>
              <span className="rounded-full border border-purple-500/30 bg-purple-500/10 px-2.5 py-0.5 font-mono text-xs font-bold text-purple-600">
                {allTransactions.length}
              </span>
            </h1>
            <p className="text-text-secondary-65 text-xs font-normal">
              Complete coin transaction history for user {userId}
            </p>
          </div>
        </div>
      </div>

      {/* Filter Controls */}
      <div className="flex flex-wrap items-center gap-2.5">
        {/* Search Input */}
        <div className="relative min-w-48 flex-1 sm:w-64">
          <Search className="text-text-secondary-65 absolute top-1/2 left-3 size-3.5 -translate-y-1/2" />
          <Input
            placeholder="Search details, type, order ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border-border/50 bg-background/50 focus:bg-background h-9 rounded-xl pl-8 text-xs transition-all"
          />
        </div>

        {/* Type Filter */}
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="border-border/50 bg-background/50 h-9 w-36 rounded-xl text-xs">
            <Filter className="text-text-secondary-65 mr-1 size-3.5" />
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent className="bg-card border-border/50 rounded-xl text-xs shadow-md">
            <SelectItem value="all">All Types</SelectItem>
            {COIN_TX_TYPES.map((t) => (
              <SelectItem key={t} value={t} className="capitalize">
                {t.replace(/_/g, ' ')}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Direction Filter */}
        <Select value={directionFilter} onValueChange={setDirectionFilter}>
          <SelectTrigger className="border-border/50 bg-background/50 h-9 w-32 rounded-xl text-xs">
            <SelectValue placeholder="Direction" />
          </SelectTrigger>
          <SelectContent className="bg-card border-border/50 rounded-xl text-xs shadow-md">
            <SelectItem value="all">All Directions</SelectItem>
            <SelectItem value="credit">Credit (+)</SelectItem>
            <SelectItem value="debit">Debit (-)</SelectItem>
          </SelectContent>
        </Select>

        {/* Refresh Button */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => refetch()}
          className="border-border/50 bg-card hover:bg-muted/60 h-9 w-9 cursor-pointer rounded-xl p-0"
          title="Refresh transactions"
        >
          <RefreshCw className={`size-3.5 ${isFetching ? 'animate-spin' : ''}`} />
        </Button>
      </div>

      {/* Main Table */}
      <div className="border-border/50 overflow-hidden rounded-xl border">
        <div className="relative w-full overflow-auto">
          <Table className="bg-card">
            <TableHeader className="bg-muted/30">
              <TableRow className="border-border/40 hover:bg-transparent">
                <TableHead className="text-text-secondary-50 h-10 px-4 text-[11px] font-semibold tracking-wider uppercase">
                  Date &amp; Time
                </TableHead>
                <TableHead className="text-text-secondary-50 h-10 px-4 text-[11px] font-semibold tracking-wider uppercase">
                  Transaction ID
                </TableHead>
                <TableHead className="text-text-secondary-50 h-10 px-4 text-[11px] font-semibold tracking-wider uppercase">
                  Type
                </TableHead>
                <TableHead className="text-text-secondary-50 h-10 px-4 text-[11px] font-semibold tracking-wider uppercase">
                  Direction
                </TableHead>
                <TableHead className="text-text-secondary-50 h-10 px-4 text-[11px] font-semibold tracking-wider uppercase">
                  Coins
                </TableHead>
                <TableHead className="text-text-secondary-50 h-10 px-4 text-[11px] font-semibold tracking-wider uppercase">
                  Balance Snapshot
                </TableHead>
                <TableHead className="text-text-secondary-50 h-10 px-4 text-[11px] font-semibold tracking-wider uppercase">
                  Details
                </TableHead>
                <TableHead className="text-text-secondary-50 h-10 px-4 text-[11px] font-semibold tracking-wider uppercase">
                  Amount
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                Array.from({ length: 8 }).map((_, index) => (
                  <TableRow key={index} className="border-border/30">
                    <TableCell className="px-4 py-3">
                      <Skeleton className="h-4 w-28" />
                    </TableCell>
                    <TableCell className="px-4 py-3">
                      <Skeleton className="h-4 w-24" />
                    </TableCell>
                    <TableCell className="px-4 py-3">
                      <Skeleton className="h-4 w-20" />
                    </TableCell>
                    <TableCell className="px-4 py-3">
                      <Skeleton className="h-4 w-16" />
                    </TableCell>
                    <TableCell className="px-4 py-3">
                      <Skeleton className="h-4 w-16" />
                    </TableCell>
                    <TableCell className="px-4 py-3">
                      <Skeleton className="h-4 w-24" />
                    </TableCell>
                    <TableCell className="px-4 py-3">
                      <Skeleton className="h-4 w-32" />
                    </TableCell>
                    <TableCell className="px-4 py-3">
                      <Skeleton className="h-4 w-16" />
                    </TableCell>
                  </TableRow>
                ))
              ) : isError ? (
                <TableRow>
                  <TableCell
                    colSpan={8}
                    className="py-10 text-center text-xs font-medium text-rose-500"
                  >
                    Failed to load user transactions.
                  </TableCell>
                </TableRow>
              ) : filteredTransactions.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={8}
                    className="text-text-secondary-50 py-10 text-center text-xs"
                  >
                    No transactions found matching your filter criteria.
                  </TableCell>
                </TableRow>
              ) : (
                filteredTransactions.map((tx) => {
                  const isCredit = tx.direction === 'credit';

                  return (
                    <TableRow
                      key={tx._id}
                      onClick={() => handleSelectTx(tx)}
                      className="border-border/30 hover:bg-muted/30 cursor-pointer transition-colors"
                    >
                      <TableCell className="text-text-secondary-65 px-4 py-3 text-xs whitespace-nowrap">
                        {getFormattedDate(tx.createdAt)}
                      </TableCell>
                      <TableCell className="px-4 py-3">
                        <div
                          className="flex items-center gap-1"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <CopyButton
                            text={tx._id}
                            size="icon-xs"
                            className="text-text-secondary-50 h-4 w-4 hover:bg-transparent"
                          />
                          <span className="text-text-secondary-65 font-mono text-xs font-semibold whitespace-nowrap">
                            {tx._id ? `${tx._id.slice(0, 12)}...` : 'N/A'}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="px-4 py-3">{coinTxTypeBadge(tx.type)}</TableCell>
                      <TableCell className="px-4 py-3">
                        {coinTxDirectionBadge(tx.direction)}
                      </TableCell>
                      <TableCell
                        className={cn(
                          'px-4 py-3 font-mono text-xs font-bold whitespace-nowrap',
                          isCredit ? 'text-emerald-500' : 'text-rose-500'
                        )}
                      >
                        {isCredit ? '+' : '-'}
                        {tx.amount?.toLocaleString() ?? 0}
                      </TableCell>
                      <TableCell className="text-text-secondary-65 px-4 py-3 font-mono text-[11px] whitespace-nowrap">
                        {tx.balanceBefore?.toLocaleString() ?? 0} →{' '}
                        <span className="text-text-primary font-semibold">
                          {tx.balanceAfter?.toLocaleString() ?? 0}
                        </span>
                      </TableCell>
                      <TableCell
                        className="text-text-primary max-w-48 truncate px-4 py-3 text-xs font-medium"
                        title={getTransactionDetails(tx)}
                      >
                        {getTransactionDetails(tx)}
                      </TableCell>
                      <TableCell className="text-text-secondary-65 px-4 py-3 font-mono text-xs font-semibold whitespace-nowrap">
                        {getAmountSpent(tx)}
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Transaction Detail Dialog */}
      <TransactionDetailDialog
        transaction={selectedTransaction}
        open={isDetailOpen}
        onOpenChange={setIsDetailOpen}
      />
    </div>
  );
};
