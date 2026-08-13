import { Skeleton } from '@/components/ui/skeleton';

const OverviewSectionLoading = () => {
  return (
    <section className="mx-auto w-full max-w-6xl space-y-6 px-3 pb-14 sm:space-y-8 sm:px-4">
      {/* StoryHero Skeleton */}
      <div className="space-y-6">
        {/* Top Actions */}
        <div className="flex items-center justify-between gap-2">
          <Skeleton className="h-8 w-20" />
          <div className="flex items-center gap-1.5 sm:gap-3">
            <Skeleton className="hidden h-9 w-9 rounded-lg sm:block" />
            <Skeleton className="h-8 w-16 rounded-lg sm:h-9 sm:w-20" />
            <Skeleton className="h-8 w-8 rounded-lg sm:h-9 sm:w-9" />
            <Skeleton className="h-8 w-8 rounded-lg sm:h-9 sm:w-9" />
          </div>
        </div>

        {/* Header */}
        <div className="flex items-center gap-4">
          <Skeleton className="h-28 w-20 shrink-0 rounded-lg sm:h-36 sm:w-24" />
          <div className="flex-1 space-y-3">
            <Skeleton className="h-3 w-32" />
            <Skeleton className="h-6 w-3/4 sm:h-8 sm:w-1/2" />
            <div className="flex flex-wrap gap-1.5">
              <Skeleton className="h-5 w-20 rounded-full" />
              <Skeleton className="h-5 w-24 rounded-full" />
            </div>
            <div className="flex flex-wrap gap-1.5 pt-1">
              <Skeleton className="h-5 w-16 rounded-full" />
              <Skeleton className="h-5 w-20 rounded-full" />
              <Skeleton className="h-5 w-24 rounded-full" />
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Skeleton */}
      <div className="space-y-5">
        <Skeleton className="h-10.5 w-full rounded-[10px]" />
        <div className="space-y-4 pt-2">
          <Skeleton className="h-32 w-full rounded-xl" />
          <Skeleton className="h-32 w-full rounded-xl" />
        </div>
      </div>
    </section>
  );
};

export default OverviewSectionLoading;
