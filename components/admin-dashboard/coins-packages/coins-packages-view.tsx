'use client';

import Image from 'next/image';
import React, { useMemo, useState } from 'react';

import { ICoinBundleListItem } from '@/type/coin-bundle/coin-bundle.type';
import { CircleDot, Loader2, MoreVertical } from 'lucide-react';

import Badge from '@/components/common/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { DataTable } from '@/components/ui/data-table';
import {
  useDeleteCoinBundle,
  useToggleCoinBundleActive,
} from '@/services/coin-bundles/coin-bundles.mutation';
import { useGetCoinBundles } from '@/services/coin-bundles/coin-bundles.query';

import { getColumns } from './columns';
import { CurrencyToggle } from './currency-toggle';

const formatCurrency = (amount: number, currency: 'INR' | 'USD' = 'INR') => {
  if (currency === 'INR') {
    return `₹${amount.toLocaleString('en-IN')}`;
  }
  return `$${amount.toLocaleString('en-US')}`;
};

export function CoinsPackagesView() {
  const [currency, setCurrency] = useState<'INR' | 'USD'>('INR');

  const { data: bundlesResponse, isLoading } = useGetCoinBundles();
  const bundles: ICoinBundleListItem[] = bundlesResponse?.data ?? [];

  const toggleActiveMutation = useToggleCoinBundleActive();
  const deleteMutation = useDeleteCoinBundle();

  const handleToggleActive = (slug: string) => {
    toggleActiveMutation.mutate(slug);
  };

  const handleDelete = (slug: string) => {
    deleteMutation.mutate(slug);
  };

  const columns = useMemo(
    () => getColumns({ currency, onToggleActive: handleToggleActive, onDelete: handleDelete }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currency]
  );

  return (
    <div className="flex w-full flex-col gap-6">
      {/* Header Row */}
      <div className="flex items-start justify-between">
        <div className="flex flex-col gap-1">
          <h2 className="text-text-primary text-xl font-bold">Coin Packages</h2>
          <p className="text-text-secondary-65 text-sm">
            Create and manage packages to sell coins to users.
          </p>
        </div>
        <div className="flex items-center gap-4">
          {/* Currency Toggle */}
          <div className="flex items-center gap-2">
            <span className="text-text-secondary-65 text-sm">Currency View:</span>
            <CurrencyToggle currency={currency} onChange={setCurrency} />
          </div>
        </div>
      </div>

      {/* Content */}
      {isLoading ? (
        <div className="text-text-secondary-65 flex h-48 w-full items-center justify-center gap-2 text-sm">
          <Loader2 className="text-primary h-5 w-5 animate-spin" />
          <span>Loading packages...</span>
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          {/* Cards grid */}
          <div className="grid w-full grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {bundles.map((pkg) => (
              <Card
                key={pkg._id}
                className="border-border-soft flex flex-col items-center gap-3 bg-transparent p-4 pt-5 shadow-sm"
              >
                <div className="relative flex w-full justify-center">
                  <h3 className="text-text-primary text-sm font-bold">{pkg.name}</h3>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-text-secondary-50 hover:bg-muted hover:text-text-primary absolute -top-2 -right-2 h-8 w-8"
                  >
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>

                <div className="flex h-5 items-center justify-center gap-2">
                  <Badge
                    label={pkg.isActive ? 'Active' : 'Inactive'}
                    color={pkg.isActive ? 'emerald' : 'gray'}
                    shape="pill"
                    size="xs"
                    uppercase
                    style="soft"
                  />
                  {pkg.isDeleted && (
                    <Badge
                      label="Deleted"
                      color="rose"
                      shape="pill"
                      size="xs"
                      uppercase
                      style="soft"
                    />
                  )}
                </div>

                {/* Thumbnail placeholder — use pkg.bundleType as a visual cue */}
                <div className="flex h-20 items-center justify-center">
                  <span className="text-5xl">🪙</span>
                </div>

                <div className="flex items-center justify-center gap-1.5">
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-amber-500/10 text-amber-500">
                    <CircleDot className="h-3 w-3" />
                  </div>
                  <span className="text-xl font-bold text-amber-500">
                    {pkg.totalCoins.toLocaleString()}
                  </span>
                </div>

                <div className="bg-muted/30 border-border-soft mt-2 flex w-full items-center justify-center rounded-lg border p-2 px-3">
                  <span className="text-text-primary text-sm font-bold">
                    {currency === 'INR'
                      ? formatCurrency(pkg.inrPrice / 100, 'INR')
                      : formatCurrency((pkg.usdPrice ?? 0) / 100, 'USD')}
                  </span>
                </div>

                <div className="mt-1 flex w-full justify-center">
                  <span className="text-text-secondary-65 text-[11px] font-medium">
                    ~
                    {currency === 'INR'
                      ? formatCurrency(
                          Number((pkg.inrPrice / 100 / pkg.totalCoins).toFixed(4)),
                          'INR'
                        )
                      : formatCurrency(
                          Number(((pkg.usdPrice ?? 0) / 100 / pkg.totalCoins).toFixed(4)),
                          'USD'
                        )}{' '}
                    / coin
                  </span>
                </div>
              </Card>
            ))}
          </div>

          {/* Table */}
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <h2 className="text-text-primary text-lg font-bold">Packages List</h2>
              <p className="text-text-secondary-65 text-sm">
                Detailed view of all available coin packages.
              </p>
            </div>
            <DataTable columns={columns} data={bundles} pageSize={10} className="bg-transparent" />
          </div>
        </div>
      )}
    </div>
  );
}
