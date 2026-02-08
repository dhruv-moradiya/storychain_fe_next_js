/**
 * Shared constants and type definitions for dashboard layout components
 */

export type MaxWidthVariant =
  | 'sm'
  | 'md'
  | 'lg'
  | 'xl'
  | '2xl'
  | '3xl'
  | '4xl'
  | '5xl'
  | '6xl'
  | '7xl'
  | 'full';

export type SpacingSize = 'sm' | 'md' | 'lg' | 'xl';

export type PaddingSize = 'none' | 'sm' | 'md' | 'lg';

export type GapSize = 'sm' | 'md' | 'lg';

export type HeaderSpacingSize = 'sm' | 'md' | 'lg';

/**
 * Maximum width class mappings
 */
export const MAX_WIDTH_CLASSES: Record<MaxWidthVariant, string> = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  '2xl': 'max-w-2xl',
  '3xl': 'max-w-3xl',
  '4xl': 'max-w-4xl',
  '5xl': 'max-w-5xl',
  '6xl': 'max-w-6xl',
  '7xl': 'max-w-7xl',
  full: 'max-w-full',
};

/**
 * Vertical spacing class mappings
 */
export const SPACING_CLASSES: Record<SpacingSize, string> = {
  sm: 'space-y-4',
  md: 'space-y-6',
  lg: 'space-y-8',
  xl: 'space-y-10',
};

/**
 * Padding class mappings for responsive padding
 */
export const PADDING_CLASSES: Record<PaddingSize, string> = {
  none: '',
  sm: 'px-4 py-4 sm:px-6 sm:py-6',
  md: 'px-4 py-6 sm:px-6 sm:py-8 lg:px-8',
  lg: 'px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-12',
};

/**
 * Gap class mappings for grid layouts
 */
export const GAP_CLASSES: Record<GapSize, string> = {
  sm: 'gap-3',
  md: 'gap-4',
  lg: 'gap-6',
};

/**
 * Header spacing class mappings
 */
export const HEADER_SPACING_CLASSES: Record<HeaderSpacingSize, string> = {
  sm: 'mb-3',
  md: 'mb-4',
  lg: 'mb-6',
};
