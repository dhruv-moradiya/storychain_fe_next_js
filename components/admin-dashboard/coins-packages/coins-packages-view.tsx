'use client';

import Image from 'next/image';
import { useState } from 'react';

import { ICoinBundle } from '@/type/coin-bundle/coin-bundle.type';
import { CircleDot, MoreVertical } from 'lucide-react';

import Badge from '@/components/common/badge';
import { DashboardSection } from '@/components/dashboard';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  useDeleteCoinBundle,
  useToggleCoinBundleActive,
} from '@/services/coin-bundles/coin-bundles.mutation';
import { useGetCoinBundles } from '@/services/coin-bundles/coin-bundles.query';

import { CoinPackageCardSkeleton } from './coin-package-card-skeleton';
import { CurrencyToggle } from './currency-toggle';
import { PackagesList } from './packages-list';

const formatCurrency = (amount: number, currency: 'INR' | 'USD' = 'INR') => {
  if (currency === 'INR') {
    return `₹${amount.toLocaleString('en-IN')}`;
  }
  return `$${amount.toLocaleString('en-US')}`;
};

export function CoinsPackagesView() {
  const [currency, setCurrency] = useState<'INR' | 'USD'>('INR');

  const { data: bundlesResponse, isLoading } = useGetCoinBundles();
  const bundles: ICoinBundle[] = bundlesResponse?.data ?? [];

  const toggleActiveMutation = useToggleCoinBundleActive();
  const deleteMutation = useDeleteCoinBundle();

  const handleToggleActive = (slug: string) => {
    toggleActiveMutation.mutate(slug);
  };

  const handleDelete = (slug: string) => {
    deleteMutation.mutate(slug);
  };

  const currencyToggle = (
    <div className="flex items-center gap-2">
      <span className="text-text-secondary-65 text-sm">Currency View:</span>
      <CurrencyToggle currency={currency} onChange={setCurrency} />
    </div>
  );

  return (
    <div className="flex w-full flex-col gap-6">
      {/* Coin Packages Section */}
      <DashboardSection title="Coin Packages" headerAction={currencyToggle}>
        {isLoading ? (
          <div className="grid w-full grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <CoinPackageCardSkeleton key={i} />
            ))}
          </div>
        ) : (
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

                <div className="flex h-20 items-center justify-center">
                  <Image
                    src={pkg.thumbnail.url}
                    alt={pkg.name}
                    width={128}
                    height={128}
                    className="rounded-lg"
                    unoptimized
                  />
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
        )}
      </DashboardSection>

      {/* Packages List Section */}
      <DashboardSection title="Packages List">
        <PackagesList
          bundles={bundles}
          currency={currency}
          onToggleActive={handleToggleActive}
          onDelete={handleDelete}
        />
      </DashboardSection>
    </div>
  );
}
