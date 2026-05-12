'use client';

import { useState } from 'react';

import { PayoutRequest, PayoutStatus } from '@/type/payout';
import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { motion } from 'framer-motion';
import { Check, CheckCircle, Clock, Coins, Loader2, X, XCircle } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { Input } from '@/components/ui/input';
import {
  ResponsiveDialog,
  ResponsiveDialogContent,
  ResponsiveDialogDescription,
  ResponsiveDialogFooter,
  ResponsiveDialogHeader,
  ResponsiveDialogTitle,
} from '@/components/ui/responsive-dialog';
import { mockAllPayoutRequests } from '@/lib/data/payout-data';
import { cn } from '@/lib/utils';

type FilterStatus = 'ALL' | PayoutStatus;

const statusConfig: Record<
  PayoutStatus,
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

const filterTabs: { key: FilterStatus; label: string }[] = [
  { key: 'ALL', label: 'All' },
  { key: 'PENDING', label: 'Pending' },
  { key: 'APPROVED', label: 'Approved' },
  { key: 'PROCESSING', label: 'Processing' },
  { key: 'COMPLETED', label: 'Completed' },
  { key: 'REJECTED', label: 'Rejected' },
];

function formatCoins(n: number): string {
  return new Intl.NumberFormat('en-IN').format(n);
}

function formatINR(paise: number): string {
  return `₹${new Intl.NumberFormat('en-IN').format(paise / 100)}`;
}

