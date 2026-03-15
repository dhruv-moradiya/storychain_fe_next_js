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

          {/* Top Branches List */}
          <div className="mt-8">
            <h3 className="text-text-primary mb-4 text-sm font-semibold">Most Popular Branches</h3>
            <div className="bg-bg-cream-dark/30 divide-border/40 border-border/40 divide-y overflow-hidden rounded-xl border">
              {data.topBranches.map((branch, index) => (
                <div
                  key={index}
                  className="hover:bg-bg-cream-dark/50 flex items-center justify-between p-4 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="bg-brand-pink-500/10 text-brand-pink-500 flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold">
                      {index + 1}
                    </span>
                    <span className="text-text-primary font-medium">{branch.name}</span>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2 text-xs">
                      <span className="text-text-secondary-65">Depth:</span>
                      <SecondaryBadge label={`${branch.depth} Levels`} size="sm" />
                    </div>
                    <div className="text-text-secondary-65 text-sm font-medium">
                      {branch.reads.toLocaleString()} reads
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
