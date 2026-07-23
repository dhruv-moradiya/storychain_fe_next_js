import { ReactNode } from 'react';

import { IChapterStats } from '@/type/chapter/chapter.types';
import { Activity, Clock, Eye, GitBranch, MessageSquare, Users } from 'lucide-react';

import { Separator } from '@/components/ui/separator';

interface StatCardProps {
  icon: ReactNode;
  label: string;
  value: ReactNode;
}

function StatCard({ icon, label, value }: StatCardProps) {
  return (
    <div className="flex flex-col gap-2.5 rounded-lg border p-3 transition-colors sm:gap-3 sm:rounded-xl sm:p-4">
      <div className="text-muted-foreground flex items-center gap-1.5 sm:gap-2">
        <span className="size-4 sm:size-5">{icon}</span>

        <span className="text-[10px] font-medium tracking-wide uppercase sm:text-xs sm:tracking-wider">
          {label}
        </span>
      </div>

      <div className="text-lg leading-none font-semibold sm:text-2xl">{value}</div>
    </div>
  );
}

interface ChapterStatsProps {
  stats: IChapterStats;
}

export function ChapterStats({ stats }: ChapterStatsProps) {
  return (
    <div className="mt-16 mb-8">
      <Separator className="mb-8" />

      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-foreground text-xl font-semibold tracking-tight">
          Chapter Performance
        </h3>

        {/* ENGAGEMENT SCORE */}
        <div className="text-muted-foreground bg-muted/30 flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm">
          <Activity className="text-brand-pink-500 h-4 w-4" />
          <span>
            Score:
            <strong className="text-foreground">{stats.engagementScore}</strong>/100
          </span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 min-[480px]:grid-cols-3 sm:gap-3 md:grid-cols-4 md:gap-4 lg:grid-cols-5">
        {/* READS */}
        <StatCard
          icon={<Eye className="h-4 w-4" />}
          label="Reads"
          value={stats.reads.toLocaleString()}
        />
        {/* UNIQUE READERS */}
        <StatCard
          icon={<Users className="h-4 w-4" />}
          label="Readers"
          value={stats.uniqueReaders.toLocaleString()}
        />
        {/* TOTAL READ TIME */}
        <StatCard
          icon={<Clock className="h-4 w-4" />}
          label="Total Time"
          value={
            <>
              {Math.round(stats.totalReadTime / 60)}
              <span className="text-muted-foreground ml-1 text-base font-normal">m</span>
            </>
          }
        />
        {/* COMMENTS */}
        <StatCard
          icon={<MessageSquare className="h-4 w-4" />}
          label="Comments"
          value={stats.comments.toLocaleString()}
        />
        {/* BRANCHES */}
        <StatCard
          icon={<GitBranch className="h-4 w-4" />}
          label="Branches"
          value={stats.childBranches.toLocaleString()}
        />
      </div>
    </div>
  );
}
