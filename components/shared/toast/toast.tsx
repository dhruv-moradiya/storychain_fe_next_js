'use client';

import * as React from 'react';
import { toast as hotToast, type Toast as HotToast } from 'react-hot-toast';
import { CheckCircle, XCircle, AlertTriangle, Info, Bell, Loader2, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { ToastVariant, ToastOptions } from './types';
import { getToastStyle } from './styles';
import { motion, AnimatePresence } from 'framer-motion';

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
      initial={{ opacity: 0, y: -20, scale: 0.9 }}
      animate={{
        opacity: t.visible ? 1 : 0,
        y: t.visible ? 0 : -20,
        scale: t.visible ? 1 : 0.9,
      }}
      exit={{
        opacity: 0,
        y: -20,
        scale: 0.9,
      }}
      transition={{
        type: 'spring',
        stiffness: 350,
        damping: 30,
        opacity: { duration: 0.2 },
      }}
      className={cn(
        'pointer-events-auto flex w-full max-w-[calc(100vw-32px)] items-center gap-4 rounded-2xl border px-5 py-4 shadow-xl backdrop-blur-md sm:max-w-md',
        style.bg,
        style.border
      )}
    >
      {/* Icon */}
      <div
        className={cn(
          'mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl',
          style.iconBg
        )}
      >
        {customIcon ? (
          <span className={cn(style.icon)}>{customIcon}</span>
        ) : (
          <IconComponent size={18} className={cn(isLoading && 'animate-spin', style.icon)} />
        )}
      </div>

      {/* Content */}
      <div className="flex min-w-0 flex-1 flex-col justify-center gap-1">
        <p
          className={cn(
            'font-libre-baskerville text-[15px] leading-tight font-bold tracking-tight',
            style.text
          )}
        >
          {title}
        </p>
        {description && (
          <p className={cn('font-ibm-plex-mono text-xs leading-relaxed opacity-85', style.text)}>
            {description}
          </p>
        )}
      </div>

      {/* Action button */}
      {action && (
        <button
          onClick={() => {
            action.onClick();
            hotToast.dismiss(t.id);
          }}
          className={cn(
            'font-ibm-plex-mono shrink-0 self-center rounded-lg px-3 py-1.5 text-xs font-medium transition-transform hover:scale-105 active:scale-95',
            style.iconBg,
            style.icon
          )}
        >
          {action.label}
        </button>
      )}

      {/* Dismiss button */}
      {dismissible && !isLoading && (
        <button
          onClick={() => hotToast.dismiss(t.id)}
          className={cn(
            '-mt-2 -mr-2 ml-2 p-1.5 opacity-40 transition-opacity hover:opacity-100',
            style.text
          )}
        >
          <X size={14} />
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
