import { useRouter } from 'next/navigation';

import { BaseEdge, EdgeLabelRenderer, getSmoothStepPath } from '@xyflow/react';
import { Plus } from 'lucide-react';

import { Button } from '@/components/ui/button';

import { IChapterEdgeProps } from '../types/canvas.types';

export function CanvasEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  markerEnd,
  data,
}: IChapterEdgeProps) {
  const router = useRouter();

  const [path, labelX, labelY] = getSmoothStepPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
    borderRadius: 12,
  });

  const handleEdgeClick = () => {
    if (!data) return;
    const slug = data.storySlug;
    if (!slug) return;

    const params = new URLSearchParams();
    params.append('mode', 'new');
    if (data.parentChapterSlug) {
      params.append('parentChapterSlug', data.parentChapterSlug);
    }

    router.push(`/stories/${slug}/builder?${params.toString()}`);
  };

  const gradientId = `edgeGradient-${id.replace(/[^a-zA-Z0-9_-]/g, '_')}`;

  return (
    <>
      {/* Unique Gradient definition per edge with userSpaceOnUse for LR & TB layouts */}
      <defs>
        <linearGradient
          id={gradientId}
          gradientUnits="userSpaceOnUse"
          x1={sourceX}
          y1={sourceY}
          x2={targetX}
          y2={targetY}
        >
          <stop offset="0%" stopColor="#6b7cff" />
          <stop offset="100%" stopColor="#ec4899" />
        </linearGradient>
      </defs>

      {/* Subtle glow effect */}
      <path
        d={path}
        fill="none"
        stroke={`url(#${gradientId})`}
        strokeWidth={6}
        strokeOpacity={0.2}
        style={{ filter: 'blur(3px)' }}
      />

      {/* Main edge with gradient */}
      <BaseEdge
        id={id}
        path={path}
        markerEnd={markerEnd}
        style={{
          stroke: `url(#${gradientId})`,
          strokeWidth: 2,
          strokeLinecap: 'round',
        }}
      />

      {/* Invisible wider path for easier interaction */}
      <path
        d={path}
        fill="none"
        stroke="transparent"
        strokeWidth={20}
        style={{ cursor: 'pointer' }}
      />

      <EdgeLabelRenderer>
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)`,
            pointerEvents: 'none',
          }}
        >
          <Button
            size="icon"
            variant="default"
            className="from-brand-blue to-brand-pink-500 border-border pointer-events-auto size-6 rounded-full border-2 bg-linear-to-br shadow-md transition-all duration-200 hover:scale-110 hover:shadow-lg"
            onClick={handleEdgeClick}
          >
            <Plus size={10} className="text-white" />
          </Button>
        </div>
      </EdgeLabelRenderer>
    </>
  );
}
