import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export function CoinPackageCardSkeleton() {
  return (
    <Card className="border-border-soft flex flex-col items-center gap-3 bg-transparent p-4 pt-5 shadow-sm">
      <div className="relative flex w-full justify-center">
        <Skeleton className="h-5 w-24" />
        <Skeleton className="absolute -top-2 -right-2 h-8 w-8 rounded-md" />
      </div>

      <div className="flex h-5 items-center justify-center gap-2">
        <Skeleton className="h-5 w-16 rounded-full" />
      </div>

      <div className="flex h-20 w-full items-center justify-center">
        <Skeleton className="h-20 w-32 rounded-lg" />
      </div>

      <div className="flex items-center justify-center gap-1.5">
        <Skeleton className="h-5 w-5 rounded-full" />
        <Skeleton className="h-6 w-20" />
      </div>

      <Skeleton className="mt-2 h-9 w-full rounded-lg" />

      <div className="mt-1 flex w-full justify-center">
        <Skeleton className="h-3 w-24" />
      </div>
    </Card>
  );
}
