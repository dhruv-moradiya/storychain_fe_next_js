import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

export function CommentTreeSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn('space-y-3', className)}>
      {[1, 2, 3].map((i) => (
        <CommentSkeleton key={i} />
      ))}
    </div>
  );
}

function CommentSkeleton() {
  return (
    <div className="border-border/40 bg-card/40 rounded-xl border p-3 sm:rounded-2xl sm:p-5">
      <div className="flex gap-2.5 sm:gap-3.5">
        {/* Avatar skeleton */}
        <Skeleton className="h-8 w-8 shrink-0 rounded-full sm:h-10 sm:w-10" />

        <div className="min-w-0 flex-1 space-y-2.5 sm:space-y-3">
          {/* Header skeleton */}
          <div className="flex flex-wrap items-center gap-2">
            <Skeleton className="h-3.5 w-24 rounded-md sm:h-4 sm:w-28" />
            <Skeleton className="h-3 w-16 rounded-md sm:h-3.5 sm:w-20" />
            <Skeleton className="ml-auto h-3 w-12 rounded-md sm:h-3.5 sm:w-14" />
          </div>

          {/* Content skeleton */}
          <div className="space-y-1.5 sm:space-y-2">
            <Skeleton className="h-3.5 w-full rounded-md sm:h-4" />
            <Skeleton className="h-3.5 w-4/5 rounded-md sm:h-4" />
          </div>

          {/* Actions skeleton */}
          <div className="flex items-center gap-2 pt-1 sm:gap-3">
            <Skeleton className="h-7 w-20 rounded-full sm:h-8 sm:w-24" />
            <Skeleton className="ml-auto h-7 w-16 rounded-full sm:h-8 sm:w-20" />
          </div>
        </div>
      </div>
    </div>
  );
}
