import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';

import { AnimatePresence, PanInfo, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

import createBadge from '@/components/common/badge';
import { Button } from '@/components/ui/button';

import { IImageItem } from './image-card';

interface ImageCarouselOverlayProps {
  items: IImageItem[];
  initialIndex: number | null;
  onClose: () => void;
}

const SWIPE_THRESHOLD = 50;

export const ImageCarouselOverlay = ({
  items,
  initialIndex,
  onClose,
}: ImageCarouselOverlayProps) => {
  const [currentIndex, setCurrentIndex] = useState<number | null>(initialIndex);
  const [direction, setDirection] = useState(0);

  // Sync state if initialIndex changes from outside (e.g., reopening or closing)
  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex]);

  const isOpen = currentIndex !== null;

  const goToNext = useCallback(() => {
    if (currentIndex === null) return;
    setDirection(1);
    setCurrentIndex((prev) => (prev! === items.length - 1 ? 0 : prev! + 1));
  }, [currentIndex, items.length]);

  const goToPrev = useCallback(() => {
    if (currentIndex === null) return;
    setDirection(-1);
    setCurrentIndex((prev) => (prev! === 0 ? items.length - 1 : prev! - 1));
  }, [currentIndex, items.length]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') goToNext();
      else if (e.key === 'ArrowLeft') goToPrev();
      else if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    // Prevent scrolling on body when overlay is open
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, goToNext, goToPrev, onClose]);

  const handleDragEnd = (e: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.offset.x > SWIPE_THRESHOLD) {
      goToPrev();
    } else if (info.offset.x < -SWIPE_THRESHOLD) {
      goToNext();
    }
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.9,
    }),
    center: {
      z: 1,
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      z: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.9,
    }),
  };

  const currentItem = currentIndex !== null ? items[currentIndex] : null;

  return (
    <AnimatePresence>
      {isOpen && currentItem && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] flex flex-col bg-black/95 backdrop-blur-xl"
        >
          {/* Top Bar */}
          <div className="flex h-16 shrink-0 items-center justify-between px-4 sm:px-6">
            <div className="font-ibm-plex-mono text-sm tracking-widest text-white/70">
              {currentIndex + 1} <span className="mx-1 opacity-50">/</span> {items.length}
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="h-10 w-10 rounded-full text-white/70 transition-colors hover:bg-white/10 hover:text-white"
            >
              <X size={24} />
            </Button>
          </div>

          {/* Main Content Area */}
          <div className="flex flex-1 flex-col overflow-hidden lg:flex-row">
            {/* Image Viewer */}
            <div className="relative flex flex-1 items-center justify-center overflow-hidden">
              <AnimatePresence initial={false} custom={direction} mode="popLayout">
                <motion.div
                  key={currentIndex}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: 'spring', stiffness: 300, damping: 30 },
                    opacity: { duration: 0.2 },
                  }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={1}
                  onDragEnd={handleDragEnd}
                  className="absolute inset-4 flex cursor-grab items-center justify-center active:cursor-grabbing"
                >
                  <div className="relative h-full w-full">
                    <Image
                      src={currentItem.image}
                      alt={currentItem.title}
                      fill
                      className="object-contain"
                      sizes="(max-width: 1024px) 100vw, 75vw"
                      priority
                    />
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Navigation Arrows */}
              <Button
                variant="ghost"
                size="icon"
                onClick={(e) => {
                  e.stopPropagation();
                  goToPrev();
                }}
                className="absolute left-4 z-10 hidden h-12 w-12 rounded-full border border-white/10 bg-black/20 text-white/70 backdrop-blur-md transition-all hover:bg-white/10 hover:text-white sm:flex"
              >
                <ChevronLeft size={32} />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={(e) => {
                  e.stopPropagation();
                  goToNext();
                }}
                className="absolute right-4 z-10 hidden h-12 w-12 rounded-full border border-white/10 bg-black/20 text-white/70 backdrop-blur-md transition-all hover:bg-white/10 hover:text-white sm:flex"
              >
                <ChevronRight size={32} />
              </Button>
            </div>

            {/* Metadata Panel */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="flex w-full shrink-0 flex-col overflow-y-auto border-t border-white/10 bg-black/40 p-6 lg:w-80 lg:border-t-0 lg:border-l"
            >
              <h2 className="mb-3 text-xl font-semibold tracking-tight text-white">
                {currentItem.title}
              </h2>

              <div className="mb-6 flex flex-wrap items-center gap-3">
                {createBadge({
                  label: currentItem.chapter,
                  color: 'gray',
                  size: 'sm',
                })}
                {currentItem.type && (
                  <span className="rounded-full border border-white/5 bg-white/10 px-2.5 py-0.5 text-xs font-medium text-white/80 capitalize">
                    {currentItem.type}
                  </span>
                )}
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="mb-1.5 text-xs font-semibold tracking-wider text-white/50 uppercase">
                    Uploaded Date
                  </h4>
                  <p className="text-sm text-white/90">{currentItem.createdAt}</p>
                </div>

                <div>
                  <h4 className="mb-1.5 text-xs font-semibold tracking-wider text-white/50 uppercase">
                    Description
                  </h4>
                  <p className="text-sm leading-relaxed text-white/70">
                    A beautiful visual representation used in {currentItem.chapter}. This image was
                    added to the gallery on {currentItem.createdAt}.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
