import {
  CheckCircle,
  Clock,
  Crown,
  Eye,
  Handshake,
  type LucideIcon,
  MoreHorizontal,
  PenTool,
  Shield,
  Trash2,
  UserCog,
  XCircle,
} from 'lucide-react';

import type { BadgeColorKey, ColorScheme } from './types';

// Preset color schemes using CSS variables from index.css
export const badgeColors: Record<BadgeColorKey, ColorScheme> = {
  // Brand colors
  pink: {
    bg: 'var(--color-badge-pink-bg)',
    text: 'var(--brand-pink-500)',
    border: 'var(--color-badge-pink-border)',
  },
  blue: {
    bg: 'var(--color-badge-blue-bg)',
    text: 'var(--brand-blue)',
    border: 'var(--color-badge-blue-border)',
  },
  orange: {
    bg: 'var(--color-badge-orange-bg)',
    text: 'var(--brand-orange)',
    border: 'var(--color-badge-orange-border)',
  },
  // Semantic colors
  success: {
    bg: 'var(--color-badge-success-bg)',
    text: 'var(--color-badge-success)',
    border: 'var(--color-badge-success-border)',
  },
  warning: {
    bg: 'var(--color-badge-warning-bg)',
    text: 'var(--color-badge-warning)',
    border: 'var(--color-badge-warning-border)',
  },
  error: {
    bg: 'var(--color-badge-error-bg)',
    text: 'var(--color-badge-error)',
    border: 'var(--color-badge-error-border)',
  },
  info: {
    bg: 'var(--color-badge-info-bg)',
    text: 'var(--color-badge-info)',
    border: 'var(--color-badge-info-border)',
  },
  // Neutral colors
  gray: {
    bg: 'var(--color-badge-gray-bg)',
    text: 'var(--color-badge-gray)',
    border: 'var(--color-badge-gray-border)',
  },
  slate: {
    bg: 'var(--color-badge-slate-bg)',
    text: 'var(--color-badge-slate)',
    border: 'var(--color-badge-slate-border)',
  },
  // Special colors
  purple: {
    bg: 'var(--color-badge-purple-bg)',
    text: 'var(--color-badge-purple)',
    border: 'var(--color-badge-purple-border)',
  },
  cyan: {
    bg: 'var(--color-badge-cyan-bg)',
    text: 'var(--color-badge-cyan)',
    border: 'var(--color-badge-cyan-border)',
  },
  emerald: {
    bg: 'var(--color-badge-emerald-bg)',
    text: 'var(--color-badge-emerald)',
    border: 'var(--color-badge-emerald-border)',
  },
  amber: {
    bg: 'var(--color-badge-amber-bg)',
    text: 'var(--color-badge-amber)',
    border: 'var(--color-badge-amber-border)',
  },
  rose: {
    bg: 'var(--color-badge-rose-bg)',
    text: 'var(--color-badge-rose)',
    border: 'var(--color-badge-rose-border)',
  },
  indigo: {
    bg: 'var(--color-badge-indigo-bg)',
    text: 'var(--color-badge-indigo)',
    border: 'var(--color-badge-indigo-border)',
  },
};

export const ROLE_DISPLAY: Record<
  string,
  { icon: LucideIcon; color: BadgeColorKey; label: string }
> = {
  owner: { icon: Crown, color: 'orange', label: 'Owner' },
  co_author: { icon: PenTool, color: 'purple', label: 'Co-Author' },
  moderator: { icon: Shield, color: 'blue', label: 'Moderator' },
  reviewer: { icon: Eye, color: 'cyan', label: 'Reviewer' },
  contributor: { icon: Handshake, color: 'gray', label: 'Contributor' },
};

export const STATUS_DISPLAY: Record<
  string,
  { icon: LucideIcon; color: BadgeColorKey; label: string }
> = {
  accepted: { icon: CheckCircle, color: 'success', label: 'Accepted' },
  pending: { icon: Clock, color: 'warning', label: 'Pending' },
  declined: { icon: XCircle, color: 'error', label: 'Declined' },
  removed: { icon: XCircle, color: 'gray', label: 'Removed' },
};

export const ROLE_ICON_COLOR: Record<string, string> = {
  owner: 'text-amber-500',
  co_author: 'text-purple-500',
  moderator: 'text-blue-500',
  reviewer: 'text-cyan-500',
  contributor: 'text-gray-500',
};

// Helper to resolve color scheme from key or custom object
export function resolveColorScheme(color: BadgeColorKey | ColorScheme): ColorScheme {
  return typeof color === 'string' ? badgeColors[color] : color;
}
