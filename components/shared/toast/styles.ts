import type { ToastVariant, ToastStyleConfig } from './types';

// Toast style configurations using CSS variables defined in theme.css
// We use arbitrary values in Tailwind to reference the CSS variables directly
export const toastStyles: Record<ToastVariant, ToastStyleConfig> = {
  success: {
    bg: 'bg-[var(--toast-success-bg)]',
    border: 'border-[var(--toast-success-border)]',
    text: 'text-[var(--toast-success-text)]',
    icon: 'text-[var(--toast-success-icon)]',
    iconBg: 'bg-[var(--toast-success-icon-bg)]',
  },
  error: {
    bg: 'bg-[var(--toast-error-bg)]',
    border: 'border-[var(--toast-error-border)]',
    text: 'text-[var(--toast-error-text)]',
    icon: 'text-[var(--toast-error-icon)]',
    iconBg: 'bg-[var(--toast-error-icon-bg)]',
  },
  warning: {
    bg: 'bg-[var(--toast-warning-bg)]',
    border: 'border-[var(--toast-warning-border)]',
    text: 'text-[var(--toast-warning-text)]',
    icon: 'text-[var(--toast-warning-icon)]',
    iconBg: 'bg-[var(--toast-warning-icon-bg)]',
  },
  info: {
    bg: 'bg-[var(--toast-info-bg)]',
    border: 'border-[var(--toast-info-border)]',
    text: 'text-[var(--toast-info-text)]',
    icon: 'text-[var(--toast-info-icon)]',
    iconBg: 'bg-[var(--toast-info-icon-bg)]',
  },
  default: {
    bg: 'bg-[var(--toast-default-bg)]',
    border: 'border-[var(--toast-default-border)]',
    text: 'text-[var(--toast-default-text)]',
    icon: 'text-[var(--toast-default-icon)]',
    iconBg: 'bg-[var(--toast-default-icon-bg)]',
  },
  loading: {
    bg: 'bg-[var(--toast-loading-bg)]',
    border: 'border-[var(--toast-loading-border)]',
    text: 'text-[var(--toast-loading-text)]',
    icon: 'text-[var(--toast-loading-icon)]',
    iconBg: 'bg-[var(--toast-loading-icon-bg)]',
  },
};

// Get style for a toast variant
export function getToastStyle(variant: ToastVariant): ToastStyleConfig {
  return toastStyles[variant];
}

// Default icons for each variant
export const defaultIcons = {
  success: 'CheckCircle',
  error: 'XCircle',
  warning: 'AlertTriangle',
  info: 'Info',
  default: 'Bell',
  loading: 'Loader2',
} as const;
