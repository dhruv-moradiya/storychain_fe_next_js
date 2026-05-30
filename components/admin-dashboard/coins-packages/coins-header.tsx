'use client';

import { Plus } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export const CoinsHeader = () => {
  return (
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
        <Button className="">
          <Plus className="mr-2 h-4 w-4" />
          Add Package
        </Button>
      </div>
    </div>
  );
};
