'use client';

import { Handle, Position } from '@xyflow/react';
import type { Node, NodeProps } from '@xyflow/react';
import { Loader2 } from 'lucide-react';

import { cn } from '@/lib/utils';

export interface LoadingNodeData extends Record<string, unknown> {}

export type LoadingNodeProps = NodeProps<Node<LoadingNodeData>>;

export function LoadingNode({ selected }: LoadingNodeProps) {
  return (
    <div
      className={cn(
        'group relative flex cursor-pointer flex-col items-center justify-center transition-all duration-300',
        'h-14 w-14 rounded-2xl',
        'via-cream-95 to-cream-90 bg-linear-to-br from-white',
        'border border-dashed',
        selected
          ? 'border-brand-pink-500 shadow-brand-pink-shadow25 shadow-lg'
          : 'hover:shadow-brand-blue/20 border-black/20 hover:border-transparent hover:shadow-xl'
      )}
    >
      {/* Top Handle */}
      <Handle
        type="target"
        position={Position.Top}
        className="!from-brand-blue !to-brand-pink-500 !-top-1 !h-2.5 !w-2.5 !rounded-full !border-2 !border-white !bg-gradient-to-br !shadow-sm"
      />

      {/* Gradient background on loading */}
      <div
        className={cn(
          'absolute inset-0 rounded-2xl opacity-100 transition-opacity duration-300',
          'from-brand-blue via-brand-pink-500 to-brand-orange bg-linear-to-br'
        )}
      />

      {/* Icon - Loading */}
      <Loader2 className={cn('relative z-10 h-4 w-4 animate-spin text-white')} strokeWidth={2.5} />

      {/* Outer glow effect */}
      <div
        className={cn(
          'pointer-events-none absolute -inset-1 -z-10 rounded-3xl opacity-100 blur-lg transition-opacity duration-300',
          'from-brand-blue/40 via-brand-pink-500/30 to-brand-orange/40 bg-gradient-to-br'
        )}
      />

      {/* Pulse ring animation */}
      <div
        className={cn(
          'pointer-events-none absolute inset-0 rounded-2xl opacity-100 transition-opacity duration-300',
          'animate-pulse ring-2 ring-white/50'
        )}
      />
    </div>
  );
}

export default LoadingNode;
