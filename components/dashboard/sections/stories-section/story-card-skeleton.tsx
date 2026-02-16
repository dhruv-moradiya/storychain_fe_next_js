import { Skeleton } from '@/components/ui/skeleton';

export function StoryCardSkeleton() {
  return (
    <div className="group/story-card bg-card/50 relative cursor-pointer overflow-hidden rounded-[14px] p-1.5 transition-all duration-300">
      <div className="relative flex flex-1 flex-col justify-between gap-2 rounded-[12px] border p-3 shadow">
        {/* TOP ACCENT */}
        <div className="bg-secondary absolute inset-x-16 top-0 h-[2px] rounded-b-full" />

        {/* USER + SLUG */}
        <div className="mb-3 flex items-center gap-2">
          <Skeleton className="size-8 rounded-full" />
          <Skeleton className="h-4 w-24" />
        </div>

        {/* STATUS + TITLE */}
        <div className="mb-3 flex flex-col gap-2">
          <Skeleton className="h-5 w-16 rounded-full" />
          <div className="space-y-1">
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-2/3" />
          </div>
        </div>

        {/* RATING + TAGS */}
        <div className="mt-auto space-y-2">
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-12" />
            <Skeleton className="h-5 w-8 rounded-full" />
          </div>
          <div className="flex gap-2">
            <Skeleton className="h-5 w-16 rounded-full" />
            <Skeleton className="h-5 w-20 rounded-full" />
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div className="relative mt-1.5 h-5">
        <Skeleton className="absolute top-0 left-1 h-3 w-32" />
      </div>
    </div>
  );
}
