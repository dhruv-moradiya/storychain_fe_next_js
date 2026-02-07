'use client';

import { useEffect, useRef, useState, useCallback, Suspense } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

/**
 * A navigation progress bar that animates from left to right on route changes.
 * Uses CSS transforms for smooth 60fps animations.
 */
function NavigationProgressContent() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isNavigating, setIsNavigating] = useState(false);
  const [progress, setProgress] = useState(0);
  const progressRef = useRef(0);
  const trickleIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const previousPathRef = useRef(pathname + searchParams.toString());
  const isNavigatingRef = useRef(false);

  // Keep ref in sync with state
  useEffect(() => {
    isNavigatingRef.current = isNavigating;
  }, [isNavigating]);

  // Clear trickle interval
  const clearTrickle = useCallback(() => {
    if (trickleIntervalRef.current) {
      clearInterval(trickleIntervalRef.current);
      trickleIntervalRef.current = null;
    }
  }, []);

  // Start the trickle animation
  const startTrickle = useCallback(() => {
    clearTrickle();
    progressRef.current = 0.1;
    setProgress(0.1);

    trickleIntervalRef.current = setInterval(() => {
      progressRef.current += Math.random() * 0.08;
      if (progressRef.current >= 0.9) {
        progressRef.current = 0.9;
        clearTrickle();
      }
      setProgress(progressRef.current);
    }, 150);
  }, [clearTrickle]);

  // Handle route changes - schedule completion in next tick to avoid cascading renders
  useEffect(() => {
    const currentPath = pathname + searchParams.toString();

    if (previousPathRef.current !== currentPath) {
      previousPathRef.current = currentPath;

      if (isNavigatingRef.current) {
        // Use queueMicrotask to avoid synchronous setState in effect
        queueMicrotask(() => {
          clearTrickle();
          setProgress(1);

          // Hide after animation completes
          setTimeout(() => {
            setIsNavigating(false);
            setProgress(0);
            progressRef.current = 0;
          }, 400);
        });
      }
    }
  }, [pathname, searchParams, clearTrickle]);

  // Handle navigation start (anchor clicks and programmatic navigation)
  useEffect(() => {
    const handleNavigationStart = (event: MouseEvent) => {
      const anchor = (event.target as HTMLElement).closest('a');

      if (!anchor) return;

      const href = anchor.getAttribute('href');
      if (!href) return;

      // Skip external links, new tabs, and same-page anchors
      if (
        anchor.target === '_blank' ||
        event.ctrlKey ||
        event.metaKey ||
        event.shiftKey ||
        href.startsWith('http') ||
        href.startsWith('mailto:') ||
        href.startsWith('tel:') ||
        href.startsWith('#')
      ) {
        return;
      }

      // Skip if it's the same path
      const currentPath = window.location.pathname + window.location.search;
      const targetPath = href.split('#')[0]; // Remove hash

      if (currentPath === targetPath) {
        return;
      }

      // Start navigation progress
      setIsNavigating(true);
      isNavigatingRef.current = true;
      startTrickle();
    };

    document.addEventListener('click', handleNavigationStart);

    return () => {
      document.removeEventListener('click', handleNavigationStart);
      clearTrickle();
    };
  }, [startTrickle, clearTrickle]);

  // Cleanup on unmount
  useEffect(() => {
    return () => clearTrickle();
  }, [clearTrickle]);

  if (!isNavigating && progress === 0) return null;

  return (
    <div
      className="fixed top-0 right-0 left-0 z-9999 h-1 overflow-hidden"
      style={{
        pointerEvents: 'none',
      }}
    >
      <div
        className="h-full origin-left transition-transform duration-200 ease-out"
        style={{
          transform: `scaleX(${progress})`,
          background: 'linear-gradient(90deg, var(--brand-pink-500), var(--brand-blue))',
          boxShadow: '0 0 10px var(--brand-pink-500), 0 0 5px var(--brand-blue)',
        }}
      />
      {/* Glow effect at the end */}
      {isNavigating && progress > 0 && progress < 1 && (
        <div
          className="absolute top-0 h-full w-24 animate-pulse"
          style={{
            right: `${(1 - progress) * 100}%`,
            background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4))',
          }}
        />
      )}
    </div>
  );
}

export function NavigationProgress() {
  return (
    <Suspense fallback={null}>
      <NavigationProgressContent />
    </Suspense>
  );
}
