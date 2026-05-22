'use client';

import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import { SlidersHorizontal } from 'lucide-react';
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from 'recharts';

import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import type { TCharacterFormValues } from './schema';

const chartConfig = {
  value: {
    label: 'Level',
    color: 'var(--brand-pink-500)',
  },
} satisfies ChartConfig;

const ATTRIBUTE_KEYS = [
  { key: 'bravery', label: 'Bravery' },
  { key: 'intelligence', label: 'Intelligence' },
  { key: 'loyalty', label: 'Loyalty' },
  { key: 'cunning', label: 'Cunning' },
  { key: 'empathy', label: 'Empathy' },
  { key: 'ambition', label: 'Ambition' },
] as const;

export function CharacterAttributesSection() {
  const { control, watch } = useFormContext<TCharacterFormValues>();

  // Watch the attributes fields to render them dynamically in the radar chart
  const bravery = watch('attributes.bravery');
  const intelligence = watch('attributes.intelligence');
  const loyalty = watch('attributes.loyalty');
  const cunning = watch('attributes.cunning');
  const empathy = watch('attributes.empathy');
  const ambition = watch('attributes.ambition');

  const braveryVal = typeof bravery === 'number' && !isNaN(bravery) ? bravery : 0;
  const intelligenceVal =
    typeof intelligence === 'number' && !isNaN(intelligence) ? intelligence : 0;
  const loyaltyVal = typeof loyalty === 'number' && !isNaN(loyalty) ? loyalty : 0;
  const cunningVal = typeof cunning === 'number' && !isNaN(cunning) ? cunning : 0;
  const empathyVal = typeof empathy === 'number' && !isNaN(empathy) ? empathy : 0;
  const ambitionVal = typeof ambition === 'number' && !isNaN(ambition) ? ambition : 0;

  const chartData = [
    { name: 'Bravery', value: braveryVal },
    { name: 'Intelligence', value: intelligenceVal },
    { name: 'Loyalty', value: loyaltyVal },
    { name: 'Cunning', value: cunningVal },
    { name: 'Empathy', value: empathyVal },
    { name: 'Ambition', value: ambitionVal },
  ];

  const levels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <div className="border-border/50 space-y-6 rounded-2xl border p-5 md:p-6">
      <div className="flex items-center gap-2">
        <span className="text-brand-pink-500 text-lg font-semibold">
          <SlidersHorizontal className="text-brand-pink-500 size-5" />
        </span>
        <h3 className="text-text-primary text-base font-semibold">Character Attributes</h3>
      </div>
      <p className="text-muted-foreground -mt-3 text-xs">Define key traits and characteristics.</p>

      {/* Select Dropdowns */}
      <div className="grid grid-cols-3 gap-3">
        {ATTRIBUTE_KEYS.map(({ key, label }) => (
          <div key={key} className="space-y-1.5">
            <Label htmlFor={`attr-${key}`} className="text-text-secondary text-xs! font-semibold">
              {label}
            </Label>
            <Controller
              name={`attributes.${key}`}
              control={control}
              render={({ field }) => (
                <Select
                  onValueChange={(val) => field.onChange(val ? Number(val) : undefined)}
                  value={
                    field.value !== undefined && field.value !== null && !isNaN(field.value)
                      ? String(field.value)
                      : ''
                  }
                >
                  <SelectTrigger className="border-border/50 flex h-8 w-full justify-between rounded-md bg-transparent px-2 text-xs">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent position="popper" className="bg-card border shadow-md">
                    {levels.map((lvl) => (
                      <SelectItem key={lvl} value={String(lvl)} className="text-xs">
                        Level {lvl}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </div>
        ))}
      </div>

      {/* Radar Chart + Attributes display */}
      <div className="grid grid-cols-1 items-center gap-4 pt-2 sm:grid-cols-2">
        {/* Chart Container */}
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
                tick={{ fontSize: 9, fill: 'var(--text-secondary-65)', fontWeight: 500 }}
              />
              <PolarGrid stroke="var(--border-soft)" strokeWidth={1} />
              <Radar
                name="Level"
                dataKey="value"
                fill="var(--color-value)"
                fillOpacity={0.2}
                stroke="var(--color-value)"
                strokeWidth={1.5}
                dot={{
                  r: 3,
                  fillOpacity: 1,
                  fill: 'var(--color-value)',
                }}
              />
            </RadarChart>
          </ChartContainer>
        </div>

        {/* Legend Levels List */}
        <div className="space-y-2 px-2">
          <h4 className="text-text-primary mb-3 text-xs font-bold tracking-wider uppercase">
            Attribute Levels
          </h4>
          <div className="divide-border/30 divide-y">
            {ATTRIBUTE_KEYS.map(({ key, label }) => {
              const val = watch(`attributes.${key}`);
              return (
                <div key={key} className="flex justify-between py-1.5 text-xs">
                  <span className="text-text-secondary-65 font-medium">{label}</span>
                  <span className="text-text-primary font-bold">
                    {val !== undefined && val !== null && !isNaN(val) ? `Level ${val}` : '—'}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
