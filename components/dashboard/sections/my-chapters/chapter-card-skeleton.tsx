import { Skeleton } from '@/components/ui/skeleton';

export function ChapterCardSkeleton() {
  return (
    <div className="group/chapter-card bg-card/50 relative flex h-full cursor-pointer flex-col overflow-hidden rounded-[14px] p-1.5 shadow-sm transition-all duration-300">
      {/* CARD CONTENT */}
      <div className="relative flex flex-1 flex-col justify-between gap-2 rounded-[12px] border p-3 shadow-sm">
        {/* TOP ACCENT */}
        <div className="bg-secondary absolute inset-x-16 top-0 h-[2px] rounded-b-full opacity-50" />

        {/* TOP ROW: Story Title & Chapter # */}
        <div className="mb-2 flex items-center gap-2">
          <Skeleton className="size-8 shrink-0 rounded-full" />
          <div className="flex min-w-0 flex-col gap-1">
            <Skeleton className="h-3 w-24" />
            <Skeleton className="h-2 w-10" />
          </div>
          <div className="ml-auto">
            <Skeleton className="h-3 w-8 rounded-full" />
          </div>
        </div>

        {/* STATUS & BADGES ROW */}
        <div className="mb-2 flex flex-col gap-2">
          <div className="flex flex-wrap items-center gap-2">
            <Skeleton className="h-5 w-16 rounded-full" />
            <Skeleton className="h-5 w-12 rounded-full" />
          </div>

          {/* MAIN TITLE */}
          <div className="min-h-10 space-y-1 py-1">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>

          {/* MODERATION BADGES if needed placeholder */}
          <div className="flex gap-2">
            <Skeleton className="h-4 w-16" />
          </div>
        </div>

        {/* STATS ROW */}
        <div className="border-border/50 mt-auto flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-dashed pt-2">
          <Skeleton className="h-3 w-8" />
          <Skeleton className="h-3 w-8" />
          <Skeleton className="h-3 w-8" />
          <Skeleton className="h-3 w-8" />
        </div>
      </div>

      {/* FOOTER */}
      <div className="relative mt-1.5 h-5 overflow-hidden">
        <Skeleton className="absolute top-0 left-1 h-3 w-32" />
      </div>
    </div>
  );
}
