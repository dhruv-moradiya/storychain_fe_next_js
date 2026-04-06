/**
 * @deprecated This file is deprecated. Please use '@/components/dashboard/layout' instead.
 *
 * This file exists for backward compatibility only and will be removed in a future version.
 *
 * Migration:
 * Before: import { ContentLayout } from '@/components/dashboard/content-layout';
 * After:  import { ContentLayout } from '@/components/dashboard/layout';
 */

export { ContentLayout, DashboardSection, DashboardGrid, DashboardEmptyState } from './layout';

export type {
  MaxWidthVariant,
  SpacingSize,
  PaddingSize,
  GapSize,
  HeaderSpacingSize,
} from './layout';
