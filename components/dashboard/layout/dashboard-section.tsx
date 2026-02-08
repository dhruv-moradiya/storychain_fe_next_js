import { cn } from '@/lib/utils';
import { HEADER_SPACING_CLASSES, HeaderSpacingSize } from './constants';

interface DashboardSectionProps {
  children: React.ReactNode;
  /**
   * Optional section title
   */
  title?: string;
  /**
   * Optional header action (e.g., buttons, links, metadata)
   */
  headerAction?: React.ReactNode;
  /**
   * Additional className for the section container
   */
  className?: string;
  /**
   * Spacing between header and content
   * @default 'md'
   */
  headerSpacing?: HeaderSpacingSize;
}

/**
 * Section wrapper for grouping related content with an optional header.
 * Useful for creating organized dashboard sections with consistent styling.
 *
 * @example
 * ```tsx
 * <DashboardSection title="Recent Activity" headerAction={<ViewAllLink />}>
 *   <ActivityList />
 * </DashboardSection>
 * ```
 */
export function DashboardSection({
  children,
  title,
  headerAction,
  className,
  headerSpacing = 'md',
}: DashboardSectionProps) {
  return (
    <section className={cn('w-full', className)}>
      {(title || headerAction) && (
        <div
          className={cn('flex items-center justify-between', HEADER_SPACING_CLASSES[headerSpacing])}
        >
          {title && <h2 className="text-foreground text-sm font-semibold">{title}</h2>}
          {headerAction && <div className="text-muted-foreground text-xs">{headerAction}</div>}
        </div>
      )}
      {children}
    </section>
  );
}
