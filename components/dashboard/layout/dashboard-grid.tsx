import { cn } from '@/lib/utils';
import { GAP_CLASSES, GapSize } from './constants';

interface DashboardGridProps {
  children: React.ReactNode;
  /**
   * Minimum width for each grid item in pixels
   * @default 250
   */
  minItemWidth?: number;
  /**
   * Gap size between grid items
   * @default 'md'
   */
  gap?: GapSize;
  /**
   * Additional className for the grid container
   */
  className?: string;
}

/**
 * Responsive grid layout for dashboard cards and items.
 * Automatically adjusts column count based on available space.
 *
 * @example
 * ```tsx
 * <DashboardGrid minItemWidth={300} gap="lg">
 *   <StoryCard />
 *   <StoryCard />
 *   <StoryCard />
 * </DashboardGrid>
 * ```
 */
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
