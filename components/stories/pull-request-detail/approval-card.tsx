'use client';

import type { IPullRequest } from '@/type';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

interface ApprovalCardProps {
  approvalsStatus: IPullRequest['approvalsStatus'];
}

export default function ApprovalCard({ approvalsStatus }: ApprovalCardProps) {
  const progressPercent = Math.min(
    (approvalsStatus.received / approvalsStatus.required) * 100,
    100
  );
  const isComplete = approvalsStatus.received >= approvalsStatus.required;

  return (
    <div className="bg-card border-border/50 flex flex-col gap-4 rounded-sm border p-5 shadow-xs">
      <div className="flex flex-col gap-1">
        <h3 className="text-text-primary text-base font-semibold">Consensus Tracking</h3>
        <p className="text-text-secondary-65 text-xs">Reviewer approvals required for merge.</p>
      </div>

      <div className="flex flex-col gap-3">
        <div className="flex items-end justify-between">
          <div className="flex flex-col">
            <span className="text-text-primary text-2xl leading-none font-bold">
              {approvalsStatus.received} / {approvalsStatus.required}
            </span>
            <span className="text-text-secondary-65 mt-1 text-xs font-medium">Approval Points</span>
          </div>

          <div
            className={cn(
              'flex items-center gap-1 rounded-sm px-2 py-1 text-xs font-semibold',
              isComplete
                ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400'
                : 'bg-amber-500/15 text-amber-600 dark:text-amber-400'
            )}
          >
            {isComplete && <CheckCircle2 className="size-3.5" />}
            <span>{isComplete ? 'Goal Met' : 'Pending'}</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="bg-muted relative h-2 overflow-hidden rounded-full shadow-inner">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 0.8, ease: 'circOut' }}
            className={cn(
              'h-full rounded-full transition-all duration-700',
              isComplete ? 'bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.4)]' : 'bg-amber-500'
            )}
          />
        </div>

        {/* Reviewer Avatars */}
        {approvalsStatus.approvers.length > 0 && (
          <div className="border-border/30 border-t pt-3">
            <span className="text-text-secondary-65 mb-2 block text-xs font-semibold tracking-wide uppercase">
              Verified Approvers
            </span>
            <div className="flex -space-x-2">
              {approvalsStatus.approvers.map((approver, idx) => (
                <Avatar
                  key={idx}
                  className="border-background ring-border/10 h-8 w-8 cursor-help border-2 ring-1 transition-transform hover:z-10 hover:scale-110"
                >
                  <AvatarImage
                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=approver${idx}`}
                    alt={typeof approver === 'string' ? approver : 'Reviewer'}
                  />
                  <AvatarFallback className="bg-emerald-500/15 text-[10px] font-bold text-emerald-600 dark:bg-emerald-500/25 dark:text-emerald-400">
                    {(typeof approver === 'string' ? approver : 'R').charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
