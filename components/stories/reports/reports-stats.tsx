'use client';

import NumberFlow from '@number-flow/react';
import { AlertTriangle, CheckCircle2, Clock, Scale } from 'lucide-react';

interface ReportsStatsProps {
  totalReports: number;
  pendingReports: number;
  resolvedReports: number;
  totalAppeals: number;
}

export function ReportsStats({
  totalReports,
  pendingReports,
  resolvedReports,
  totalAppeals,
}: ReportsStatsProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {/* Total Reports */}
      <div className="border-border/50 bg-card hover:border-border flex flex-col gap-2 rounded-2xl border p-4 shadow-xs transition-all hover:shadow-sm">
        <div className="text-text-secondary-65 flex items-center justify-between text-xs font-semibold tracking-wider uppercase">
          <span>Total Reports</span>
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-500/10">
            <AlertTriangle className="h-4 w-4 text-amber-500" />
          </div>
        </div>
        <div className="text-text-primary text-2xl font-bold">
          <NumberFlow value={totalReports} />
        </div>
        <span className="text-text-secondary-65 text-xs">Flagged items against story</span>
      </div>

      {/* Pending Reviews */}
      <div className="border-border/50 bg-card hover:border-border flex flex-col gap-2 rounded-2xl border p-4 shadow-xs transition-all hover:shadow-sm">
        <div className="text-text-secondary-65 flex items-center justify-between text-xs font-semibold tracking-wider uppercase">
          <span>Pending Review</span>
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-500/10">
            <Clock className="h-4 w-4 text-amber-500" />
          </div>
        </div>
        <div className="text-2xl font-bold text-amber-600 dark:text-amber-400">
          <NumberFlow value={pendingReports} />
        </div>
        <span className="text-text-secondary-65 text-xs">Requires moderation action</span>
      </div>

      {/* Resolved Reports */}
      <div className="border-border/50 bg-card hover:border-border flex flex-col gap-2 rounded-2xl border p-4 shadow-xs transition-all hover:shadow-sm">
        <div className="text-text-secondary-65 flex items-center justify-between text-xs font-semibold tracking-wider uppercase">
          <span>Resolved</span>
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500/10">
            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
          </div>
        </div>
        <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
          <NumberFlow value={resolvedReports} />
        </div>
        <span className="text-text-secondary-65 text-xs">Actions completed</span>
      </div>

      {/* Total Appeals */}
      <div className="border-border/50 bg-card hover:border-border flex flex-col gap-2 rounded-2xl border p-4 shadow-xs transition-all hover:shadow-sm">
        <div className="text-text-secondary-65 flex items-center justify-between text-xs font-semibold tracking-wider uppercase">
          <span>User Appeals</span>
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-purple-500/10">
            <Scale className="h-4 w-4 text-purple-500" />
          </div>
        </div>
        <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
          <NumberFlow value={totalAppeals} />
        </div>
        <span className="text-text-secondary-65 text-xs">Ban / Mute reconsiderations</span>
      </div>
    </div>
  );
}

export default ReportsStats;
