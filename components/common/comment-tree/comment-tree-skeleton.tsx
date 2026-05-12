import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

export function CommentTreeSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn(className)}>
      {[1, 2, 3].map((i) => (
        <CommentSkeleton key={i} />
      ))}
    </div>
  );
}

function CommentSkeleton() {
  return (
    <div className="border-border flex gap-4 rounded-xl border p-3 sm:p-4">
      {/* Avatar */}
      <Skeleton className="size-8 rounded-full" />

      <div className="min-w-0 flex-1">
        {/* Header */}
        <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
          <Skeleton className="size-8 h-4 rounded-full" />
          <Skeleton className="size-8 h-3 w-16 rounded-full" />

          <Skeleton className="size-8 h-3 w-16 rounded-full" />
        </div>

        {/* Content */}
        <div className="mt-1.5 space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      </div>
    </div>
  );
}
