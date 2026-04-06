'use client';

import { useRouter } from 'next/navigation';

import { motion } from 'framer-motion';
import { ArrowLeft, Compass, Home } from 'lucide-react';

import { Button } from '@/components/ui/button';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.45, delay, ease: [0.22, 1, 0.36, 1] as const },
});

interface NotFoundProps {
  title?: string;
  message?: string;
  showHomeButton?: boolean;
  showBackButton?: boolean;
  icon?: React.ReactNode;
}

export function NotFound({
  title = 'Page Not Found',
  message = "The page you're looking for doesn't exist or has been moved.",
  showHomeButton = true,
  showBackButton = true,
  icon,
}: NotFoundProps) {
  const router = useRouter();

  return (
    <div className="bg-background flex min-h-screen items-center justify-center px-4 py-16 transition-colors duration-500">
      {/* Ambient glow orbs */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden="true">
        <div className="glow-404-top absolute -top-24 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full" />
        <div className="glow-404-bottom absolute right-0 -bottom-24 h-[360px] w-[360px] rounded-full" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Card */}
        <motion.div
          {...fadeUp()}
          className="bg-card border-border shadow-secondary/5 rounded-2xl border p-8 text-center shadow-lg backdrop-blur-sm"
        >
          {/* Animated icon */}
          <motion.div
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 18, delay: 0.05 }}
            className="relative mx-auto mb-8 flex h-24 w-24 items-center justify-center"
          >
            {/* Orbit ring */}
            <motion.span
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 8, ease: 'linear' }}
              className="border-secondary/25 absolute inset-0 rounded-full border border-dashed"
            />
            <span className="bg-secondary/10 flex h-[72px] w-[72px] items-center justify-center rounded-full">
              {icon || (
                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
                >
                  <Compass className="text-secondary h-10 w-10" />
                </motion.div>
              )}
            </span>
          </motion.div>

          {/* 404 number */}
          <motion.div
            {...fadeUp(0.1)}
            className="from-primary to-secondary font-ibm-plex-mono bg-linear-to-br bg-clip-text text-7xl leading-none font-bold text-transparent"
          >
            404
          </motion.div>

          {/* Heading + sub */}
          <motion.div {...fadeUp(0.15)} className="mt-4 space-y-2">
            <h1 className="text-foreground font-serif text-2xl font-bold">{title}</h1>
            <p className="text-muted-foreground font-ibm-plex-mono text-sm leading-relaxed">
              {message}
            </p>
          </motion.div>

          {/* Quick links */}
          <motion.div
            {...fadeUp(0.2)}
            className="border-soft bg-secondary/4 mt-6 rounded-xl border px-4 py-3 text-left"
          >
            <p className="text-muted-foreground font-ibm-plex-mono mb-2 text-[11px] font-semibold tracking-wider uppercase">
              You might be looking for
            </p>
            <div className="flex flex-wrap gap-2">
              {['Browse Stories', 'Explore Genres', 'Create Story'].map((label) => (
                <button
                  key={label}
                  onClick={() => router.push(`/${label.toLowerCase().replace(/\s+/g, '-')}`)}
                  className="text-foreground border-border bg-muted font-ibm-plex-mono hover:bg-muted/80 rounded-lg border px-3 py-1.5 text-xs transition-all hover:opacity-80"
                >
                  {label}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Divider */}
          <motion.div {...fadeUp(0.22)} className="bg-border my-6 h-px" />

          {/* Actions */}
          <motion.div
            {...fadeUp(0.25)}
            className="flex flex-col gap-3 sm:flex-row sm:justify-center"
          >
            {showHomeButton && (
              <Button
                onClick={() => router.push('/')}
                className="bg-primary text-primary-foreground font-ibm-plex-mono hover:bg-primary/90 gap-2 text-sm shadow-sm"
              >
                <Home className="h-4 w-4" />
                Go Home
              </Button>
            )}
            {showBackButton && (
              <Button
                variant="outline"
                onClick={() => router.back()}
                className="text-foreground border-strong font-ibm-plex-mono hover:bg-muted gap-2 bg-transparent text-sm"
              >
                <ArrowLeft className="h-4 w-4" />
                Go Back
              </Button>
            )}
          </motion.div>
        </motion.div>

        {/* Bottom hint */}
        <motion.p
          {...fadeUp(0.3)}
          className="text-muted-foreground font-ibm-plex-mono mt-6 text-center text-xs"
        >
          Lost?{' '}
          <a
            href="mailto:support@storychain.app"
            className="text-primary underline underline-offset-2 transition-opacity hover:opacity-70"
          >
            We can help.
          </a>
        </motion.p>
      </div>
    </div>
  );
}

export default NotFound;
