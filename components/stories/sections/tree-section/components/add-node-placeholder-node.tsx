'use client';

import { useRouter } from 'next/navigation';

import { Handle, Position } from '@xyflow/react';
import type { Node, NodeProps } from '@xyflow/react';
import { Plus } from 'lucide-react';

import { cn } from '@/lib/utils';

export interface AddNodePlaceholderNodeData extends Record<string, unknown> {
  parentChapterSlug: string;
  storySlug?: string;
}

export type AddNodePlaceholderNodeProps = NodeProps<Node<AddNodePlaceholderNodeData>>;

export function AddNodePlaceholderNode({
  data,
  selected,
  targetPosition = Position.Top,
}: AddNodePlaceholderNodeProps & { targetPosition?: Position }) {
  const router = useRouter();

  const handleClick = () => {
    const slug = data.storySlug;
    if (!slug || !data.parentChapterSlug) return;

    const params = new URLSearchParams({
      mode: 'new',
      parentChapterSlug: data.parentChapterSlug,
      // storySlug: slug,
    });

    router.push(`/stories/${slug}/builder?${params.toString()}`);
  };

  return (
    <div
      onClick={handleClick}
      className={cn(
        'group relative flex cursor-pointer flex-col items-center justify-center transition-all duration-300',
        'h-14 w-14 rounded-2xl',
        'via-cream-95 to-cream-90 bg-linear-to-br from-white',
        'dark:from-card dark:via-card/95 dark:to-card/90',
        'border border-dashed',
        selected
          ? 'border-brand-pink-500 shadow-brand-pink-shadow25 shadow-lg'
          : 'hover:shadow-brand-blue/20 border-black/20 hover:border-transparent hover:shadow-xl dark:border-white/20 dark:hover:border-transparent'
      )}
    >
      {/* Target Handle */}
      {targetPosition === Position.Left ? (
        <Handle
          type="target"
          position={Position.Left}
          className="from-brand-blue! to-brand-pink-500! dark:border-background! -left-1! h-2.5! w-2.5! rounded-full! border-2! border-white! bg-linear-to-br! shadow-sm!"
        />
      ) : (
        <Handle
          type="target"
          position={Position.Top}
          className="from-brand-blue! to-brand-pink-500! dark:border-background! -top-1! h-2.5! w-2.5! rounded-full! border-2! border-white! bg-linear-to-br! shadow-sm!"
        />
      )}

      {/* Gradient background on hover */}
      <div
        className={cn(
          'absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300',
          'from-brand-blue via-brand-pink-500 to-brand-orange bg-linear-to-br',
          'group-hover:opacity-100'
        )}
      />

      {/* Icon */}
      <Plus
        className={cn(
          'relative z-10 h-6 w-6 transition-all duration-300',
          'text-text-secondary-65 dark:text-text-secondary-65 group-hover:scale-110 group-hover:text-white'
        )}
        strokeWidth={2.5}
      />

      {/* Tooltip on hover */}
      <div
        className={cn(
          'absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap',
          'bg-text-primary rounded-lg px-2.5 py-1',
          'text-background dark:text-background text-[10px] font-medium',
          'opacity-0 transition-all duration-200',
          'group-hover:-bottom-9 group-hover:opacity-100',
          'shadow-lg'
        )}
      >
        <span className="font-sans">
          {data.parentChapterSlug === 'root' ? 'Create First Chapter' : 'Add Chapter'}
        </span>
        {/* Tooltip arrow */}
        <div className="bg-text-primary absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45" />
      </div>

      {/* Outer glow effect */}
      <div
        className={cn(
          'pointer-events-none absolute -inset-1 -z-10 rounded-3xl opacity-0 blur-lg transition-opacity duration-300',
          'from-brand-blue/40 via-brand-pink-500/30 to-brand-orange/40 bg-linear-to-br',
          'group-hover:opacity-100'
        )}
      />

      {/* Pulse ring animation on hover */}
      <div
        className={cn(
          'pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300',
          'ring-2 ring-white/50 dark:ring-black/50',
          'group-hover:animate-pulse group-hover:opacity-100'
        )}
      />
    </div>
  );
}

export default AddNodePlaceholderNode;
