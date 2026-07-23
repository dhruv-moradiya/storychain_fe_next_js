'use client';

import { motion } from 'framer-motion';
import { AlertTriangle, RefreshCw } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ApiErrorProps {
  /** The error message to display. Falls back to a generic message if not provided. */
  message?: string;
  /** Called when the user clicks the retry button. If omitted, the retry button is hidden. */
  onRetry?: () => void;
  /** Whether the retry action is currently in progress. */
  isRetrying?: boolean;
  /** Additional class names for the root container. */
  className?: string;
  /** Whether to render a translucent background overlay behind the error state. */
  overlay?: boolean;
}

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.35, delay, ease: [0.25, 0.1, 0.25, 1] as const },
});

export function ApiError({
  message = 'Something went wrong. Please try again.',
  onRetry,
  isRetrying = false,
  className,
  overlay = true,
}: ApiErrorProps) {
  return (
    <div className={cn('relative flex w-full items-center justify-center px-4 py-10', className)}>
      {/* Background Overlay */}
      {overlay && (
        <div className="bg-background/40 absolute inset-0 rounded-2xl backdrop-blur-xs" />
      )}

      <motion.div
        {...fadeUp()}
        className="border-border/50 bg-card/95 relative z-10 w-full max-w-sm overflow-hidden rounded-2xl border shadow-lg backdrop-blur-md"
      >
        <div className="relative z-10 flex flex-col items-center p-6 text-center sm:p-8">
          {/* Animated icon */}
          <motion.div
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.05, type: 'spring', stiffness: 200 }}
            className="relative mb-4 flex h-16 w-16 items-center justify-center"
          >
            {/* Pulsing background */}
            <motion.div
              className="bg-brand-pink-500/10 absolute inset-0 rounded-full"
              animate={{ scale: [1, 1.15, 1], opacity: [0.6, 0.2, 0.6] }}
              transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
            />
            <div className="border-brand-pink-500/20 bg-brand-pink-500/10 text-brand-pink-500 relative flex h-14 w-14 items-center justify-center rounded-full border shadow-2xs">
              <motion.div
                animate={{ rotate: [0, -6, 6, -4, 4, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut', repeatDelay: 1 }}
              >
                <AlertTriangle className="h-6 w-6" strokeWidth={2} />
              </motion.div>
            </div>
          </motion.div>

          {/* Title */}
          <motion.h3
            {...fadeUp(0.1)}
            className="text-text-primary mb-1.5 text-lg font-semibold tracking-tight"
          >
            Request Failed
          </motion.h3>

          {/* Message */}
          <motion.p
            {...fadeUp(0.15)}
            className="text-text-secondary-65 mb-6 max-w-xs text-xs leading-relaxed"
          >
            {message}
          </motion.p>

          {/* Retry button */}
          {onRetry && (
            <motion.div {...fadeUp(0.2)} className="w-full">
              <Button
                onClick={onRetry}
                disabled={isRetrying}
                className="bg-brand-pink-500 hover:bg-brand-pink-600 w-full cursor-pointer gap-2 text-sm font-medium text-white shadow-2xs disabled:opacity-60"
              >
                <motion.span
                  animate={isRetrying ? { rotate: 360 } : { rotate: 0 }}
                  transition={
                    isRetrying
                      ? { repeat: Infinity, duration: 0.8, ease: 'linear' }
                      : { duration: 0 }
                  }
                  className="flex items-center"
                >
                  <RefreshCw className="h-4 w-4" />
                </motion.span>
                {isRetrying ? 'Retrying…' : 'Try Again'}
              </Button>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
}

export default ApiError;
