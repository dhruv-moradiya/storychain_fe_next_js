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
}: ApiErrorProps) {
  return (
    <div className={cn('flex w-full items-center justify-center px-4 py-12', className)}>
      <motion.div
        {...fadeUp()}
        className="w-full max-w-sm overflow-hidden rounded-2xl border border-black/5 bg-white/80 shadow-sm backdrop-blur-sm"
      >
        {/* Top accent bar */}
        <div className="from-brand-pink-500 via-brand-blue to-brand-orange h-[3px] w-full bg-linear-to-r" />

        <div className="flex flex-col items-center p-8 text-center">
          {/* Animated icon */}
          <motion.div
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.05, type: 'spring', stiffness: 200 }}
            className="relative mb-5 flex h-20 w-20 items-center justify-center"
          >
            {/* Pulsing glow */}
            <motion.div
              className="bg-brand-pink-500/10 absolute inset-0 rounded-full"
              animate={{ scale: [1, 1.18, 1], opacity: [0.6, 0.2, 0.6] }}
              transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
            />
            <div className="bg-brand-pink-500/10 relative flex h-16 w-16 items-center justify-center rounded-full">
              <motion.div
                animate={{ rotate: [0, -6, 6, -4, 4, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut', repeatDelay: 1 }}
              >
                <AlertTriangle className="text-brand-pink-500 h-8 w-8" strokeWidth={1.75} />
              </motion.div>
            </div>
          </motion.div>

          {/* Title */}
          <motion.h3
            {...fadeUp(0.1)}
            className="font-libre-baskerville text-text-tertiary mb-2 text-xl font-semibold tracking-tight"
          >
            Request Failed
          </motion.h3>

          {/* Message */}
          <motion.p
            {...fadeUp(0.15)}
            className="font-ibm-plex-mono text-text-secondary-65 mb-6 text-sm leading-relaxed"
          >
            {message}
          </motion.p>

          {/* Retry button */}
          {onRetry && (
            <motion.div {...fadeUp(0.2)} className="w-full">
              <Button
                onClick={onRetry}
                disabled={isRetrying}
                className="font-ibm-plex-mono bg-brand-pink-500 hover:bg-brand-pink-600 w-full gap-2 text-sm text-white disabled:opacity-60"
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
