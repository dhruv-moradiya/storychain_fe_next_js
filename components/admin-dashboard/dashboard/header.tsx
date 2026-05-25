'use client';

import { Download, Filter, Search } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

export const DashboardHeader = () => {
  return (
    <div
      className={cn(
        'flex w-full flex-col gap-4 bg-transparent px-6 py-5 sm:flex-row sm:items-center sm:justify-between'
      )}
    >
      {/* Left: Title & Subtitle */}
      <div className="flex flex-col gap-1">
        <h1 className="text-text-primary text-xl font-bold tracking-tight sm:text-2xl">Users</h1>
        <p className="text-text-secondary-65 text-xs font-normal sm:text-sm">
          Manage and view all registered users in the platform
        </p>
      </div>

      {/* Right: Controls (Search, Filter, Export) */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative w-full sm:w-64 md:w-72">
          <Search className="text-text-secondary-50 absolute top-1/2 left-3 h-4 w-4 shrink-0 -translate-y-1/2 transition-colors duration-200" />
          <Input
            type="text"
            placeholder="Search users"
            className="border-border/85 hover:border-border focus-visible:ring-primary/20 text-text-primary placeholder:text-text-secondary-50 h-10 w-full rounded-lg bg-transparent pr-4 pl-9 text-sm transition-all duration-200"
          />
        </div>

        <Button
          variant="outline"
          className="border-border/80 bg-background text-text-primary hover:bg-brand-warm-beige/20 hover:text-text-primary h-10 cursor-pointer gap-2 rounded-lg border px-4 text-sm font-semibold shadow-2xs transition-all duration-200 hover:shadow-xs active:scale-98"
        >
          <Filter className="h-4 w-4 shrink-0" />
          <span>Filter</span>
        </Button>

        <Button className="">
          <Download className="h-4 w-4 shrink-0" />
          <span>Export</span>
        </Button>
      </div>
    </div>
  );
};
