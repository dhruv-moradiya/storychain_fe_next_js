'use client';

import type { IPullRequest } from '@/type';

interface ChangesTabProps {
  pullRequest: IPullRequest;
}

export default function ChangesTab({ pullRequest }: ChangesTabProps) {
  return (
    <div className="mt-8">
      <div className="border-border/50 bg-card/60 overflow-hidden overflow-x-auto rounded-2xl border shadow-sm transition-all duration-500">
        <div className="divide-border/20 divide-y overflow-hidden">
          <div className="group/line relative">
            <div className="flex items-center gap-2 border-b border-emerald-500/5 bg-emerald-500/5 px-8 py-3 font-mono text-[10px] font-bold tracking-widest text-emerald-600/60">
              <span className="h-2 w-2 rounded-full bg-emerald-500/40" />
              PROPOSED IMPROVEMENTS
            </div>
            <div className="text-foreground border-l-4 border-emerald-500/30 bg-emerald-500/[0.02] p-8 font-mono text-[13px] leading-relaxed whitespace-pre-wrap italic">
              {pullRequest.content.proposed}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
