'use client';

import { GitBranch, GitFork, GitMerge, Layers } from 'lucide-react';

import { SecondaryBadge } from '@/components/common/badge';
import { Card, CardContent } from '@/components/ui/card';

import type { BranchStats } from '../analytics.types';

interface BranchingStatsProps {
  data: BranchStats;
}

export const BranchingStats = ({ data }: BranchingStatsProps) => {
  return (
    <div className="md:col-span-2 lg:col-span-2">
      <Card className="border-border/50 bg-bg-cream shadow-sm">
        <CardContent className="pt-6">
          <div className="mb-6 flex items-center gap-2">
            <h3 className="text-text-primary flex items-center gap-2 text-sm font-semibold tracking-wide uppercase">
              <div className="bg-brand-pink-500 h-1 w-1 rounded-full" />
              Branching Overview
            </h3>
            <GitBranch className="text-text-secondary-65 h-4 w-4" />
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {/* Stats Cards */}
            <div className="bg-bg-cream-dark/50 border-border/50 flex items-center gap-4 rounded-xl border p-4">
              <div className="bg-brand-pink-500/10 flex h-10 w-10 items-center justify-center rounded-lg">
                <GitBranch className="text-brand-pink-500 h-5 w-5" />
              </div>
              <div>
                <p className="text-text-secondary-65 text-xs font-medium">Total Branches</p>
                <p className="text-text-primary text-xl font-bold">{data.totalBranches}</p>
              </div>
            </div>

            <div className="bg-bg-cream-dark/50 border-border/50 flex items-center gap-4 rounded-xl border p-4">
              <div className="bg-brand-blue/10 flex h-10 w-10 items-center justify-center rounded-lg">
                <GitFork className="text-brand-blue h-5 w-5" />
              </div>
              <div>
                <p className="text-text-secondary-65 text-xs font-medium">Active Branches</p>
                <p className="text-text-primary text-xl font-bold">{data.activeBranches}</p>
              </div>
            </div>

            <div className="bg-bg-cream-dark/50 border-border/50 flex items-center gap-4 rounded-xl border p-4">
              <div className="bg-brand-orange/10 flex h-10 w-10 items-center justify-center rounded-lg">
                <Layers className="text-brand-orange h-5 w-5" />
              </div>
              <div>
                <p className="text-text-secondary-65 text-xs font-medium">Max Depth</p>
                <p className="text-text-primary text-xl font-bold">{data.maxDepth} Levels</p>
              </div>
            </div>

            <div className="bg-bg-cream-dark/50 border-border/50 flex items-center gap-4 rounded-xl border p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-500/10">
                <GitMerge className="h-5 w-5 text-green-500" />
              </div>
              <div>
                <p className="text-text-secondary-65 text-xs font-medium">Avg. Reads/Branch</p>
                <p className="text-text-primary text-xl font-bold">{data.avgReadsPerBranch}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
