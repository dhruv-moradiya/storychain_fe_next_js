'use client';

import * as React from 'react';

import { Award, BookOpen, Clock, Compass, Crown, Flame, Sparkles } from 'lucide-react';
import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts';

import { cn } from '@/lib/utils';

// ==========================================
// 1. Reading Stats Component
// ==========================================
interface StatItemProps {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  iconBg: string;
  iconColor: string;
}

const StatItem = ({ icon: Icon, label, value, iconBg, iconColor }: StatItemProps) => {
  return (
    <div className="flex items-center gap-3">
      <div className={cn('flex h-10 w-10 shrink-0 items-center justify-center rounded-xl', iconBg)}>
        <Icon className={cn('h-5 w-5', iconColor)} />
      </div>
      <div className="flex flex-col">
        <span className="text-text-secondary-65 text-xs font-semibold">{label}</span>
        <span className="text-text-primary mt-0.5 text-sm font-bold">{value}</span>
      </div>
    </div>
  );
};

export const ReadingStats = () => {
  return (
    <div className="border-border/50 bg-cream-95/80 dark:bg-card/50 relative col-span-4 overflow-hidden rounded-xl border p-6 shadow-2xs">
      <h3 className="text-text-primary mb-6 text-lg font-bold">Reading Stats</h3>

      <div className="grid grid-cols-2 gap-x-4 gap-y-6">
        <StatItem
          icon={BookOpen}
          label="Stories Read"
          value="86"
          iconBg="bg-purple-500/10 dark:bg-purple-500/15"
          iconColor="text-purple-500 dark:text-purple-400"
        />
        <StatItem
          icon={Clock}
          label="Hours Spent"
          value="18h 45m"
          iconBg="bg-amber-500/10 dark:bg-amber-500/15"
          iconColor="text-amber-500 dark:text-amber-400"
        />
        <StatItem
          icon={Sparkles}
          label="Favorite Genre"
          value="Fantasy"
          iconBg="bg-teal-500/10 dark:bg-teal-500/15"
          iconColor="text-teal-500 dark:text-teal-400"
        />
        <StatItem
          icon={Flame}
          label="Current Streak"
          value="7 Days"
          iconBg="bg-orange-500/10 dark:bg-orange-500/15"
          iconColor="text-orange-500 dark:text-orange-400"
        />
      </div>
    </div>
  );
};

// ==========================================
// 2. Top Genres Component
// ==========================================
const genreData = [
  { name: 'Fantasy', value: 45, color: '#ec4899' },
  { name: 'Adventure', value: 25, color: '#3b82f6' },
  { name: 'Mystery', value: 20, color: '#10b981' },
  { name: 'Romance', value: 10, color: '#f59e0b' },
];

export const TopGenres = () => {
  return (
    <div className="border-border/50 bg-cream-95/80 dark:bg-card/50 relative col-span-4 overflow-hidden rounded-xl border p-6 shadow-2xs">
      <h3 className="text-text-primary mb-4 text-lg font-bold">Top Genres</h3>

      <div className="flex h-[104px] items-center gap-6">
        {/* Donut Chart */}
        <div className="relative h-28 w-28 shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={genreData}
                cx="50%"
                cy="50%"
                innerRadius={30}
                outerRadius={46}
                paddingAngle={2}
                dataKey="value"
              >
                {genreData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Legend */}
        <div className="flex flex-1 flex-col gap-2">
          {genreData.map((item, index) => (
            <div
              key={index}
              className="text-text-secondary-65 flex items-center justify-between text-xs font-semibold"
            >
              <div className="flex items-center gap-1.5">
                <div
                  className="h-2 w-2 shrink-0 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span>{item.name}</span>
              </div>
              <span className="text-text-primary font-bold">{item.value}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 3. Badges Component
// ==========================================
interface BadgeIconProps {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  fromColor: string;
  toColor: string;
  textColor: string;
  borderColor: string;
}

const BadgeIcon = ({
  icon: Icon,
  label,
  fromColor,
  toColor,
  textColor,
  borderColor,
}: BadgeIconProps) => {
  return (
    <div className="flex flex-col items-center">
      <div
        className={cn(
          'flex h-14 w-14 shrink-0 items-center justify-center rounded-full border bg-gradient-to-br shadow-xs transition-transform duration-300 hover:scale-105',
          fromColor,
          toColor,
          borderColor
        )}
      >
        <Icon className={cn('h-6 w-6', textColor)} />
      </div>
      <span className="text-text-secondary-65 mt-2.5 text-center text-xs font-semibold whitespace-nowrap">
        {label}
      </span>
    </div>
  );
};

export const BadgesPanel = () => {
  return (
    <div className="border-border/50 bg-cream-95/80 dark:bg-card/50 relative col-span-4 overflow-hidden rounded-xl border p-6 shadow-2xs">
      {/* Header */}
      <div className="mb-5 flex items-center justify-between">
        <h3 className="text-text-primary text-lg font-bold">Badges</h3>
        <button className="border-border/80 bg-background text-text-primary hover:bg-brand-warm-beige/20 flex h-9 cursor-pointer items-center justify-center rounded-lg border px-4 text-xs font-semibold shadow-2xs transition-all duration-200 hover:shadow-xs active:scale-98">
          View All
        </button>
      </div>

      {/* Badges Container */}
      <div className="mt-1 flex items-center justify-between gap-1">
        <BadgeIcon
          icon={Award}
          label="Early Bird"
          fromColor="from-amber-100/70"
          toColor="to-amber-200/70"
          borderColor="border-amber-300/30"
          textColor="text-amber-600 dark:text-amber-500"
        />
        <BadgeIcon
          icon={BookOpen}
          label="Bookworm"
          fromColor="from-blue-100/70"
          toColor="to-blue-200/70"
          borderColor="border-blue-300/30"
          textColor="text-blue-600 dark:text-blue-500"
        />
        <BadgeIcon
          icon={Compass}
          label="Explorer"
          fromColor="from-purple-100/70"
          toColor="to-purple-200/70"
          borderColor="border-purple-300/30"
          textColor="text-purple-600 dark:text-purple-500"
        />
        <BadgeIcon
          icon={Crown}
          label="Top Reader"
          fromColor="from-rose-100/70"
          toColor="to-rose-200/70"
          borderColor="border-rose-300/30"
          textColor="text-rose-600 dark:text-rose-500"
        />
      </div>
    </div>
  );
};
