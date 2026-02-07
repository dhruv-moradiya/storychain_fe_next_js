'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { AlertOctagon, RotateCcw, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

// Animation variants
const fadeIn = (delay = 0) => ({
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.3, delay, ease: [0.25, 0.1, 0.25, 1] as const },
});

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();

  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="bg-bg-cream min-h-screen">
      <div className="container mx-auto flex min-h-screen max-w-md items-center justify-center px-4 py-16">
        <motion.div
          {...fadeIn()}
          className="w-full overflow-hidden rounded-2xl border border-red-100 bg-white/80 p-8 text-center shadow-sm"
        >
          {/* Icon */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-red-50 text-red-500"
          >
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
            >
              <AlertOctagon className="h-12 w-12" />
            </motion.div>
          </motion.div>

          {/* Title */}
          <motion.div {...fadeIn(0.1)} className="mb-2 font-mono text-xl font-bold text-red-500">
            Application Error
          </motion.div>

          {/* Text */}
          <motion.div {...fadeIn(0.15)} className="space-y-2">
            <h1 className="text-primary font-serif text-2xl font-bold">Something went wrong!</h1>
            <p className="text-text-secondary-65 font-mono text-sm">
              We apologize for the inconvenience. An unexpected error has occurred.
            </p>
          </motion.div>

          {/* Dev Mode Error Details */}
          {process.env.NODE_ENV === 'development' && (
            <motion.div
              {...fadeIn(0.2)}
              className="mt-6 overflow-hidden rounded-lg border border-red-200 bg-red-50 text-left"
            >
              <div className="border-b border-red-200 bg-red-100/50 px-4 py-2">
                <p className="font-mono text-xs font-semibold text-red-700">Error Details (Dev)</p>
              </div>
              <div className="scrollbar-thin scrollbar-thumb-red-200 max-h-48 overflow-y-auto p-4">
                <p className="font-mono text-xs break-words text-red-600">{error.message}</p>
                {error.digest && (
                  <p className="mt-2 font-mono text-[10px] text-red-400">Digest: {error.digest}</p>
                )}
              </div>
            </motion.div>
          )}

          {/* Action Buttons */}
          <motion.div
            {...fadeIn(0.25)}
            className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center"
          >
            <Button
              onClick={reset}
              className="bg-brand-pink-500 hover:bg-brand-pink-600 gap-2 font-mono text-sm text-white"
            >
              <RotateCcw className="h-4 w-4" />
              Try Again
            </Button>
            <Button
              variant="outline"
              onClick={() => router.push('/')}
              className="gap-2 border-black/10 font-mono text-sm hover:bg-black/5"
            >
              <Home className="h-4 w-4" />
              Go Home
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
