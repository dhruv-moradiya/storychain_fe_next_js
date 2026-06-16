'use client';

import { ChevronDown } from 'lucide-react';
import { CartesianGrid, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';

import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

const activityData = [
  { date: 'Apr 17', purchased: 1250, spent: 380, read: 260 },
  { date: 'Apr 20', purchased: 1250, spent: 650, read: 480 },
  { date: 'Apr 24', purchased: 1500, spent: 1150, read: 580 },
  { date: 'Apr 28', purchased: 1350, spent: 900, read: 380 },
  { date: 'May 1', purchased: 1550, spent: 660, read: 380 },
  { date: 'May 5', purchased: 1500, spent: 980, read: 490 },
  { date: 'May 8', purchased: 1720, spent: 1150, read: 380 },
  { date: 'May 12', purchased: 1550, spent: 900, read: 320 },
  { date: 'May 14', purchased: 1550, spent: 980, read: 480 },
  { date: 'May 16', purchased: 1850, spent: 960, read: 480 },
];

const chartConfig = {
  purchased: {
    label: 'Coins Purchased',
    color: '#10b981',
  },
  spent: {
    label: 'Coins Spent',
    color: '#ec4899',
  },
  read: {
    label: 'Stories Read',
    color: '#3b82f6',
  },
};

const formatYAxis = (value: number) => {
  if (value === 0) return '0';
  if (value >= 1000) {
    return `${value / 1000}K`;
  }
  return value.toString();
};

export const ActivityOverview = () => {
  return (
    <div className="border-border/50 bg-cream-95/80 dark:bg-card/50 relative col-span-8 overflow-hidden rounded-xl border p-6 shadow-2xs">
      {/* Top Header */}
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-text-primary text-lg font-bold">Activity Overview</h3>
        <button className="border-border/80 bg-background text-text-primary hover:bg-brand-warm-beige/20 flex h-9 cursor-pointer items-center gap-1.5 rounded-lg border px-3 text-xs font-semibold shadow-2xs transition-all duration-200">
          <span>Last 30 Days</span>
          <ChevronDown className="text-text-secondary-50 h-3.5 w-3.5" />
        </button>
      </div>

      {/* Legends */}
      <div className="mt-2 mb-6 flex flex-wrap gap-5">
        <div className="text-text-secondary-65 flex items-center gap-1.5 text-xs font-semibold">
          <div className="h-2 w-2 rounded-full bg-[#10b981]" />
          <span>Coins Purchased</span>
        </div>
        <div className="text-text-secondary-65 flex items-center gap-1.5 text-xs font-semibold">
          <div className="h-2 w-2 rounded-full bg-[#ec4899]" />
          <span>Coins Spent</span>
        </div>
        <div className="text-text-secondary-65 flex items-center gap-1.5 text-xs font-semibold">
          <div className="h-2 w-2 rounded-full bg-[#3b82f6]" />
          <span>Stories Read</span>
        </div>
      </div>

      {/* Chart */}
      <ChartContainer config={chartConfig} className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={activityData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid vertical={false} stroke="var(--border-soft)" opacity={0.25} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={12}
              fontSize={11}
              stroke="var(--text-secondary-65)"
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={12}
              fontSize={11}
              stroke="var(--text-secondary-65)"
              tickFormatter={formatYAxis}
              domain={[0, 2000]}
              ticks={[0, 500, 1000, 1500, 2000]}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dot" />} />
            <Line
              type="linear"
              dataKey="purchased"
              stroke="var(--color-purchased)"
              strokeWidth={2}
              dot={{ r: 4, strokeWidth: 1, fill: 'var(--color-purchased)' }}
              activeDot={{ r: 6 }}
            />
            <Line
              type="linear"
              dataKey="spent"
              stroke="var(--color-spent)"
              strokeWidth={2}
              dot={{ r: 4, strokeWidth: 1, fill: 'var(--color-spent)' }}
              activeDot={{ r: 6 }}
            />
            <Line
              type="linear"
              dataKey="read"
              stroke="var(--color-read)"
              strokeWidth={2}
              dot={{ r: 4, strokeWidth: 1, fill: 'var(--color-read)' }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </ChartContainer>

      {/* Bottom Summary Cards */}
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {/* Coins Purchased */}
        <div className="flex flex-col items-center justify-center rounded-xl border border-emerald-500/10 bg-emerald-500/5 p-4 dark:bg-emerald-500/10">
          <span className="text-2xl font-bold tracking-tight text-[#10b981]">1,850</span>
          <span className="text-text-secondary-65 mt-1 text-xs font-semibold">Coins Purchased</span>
        </div>

        {/* Coins Spent */}
        <div className="flex flex-col items-center justify-center rounded-xl border border-pink-500/10 bg-pink-500/5 p-4 dark:bg-pink-500/10">
          <span className="text-2xl font-bold tracking-tight text-[#ec4899]">1,420</span>
          <span className="text-text-secondary-65 mt-1 text-xs font-semibold">Coins Spent</span>
        </div>

        {/* Stories Read */}
        <div className="flex flex-col items-center justify-center rounded-xl border border-blue-500/10 bg-blue-500/5 p-4 dark:bg-blue-500/10">
          <span className="text-2xl font-bold tracking-tight text-[#3b82f6]">86</span>
          <span className="text-text-secondary-65 mt-1 text-xs font-semibold">Stories Read</span>
        </div>
      </div>
    </div>
  );
};
