'use client';

import { Spinner } from '@/components/ui/spinner';

export function AuthLoading() {
  return (
    <div className="bg-bg-cream flex h-screen w-screen items-center justify-center gap-2 text-sm">
      <Spinner /> Loading...
    </div>
  );
}
