'use client';

import { useState } from 'react';

import { ShieldCheck, UserCheck } from 'lucide-react';

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

interface UnbanUserAlertProps {
  userId: string | null;
  username: string | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: (payload: { reason?: string }) => void;
  isSubmitting?: boolean;
}

export function UnbanUserAlert({
  userId,
  username,
  open,
  onOpenChange,
  onConfirm,
  isSubmitting = false,
}: UnbanUserAlertProps) {
  const [reason, setReason] = useState('');

  if (!userId) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onConfirm({
      reason: reason.trim() || 'Ban lifted by administrator',
    });
    setReason('');
    onOpenChange(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="bg-card border-border/50 max-w-md rounded-2xl p-6 shadow-xl">
        <AlertDialogHeader className="text-left sm:text-left">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-emerald-500/20 bg-emerald-500/10">
              <UserCheck className="size-5 text-emerald-500" />
            </div>
            <div>
              <AlertDialogTitle className="text-text-primary text-lg font-bold tracking-tight">
                Lift User Ban
              </AlertDialogTitle>
              <AlertDialogDescription className="text-text-secondary-65 text-xs">
                You are about to lift the global ban for user{' '}
                <code className="rounded bg-emerald-500/5 px-1.5 py-0.5 font-mono text-emerald-600">
                  {username || userId}
                </code>
                .
              </AlertDialogDescription>
            </div>
          </div>
        </AlertDialogHeader>

        {/* Info Message Box */}
        <div className="flex gap-3 rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-3.5 text-xs text-emerald-700 dark:text-emerald-400">
          <ShieldCheck className="size-5 shrink-0 text-emerald-500" />
          <div className="space-y-0.5">
            <span className="block font-semibold">Restore Account Privileges</span>
            <p className="text-text-secondary-65 leading-normal">
              Confirming this action will immediately restore user privileges, enabling them to log
              in, write chapters, vote, and participate across the platform.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 py-2">
          {/* Reason Input */}
          <div className="space-y-1.5">
            <label className="text-text-secondary-65 text-[11px] font-bold tracking-wider uppercase">
              Reason for Unban (Optional)
            </label>
            <Textarea
              placeholder="State why this ban is being lifted (e.g., appeal approved, warning period over...)"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="border-border/50 bg-background/50 focus:bg-background min-h-[80px] resize-none rounded-xl text-xs transition-all"
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
              className="h-9 gap-1.5 rounded-xl bg-emerald-600 text-xs font-semibold text-white shadow-sm transition-all hover:bg-emerald-700"
            >
              <UserCheck className="size-3.5" />
              Confirm Unban
            </Button>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default UnbanUserAlert;
