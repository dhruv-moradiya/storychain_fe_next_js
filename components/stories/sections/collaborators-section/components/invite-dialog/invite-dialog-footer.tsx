import { Button } from '@/components/ui/button';
import { DialogFooter } from '@/components/ui/dialog';
import { CheckCircle, Mail } from 'lucide-react';

// ── InvitedCountBadge ─────────────────────────────────────────────────────────

function InvitedCountBadge({ count }: { count: number }) {
  if (count === 0) return <div />;

  return (
    <div className="animate-in fade-in-0 zoom-in-95 flex items-center gap-2 rounded-lg bg-green-500/10 px-3 py-1.5 ring-1 ring-green-500/20 duration-200">
      <CheckCircle className="h-3.5 w-3.5 text-green-600" />
      <p className="text-xs font-semibold text-green-700">
        {count} invitation{count > 1 ? 's' : ''} sent
      </p>
    </div>
  );
}

// ── InviteDialogFooter ────────────────────────────────────────────────────────

interface InviteDialogFooterProps {
  invitedCount: number;
  hasSelectedUser: boolean;
  isSending: boolean;
  onCancel: () => void;
}

export function InviteDialogFooter({
  invitedCount,
  hasSelectedUser,
  isSending,
  onCancel,
}: InviteDialogFooterProps) {
  return (
    <DialogFooter className="bg-muted/10 border-border/50 flex-row items-center justify-between border-t px-6 py-4">
      <InvitedCountBadge count={invitedCount} />

      <div className="flex items-center gap-3">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={onCancel}
          className="text-text-secondary hover:text-text-primary hover:bg-muted/50 font-medium"
        >
          Cancel
        </Button>

        <Button
          type="submit"
          size="sm"
          disabled={!hasSelectedUser || isSending}
          className="bg-brand-pink-500 hover:bg-brand-pink-600 group shadow-brand-pink-shadow25 relative overflow-hidden font-semibold text-white shadow-md transition-all hover:shadow-lg disabled:opacity-50 disabled:shadow-none"
        >
          <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
          <Mail className="relative mr-2 h-4 w-4" />
          <span className="relative">{isSending ? 'Sending…' : 'Send Invite'}</span>
        </Button>
      </div>
    </DialogFooter>
  );
}