export function AdminPayouts() {
  const [allPayouts, setAllPayouts] = useState<PayoutRequest[]>(mockAllPayoutRequests);
  const [statusFilter, setStatusFilter] = useState<FilterStatus>('ALL');
  const [actionDialog, setActionDialog] = useState<{
    open: boolean;
    payout: PayoutRequest | null;
    action: 'approve' | 'reject';
  }>({ open: false, payout: null, action: 'approve' });
  const [adminNote, setAdminNote] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const filtered =
    statusFilter === 'ALL' ? allPayouts : allPayouts.filter((p) => p.status === statusFilter);

  const pendingCount = allPayouts.filter((p) => p.status === 'PENDING').length;

  const handleAction = (payout: PayoutRequest, action: 'approve' | 'reject') => {
    setActionDialog({ open: true, payout, action });
    setAdminNote('');
  };

  const confirmAction = () => {
    if (!actionDialog.payout) return;
    setIsProcessing(true);

    setTimeout(() => {
      setAllPayouts((prev) =>
        prev.map((p) =>
          p.id === actionDialog.payout?.id
            ? {
                ...p,
                status: (actionDialog.action === 'approve'
                  ? 'APPROVED'
                  : 'REJECTED') as PayoutStatus,
                processedAt: new Date(),
                adminNote: adminNote || undefined,
              }
            : p
        )
      );
      setIsProcessing(false);
      setActionDialog({ open: false, payout: null, action: 'approve' });
    }, 1000);
  };

  const columns: ColumnDef<PayoutRequest>[] = [
    {
      id: 'user',
      header: 'User',
      cell: ({ row }) => (
        <div className="min-w-[140px]">
          <p className="text-foreground line-clamp-1 text-sm font-medium">
            {row.original.userName}
          </p>
          <p className="text-muted-foreground line-clamp-1 text-xs">{row.original.userEmail}</p>
        </div>
      ),
    },
    {
      id: 'coins',
      header: 'Coins',
      cell: ({ row }) => (
        <div className="flex items-center gap-1.5">
          <Coins className="h-3.5 w-3.5 text-amber-500" />
          <span className="text-foreground font-libre-baskerville text-sm font-bold">
            {formatCoins(row.original.coins)}
          </span>
        </div>
      ),
    },
    {
      id: 'amount',
      header: 'Amount',
      cell: ({ row }) => (
        <span className="text-foreground text-sm font-medium">
          {formatINR(row.original.amountINR)}
        </span>
      ),
    },
    {
      id: 'bank',
      header: 'Bank',
      cell: ({ row }) => (
        <div className="min-w-[120px]">
          <p className="text-foreground line-clamp-1 text-xs font-medium">
            {row.original.bankName}
          </p>
          <p className="text-muted-foreground text-[10px]">
            •••• {row.original.bankAccountLast4} · {row.original.ifscCode}
          </p>
        </div>
      ),
    },
    {
      id: 'date',
      header: 'Requested',
      cell: ({ row }) => (
        <span className="text-muted-foreground text-xs">
          {format(row.original.requestedAt, 'MMM dd, yyyy')}
        </span>
      ),
    },
    {
      id: 'status',
      header: 'Status',
      cell: ({ row }) => {
        const config = statusConfig[row.original.status];
        const StatusIcon = config.icon;
        return (
          <Badge
            variant="outline"
            className={cn('gap-1 border-transparent text-xs', config.bg, config.color)}
          >
            <StatusIcon
              className={cn('h-3 w-3', row.original.status === 'PROCESSING' && 'animate-spin')}
            />
            {config.label}
          </Badge>
        );
      },
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => {
        if (row.original.status !== 'PENDING') {
          return (
            <span className="text-muted-foreground text-xs">{row.original.adminNote || '-'}</span>
          );
        }
        return (
          <div className="flex items-center gap-1.5">
            <Button
              size="sm"
              variant="outline"
              className="h-7 gap-1 border-emerald-500/30 px-2 text-xs text-emerald-600 hover:bg-emerald-500/10 dark:text-emerald-400"
              onClick={(e) => {
                e.stopPropagation();
                handleAction(row.original, 'approve');
              }}
            >
              <Check className="h-3 w-3" />
              Approve
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="h-7 gap-1 border-red-500/30 px-2 text-xs text-red-500 hover:bg-red-500/10 dark:text-red-400"
              onClick={(e) => {
                e.stopPropagation();
                handleAction(row.original, 'reject');
              }}
            >
              <X className="h-3 w-3" />
              Reject
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <div className="space-y-4">
      {/* Stats bar */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid gap-3 sm:grid-cols-4"
      >
        {[
          { label: 'Total Requests', value: allPayouts.length, color: 'text-foreground' },
          { label: 'Pending', value: pendingCount, color: 'text-amber-500 dark:text-amber-400' },
          {
            label: 'Total Paid Out',
            value: formatINR(
              allPayouts
                .filter((p) => p.status === 'COMPLETED')
                .reduce((sum, p) => sum + p.amountINR, 0)
            ),
            color: 'text-emerald-500 dark:text-emerald-400',
          },
          {
            label: 'Avg Payout',
            value:
              formatCoins(
                Math.round(
                  allPayouts.reduce((sum, p) => sum + p.coins, 0) / (allPayouts.length || 1)
                )
              ) + ' coins',
            color: 'text-primary',
          },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="border-border/40 bg-card rounded-xl border p-3"
          >
            <p className="text-muted-foreground text-xs">{stat.label}</p>
            <p className={cn('font-libre-baskerville text-lg font-bold', stat.color)}>
              {typeof stat.value === 'number' ? stat.value : stat.value}
            </p>
          </motion.div>
        ))}
      </motion.div>

      {/* Filter tabs */}
      <div className="border-border/40 bg-card inline-flex flex-wrap items-center gap-1 rounded-xl border px-1.5 py-1">
        {filterTabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setStatusFilter(tab.key)}
            className={cn(
              'rounded-lg px-3 py-1.5 text-xs font-medium transition-all duration-200',
              statusFilter === tab.key
                ? 'bg-primary/10 text-primary'
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            {tab.label}
            {tab.key === 'PENDING' && pendingCount > 0 && (
              <span className="ml-1 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-amber-500/20 px-1 text-[10px] text-amber-600 dark:text-amber-400">
                {pendingCount}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* DataTable */}
      <div className="bg-card border-border/50 overflow-hidden rounded-2xl border shadow-sm">
        <DataTable columns={columns} data={filtered} pageSize={10} />
      </div>

      {/* Action Dialog */}
      <ResponsiveDialog
        open={actionDialog.open}
        onOpenChange={(open) => {
          if (!isProcessing) setActionDialog({ ...actionDialog, open });
        }}
      >
        <ResponsiveDialogContent className="bg-card sm:max-w-md">
          <ResponsiveDialogHeader>
            <ResponsiveDialogTitle className="text-foreground">
              {actionDialog.action === 'approve' ? 'Approve' : 'Reject'} Payout Request
            </ResponsiveDialogTitle>
            <ResponsiveDialogDescription className="text-muted-foreground">
              {actionDialog.payout && (
                <>
                  <span className="text-foreground font-medium">
                    {actionDialog.payout.userName}
                  </span>{' '}
                  is requesting{' '}
                  <span className="text-foreground font-medium">
                    {formatCoins(actionDialog.payout.coins)} coins
                  </span>{' '}
                  ({formatINR(actionDialog.payout.amountINR)}) to{' '}
                  <span className="text-foreground font-medium">
                    {actionDialog.payout.bankName} •••• {actionDialog.payout.bankAccountLast4}
                  </span>
                </>
              )}
            </ResponsiveDialogDescription>
          </ResponsiveDialogHeader>

          <div className="py-4">
            <label className="text-muted-foreground mb-1.5 block text-xs font-medium">
              Admin Note (optional)
            </label>
            <Input
              value={adminNote}
              onChange={(e) => setAdminNote(e.target.value)}
              placeholder={
                actionDialog.action === 'approve'
                  ? 'e.g. Verified - processing via Razorpay'
                  : 'e.g. Insufficient earned coins'
              }
              className="bg-muted/20 border-border/50"
            />
          </div>

          <ResponsiveDialogFooter>
            <Button
              variant="outline"
              onClick={() => setActionDialog({ ...actionDialog, open: false })}
              disabled={isProcessing}
              className="border-border/50"
            >
              Cancel
            </Button>
            <Button
              onClick={confirmAction}
              disabled={isProcessing}
              className={cn(
                'gap-2',
                actionDialog.action === 'approve'
                  ? 'text-primary-foreground bg-emerald-600 hover:bg-emerald-700'
                  : 'text-primary-foreground bg-red-600 hover:bg-red-700'
              )}
            >
              {isProcessing ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : actionDialog.action === 'approve' ? (
                <Check className="h-4 w-4" />
              ) : (
                <X className="h-4 w-4" />
              )}
              {isProcessing
                ? 'Processing...'
                : actionDialog.action === 'approve'
                  ? 'Confirm Approve'
                  : 'Confirm Reject'}
            </Button>
          </ResponsiveDialogFooter>
        </ResponsiveDialogContent>
      </ResponsiveDialog>
    </div>
  );
}
