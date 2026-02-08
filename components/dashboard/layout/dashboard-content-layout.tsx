import { cn } from '@/lib/utils';
import {
  MAX_WIDTH_CLASSES,
  MaxWidthVariant,
  PADDING_CLASSES,
  PaddingSize,
  SPACING_CLASSES,
  SpacingSize,
} from './constants';

interface DashboardContentLayoutProps {
  children: React.ReactNode;
  /**
   * Maximum width of the content area
   * @default '7xl'
   */
  maxWidth?: MaxWidthVariant;
  /**
   * Additional className for the container
   */
  className?: string;
  /**
   * Whether to add default vertical spacing between children
   * @default true
   */
  withSpacing?: boolean;
  /**
   * Spacing size between children
   * @default 'md'
   */
  spacingSize?: SpacingSize;
  /**
   * Padding size for the container
   * @default 'md'
   */
  paddingSize?: PaddingSize;
  /**
   * Whether content should be centered
   * @default true
   */
  centered?: boolean;
}

/**
 * A common layout component for dashboard content areas.
 * Provides consistent responsive spacing, max-width constraints, and padding.
 *
 * @example
 * ```tsx
 * <DashboardContentLayout maxWidth="5xl" paddingSize="lg">
 *   <h1>Dashboard Content</h1>
 * </DashboardContentLayout>
 * ```
 */
export function DashboardContentLayout({
  children,
  maxWidth = '7xl',
  className,
  withSpacing = true,
  spacingSize = 'md',
  paddingSize = 'md',
  centered = true,
}: DashboardContentLayoutProps) {
  return (
    <div
      className={cn(
        'w-full',
        MAX_WIDTH_CLASSES[maxWidth],
        centered && 'mx-auto',
        withSpacing && SPACING_CLASSES[spacingSize],
        PADDING_CLASSES[paddingSize],
        className
      )}
    >
      {children}
    </div>
  );
}
