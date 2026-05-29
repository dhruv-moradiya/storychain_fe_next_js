'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Edit, MoreVertical, Trash } from 'lucide-react';

import Badge from '@/components/common/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export interface CoinPackage {
  id: number;
  name: string;
  coins: number;
  priceInr: number;
  priceUsd: number;
  pricePerCoinInr: number;
  pricePerCoinUsd: number;
  status: 'Active' | 'Inactive';
  mostPopular: boolean;
  sold: number;
  revenue: number;
  icon: string;
}

const formatCurrency = (amount: number, currency: 'INR' | 'USD' = 'INR') => {
  if (currency === 'INR') {
    return `₹${amount.toLocaleString('en-IN')}`;
  }
  return `$${amount.toLocaleString('en-US')}`;
};

export const getColumns = (currency: 'INR' | 'USD'): ColumnDef<CoinPackage>[] => [
  {
    id: 'name',
    header: 'Package Name',
    accessorKey: 'name',
    cell: ({ row }) => {
      const pkg = row.original;
      return (
        <div className="flex items-center gap-3">
          <span className="text-2xl">{pkg.icon}</span>
          <span className="text-text-primary text-sm font-semibold tracking-tight">{pkg.name}</span>
        </div>
      );
    },
  },
  {
    accessorKey: 'coins',
    header: 'Coins',
    cell: ({ getValue }) => (
      <span className="text-text-primary text-sm font-semibold">
        {(getValue() as number).toLocaleString()}
      </span>
    ),
  },
  {
    id: 'price',
    header: 'Price',
    cell: ({ row }) => (
      <span className="text-text-primary text-sm font-semibold">
        {currency === 'INR'
          ? formatCurrency(row.original.priceInr, 'INR')
          : formatCurrency(row.original.priceUsd, 'USD')}
      </span>
    ),
  },
  {
    id: 'pricePerCoin',
    header: 'Price per Coin',
    cell: ({ row }) => (
      <span className="text-text-secondary-65 text-sm font-medium">
        {currency === 'INR'
          ? formatCurrency(row.original.pricePerCoinInr, 'INR')
          : formatCurrency(row.original.pricePerCoinUsd, 'USD')}
      </span>
    ),
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ getValue }) => {
      const status = getValue() as string;
      const isActive = status === 'Active';

      return (
        <Badge
          label={status}
          color={isActive ? 'emerald' : 'gray'}
          shape="pill"
          size="xs"
          uppercase
          mono={false}
          style="soft"
        />
      );
    },
  },
  {
    accessorKey: 'sold',
    header: 'Sold (30d)',
    cell: ({ getValue }) => (
      <span className="text-text-primary text-sm font-semibold">
        {(getValue() as number).toLocaleString()}
      </span>
    ),
  },
  {
    accessorKey: 'revenue',
    header: 'Revenue (30d)',
    cell: ({ getValue }) => (
      <span className="text-text-primary text-sm font-semibold">
        {formatCurrency(getValue() as number, 'INR')}
      </span>
    ),
  },
  {
    id: 'actions',
    header: () => <div className="text-right">Actions</div>,
    cell: () => (
      <div className="flex justify-end">
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
            <DropdownMenuItem className="text-text-primary hover:bg-brand-warm-beige/30 flex cursor-pointer items-center gap-2 rounded-sm text-sm">
              <Edit className="h-4 w-4" /> Edit
            </DropdownMenuItem>
            <DropdownMenuItem className="flex cursor-pointer items-center gap-2 rounded-sm text-sm text-rose-600 hover:bg-rose-500/10">
              <Trash className="h-4 w-4" /> Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    ),
  },
];
