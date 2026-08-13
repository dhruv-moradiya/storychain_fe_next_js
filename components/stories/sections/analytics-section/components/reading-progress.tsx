'use client';

import { useRef } from 'react';

import { motion, useInView } from 'framer-motion';
import { Filter } from 'lucide-react';

import { Progress } from '@/components/ui/progress';

import type { ChapterRetentionData } from '../analytics.types';

interface ReadingProgressProps {
  data: ChapterRetentionData[];
}

export function ReadingProgress({ data }: ReadingProgressProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={sectionRef}
      initial={{ opacity: 0, y: 10 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
      transition={{ duration: 0.4, delay: 0.25 }}
      className="border-border/50 bg-cream-95 rounded-xl border p-4"
    >
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-text-primary flex items-center gap-2 text-sm font-semibold tracking-wide uppercase">
            <div className="bg-brand-pink-500 h-1 w-1 rounded-full" />
            Chapter Retention Funnel
          </h3>
          <p className="text-text-secondary-65 text-xs">
            Percentage of readers continuing through consecutive chapters
          </p>
        </div>
        <Filter className="text-text-secondary-65 h-4 w-4" />
      </div>

      <div className="space-y-3">
        {data.map((item, index) => {
          return (
            <motion.div
              key={item.chapterNumber}
              initial={{ opacity: 0, x: 10 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 10 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="space-y-1.5"
            >
              <div className="flex items-center justify-between text-xs">
                <span className="text-text-primary max-w-[220px] truncate font-medium">
                  Ch. {item.chapterNumber}: {item.title}
                </span>
                <div className="flex items-center gap-2 font-semibold">
                  <span className="text-text-primary">{item.readers.toLocaleString()} readers</span>
                  <span className="text-brand-pink-500 text-[11px] font-bold">
                    ({item.retentionPercentage}%)
                  </span>
                </div>
              </div>

              <div className="bg-cream-90 relative h-2 w-full overflow-hidden rounded-full">
                <motion.div
                  initial={{ width: 0 }}
                  animate={isInView ? { width: `${item.retentionPercentage}%` } : { width: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.05 }}
                  className="from-brand-pink-500 to-brand-blue h-full rounded-full bg-gradient-to-r"
                />
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
