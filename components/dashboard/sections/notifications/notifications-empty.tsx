'use client';

import { BellOff } from 'lucide-react';

export function NotificationsEmpty() {
  return (
    <div className="from-background/80 via-muted/30 to-muted/60 relative mx-auto flex max-w-lg flex-col items-center overflow-hidden rounded-xl border bg-linear-to-b py-14 text-center shadow-xl">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.12),transparent_70%)]" />

      <div className="relative flex items-center justify-center">
        <div className="text-muted-foreground">
          <BellOff size={44} />
        </div>
      </div>

      <h3 className="mt-4 text-lg font-semibold">No Notifications Yet</h3>

      <p className="text-muted-foreground mt-2 max-w-xs text-sm">
        You&apos;re all caught up. Activity related to stories, collaborators, and pull requests
        will appear here.
      </p>
    </div>
  );
}

export default NotificationsEmpty;
