'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { ArrowLeft, ScrollText, ShieldAlert } from 'lucide-react';

import { Button } from '@/components/ui/button';

interface ReportsHeaderProps {
  slug: string;
  storyTitle?: string;
}

export function ReportsHeader({ slug, storyTitle }: ReportsHeaderProps) {
  const router = useRouter();

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-amber-500/20 bg-amber-500/10 shadow-2xs">
          <ShieldAlert className="h-6 w-6 text-amber-500" />
        </div>
        <div>
          <h1 className="text-text-primary font-libreBaskerville text-2xl font-bold tracking-tight">
            Reports &amp; Moderation
          </h1>
          <p className="text-text-secondary-65 text-sm">
            Review user reports, flagged content, and appeals for{' '}
            <span className="text-text-primary font-medium">
              {storyTitle || slug.replace(/-/g, ' ')}
            </span>
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          asChild
          className="border-border/50 bg-card hover:bg-muted/60 h-9 gap-2 rounded-xl text-xs font-semibold shadow-2xs transition-all"
        >
          <Link href={`/stories/${slug}`}>
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to Story
          </Link>
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => router.push(`/stories/${slug}/chapters`)}
          className="border-border/50 bg-card hover:bg-muted/60 h-9 gap-2 rounded-xl text-xs font-semibold shadow-2xs transition-all"
        >
          <ScrollText className="h-3.5 w-3.5 text-emerald-500" />
          Chapter List
        </Button>
      </div>
    </div>
  );
}

export default ReportsHeader;
