/**
 * Root barrel for application types.
 *
 * Prefer importing from the domain-specific sub-paths for tree-shaking:
 *   import type { IStory } from '@/type/story';
 *   import type { IChapter } from '@/type/chapter';
 *
 * This root barrel is provided for convenience in files that need types from
 * multiple domains.
 */

// ── Shared primitives ─────────────────────────────────────────────────────────
export * from './common';

// ── Base response ─────────────────────────────────────────────────────────────
export * from './base-response.type';

// ── Domain modules ────────────────────────────────────────────────────────────
export * from './story';
export * from './chapter';
export * from './auto-save';

// ── Feature types ─────────────────────────────────────────────────────────────
export * from './pull-request.type';
export * from './report.type';
export * from './auth.types';
