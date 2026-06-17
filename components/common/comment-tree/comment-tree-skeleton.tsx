import { cn } from '@/lib/utils';

export function CommentTreeSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn(className)}>
      {[1, 2, 3].map((i) => (
        <CommentSkeleton key={i} delay={i * 0.1} />
      ))}
    </div>
  );
}

function CommentSkeleton({ delay = 0 }: { delay?: number }) {
  return (
    <div className="ct-skeleton-card p-4 sm:p-5" style={{ animationDelay: `${delay}s` }}>
      <div className="flex gap-3.5">
        {/* Avatar skeleton */}
        <div className="ct-skeleton-bone h-9 w-9 shrink-0 rounded-full sm:h-10 sm:w-10" />

        <div className="min-w-0 flex-1 space-y-3">
          {/* Header skeleton */}
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <div className="ct-skeleton-bone h-3.5 w-24 rounded-full" />
            <div className="ct-skeleton-bone h-3 w-16 rounded-full" />
            <div className="ct-skeleton-bone h-3 w-14 rounded-full" />
          </div>

          {/* Content skeleton */}
          <div className="space-y-2">
            <div className="ct-skeleton-bone h-3.5 w-full" />
            <div className="ct-skeleton-bone h-3.5 w-full" />
            <div className="ct-skeleton-bone h-3.5 w-3/5" />
          </div>

          {/* Actions skeleton */}
          <div className="flex items-center gap-3 pt-1">
            <div className="ct-skeleton-bone h-8 w-24 rounded-full" />
            <div className="ct-skeleton-bone h-8 w-16 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
