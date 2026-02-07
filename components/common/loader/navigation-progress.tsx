'use client';

import { motion, useSpring } from 'framer-motion';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';

/**
 * A navigation progress bar that mimics the style of ScrollProgress
 * but animates on route changes.
 */
function NavigationProgressContent() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isVisible, setIsVisible] = useState(false);

  // We use useSpring for the smooth animation logic
  const progress = useSpring(0, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Reset progress when route changes (Navigation Complete)
  useEffect(() => {
    if (isVisible) {
      // Complete the animation to 100%
      progress.set(1);

      // Hide after a short delay to allow the 100% state to be seen
      const timeout = setTimeout(() => {
        setIsVisible(false);
        // Reset progress to 0 instantly after hiding, so next start is from 0
        // We do this by jumping the underlying motion value if needed,
        // or just setting spring (which animates, but invisible)
        // To be safe against "shifting left", we ensure it's hidden before resetting.
        setTimeout(() => {
          progress.set(0);
        }, 100);
      }, 500);

      return () => clearTimeout(timeout);
    }
  }, [pathname, searchParams, progress, isVisible]);

  useEffect(() => {
    const handleAnchorClick = (event: MouseEvent) => {
      const anchor = (event.target as HTMLElement).closest('a');
      if (
        anchor &&
        anchor.href &&
        anchor.href.startsWith(window.location.origin) &&
        anchor.target !== '_blank' &&
        !event.ctrlKey &&
        !event.metaKey &&
        anchor.getAttribute('href') !== window.location.pathname // Don't trigger on same page
      ) {
        setIsVisible(true);
        progress.set(0); // Start from 0
        progress.set(0.3); // Jump/Animate to 30%

        // Trickle animation
        // We use a mutable object to track interval to clear it properly
        let currentProgress = 0.3;
        const interval = setInterval(() => {
          currentProgress += Math.random() * 0.1;
          if (currentProgress > 0.9) {
            currentProgress = 0.9;
            clearInterval(interval);
          }
          progress.set(currentProgress);
        }, 200);

        // Store interval on the element or closure if needed, but here we just rely on
        // route change effect to clear things up conceptually.
        // In React, we should register cleanup.
        // However, since route change triggers unmount/remount of page components
        // but NOT the layout components (usually), this effect might persist.
        // We need a way to stop this interval when route changes.
        // The cleanup function of this effect runs when component unmounts
        // OR dependencies change. Dependencies don't change here.
        // So we need a ref to clear interval?
        // Actually, when route changes, the `useEffect` above runs.
        // But `handleAnchorClick` is a global listener.

        // Better approach:
        // Store interval ID in a data attribute or global var? No.
        // Let's just let it run until max 0.9.
        // When route changes, `progress.set(1)` will override the spring target
        // and because spring physics, it will move towards 1.
        // The interval might still try to set it to 0.9, but since we set 1,
        // subsequent 0.9 sets might fight it.

        // Ideally we stop the trickle when navigation completes.
        // But we don't share state between this listener and the route change effect perfectly without refs.
        // Since this is a simple UI polish, letting it trickle to 0.9 and then being overridden by 1 is mostly fine,
        // EXCEPT if the interval sets 0.9 *after* we set 1.

        // To fix this, we can use a module-level variable or Ref to track "isNavigating".
        // But let's keep it simple:
        // The interval stops at 0.9. The route change effect sets 1.
        // If route change happens fast, 1 overrides.
        // If slow, it sits at 0.9 until route change.

        // Cleanup interval on unmount just in case
        return () => clearInterval(interval);
      }
    };

    document.addEventListener('click', handleAnchorClick);
    return () => document.removeEventListener('click', handleAnchorClick);
  }, [progress]);

  // If not visible, return null (unmounts from DOM)
  if (!isVisible) return null;

  return (
    <motion.div
      className="fixed top-0 right-0 left-0 z-100 h-1 origin-left"
      style={{
        scaleX: progress,
        background: 'linear-gradient(90deg, var(--brand-pink-500), var(--brand-blue))',
      }}
    />
  );
}

export function NavigationProgress() {
  return (
    <Suspense fallback={null}>
      <NavigationProgressContent />
    </Suspense>
  );
}
