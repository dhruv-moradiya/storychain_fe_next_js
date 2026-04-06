'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { motion } from 'framer-motion';
import { AlertOctagon, Home, RotateCcw, Terminal } from 'lucide-react';

import { Button } from '@/components/ui/button';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.45, delay, ease: [0.22, 1, 0.36, 1] as const },
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
    console.error(error);
  }, [error]);

  return (
    <div className="bg-background flex min-h-screen items-center justify-center px-4 py-16 transition-colors duration-500">
      {/* Ambient glow orbs */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden="true">
        <div className="glow-error-top absolute -top-32 left-1/2 h-[480px] w-[480px] -translate-x-1/2 rounded-full" />
        <div className="glow-error-bottom absolute right-0 bottom-0 h-[300px] w-[300px] rounded-full" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Card */}
        <motion.div
          {...fadeUp()}
          className="bg-card border-destructive/20 shadow-destructive/8 rounded-2xl border p-8 text-center shadow-lg backdrop-blur-sm"
        >
          {/* Animated icon */}
          <motion.div
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 18, delay: 0.05 }}
            className="relative mx-auto mb-8 flex h-24 w-24 items-center justify-center"
          >
            {/* Ring pulse */}
            <motion.span
              animate={{ scale: [1, 1.25, 1], opacity: [0.4, 0, 0.4] }}
              transition={{ repeat: Infinity, duration: 2.4, ease: 'easeInOut' }}
              className="bg-destructive/15 absolute inset-0 rounded-full"
            />
            <span className="bg-destructive/12 flex h-full w-full items-center justify-center rounded-full">
              <motion.div
                animate={{ rotate: [0, 6, -6, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
              >
                <AlertOctagon className="text-destructive h-11 w-11" />
              </motion.div>
            </span>
          </motion.div>

          {/* Label pill */}
          <motion.div {...fadeUp(0.1)} className="mb-4 flex justify-center">
            <span className="text-destructive border-destructive/25 bg-destructive/8 font-ibm-plex-mono inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium tracking-wider uppercase">
              <span className="bg-destructive h-1.5 w-1.5 rounded-full" />
              Application Error
            </span>
          </motion.div>

          {/* Heading + sub */}
          <motion.div {...fadeUp(0.15)} className="space-y-2">
            <h1 className="text-foreground font-serif text-2xl font-bold">Something went wrong</h1>
            <p className="text-muted-foreground font-ibm-plex-mono text-sm leading-relaxed">
              An unexpected error occurred. Our team has been notified.
            </p>
          </motion.div>

          {/* Dev-only error details */}
          {process.env.NODE_ENV === 'development' && (
            <motion.div
              {...fadeUp(0.2)}
              className="border-destructive/20 bg-destructive/5 mt-6 overflow-hidden rounded-xl border text-left"
            >
              <div className="border-destructive/15 flex items-center gap-2 border-b px-4 py-2">
                <Terminal className="text-destructive h-3.5 w-3.5" />
                <p className="text-destructive font-ibm-plex-mono text-xs font-semibold">
                  Dev — Error Details
                </p>
              </div>
              <div className="scrollbar-thin scrollbar-thumb-destructive/20 max-h-40 overflow-y-auto p-4">
                <p className="text-destructive/90 font-ibm-plex-mono text-xs break-all">
                  {error.message}
                </p>
                {error.digest && (
                  <p className="text-muted-foreground font-ibm-plex-mono mt-2 text-[10px] opacity-60">
                    digest: {error.digest}
                  </p>
                )}
              </div>
            </motion.div>
          )}

          {/* Divider */}
          <motion.div {...fadeUp(0.22)} className="bg-border my-8 h-px" />

          {/* Actions */}
          <motion.div
            {...fadeUp(0.25)}
            className="flex flex-col gap-3 sm:flex-row sm:justify-center"
          >
            <Button
              onClick={reset}
              className="bg-destructive text-destructive-foreground font-ibm-plex-mono hover:bg-destructive/90 gap-2 text-sm shadow-sm"
            >
              <RotateCcw className="h-4 w-4" />
              Try Again
            </Button>
            <Button
              variant="outline"
              onClick={() => router.push('/')}
              className="text-foreground border-strong font-ibm-plex-mono hover:bg-muted gap-2 bg-transparent text-sm"
            >
              <Home className="h-4 w-4" />
              Go Home
            </Button>
          </motion.div>
        </motion.div>

        {/* Bottom hint */}
        <motion.p
          {...fadeUp(0.3)}
          className="text-muted-foreground font-ibm-plex-mono mt-6 text-center text-xs"
        >
          If this keeps happening,{' '}
          <a
            href="mailto:support@storychain.app"
            className="text-primary underline underline-offset-2 transition-opacity hover:opacity-70"
          >
            contact support
          </a>
          .
        </motion.p>
      </div>
    </div>
  );
}
