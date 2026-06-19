import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

interface TableSkeletonProps {
  rows?: number;
  columns?: number;
  className?: string;
}

export function TableSkeleton({ rows = 5, columns = 4, className }: TableSkeletonProps) {
  return (
    <div
      className={cn(
        'bg-card border-border/50 overflow-hidden rounded-2xl border shadow-sm',
        className
      )}
    >
      {/* Header */}
      <div
        className="border-border/30 grid gap-4 border-b px-5 py-4"
        style={{
          gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
        }}
      >
        {Array.from({ length: columns }).map((_, i) => (
          <Skeleton key={i} className="h-4 w-3/4" />
        ))}
      </div>

      {/* Body */}
      <div className="divide-border/30 divide-y">
        {Array.from({ length: rows }).map((_, row) => (
          <div
            key={row}
            className="grid gap-4 px-5 py-4"
            style={{
              gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
            }}
          >
            {Array.from({ length: columns }).map((_, col) => (
              <Skeleton key={col} className={cn('h-4', col === 0 ? 'w-3/4' : 'w-full')} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
