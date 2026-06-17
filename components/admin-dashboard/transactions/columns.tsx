'use client';

import { ColumnDef } from '@tanstack/react-table';
import { MoreVertical } from 'lucide-react';

import createBadge from '@/components/common/badge';
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

export interface TransactionUser {
  name: string;
  email: string;
  avatarUrl?: string;
}

export interface Transaction {
  id: string;
  dateTime: string;
  user: TransactionUser;
  type: 'Purchase' | 'Spend' | 'Refund' | 'Withdraw';
  description: string;
  coins: string;
  amount: string;
  paymentMethod: 'UPI' | 'Coins' | 'Card' | 'Bank Transfer';
  status: 'Completed' | 'Refunded';
}

export const columns: ColumnDef<Transaction>[] = [
  {
    accessorKey: 'dateTime',
    header: 'Date & Time',
    cell: ({ getValue }) => (
      <span className="text-text-secondary-65 text-xs font-medium whitespace-nowrap">
        {getValue() as string}
      </span>
    ),
  },
  {
    accessorKey: 'id',
    header: 'Transaction ID',
    cell: ({ getValue }) => (
      <span className="text-text-secondary-65 font-mono text-xs font-semibold whitespace-nowrap">
        {getValue() as string}
      </span>
    ),
  },
  {
    accessorKey: 'user.name',
    header: 'User',
    cell: ({ row }) => {
      const user = row.original.user;
      const initials = getInitials(user.name);

      return (
        <div className="flex items-center gap-3">
          <Avatar className="border-border-soft h-9 w-9 border">
            {user.avatarUrl && <AvatarImage src={user.avatarUrl} alt={user.name} />}
            <AvatarFallback className="bg-primary/5 text-primary text-xs font-semibold">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="text-text-primary text-xs leading-tight font-semibold tracking-tight whitespace-nowrap">
              {user.name}
            </span>
            <span className="text-text-secondary-50 mt-0.5 text-[11px] whitespace-nowrap">
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
      const type = getValue() as Transaction['type'];
      const colorMap: Record<Transaction['type'], 'emerald' | 'rose' | 'blue' | 'amber'> = {
        Purchase: 'emerald',
        Spend: 'rose',
        Refund: 'blue',
        Withdraw: 'amber',
      };

      return createBadge({
        label: type,
        color: colorMap[type] || 'gray',
        size: 'sm',
        shape: 'pill',
        style: 'soft',
      });
    },
  },
  {
    accessorKey: 'description',
    header: 'Details',
    cell: ({ getValue }) => (
      <span className="text-text-primary text-xs font-semibold whitespace-nowrap">
        {getValue() as string}
      </span>
    ),
  },
  {
    accessorKey: 'coins',
    header: 'Coins',
    cell: ({ getValue }) => {
      const coins = getValue() as string;
      const isPositive = coins.startsWith('+');
      return (
        <span
          className={cn(
            'font-mono text-xs font-bold whitespace-nowrap',
            isPositive ? 'text-emerald-500' : 'text-rose-500'
          )}
        >
          {coins}
        </span>
      );
    },
  },
  {
    accessorKey: 'amount',
    header: 'Amount',
    cell: ({ getValue }) => (
      <span className="text-text-primary text-xs font-semibold whitespace-nowrap">
        {getValue() as string}
      </span>
    ),
  },
  {
    accessorKey: 'paymentMethod',
    header: 'Payment',
    cell: ({ getValue }) => {
      const method = getValue() as Transaction['paymentMethod'];
      const colorMap: Record<Transaction['paymentMethod'], 'purple' | 'amber' | 'blue' | 'cyan'> = {
        UPI: 'purple',
        Coins: 'amber',
        Card: 'blue',
        'Bank Transfer': 'cyan',
      };

      return createBadge({
        label: method,
        color: colorMap[method] || 'gray',
        size: 'sm',
        shape: 'pill',
        style: 'soft',
      });
    },
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ getValue }) => {
      const status = getValue() as Transaction['status'];
      return createBadge({
        label: status,
        color: status === 'Completed' ? 'emerald' : 'blue',
        size: 'sm',
        shape: 'pill',
        style: 'soft',
      });
    },
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: () => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="text-text-secondary-65 hover:text-text-primary hover:bg-brand-warm-beige/30 h-8 w-8 cursor-pointer rounded-lg"
          >
            <MoreVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="border-border-soft bg-card w-40">
          <DropdownMenuLabel className="text-text-secondary-65 px-2.5 py-1.5 text-xs font-semibold tracking-wider uppercase">
            Actions
          </DropdownMenuLabel>
          <DropdownMenuSeparator className="bg-border-soft" />
          <DropdownMenuItem className="text-text-primary hover:bg-brand-warm-beige/30 cursor-pointer rounded-sm text-sm">
            View Details
          </DropdownMenuItem>
          <DropdownMenuItem className="text-text-primary hover:bg-brand-warm-beige/30 cursor-pointer rounded-sm text-sm">
            Download Invoice
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer rounded-sm text-sm text-rose-600 hover:bg-rose-500/10">
            Flag Transaction
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];
