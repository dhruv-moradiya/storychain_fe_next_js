import type { AnalyticsData } from './analytics.types';

export const mockAnalyticsData: AnalyticsData = {
  overview: {
    totalReads: 12500,
    totalVotes: 2345,
    totalComments: 890,
    rating: 4.7,
    newSubscribers: 23,
    readsChange: 15,
    votesChange: 8,
    commentsChange: 23,
    ratingChange: 0.1,
    subscribersChange: 12,
  },
  readsOverTime: [
    { date: 'Mon', reads: 1200, uniqueVisitors: 980 },
    { date: 'Tue', reads: 1800, uniqueVisitors: 1450 },
    { date: 'Wed', reads: 2200, uniqueVisitors: 1800 },
    { date: 'Thu', reads: 1900, uniqueVisitors: 1520 },
    { date: 'Fri', reads: 2400, uniqueVisitors: 1950 },
    { date: 'Sat', reads: 2800, uniqueVisitors: 2300 },
    { date: 'Sun', reads: 2600, uniqueVisitors: 2100 },
  ],
  topChapters: [
    { id: '1', title: 'The Final Confrontation', chapterNumber: 47, reads: 2341, change: 45 },
    { id: '2', title: 'Betrayal at Dawn', chapterNumber: 46, reads: 1890, change: 12 },
    { id: '3', title: 'The Beginning', chapterNumber: 1, reads: 1456, change: 5 },
    { id: '4', title: 'The Alliance', chapterNumber: 45, reads: 1234, change: -3 },
    { id: '5', title: 'Shadows of the Past', chapterNumber: 44, reads: 1102, change: 8 },
  ],
  readingProgress: [
    { label: 'Ch. 1-10', value: 3250 },
    { label: 'Ch. 11-25', value: 1850 },
    { label: 'Ch. 26-40', value: 1200 },
    { label: 'Ch. 41-47', value: 750 },
    { label: 'Caught Up', value: 450 },
  ],
  branchingStats: {
    totalBranches: 12,
    activeBranches: 5,
    maxDepth: 8,
    avgReadsPerBranch: 450,
    topBranches: [
      { name: 'The Dark Path', reads: 890, depth: 5 },
      { name: 'Alliance with Elves', reads: 650, depth: 4 },
      { name: 'Betrayal Arc', reads: 420, depth: 6 },
    ],
  },
};
