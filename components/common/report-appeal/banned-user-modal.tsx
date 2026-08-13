'use client';

import { useState } from 'react';

import { IBanHistoryData } from '@/type/reports/ban-history.types';
import { format, formatDistanceToNow } from 'date-fns';
import { AlertTriangle, Calendar, Clock, HelpCircle, Scale, ShieldAlert } from 'lucide-react';

import AppealDialog from '@/components/common/appeal-dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from '@/components/ui/dialog';

interface BannedUserModalProps {
  banHistory?: IBanHistoryData | null;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const FALLBACK_BAN_HISTORY: IBanHistoryData = {
  userId: 'current-user',
  bannedBy: 'Platform Moderation Team',
  reason:
    'Violation of StoryChain community guidelines regarding inappropriate content and platform safety rules.',
  banType: 'GLOBAL',
  durationDays: 14,
  expiresAt: '2026-08-18T00:00:00.000Z',
  isActive: true,
  createdAt: '2026-08-04T00:00:00.000Z',
};

export function BannedUserModal({
  banHistory,
  open: customOpen,
  onOpenChange: customOnOpenChange,
}: BannedUserModalProps) {
  const [internalOpen, setInternalOpen] = useState(true);

  const isOpen = customOpen !== undefined ? customOpen : internalOpen;
  const setOpen = customOnOpenChange || setInternalOpen;

  // Fallback mock ban data if none passed
  const data: IBanHistoryData = banHistory || FALLBACK_BAN_HISTORY;

  const isPermanent = !data.expiresAt;

  const formattedExpiresAt = data.expiresAt
    ? format(new Date(data.expiresAt), 'MMM dd, yyyy · hh:mm a')
    : 'Permanent Ban';

  const timeRemaining = data.expiresAt
    ? formatDistanceToNow(new Date(data.expiresAt), { addSuffix: true })
    : 'No expiration date';

  const formattedBannedAt = data.createdAt
    ? format(new Date(data.createdAt), 'MMM dd, yyyy')
    : 'Recently';

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogContent className="border-border/50 bg-card overflow-hidden rounded-2xl p-0 shadow-2xl sm:max-w-[540px]">
        {/* Top Warning Banner Accent */}
        <div className="flex items-center gap-4 border-b border-rose-500/20 bg-rose-500/10 px-6 py-5">
          <div className="flex h-12 w-12 shrink-0 animate-pulse items-center justify-center rounded-2xl bg-rose-500/20 text-rose-600 ring-4 ring-rose-500/10 dark:text-rose-400">
            <ShieldAlert className="size-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <Badge className="border border-rose-500/30 bg-rose-500/15 text-[10px] font-bold tracking-wider text-rose-600 uppercase shadow-none dark:text-rose-400">
                {data.banType || 'ACCOUNT BAN'}
              </Badge>
              <span className="flex items-center gap-1 text-[11px] font-semibold text-rose-500">
                <span className="h-2 w-2 animate-ping rounded-full bg-rose-500" />
                Active Sanction
              </span>
            </div>
            <DialogTitle className="text-text-primary mt-1 text-lg font-bold">
              Your Account Has Been Suspended
            </DialogTitle>
          </div>
        </div>

        <div className="space-y-5 p-6">
          <DialogDescription className="text-text-secondary-65 text-xs leading-relaxed">
            You are currently restricted from interacting with the app due to an active moderation
            sanction recorded against your account.
          </DialogDescription>

          {/* Ban Details Card */}
          <div className="border-border/50 bg-muted/20 space-y-3.5 rounded-xl border p-4">
            <div className="space-y-1">
              <span className="text-text-secondary-50 text-[11px] font-semibold tracking-wider uppercase">
                Reason for Ban
              </span>
              <p className="text-text-primary text-xs leading-normal font-medium">{data.reason}</p>
            </div>

            <div className="border-border/30 grid grid-cols-2 gap-3 border-t pt-3 text-xs">
              <div className="space-y-0.5">
                <span className="text-text-secondary-50 flex items-center gap-1 text-[11px]">
                  <Calendar className="size-3 text-rose-500" />
                  Banned On
                </span>
                <span className="text-text-primary font-mono text-xs font-semibold">
                  {formattedBannedAt}
                </span>
              </div>

              <div className="space-y-0.5">
                <span className="text-text-secondary-50 flex items-center gap-1 text-[11px]">
                  <Clock className="size-3 text-amber-500" />
                  Ban Expiration
                </span>
                <span className="text-text-primary font-mono text-xs font-semibold">
                  {isPermanent ? (
                    <span className="font-bold text-rose-500">Permanent</span>
                  ) : (
                    formattedExpiresAt
                  )}
                </span>
              </div>
            </div>

            {!isPermanent && (
              <div className="flex items-center gap-2 rounded-lg border border-amber-500/20 bg-amber-500/10 px-3 py-2 text-[11px] font-medium text-amber-600 dark:text-amber-400">
                <AlertTriangle className="size-3.5 shrink-0" />
                <span>Sanction expires {timeRemaining}</span>
              </div>
            )}
          </div>

          {/* Help & Appeal Notice Box */}
          <div className="border-border/40 bg-card flex items-start gap-3 rounded-xl border p-3.5 shadow-2xs">
            <HelpCircle className="text-primary mt-0.5 size-4 shrink-0" />
            <div className="space-y-1 text-xs">
              <p className="text-text-primary font-semibold">Believe this was a mistake?</p>
              <p className="text-text-secondary-65 text-[11px] leading-normal">
                Our moderation team reviews appeals thoroughly. You can submit an appeal detailing
                your situation for prompt re-evaluation.
              </p>
            </div>
          </div>
        </div>

        {/* Modal Actions */}
        <DialogFooter className="border-border/40 bg-muted/20 border-t p-4 sm:flex-row sm:justify-between sm:space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setOpen(false)}
            className="text-text-secondary-65 hover:text-text-primary text-xs"
          >
            Close Notice
          </Button>

          {/* Appeal Dialog Component Integration */}
          <AppealDialog
            banId={data._id}
            banReason={data.reason}
            bannedAt={data.createdAt ? new Date(data.createdAt) : undefined}
            trigger={
              <Button
                size="sm"
                className="gap-2 bg-rose-600 text-xs font-semibold text-white shadow-xs hover:bg-rose-700"
              >
                <Scale className="size-3.5" />
                Submit Ban Appeal
              </Button>
            }
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default BannedUserModal;
