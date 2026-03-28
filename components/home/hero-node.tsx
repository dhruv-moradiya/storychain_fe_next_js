'use client';

import { Handle, Position } from '@xyflow/react';
import { BookOpen, GitBranch } from 'lucide-react';

import { cn } from '@/lib/utils';

interface IHeroNodeData {
  title: string;
  excerpt: string;
  branches?: number;
  [key: string]: unknown;
}

export const HeroNode = ({ data, selected }: { data: IHeroNodeData; selected?: boolean }) => {
  return (
    <div
      className={cn(
        'group bg-bg-cream relative w-[200px] cursor-pointer rounded-xl transition-all duration-300',
        'border shadow-sm',
        selected
          ? 'border-brand-pink-500 shadow-brand-pink-500/20 -translate-y-1 shadow-lg'
          : 'border-brand-pink-500/20 hover:border-brand-pink-500/50 hover:shadow-brand-pink-500/10 hover:-translate-y-1 hover:shadow-md'
      )}
    >
      <Handle
        type="target"
        position={Position.Top}
        className="border-bg-cream! bg-brand-pink-500! -top-1.5! h-2.5! w-2.5! rounded-full! border-2!"
      />
      <Handle
        type="source"
        position={Position.Bottom}
        className="border-bg-cream! bg-brand-pink-500! -bottom-1.5! h-2.5! w-2.5! rounded-full! border-2!"
      />

      <div className="relative z-10 p-3.5">
        {/* Header */}
        <div className="mb-2.5 flex items-center justify-between">
          <div className="bg-brand-pink-500/10 flex items-center gap-1.5 rounded-full px-2 py-0.5">
            <BookOpen className="text-brand-pink-500 h-3 w-3" />
            <span className="text-brand-pink-500 text-[10px] font-semibold">{data.title}</span>
          </div>
          {data.branches && data.branches > 0 ? (
            <div className="text-text-secondary-65 flex items-center gap-0.5">
              <GitBranch className="h-3 w-3" />
              <span className="text-[9px]">{data.branches}</span>
            </div>
          ) : null}
        </div>

        {/* Excerpt */}
        <p className="text-text-secondary-65 line-clamp-2 font-serif text-[11px] leading-relaxed italic">
          &ldquo;{data.excerpt}&rdquo;
        </p>

        {/* Subtle bottom accent */}
        <div className="from-brand-pink-500/20 mt-3 h-[2px] rounded-full bg-linear-to-r to-transparent" />
      </div>
    </div>
  );
};
