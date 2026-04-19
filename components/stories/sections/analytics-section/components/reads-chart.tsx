'use client';

import { useId, useRef } from 'react';

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

import type { ReadData } from '../analytics.types';

interface ReadsChartProps {
  data: ReadData[];
}

const chartConfig = {
  reads: {
    label: 'Reads',
    color: 'var(--brand-pink-500)',
  },
  uniqueVisitors: {
    label: 'Unique Visitors',
    color: 'var(--brand-blue)',
  },
};

export function ReadsChart({ data }: ReadsChartProps) {
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
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-text-primary flex items-center gap-2 text-sm font-semibold tracking-wide uppercase">
          <div className="bg-brand-pink-500 h-1 w-1 rounded-full" />
          Reads Over Time
        </h3>
        <div className="flex items-center gap-1 text-xs text-green-600">
          <TrendingUp className="h-3 w-3" />
          <span>+15% vs last week</span>
        </div>
      </div>

      <ChartContainer config={chartConfig} className="h-[250px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id={`fillReads-${id}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-reads)" stopOpacity={0.35} />
                <stop offset="95%" stopColor="var(--color-reads)" stopOpacity={0.05} />
              </linearGradient>
              <linearGradient id={`fillVisitors-${id}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-uniqueVisitors)" stopOpacity={0.35} />
                <stop offset="95%" stopColor="var(--color-uniqueVisitors)" stopOpacity={0.05} />
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
            <Area
              dataKey="uniqueVisitors"
              type="monotone"
              fill={`url(#fillVisitors-${id})`}
              stroke="var(--color-uniqueVisitors)"
              strokeWidth={2}
              stackId="a"
            />
            <Area
              dataKey="reads"
              type="monotone"
              fill={`url(#fillReads-${id})`}
              stroke="var(--color-reads)"
              strokeWidth={2}
              stackId="b"
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ResponsiveContainer>
      </ChartContainer>
    </motion.div>
  );
}
