'use client';

import { useRef } from 'react';

import { motion, useInView } from 'framer-motion';
import { CheckCircle2, Clock, GitPullRequest, Users, XCircle } from 'lucide-react';

import { cn } from '@/lib/utils';

import type { ContributionStats } from '../analytics.types';

interface ContributionStatsProps {
  data: ContributionStats;
}

export function ContributionStatsSection({ data }: ContributionStatsProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={sectionRef}
      initial={{ opacity: 0, y: 10 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
      transition={{ duration: 0.4, delay: 0.3 }}
      className="border-border/50 bg-cream-95 rounded-xl border p-4"
    >
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-text-primary flex items-center gap-2 text-sm font-semibold tracking-wide uppercase">
            <div className="bg-brand-pink-500 h-1 w-1 rounded-full" />
            Pull Requests & Community Contributions
          </h3>
          <p className="text-text-secondary-65 text-xs">
            Community branch submissions, merge rate, and active collaborators
          </p>
        </div>
        <GitPullRequest className="text-brand-pink-500 h-4 w-4" />
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="border-border/50 bg-cream-90/50 rounded-lg border p-3">
          <p className="text-text-secondary-65 text-xs font-medium">Total PRs</p>
          <p className="text-text-primary mt-1 text-lg font-bold">{data.totalPRs}</p>
        </div>
        <div className="border-border/50 bg-cream-90/50 rounded-lg border p-3">
          <p className="text-text-secondary-65 text-xs font-medium">Merged</p>
          <p className="mt-1 text-lg font-bold text-green-600">{data.mergedPRs}</p>
        </div>
        <div className="border-border/50 bg-cream-90/50 rounded-lg border p-3">
          <p className="text-text-secondary-65 text-xs font-medium">Pending Review</p>
          <p className="mt-1 text-lg font-bold text-amber-500">{data.pendingPRs}</p>
        </div>
        <div className="border-border/50 bg-cream-90/50 rounded-lg border p-3">
          <p className="text-text-secondary-65 text-xs font-medium">Acceptance Rate</p>
          <p className="text-brand-pink-500 mt-1 text-lg font-bold">{data.acceptanceRate}%</p>
        </div>
      </div>

      {/* Recent PR Activity */}
      <div className="mt-4">
        <p className="text-text-primary mb-2 text-xs font-semibold">Recent Branch Submissions</p>
        <div className="border-border/40 divide-border/40 divide-y overflow-hidden rounded-lg border">
          {data.recentPRs.map((pr) => {
            const isMerged = pr.status === 'merged';
            const isPending = pr.status === 'pending';

            return (
              <div
                key={pr.id}
                className="hover:bg-cream-90/60 flex items-center justify-between p-2.5 transition-colors"
              >
                <div className="flex min-w-0 flex-1 items-center gap-2.5">
                  {isMerged ? (
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-green-500" />
                  ) : isPending ? (
                    <Clock className="h-4 w-4 shrink-0 text-amber-500" />
                  ) : (
                    <XCircle className="h-4 w-4 shrink-0 text-red-500" />
                  )}
                  <div className="min-w-0 flex-1">
                    <p className="text-text-primary truncate text-xs font-medium">{pr.title}</p>
                    <p className="text-text-secondary-65 text-[10px]">
                      by @{pr.author} • {pr.date}
                    </p>
                  </div>
                </div>

                <span
                  className={cn(
                    'ml-2 shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold capitalize',
                    isMerged && 'bg-green-500/10 text-green-600',
                    isPending && 'bg-amber-500/10 text-amber-600',
                    !isMerged && !isPending && 'bg-red-500/10 text-red-500'
                  )}
                >
                  {pr.status}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
