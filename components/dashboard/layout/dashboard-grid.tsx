import { cn } from '@/lib/utils';
import { GAP_CLASSES, GapSize } from './constants';

interface DashboardGridProps {
  children: React.ReactNode;
  minItemWidth?: number;
  gap?: GapSize;
  className?: string;
}

export function DashboardGrid({
  children,
  minItemWidth = 250,
  gap = 'md',
  className,
}: DashboardGridProps) {
  return (
    <div
      className={cn('grid', GAP_CLASSES[gap], className)}
      style={{
        gridTemplateColumns: `repeat(auto-fill, minmax(min(${minItemWidth}px, 100%), 1fr))`,
      }}
    >
      {children}
    </div>
  );
}
