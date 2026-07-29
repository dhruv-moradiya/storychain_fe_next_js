'use client';

import * as React from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';

interface UseHideOnScrollOptions {
  initialState?: boolean;
  threshold?: number;
  breakpoint?: number;
}

export function useHideOnScroll({
  initialState = false,
  threshold = 10,
  breakpoint = 1024,
}: UseHideOnScrollOptions = {}) {
  const [isVisible, setIsVisible] = useState(initialState);
  const lastScrollYRef = useRef(0);

  // Reset baseline scroll position whenever overlay becomes visible
  useEffect(() => {
    if (isVisible && typeof window !== 'undefined') {
      lastScrollYRef.current = window.scrollY;
    }
  }, [isVisible]);

  // Handle scroll to hide overlay when user scrolls past threshold
  useEffect(() => {
    if (!isVisible) return;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const distance = Math.abs(currentScrollY - lastScrollYRef.current);
      if (distance > threshold) {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isVisible, threshold]);

  const toggle = useCallback(() => {
    setIsVisible((prev) => !prev);
  }, []);

  const hide = useCallback(() => {
    setIsVisible(false);
  }, []);

  const show = useCallback(() => {
    setIsVisible(true);
  }, []);

  // Single tap on mobile toggles overlay
  const handleContainerClick = useCallback(
    (e: React.MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('button, a, input, textarea, select, [role="button"]')) {
        return;
      }

      const isMobile = window.innerWidth < breakpoint;
      if (isMobile) {
        const selection = window.getSelection()?.toString();
        if (selection && selection.length > 0) return;
        toggle();
      }
    },
    [breakpoint, toggle]
  );

  // Double tap/click on desktop toggles overlay
  const handleContainerDoubleClick = useCallback(
    (e: React.MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('button, a, input, textarea, select, [role="button"]')) {
        return;
      }

      // Clear text selection created by double-clicking words
      if (typeof window !== 'undefined' && window.getSelection()) {
        window.getSelection()?.removeAllRanges();
      }

      toggle();
    },
    [toggle]
  );

  return {
    isVisible,
    setIsVisible,
    toggle,
    hide,
    show,
    handleContainerClick,
    handleContainerDoubleClick,
  };
}
