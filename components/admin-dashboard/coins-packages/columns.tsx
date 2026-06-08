'use client';

import Image from 'next/image';

import { ICoinBundle } from '@/type/coin-bundle/coin-bundle.type';
import { ColumnDef } from '@tanstack/react-table';
import { Edit, MoreVertical, Power, Trash } from 'lucide-react';

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

// ─── Legacy mock type (kept for backwards compat if needed elsewhere) ─────────
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
  image?: string;
}

const formatCurrency = (amount: number, currency: 'INR' | 'USD' = 'INR') => {
  if (currency === 'INR') {
    return `₹${amount.toLocaleString('en-IN')}`;
  }
  return `$${amount.toLocaleString('en-US')}`;
};

interface GetColumnsOptions {
  currency: 'INR' | 'USD';
  onToggleActive?: (slug: string) => void;
  onDelete?: (slug: string) => void;
  onEdit?: (slug: string) => void;
}

export const getColumns = ({
  currency,
  onToggleActive,
  onDelete,
  onEdit,
}: GetColumnsOptions): ColumnDef<ICoinBundle>[] => [
  {
    id: 'name',
    header: 'Package Name',
    accessorKey: 'name',
    cell: ({ row }) => {
      const pkg = row.original;
      return (
        <div className="flex items-center gap-3">
          <Image
            src={pkg.thumbnail.url}
            alt={pkg.name}
            width={40}
            height={40}
            className="rounded-lg"
            unoptimized
          />
          <span className="text-text-primary text-sm font-semibold tracking-tight">{pkg.name}</span>
        </div>
      );
    },
  },
  {
    id: 'bundleType',
    accessorKey: 'bundleType',
    header: 'Type',
    cell: ({ getValue }) => (
      <span className="text-text-secondary-65 text-xs font-medium capitalize">
        {(getValue() as string).replace(/_/g, ' ')}
      </span>
    ),
  },
  {
    id: 'totalCoins',
    accessorKey: 'totalCoins',
    header: 'Total Coins',
    cell: ({ row }) => {
      const pkg = row.original;
      return (
        <div className="flex flex-col">
          <span className="text-text-primary text-sm font-semibold">
            {pkg.totalCoins.toLocaleString()}
          </span>
          {pkg.bonusCoins > 0 && (
            <span className="text-xs text-amber-500">+{pkg.bonusCoins} bonus</span>
          )}
        </div>
      );
    },
  },
  {
    id: 'price',
    header: 'Price',
    cell: ({ row }) => {
      const pkg = row.original;
      const displayPrice =
        currency === 'INR'
          ? formatCurrency(pkg.inrPrice / 100, 'INR')
          : formatCurrency((pkg.usdPrice ?? 0) / 100, 'USD');
      return <span className="text-text-primary text-sm font-semibold">{displayPrice}</span>;
    },
  },
  {
    id: 'status',
    accessorKey: 'isActive',
    header: 'Status',
    cell: ({ getValue }) => {
      const isActive = getValue() as boolean;
      return (
        <Badge
          label={isActive ? 'Active' : 'Inactive'}
          color={isActive ? 'emerald' : 'gray'}
          shape="pill"
          size="xs"
          uppercase
          style="soft"
        />
      );
    },
  },
  {
    id: 'displayOrder',
    accessorKey: 'displayOrder',
    header: 'Order',
    cell: ({ getValue }) => (
      <span className="text-text-secondary-65 text-sm font-medium">{getValue() as number}</span>
    ),
  },
  {
    id: 'actions',
    header: () => <div className="text-right">Actions</div>,
    cell: ({ row }) => {
      const pkg = row.original;
      return (
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
            <DropdownMenuContent align="end" className="border-border-soft bg-card w-44">
              <DropdownMenuLabel className="text-text-secondary-65 px-2.5 py-1.5 text-xs font-semibold tracking-wider uppercase">
                Actions
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-border-soft" />
              <DropdownMenuItem
                className="text-text-primary hover:bg-brand-warm-beige/30 flex cursor-pointer items-center gap-2 rounded-sm text-sm"
                onClick={() => onEdit?.(pkg.slug)}
              >
                <Edit className="h-4 w-4" /> Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-text-primary hover:bg-brand-warm-beige/30 flex cursor-pointer items-center gap-2 rounded-sm text-sm"
                onClick={() => onToggleActive?.(pkg.slug)}
              >
                <Power className="h-4 w-4" />
                {pkg.isActive ? 'Deactivate' : 'Activate'}
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-border-soft" />
              <DropdownMenuItem
                className="flex cursor-pointer items-center gap-2 rounded-sm text-sm text-rose-600 hover:bg-rose-500/10"
                onClick={() => onDelete?.(pkg.slug)}
              >
                <Trash className="h-4 w-4" /> Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
