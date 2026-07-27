'use client';

import type { IPullRequest } from '@/type';
import { BookOpen, Clock, FileText } from 'lucide-react';

interface ChangesTabProps {
  pullRequest: IPullRequest;
}

export default function ChangesTab({ pullRequest }: ChangesTabProps) {
  return (
    <div className="space-y-6">
      {/* Chapter Reader Container */}
      <div className="border-border/50 bg-card flex flex-col rounded-sm border p-5 shadow-xs">
        {/* Reader Header */}
        <div className="border-border/50 flex flex-wrap items-center justify-between gap-3 border-b pb-4">
          <div className="flex items-center gap-2">
            <BookOpen className="text-brand-blue size-4" />
            <h3 className="text-text-primary text-base font-semibold">Proposed Chapter Content</h3>
          </div>

          <div className="text-text-secondary-65 flex items-center gap-3 text-xs font-semibold">
            <span className="flex items-center gap-1">
              <FileText className="size-3.5" />
              {pullRequest.content?.wordCount || 0} words
            </span>
            <span>·</span>
            <span className="flex items-center gap-1">
              <Clock className="size-3.5" />
              {pullRequest.content?.readingMinutes || 1} min read
            </span>
          </div>
        </div>

        {/* Reader Body */}
        <div className="pt-5">
          <article className="prose dark:prose-invert max-w-none">
            <p className="text-text-primary font-serif text-base leading-relaxed whitespace-pre-wrap md:text-lg md:leading-loose">
              {pullRequest.content?.proposed}
            </p>
          </article>
        </div>
      </div>
    </div>
  );
}
