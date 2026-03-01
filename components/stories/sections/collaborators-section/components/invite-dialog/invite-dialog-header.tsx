import { DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { UserPlus } from 'lucide-react';

export function InviteDialogHeader() {
  return (
    <DialogHeader className="border-border/50 relative overflow-hidden border-b px-6 pt-5 pb-4">
      {/* Background gradient */}
      <div className="from-cream-80 via-cream-60 absolute inset-0 bg-linear-to-br to-transparent" />
      <div className="radial-gradient-orb-pink absolute -top-10 -right-10 size-32 opacity-20 blur-2xl" />
      <div className="radial-gradient-orb-blue absolute -bottom-10 -left-10 size-32 opacity-15 blur-2xl" />

      <div className="relative">
        <DialogTitle className="text-text-primary flex items-center gap-2.5 font-serif text-xl font-semibold">
          <div className="from-brand-pink-500 to-brand-orange flex size-9 items-center justify-center rounded-xl bg-linear-to-br shadow-md ring-2 ring-white/50">
            <UserPlus className="h-4.5 w-4.5 text-white" />
          </div>
          Invite Collaborator
        </DialogTitle>
        <DialogDescription className="text-text-secondary-65 mt-2 text-sm">
          Invite someone to collaborate on your story. Select their role and send a personalized
          invitation.
        </DialogDescription>
      </div>
    </DialogHeader>
  );
}
