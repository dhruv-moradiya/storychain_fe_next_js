export interface OverviewStat {
  label: string;
  value: string | number;
  change: number;
  changeLabel: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  bgColor: string;
}

export interface ReadData {
  date: string;
  reads: number;
  uniqueVisitors: number;
  upvotes: number;
  unlocks: number;
}

export interface TopChapter {
  id: string;
  title: string;
  chapterNumber: number;
  reads: number;
  unlocks: number;
  upvotes: number;
  isLocked: boolean;
  change: number;
}

export interface ChapterRetentionData {
  chapterNumber: number;
  title: string;
  readers: number;
  retentionPercentage: number;
}

export interface ContributionStats {
  totalPRs: number;
  mergedPRs: number;
  pendingPRs: number;
  acceptanceRate: number;
  activeContributors: number;
  recentPRs: {
    id: string;
    title: string;
    author: string;
    status: 'merged' | 'pending' | 'rejected';
    date: string;
  }[];
}

export interface BranchStats {
  totalBranches: number;
  activeBranches: number;
  maxDepth: number;
  avgReadsPerBranch: number;
}

export interface AnalyticsData {
  overview: {
    totalChapters: number;
    totalReads: number;
    totalUpvotes: number;
    upvoteRatio: number;
    totalComments: number;
    totalBookmarks: number;
    coinUnlocks: number;
    unlockedUsersCount: number;
    chaptersChange: number;
    readsChange: number;
    upvotesChange: number;
    commentsChange: number;
    bookmarksChange: number;
    unlocksChange: number;
  };
  readsOverTime: ReadData[];
  topChapters: TopChapter[];
  chapterRetention: ChapterRetentionData[];
  branchingStats: BranchStats;
  contributionStats: ContributionStats;
}

export type DateRange = '7d' | '30d' | '90d' | '1y' | 'all';
