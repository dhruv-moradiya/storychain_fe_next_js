'use client';

import Image from 'next/image';
import React, { useMemo, useState } from 'react';

import { useQuery } from '@tanstack/react-query';
import { CircleDot, Loader2, MoreVertical } from 'lucide-react';

import Badge from '@/components/common/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { DataTable } from '@/components/ui/data-table';

import { CoinPackage, getColumns } from './columns';
import { CurrencyToggle } from './currency-toggle';

const mockPackagesData: CoinPackage[] = [
  {
    id: 1,
    name: 'Mini Pack',
    coins: 250,
    priceInr: 99,
    priceUsd: 1.49,
    pricePerCoinInr: 0.4,
    pricePerCoinUsd: 0.006,
    status: 'Active',
    mostPopular: false,
    sold: 2450,
    revenue: 242550,
    icon: '🪙',
    image: '/images/mini_pack_rupee.png',
  },
  {
    id: 2,
    name: 'Starter Pack',
    coins: 600,
    priceInr: 199,
    priceUsd: 2.99,
    pricePerCoinInr: 0.33,
    pricePerCoinUsd: 0.005,
    status: 'Active',
    mostPopular: false,
    sold: 2890,
    revenue: 575110,
    icon: '💰',
    image: '/images/starter_pack_rupee.png',
  },
  {
    id: 3,
    name: 'Pro Pack',
    coins: 1500,
    priceInr: 399,
    priceUsd: 5.49,
    pricePerCoinInr: 0.27,
    pricePerCoinUsd: 0.004,
    status: 'Active',
    mostPopular: false,
    sold: 3120,
    revenue: 1243880,
    icon: '🛍️',
    image: '/images/pro_pack_rupee.png',
  },
  {
    id: 4,
    name: 'Mega Pack',
    coins: 3500,
    priceInr: 799,
    priceUsd: 10.99,
    pricePerCoinInr: 0.23,
    pricePerCoinUsd: 0.003,
    status: 'Active',
    mostPopular: true,
    sold: 2780,
    revenue: 2221220,
    icon: '📦',
    image: '/images/mega_pack_rupee.png',
  },
  {
    id: 5,
    name: 'Super Pack',
    coins: 7500,
    priceInr: 1499,
    priceUsd: 19.99,
    pricePerCoinInr: 0.2,
    pricePerCoinUsd: 0.003,
    status: 'Inactive',
    mostPopular: false,
    sold: 450,
    revenue: 674550,
    icon: '🛢️',
    image: '/images/super_pack_rupee.png',
  },
  {
    id: 6,
    name: 'Ultimate Pack',
    coins: 15000,
    priceInr: 2499,
    priceUsd: 32.99,
    pricePerCoinInr: 0.16,
    pricePerCoinUsd: 0.002,
    status: 'Inactive',
    mostPopular: false,
    sold: 210,
    revenue: 524790,
    icon: '💎',
    image: '/images/ultimate_pack_rupee.png',
  },
];

const fetchMockPackages = async (): Promise<CoinPackage[]> => {
  await new Promise((resolve) => setTimeout(resolve, 300));
  return mockPackagesData;
};

const formatCurrency = (amount: number, currency: 'INR' | 'USD' = 'INR') => {
  if (currency === 'INR') {
    return `₹${amount.toLocaleString('en-IN')}`;
  }
  return `$${amount.toLocaleString('en-US')}`;
};

export function CoinsPackagesView() {
  const [currency, setCurrency] = useState<'INR' | 'USD'>('INR');

  const { data: packages, isLoading } = useQuery<CoinPackage[]>({
    queryKey: ['admin-dashboard-coins-packages'],
    queryFn: fetchMockPackages,
  });

  const columns = useMemo(() => getColumns(currency), [currency]);

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
          <div className="grid w-full grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {packages?.map((pkg) => (
              <Card
                key={pkg.id}
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
                    label={pkg.status}
                    color={pkg.status === 'Active' ? 'emerald' : 'gray'}
                    shape="pill"
                    size="xs"
                    uppercase
                    style="soft"
                  />
                  {pkg.mostPopular && (
                    <Badge
                      label="Most Popular"
                      color="pink"
                      shape="pill"
                      size="xs"
                      uppercase
                      style="soft"
                    />
                  )}
                </div>

                <div className="flex h-20 items-center justify-center">
                  {pkg.image ? (
                    <Image
                      src={pkg.image}
                      alt={pkg.name}
                      width={80}
                      height={80}
                      className="h-full object-contain"
                    />
                  ) : (
                    <span className="text-5xl">{pkg.icon}</span>
                  )}
                </div>

                <div className="flex items-center justify-center gap-1.5">
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-amber-500/10 text-amber-500">
                    <CircleDot className="h-3 w-3" />
                  </div>
                  <span className="text-xl font-bold text-amber-500">
                    {pkg.coins.toLocaleString()}
                  </span>
                </div>

                <div className="bg-muted/30 border-border-soft mt-2 flex w-full items-center justify-center rounded-lg border p-2 px-3">
                  <span className="text-text-primary text-sm font-bold">
                    {currency === 'INR'
                      ? formatCurrency(pkg.priceInr, 'INR')
                      : formatCurrency(pkg.priceUsd, 'USD')}
                  </span>
                </div>

                <div className="mt-1 flex w-full justify-center">
                  <span className="text-text-secondary-65 text-[11px] font-medium">
                    ~
                    {currency === 'INR'
                      ? formatCurrency(pkg.pricePerCoinInr, 'INR')
                      : formatCurrency(pkg.pricePerCoinUsd, 'USD')}{' '}
                    / coin
                  </span>
                </div>
              </Card>
            ))}
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <h2 className="text-text-primary text-lg font-bold">Packages List</h2>
              <p className="text-text-secondary-65 text-sm">
                Detailed view of all available coin packages.
              </p>
            </div>
            <DataTable
              columns={columns}
              data={packages || []}
              pageSize={10}
              className="bg-transparent"
            />
          </div>
        </div>
      )}
    </div>
  );
}
