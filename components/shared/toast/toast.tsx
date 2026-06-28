'use client';

import * as React from 'react';
import { type Toast as HotToast, toast as hotToast } from 'react-hot-toast';

import { motion } from 'framer-motion';
import { AlertTriangle, Bell, CheckCircle, Info, Loader2, X, XCircle } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

import { getToastStyle } from './styles';
import type { ToastOptions, ToastVariant } from './types';

// Icon mapping
const iconMap = {
  success: CheckCircle,
  error: XCircle,
  warning: AlertTriangle,
  info: Info,
  default: Bell,
  loading: Loader2,
};

interface ToastContentProps {
  t: HotToast;
  title: string;
  variant: ToastVariant;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  dismissible?: boolean;
  customIcon?: React.ReactNode;
}

function ToastContent({
  t,
  title,
  variant,
  description,
  action,
  dismissible = true,
  customIcon,
}: ToastContentProps) {
  const style = getToastStyle(variant);
  const IconComponent = iconMap[variant];
  const isLoading = variant === 'loading';

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: -12, scale: 0.95 }}
      animate={{
        opacity: t.visible ? 1 : 0,
        y: t.visible ? 0 : -12,
        scale: t.visible ? 1 : 0.95,
      }}
      exit={{
        opacity: 0,
        y: -12,
        scale: 0.95,
      }}
      transition={{
        type: 'spring',
        stiffness: 400,
        damping: 28,
        opacity: { duration: 0.15 },
      }}
      className={cn(
        // Base layout — compact on mobile, comfortable on desktop
        'pointer-events-auto relative flex w-full items-center gap-2.5 overflow-hidden rounded-xl border shadow-lg backdrop-blur-xl',
        // Mobile: narrower, tighter padding
        'max-w-[calc(100vw-24px)] px-3 py-2.5',
        // Desktop: wider with more padding
        'sm:max-w-[380px] sm:gap-3 sm:px-4 sm:py-3',
        style.bg,
        style.border
      )}
    >
      {/* Left accent bar */}
      <div
        className={cn('absolute top-0 left-0 h-full w-[3px] rounded-l-xl', style.iconBg)}
        style={{ backgroundColor: `var(--toast-${variant}-icon)` }}
      />

      {/* Icon */}
      <div
        className={cn(
          'mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg sm:h-7 sm:w-7',
          style.iconBg
        )}
      >
        {customIcon ? (
          <span className={cn('text-xs sm:text-sm', style.icon)}>{customIcon}</span>
        ) : (
          <IconComponent
            size={14}
            className={cn(isLoading && 'animate-spin', 'sm:h-4 sm:w-4', style.icon)}
          />
        )}
      </div>

      {/* Content */}
      <div className="flex min-w-0 flex-1 flex-col justify-center gap-0.5">
        <p
          className={cn(
            'text-[13px] leading-snug font-semibold tracking-tight sm:text-sm',
            style.text
          )}
        >
          {title}
        </p>
        {description && (
          <p className={cn('text-[11px] leading-relaxed opacity-75 sm:text-xs', style.text)}>
            {description}
          </p>
        )}
      </div>

      {/* Action button */}
      {action && (
        <Button
          size="sm"
          onClick={() => {
            action.onClick();
            hotToast.dismiss(t.id);
          }}
          className={cn(
            'h-6 shrink-0 rounded-md px-2 text-[10px] font-semibold transition-all hover:scale-105 active:scale-95 sm:h-7 sm:px-2.5 sm:text-[11px]',
            style.iconBg,
            style.icon,
            'hover:opacity-80'
          )}
        >
          {action.label}
        </Button>
      )}

      {/* Dismiss button */}
      {dismissible && !isLoading && (
        <button
          onClick={() => hotToast.dismiss(t.id)}
          className={cn(
            'mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md opacity-40 transition-all hover:bg-black/5 hover:opacity-100 sm:h-6 sm:w-6 dark:hover:bg-white/10',
            style.text
          )}
        >
          <X size={12} className="sm:h-3.5 sm:w-3.5" />
        </button>
      )}
    </motion.div>
  );
}

// Generate unique ID for toast
let toastCounter = 0;
function generateToastId(prefix: string = 'toast') {
  return `${prefix}-${++toastCounter}-${Date.now()}`;
}

// Create toast function
function createToast(title: string, variant: ToastVariant, options?: ToastOptions) {
  const {
    id: providedId,
    duration = variant === 'loading' ? Infinity : 5000,
    icon,
    description,
    action,
    dismissible = true,
  } = options || {};

  const id = providedId || generateToastId(variant);

  if (providedId) hotToast.dismiss(id);

  return hotToast.custom(
    (t) => (
      <ToastContent
        t={t}
        title={title}
        variant={variant}
        description={description}
        action={action}
        dismissible={dismissible}
        customIcon={icon as React.ReactNode}
      />
    ),
    {
      id,
      duration,
    }
  );
}

// Toast API
export const toast = {
  success: (title: string, options?: ToastOptions) => createToast(title, 'success', options),
  error: (title: string, options?: ToastOptions) => createToast(title, 'error', options),
  warning: (title: string, options?: ToastOptions) => createToast(title, 'warning', options),
  info: (title: string, options?: ToastOptions) => createToast(title, 'info', options),
  default: (title: string, options?: ToastOptions) => createToast(title, 'default', options),
  loading: (title: string, options?: ToastOptions) => createToast(title, 'loading', options),
  dismiss: (id?: string) => hotToast.dismiss(id),
  remove: (id?: string) => hotToast.remove(id),
  promise: <T,>(
    promise: Promise<T>,
    messages: {
      loading: string;
      success: string | ((data: T) => string);
      error: string | ((err: Error) => string);
    },
    options?: ToastOptions
  ) => {
    const id = createToast(messages.loading, 'loading', {
      ...options,
      dismissible: false,
    });

    promise
      .then((data) => {
        const successMessage =
          typeof messages.success === 'function' ? messages.success(data) : messages.success;
        setTimeout(() => {
          hotToast.dismiss(id);
          createToast(successMessage, 'success', options);
        }, 400);
      })
      .catch((err) => {
        const errorMessage =
          typeof messages.error === 'function' ? messages.error(err) : messages.error;
        setTimeout(() => {
          hotToast.dismiss(id);
          createToast(errorMessage, 'error', options);
        }, 400);
      });

    return promise;
  },
  custom: (content: React.ReactNode, options?: { id?: string; duration?: number }) =>
    hotToast.custom(() => <>{content}</>, options),
};

export default toast;
