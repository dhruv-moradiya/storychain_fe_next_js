'use client';

import { useState } from 'react';

import { IBanUserGloballyPayload } from '@/type/reports';
import { UserX } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface AdminBanUserDialogProps {
  userId: string | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onBanSubmit: (userId: string, payload: IBanUserGloballyPayload) => void;
  isSubmitting?: boolean;
}

export function AdminBanUserDialog({
  userId,
  open,
  onOpenChange,
  onBanSubmit,
  isSubmitting = false,
}: AdminBanUserDialogProps) {
  const [reason, setReason] = useState('');
  const [durationDays, setDurationDays] = useState<string>('');
  const [evidenceUrl, setEvidenceUrl] = useState<string>('');

  if (!userId) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reason.trim()) return;

    onBanSubmit(userId, {
      reason,
      durationDays: durationDays ? parseInt(durationDays, 10) : undefined,
      evidenceUrls: evidenceUrl ? [evidenceUrl] : undefined,
    });

    setReason('');
    setDurationDays('');
    setEvidenceUrl('');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-card border-border/50 max-w-md rounded-2xl p-6 shadow-xl">
        <DialogHeader>
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-rose-500/20 bg-rose-500/10">
              <UserX className="size-4 text-rose-500" />
            </div>
            <DialogTitle className="text-text-primary font-libreBaskerville text-lg font-bold">
              Issue Global User Ban
            </DialogTitle>
          </div>
          <DialogDescription className="text-text-secondary-65 text-xs">
            This will ban user <code className="font-mono text-rose-600">{userId}</code>{' '}
            platform-wide.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-2">
          <div className="space-y-1.5">
            <label className="text-text-secondary-65 text-xs font-semibold tracking-wide uppercase">
              Ban Reason (Required)
            </label>
            <Textarea
              placeholder="State the reason for this global platform ban..."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              required
              className="border-border/50 bg-background/50 focus:bg-background min-h-[80px] resize-none rounded-xl text-xs"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-text-secondary-65 text-xs font-semibold tracking-wide uppercase">
              Duration (Days) — Leave empty for Permanent
            </label>
            <Input
              type="number"
              min="1"
              placeholder="e.g. 7, 30 (or empty for permanent)"
              value={durationDays}
              onChange={(e) => setDurationDays(e.target.value)}
              className="border-border/50 bg-background/50 h-9 rounded-xl text-xs"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-text-secondary-65 text-xs font-semibold tracking-wide uppercase">
              Evidence URL (Optional)
            </label>
            <Input
              type="url"
              placeholder="https://..."
              value={evidenceUrl}
              onChange={(e) => setEvidenceUrl(e.target.value)}
              className="border-border/50 bg-background/50 h-9 rounded-xl text-xs"
            />
          </div>

          <DialogFooter className="flex items-center justify-end gap-2 pt-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => onOpenChange(false)}
              disabled={isSubmitting}
              className="border-border/50 bg-card hover:bg-muted/60 h-9 rounded-xl text-xs font-semibold"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              size="sm"
              disabled={isSubmitting || !reason.trim()}
              className="h-9 gap-1.5 rounded-xl bg-rose-600 text-xs font-semibold text-white hover:bg-rose-700"
            >
              <UserX className="size-4" />
              Confirm Global Ban
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default AdminBanUserDialog;
