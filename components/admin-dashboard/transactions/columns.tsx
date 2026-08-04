'use client';

import { ITransaction } from '@/type/transaction/transaction-response';
import { ColumnDef, RowData } from '@tanstack/react-table';
import { format } from 'date-fns';
import { Eye, MoreVertical } from 'lucide-react';

import { coinTxDirectionBadge, coinTxTypeBadge } from '@/components/common/badge';
import { CopyButton } from '@/components/copy-button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn, getInitials } from '@/lib/utils';

declare module '@tanstack/react-table' {
  interface TableMeta<TData extends RowData> {
    handleSelectTransaction?: (tx: ITransaction) => void;
  }
}

export const columns: ColumnDef<ITransaction>[] = [
  {
    accessorKey: 'createdAt',
    header: 'Date & Time',
    cell: ({ getValue }) => {
      const val = getValue() as string | Date;
      if (!val) return <span className="text-text-secondary-50 text-xs">—</span>;
      try {
        return (
          <span className="text-text-secondary-65 text-xs font-medium whitespace-nowrap">
            {format(new Date(val), 'MMM dd, yyyy · hh:mm a')}
          </span>
        );
      } catch {
        return <span className="text-text-secondary-65 text-xs font-medium">{String(val)}</span>;
      }
    },
  },
  {
    accessorKey: '_id',
    header: 'Transaction ID',
    cell: ({ getValue }) => {
      const id = getValue() as string;
      return (
        <div className="flex items-center gap-1">
          <CopyButton
            text={id}
            size="icon-xs"
            className="text-text-secondary-50 h-4 w-4 hover:bg-transparent"
          />
          <span className="text-text-secondary-65 font-mono text-xs font-semibold whitespace-nowrap">
            {id ? `${id.slice(0, 14)}...` : 'N/A'}
          </span>
        </div>
      );
    },
  },
  {
    id: 'user',
    header: 'User',
    cell: ({ row }) => {
      const user = row.original.user;
      if (!user) {
        return <span className="text-text-secondary-50 font-mono text-xs">System / Platform</span>;
      }

      const initials = getInitials(user.username || user.email || 'User');

      return (
        <div className="flex items-center gap-3">
          <Avatar className="ring-border/40 h-8 w-8 shrink-0 ring-1">
            {user.avatarUrl && <AvatarImage src={user.avatarUrl} alt={user.username} />}
            <AvatarFallback className="bg-primary/10 text-primary text-xs font-bold">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div className="flex min-w-0 flex-col">
            <span className="text-text-primary max-w-[140px] truncate text-xs font-semibold tracking-tight">
              {user.username || 'User'}
            </span>
            <span className="text-text-secondary-50 max-w-[150px] truncate text-[11px]">
              {user.email}
            </span>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: 'type',
    header: 'Type',
    cell: ({ getValue }) => {
      const type = getValue() as string;
      return coinTxTypeBadge(type);
    },
  },
  {
    accessorKey: 'direction',
    header: 'Direction',
    cell: ({ getValue }) => {
      const direction = getValue() as string;
      return coinTxDirectionBadge(direction);
    },
  },
  {
    accessorKey: 'amount',
    header: 'Coins',
    cell: ({ row }) => {
      const tx = row.original;
      const isCredit = tx.direction === 'credit';
      return (
        <span
          className={cn(
            'font-mono text-xs font-bold whitespace-nowrap',
            isCredit ? 'text-emerald-500' : 'text-rose-500'
          )}
        >
          {isCredit ? '+' : '-'}
          {tx.amount?.toLocaleString() ?? 0}
        </span>
      );
    },
  },
  {
    id: 'balanceSnapshot',
    header: 'Balance',
    cell: ({ row }) => {
      const tx = row.original;
      return (
        <div className="text-text-secondary-65 flex items-center gap-1 font-mono text-[11px] whitespace-nowrap">
          <span>{tx.balanceBefore?.toLocaleString() ?? 0}</span>
          <span>→</span>
          <span className="text-text-primary font-semibold">
            {tx.balanceAfter?.toLocaleString() ?? 0}
          </span>
        </div>
      );
    },
  },
  {
    id: 'details',
    header: 'Details',
    cell: ({ row }) => {
      const tx = row.original;
      const detail = tx.note || tx.storySlug || tx.chapterSlug || '—';
      return (
        <span
          className="text-text-primary block max-w-[160px] truncate text-xs font-medium"
          title={detail}
        >
          {detail}
        </span>
      );
    },
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row, table }) => {
      const tx = row.original;
      const meta = table.options.meta;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="text-text-secondary-65 hover:text-text-primary hover:bg-muted/50 h-8 w-8 cursor-pointer rounded-lg"
              onClick={(e) => e.stopPropagation()}
            >
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="border-border/50 bg-card w-40 shadow-md">
            <DropdownMenuLabel className="text-text-secondary-50 px-2.5 py-1.5 text-[11px] font-semibold tracking-wider uppercase">
              Transaction Actions
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-border/40" />
            <DropdownMenuItem
              onClick={(e) => {
                e.stopPropagation();
                meta?.handleSelectTransaction?.(tx);
              }}
              className="text-text-primary hover:bg-muted/50 cursor-pointer gap-2 rounded-md text-xs font-medium"
            >
              <Eye className="size-3.5" />
              View Details
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
