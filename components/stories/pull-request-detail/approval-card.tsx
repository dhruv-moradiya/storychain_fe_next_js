'use client';

import type { IPullRequest } from '@/type';
import { motion } from 'framer-motion';

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
    <div className="bg-card border-border/50 group hover:border-primary/30 overflow-hidden rounded-xl border p-4 transition-all hover:shadow-md">
      <h3 className="text-foreground font-libre-baskerville mb-3 text-sm font-semibold">
        Consensus Tracking
      </h3>

      <div className="space-y-3">
        <div className="flex items-end justify-between">
          <div className="flex flex-col">
            <span className="text-foreground font-libre-baskerville text-2xl leading-none font-bold">
              {approvalsStatus.received}
            </span>
            <span className="text-muted-foreground mt-1 text-xs font-medium">
              Approval Point(s)
            </span>
          </div>
          <span className="text-muted-foreground bg-muted rounded-md px-2 py-1 text-xs font-medium">
            goal: {approvalsStatus.required}
          </span>
        </div>

        {/* Themed Progress Bar */}
        <div className="bg-muted relative h-2 overflow-hidden rounded-full shadow-inner">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 0.8, ease: 'circOut' }}
            className={cn(
              'h-full rounded-full transition-all duration-700',
              isComplete ? 'bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.3)]' : 'bg-secondary'
            )}
          />
        </div>

        {/* Reviewer Avatars */}
        {approvalsStatus.approvers.length > 0 && (
          <div className="border-border/40 border-t pt-3">
            <span className="text-muted-foreground mb-2 block text-xs font-medium">
              Verified by
            </span>
            <div className="flex -space-x-2">
              {approvalsStatus.approvers.map((_, idx) => (
                <Avatar
                  key={idx}
                  className="border-bg-cream ring-border/10 h-8 w-8 cursor-help border-2 ring-1 transition-transform hover:z-10 hover:scale-110"
                >
                  <AvatarImage
                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=approver${idx}`}
                  />
                  <AvatarFallback className="bg-primary/20 text-primary text-[10px] font-bold">
                    RE
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
