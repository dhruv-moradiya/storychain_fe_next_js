/**
 * Dashboard Layout Components
 *
 * A collection of reusable layout components for building consistent dashboard UIs.
 * All components are designed to work together while remaining independently composable.
 */

export { DashboardContentLayout } from './dashboard-content-layout';
export { DashboardSection } from './dashboard-section';
export { DashboardGrid } from './dashboard-grid';
export { DashboardEmptyState } from './dashboard-empty-state';

// Re-export types for convenience
export type {
  MaxWidthVariant,
  SpacingSize,
  PaddingSize,
  GapSize,
  HeaderSpacingSize,
} from './constants';
