'use client';

import { useState } from 'react';

import { AlertTriangle, UserX } from 'lucide-react';

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface BanUserAlertProps {
  userId: string | null;
  username: string | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: (payload: { reason: string; durationDays?: number }) => void;
  isSubmitting?: boolean;
}

export function BanUserAlert({
  userId,
  username,
  open,
  onOpenChange,
  onConfirm,
  isSubmitting = false,
}: BanUserAlertProps) {
  const [reason, setReason] = useState('');
  const [durationDays, setDurationDays] = useState<string>('');

  if (!userId) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onConfirm({
      reason: reason.trim() || 'Terms of Service Violation',
      durationDays: durationDays ? parseInt(durationDays, 10) : undefined,
    });
    setReason('');
    setDurationDays('');
    onOpenChange(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="bg-card border-border/50 max-w-md rounded-2xl p-6 shadow-xl">
        <AlertDialogHeader className="text-left sm:text-left">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-rose-500/20 bg-rose-500/10">
              <UserX className="size-5 animate-pulse text-rose-500" />
            </div>
            <div>
              <AlertDialogTitle className="text-text-primary text-lg font-bold tracking-tight">
                Ban Platform User
              </AlertDialogTitle>
              <AlertDialogDescription className="text-text-secondary-65 text-xs">
                You are about to issue a global ban for user{' '}
                <code className="rounded bg-rose-500/5 px-1.5 py-0.5 font-mono text-rose-600">
                  {username || userId}
                </code>
                .
              </AlertDialogDescription>
            </div>
          </div>
        </AlertDialogHeader>

        {/* Warning Information Banner */}
        <div className="flex gap-3 rounded-xl border border-amber-500/20 bg-amber-500/5 p-3.5 text-xs text-amber-700 dark:text-amber-400">
          <AlertTriangle className="size-5 shrink-0 text-amber-500" />
          <div className="space-y-0.5">
            <span className="block font-semibold">Important Account Action Info</span>
            <p className="text-text-secondary-65 leading-normal">
              Banning this user will immediately revoke their login permissions and disable account
              activity globally. Leaving the duration empty results in a permanent ban.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 py-2">
          {/* Reason Input */}
          <div className="space-y-1.5">
            <label className="text-text-secondary-65 text-[11px] font-bold tracking-wider uppercase">
              Ban Reason (Optional)
            </label>
            <Textarea
              placeholder="Provide a reason (e.g., terms of service violation, spamming...)"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="border-border/50 bg-background/50 focus:bg-background min-h-[80px] resize-none rounded-xl text-xs transition-all"
            />
          </div>

          {/* Duration Days Input */}
          <div className="space-y-1.5">
            <label className="text-text-secondary-65 text-[11px] font-bold tracking-wider uppercase">
              Duration (Days) — Optional
            </label>
            <Input
              type="number"
              min="1"
              max="3650"
              placeholder="e.g., 7, 30 (Leave empty for permanent ban)"
              value={durationDays}
              onChange={(e) => setDurationDays(e.target.value)}
              className="border-border/50 bg-background/50 h-9 rounded-xl text-xs transition-all"
            />
          </div>

          {/* Action Buttons */}
          <AlertDialogFooter className="flex items-center justify-end gap-2 pt-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => {
                setReason('');
                setDurationDays('');
                onOpenChange(false);
              }}
              disabled={isSubmitting}
              className="border-border/50 bg-card hover:bg-muted/60 h-9 rounded-xl text-xs font-semibold"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              size="sm"
              disabled={isSubmitting}
              className="h-9 gap-1.5 rounded-xl bg-rose-600 text-xs font-semibold text-white shadow-sm transition-all hover:bg-rose-700"
            >
              <UserX className="size-3.5" />
              Confirm Global Ban
            </Button>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default BanUserAlert;
