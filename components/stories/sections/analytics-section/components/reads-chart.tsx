'use client';

import { useId, useRef, useState } from 'react';

import { motion, useInView } from 'framer-motion';
import { TrendingUp } from 'lucide-react';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis } from 'recharts';

import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { cn } from '@/lib/utils';

import type { ReadData } from '../analytics.types';

interface ReadsChartProps {
  data: ReadData[];
}

const chartConfig = {
  reads: {
    label: 'Total Reads',
    color: '#ec4899', // brand-pink
  },
  uniqueVisitors: {
    label: 'Unique Readers',
    color: '#3b82f6', // brand-blue
  },
  upvotes: {
    label: 'Upvotes',
    color: '#8b5cf6', // purple
  },
};

type MetricMode = 'reads_vs_visitors' | 'reads_vs_upvotes';

export function ReadsChart({ data }: ReadsChartProps) {
  const [metricMode, setMetricMode] = useState<MetricMode>('reads_vs_visitors');
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });
  const id = useId();

  return (
    <motion.div
      ref={sectionRef}
      initial={{ opacity: 0, y: 10 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
      transition={{ duration: 0.4, delay: 0.1 }}
      className="border-border/50 bg-cream-95 rounded-xl border p-4"
    >
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-text-primary flex items-center gap-2 text-sm font-semibold tracking-wide uppercase">
            <div className="bg-brand-pink-500 h-1 w-1 rounded-full" />
            Story Performance & Engagement Trends
          </h3>
          <p className="text-text-secondary-65 text-xs">
            {metricMode === 'reads_vs_visitors'
              ? 'Comparing Total Reads against Unique Readers over time'
              : 'Comparing Total Reads against Upvotes to measure reader satisfaction'}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="border-border/50 bg-cream-90/80 flex items-center rounded-lg border p-0.5 text-xs">
            <button
              onClick={() => setMetricMode('reads_vs_visitors')}
              className={cn(
                'rounded-md px-2.5 py-1 font-medium transition-all',
                metricMode === 'reads_vs_visitors'
                  ? 'bg-cream-95 text-brand-pink-500 shadow-sm'
                  : 'text-text-secondary-65 hover:text-text-primary'
              )}
            >
              Reads vs Readers
            </button>
            <button
              onClick={() => setMetricMode('reads_vs_upvotes')}
              className={cn(
                'rounded-md px-2.5 py-1 font-medium transition-all',
                metricMode === 'reads_vs_upvotes'
                  ? 'bg-cream-95 text-brand-pink-500 shadow-sm'
                  : 'text-text-secondary-65 hover:text-text-primary'
              )}
            >
              Reads vs Upvotes
            </button>
          </div>

          <div className="hidden items-center gap-1 text-xs font-semibold text-green-600 sm:flex">
            <TrendingUp className="h-3.5 w-3.5" />
            <span>+15.4%</span>
          </div>
        </div>
      </div>

      <ChartContainer config={chartConfig} className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id={`fillPrimary-${id}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ec4899" stopOpacity={0.35} />
                <stop offset="95%" stopColor="#ec4899" stopOpacity={0.05} />
              </linearGradient>
              <linearGradient id={`fillSecondary-${id}`} x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor={metricMode === 'reads_vs_visitors' ? '#3b82f6' : '#8b5cf6'}
                  stopOpacity={0.35}
                />
                <stop
                  offset="95%"
                  stopColor={metricMode === 'reads_vs_visitors' ? '#3b82f6' : '#8b5cf6'}
                  stopOpacity={0.05}
                />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="var(--border-soft)"
              opacity={0.5}
            />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              fontSize={12}
              stroke="var(--text-secondary-65)"
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              fontSize={12}
              stroke="var(--text-secondary-65)"
              tickFormatter={(value) => (value >= 1000 ? `${(value / 1000).toFixed(1)}K` : value)}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dot" />} />
            {metricMode === 'reads_vs_visitors' ? (
              <>
                <Area
                  dataKey="uniqueVisitors"
                  name="Unique Readers"
                  type="monotone"
                  fill={`url(#fillSecondary-${id})`}
                  stroke="#3b82f6"
                  strokeWidth={2}
                />
                <Area
                  dataKey="reads"
                  name="Total Reads"
                  type="monotone"
                  fill={`url(#fillPrimary-${id})`}
                  stroke="#ec4899"
                  strokeWidth={2}
                />
              </>
            ) : (
              <>
                <Area
                  dataKey="upvotes"
                  name="Upvotes"
                  type="monotone"
                  fill={`url(#fillSecondary-${id})`}
                  stroke="#8b5cf6"
                  strokeWidth={2}
                />
                <Area
                  dataKey="reads"
                  name="Total Reads"
                  type="monotone"
                  fill={`url(#fillPrimary-${id})`}
                  stroke="#ec4899"
                  strokeWidth={2}
                />
              </>
            )}
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ResponsiveContainer>
      </ChartContainer>
    </motion.div>
  );
}
