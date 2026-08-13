'use client';

import { useState } from 'react';

import { motion } from 'framer-motion';
import { BarChart3, Calendar, ChevronDown, Download } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { mockAnalyticsData } from './analytics.data';
import type { DateRange } from './analytics.types';
import {
  BranchingStats,
  ContributionStatsSection,
  OverviewStats,
  ReadingProgress,
  ReadsChart,
  TopChapters,
} from './components';

const dateRangeOptions: { value: DateRange; label: string }[] = [
  { value: '7d', label: 'Last 7 days' },
  { value: '30d', label: 'Last 30 days' },
  { value: '90d', label: 'Last 90 days' },
  { value: '1y', label: 'Last year' },
  { value: 'all', label: 'All time' },
];

interface AnalyticsSectionProps {
  slug: string;
}

const AnalyticsSection = ({ slug }: AnalyticsSectionProps) => {
  const [dateRange, setDateRange] = useState<DateRange>('7d');

  const data = mockAnalyticsData;

  const handleExport = () => {
    const csvLines = [
      'Story Analytics Export',
      `Story Slug,${slug}`,
      `Time Range,${dateRange}`,
      `Exported At,${new Date().toISOString()}`,
      '',
      'Overview Metrics,Value,Change (%)',
      `Total Reads,${data.overview.totalReads},${data.overview.readsChange}%`,
      `Total Upvotes,${data.overview.totalUpvotes},${data.overview.upvotesChange}%`,
      `Upvote Ratio,${data.overview.upvoteRatio}%,N/A`,
      `Total Comments,${data.overview.totalComments},${data.overview.commentsChange}%`,
      `Total Bookmarks,${data.overview.totalBookmarks},${data.overview.bookmarksChange}%`,
      `Coin Unlocks,${data.overview.coinUnlocks},${data.overview.unlocksChange}%`,
      '',
      'Top Chapters,Reads,Change (%)',
      ...data.topChapters.map(
        (ch) =>
          `"Ch. ${ch.chapterNumber}: ${ch.title.replace(/"/g, '""')}",${ch.reads},${ch.change}%`
      ),
      '',
      'Branching Overview,Count',
      `Total Branches,${data.branchingStats.totalBranches}`,
      `Active Branches,${data.branchingStats.activeBranches}`,
      `Max Depth,${data.branchingStats.maxDepth} levels`,
      `Avg Reads Per Branch,${data.branchingStats.avgReadsPerBranch}`,
      '',
      'Pull Requests,Count',
      `Total PRs,${data.contributionStats.totalPRs}`,
      `Merged PRs,${data.contributionStats.mergedPRs}`,
      `Pending PRs,${data.contributionStats.pendingPRs}`,
      `Acceptance Rate,${data.contributionStats.acceptanceRate}%`,
    ];

    const blob = new Blob([csvLines.join('\n')], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${slug}-analytics-${dateRange}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const selectedDateRange = dateRangeOptions.find((opt) => opt.value === dateRange);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="mx-auto w-full max-w-5xl space-y-5 px-3 pb-14 sm:px-4"
    >
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-brand-pink-500/10 flex h-10 w-10 items-center justify-center rounded-xl">
            <BarChart3 className="text-brand-pink-500 h-5 w-5" />
          </div>
          <div>
            <h1 className="text-text-primary text-xl font-semibold">Story Analytics</h1>
            <p className="text-text-secondary-65 text-sm">
              Comprehensive reader engagement, branch metrics, and collaboration activity
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Date Range Selector */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="border-border/50 bg-cream-95 hover:bg-cream-90 gap-2"
              >
                <Calendar className="text-text-secondary-65 h-3.5 w-3.5" />
                {selectedDateRange?.label}
                <ChevronDown className="h-3.5 w-3.5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-cream-95">
              {dateRangeOptions.map((option) => (
                <DropdownMenuItem
                  key={option.value}
                  onClick={() => setDateRange(option.value)}
                  className={
                    dateRange === option.value ? 'bg-brand-pink-500/10 text-brand-pink-500' : ''
                  }
                >
                  {option.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Export Button */}
          <Button
            variant="outline"
            size="sm"
            className="border-border/50 bg-cream-95 hover:bg-cream-90 gap-2"
            onClick={handleExport}
          >
            <Download className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Export CSV</span>
          </Button>
        </div>
      </div>

      {/* Overview Stats */}
      <OverviewStats data={data.overview} />

      {/* Reads & Engagement Over Time Chart */}
      <ReadsChart data={data.readsOverTime} />

      {/* Two Column Layout: Top Chapters & Reader Retention Funnel */}
      <div className="grid gap-5 lg:grid-cols-2 lg:items-start">
        <TopChapters chapters={data.topChapters} slug={slug} />
        <ReadingProgress data={data.chapterRetention} />
      </div>

      {/* Pull Requests & Collaborators */}
      <ContributionStatsSection data={data.contributionStats} />

      {/* Branching Statistics */}
      <BranchingStats data={data.branchingStats} />
    </motion.div>
  );
};

export default AnalyticsSection;
