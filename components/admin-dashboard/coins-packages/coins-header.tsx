'use client';

import { useState } from 'react';

import { Plus } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useCreateCoinBundle } from '@/services/coin-bundles/coin-bundles.mutation';

import { CreateBundleSheet } from './create-bundle/create-bundle-sheet';
import { CoinBundleFormValues } from './schema/coin-bundle.schema';

export const CoinsHeader = () => {
  const [sheetOpen, setSheetOpen] = useState(false);
  const createMutation = useCreateCoinBundle();

  const handleCreate = async (data: CoinBundleFormValues) => {
    await createMutation.mutateAsync({
      name: data.name,
      slug: data.slug || undefined,
      description: data.description || undefined,
      bundleType: data.bundleType,
      baseCoins: data.baseCoins,
      bonusCoins: data.bonusCoins,
      inrPrice: data.inrPrice,
      usdPrice: data.usdPrice,
      currencies: data.currencies,
      // Thumbnail is required — always present after upload
      thumbnail: {
        url: data.thumbnail.url,
        publicId: data.thumbnail.publicId,
      },
      isFeatured: data.isFeatured,
      isPopular: data.isPopular,
      displayOrder: data.displayOrder,
      promotionalBadge: data.promotionalBadge || undefined,
      marketingTagline: data.marketingTagline || undefined,
      isActive: data.isActive,
      startDate: data.startDate ? new Date(data.startDate).toISOString() : undefined,
      endDate: data.endDate ? new Date(data.endDate).toISOString() : undefined,
      startTime: data.startTime
        ? data.startTime.length === 5
          ? `${data.startTime}:00`
          : data.startTime
        : undefined,
      endTime: data.endTime
        ? data.endTime.length === 5
          ? `${data.endTime}:00`
          : data.endTime
        : undefined,
      timezone: data.timezone,
      restrictions: {
        type: data.restrictions.type,
        dailyLimit: data.restrictions.dailyLimit,
        monthlyLimit: data.restrictions.monthlyLimit,
        lifetimeLimit: data.restrictions.lifetimeLimit,
        perUserLimit: data.restrictions.perUserLimit,
      },
    });
  };

  return (
    <>
      <div
        className={cn(
          'flex w-full flex-col gap-4 bg-transparent sm:flex-row sm:items-center sm:justify-between'
        )}
      >
        {/* Left: Title & Subtitle */}
        <div className="flex flex-col gap-1">
          <h1 className="text-text-primary text-xl font-bold tracking-tight sm:text-2xl">
            Coins & Packages
          </h1>
          <p className="text-text-secondary-65 text-xs font-normal sm:text-sm">
            Manage and view all coins and packages available in the platform
          </p>
        </div>

        {/* Right: Actions */}
        <div className="flex flex-wrap items-center gap-3">
          <Button className="" onClick={() => setSheetOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Package
          </Button>
        </div>
      </div>

      <CreateBundleSheet open={sheetOpen} onOpenChange={setSheetOpen} onSubmit={handleCreate} />
    </>
  );
};
