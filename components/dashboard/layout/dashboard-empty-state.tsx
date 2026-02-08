import { cn } from '@/lib/utils';

interface DashboardEmptyStateProps {
  /**
   * Optional icon element to display
   */
  icon?: React.ReactNode;
  /**
   * Title text for the empty state
   */
  title: string;
  /**
   * Optional description text
   */
  description?: string;
  /**
   * Optional action element (e.g., button to add new items)
   */
  action?: React.ReactNode;
  /**
   * Additional className for the container
   */
  className?: string;
}

/**
 * Empty state component for dashboard sections with no data.
 * Provides a consistent, user-friendly message when content is empty.
 *
 * @example
 * ```tsx
 * <DashboardEmptyState
 *   icon={<BookIcon />}
 *   title="No stories yet"
 *   description="Start creating your first story"
 *   action={<CreateStoryButton />}
 * />
 * ```
 */
export function DashboardEmptyState({
  icon,
  title,
  description,
  action,
  className,
}: DashboardEmptyStateProps) {
  return (
    <div
      className={cn(
        'border-border/50 flex flex-col items-center justify-center rounded-xl border py-12 text-center',
        className
      )}
    >
      {icon && (
        <div className="bg-muted/50 mb-4 flex h-12 w-12 items-center justify-center rounded-full">
          {icon}
        </div>
      )}
      <p className="text-muted-foreground text-sm">{title}</p>
      {description && <p className="text-muted-foreground/70 mt-1 text-xs">{description}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
