'use client';

import { SlidersHorizontal } from 'lucide-react';
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from 'recharts';

import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

const chartConfig = {
  value: {
    label: 'Level',
    color: 'var(--brand-pink-500)',
  },
} satisfies ChartConfig;

const chartData = [
  { name: 'Bravery', value: 8 },
  { name: 'Intelligence', value: 9 },
  { name: 'Loyalty', value: 9 },
  { name: 'Cunning', value: 6 },
  { name: 'Empathy', value: 7 },
  { name: 'Ambition', value: 5 },
];

export function CharacterAttributes() {
  return (
    <div className="border-soft bg-background/50 space-y-6 rounded-2xl border p-5 md:p-6">
      {/* Title */}
      <div className="flex items-center gap-2">
        <SlidersHorizontal className="text-brand-pink-500 h-5 w-5 shrink-0" />
        <h3 className="text-text-primary text-base font-semibold">Character Attributes</h3>
      </div>

      <div className="grid grid-cols-1 items-center gap-6 sm:grid-cols-2">
        {/* Radar Chart */}
        <div className="flex w-full justify-center">
          <ChartContainer config={chartConfig} className="aspect-square w-full max-w-[220px]">
            <RadarChart
              data={chartData}
              className="mx-auto"
              margin={{ top: 10, right: 10, left: 10, bottom: 10 }}
            >
              <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
              <PolarAngleAxis
                dataKey="name"
                tick={{ fontSize: 10, fill: 'var(--text-secondary-65)', fontWeight: 500 }}
              />
              <PolarGrid stroke="var(--border-soft)" strokeWidth={1} />
              <Radar
                name="Level"
                dataKey="value"
                fill="var(--color-value)"
                fillOpacity={0.15}
                stroke="var(--color-value)"
                strokeWidth={1.5}
                dot={{
                  r: 3.5,
                  fillOpacity: 1,
                  fill: 'var(--color-value)',
                }}
              />
            </RadarChart>
          </ChartContainer>
        </div>

        {/* Legend levels list */}
        <div className="space-y-2.5">
          <h4 className="text-text-primary mb-2 text-[10px] font-bold tracking-wider uppercase">
            Attribute Levels
          </h4>
          <div className="divide-border/30 divide-y">
            {chartData.map((item) => (
              <div key={item.name} className="flex justify-between py-2 text-xs">
                <span className="text-text-secondary-65 font-medium">{item.name}</span>
                <span className="text-text-primary">Level {item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
