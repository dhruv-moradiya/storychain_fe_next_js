'use client';

import { Background, BackgroundVariant, ReactFlow } from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import { HeroNode } from './hero-node';

const nodeTypes = {
  heroNode: HeroNode,
};

const initialNodes = [
  {
    id: '1',
    position: { x: 230, y: 20 },
    data: {
      title: 'Chapter 1',
      excerpt: 'The dark forest beckoned from the edge of the village...',
      branches: 2,
    },
    type: 'heroNode',
  },
  {
    id: '2',
    position: { x: 20, y: 185 },
    data: {
      title: 'Path A · Cave',
      excerpt: 'You light a torch and step into the damp darkness...',
      branches: 1,
    },
    type: 'heroNode',
  },
  {
    id: '3',
    position: { x: 440, y: 185 },
    data: { title: 'Path B · Tree', excerpt: 'The ancient branches provide a makeshift ladder...' },
    type: 'heroNode',
  },
  {
    id: '4',
    position: { x: 20, y: 350 },
    data: { title: 'The Bear', excerpt: 'A mighty roar shakes the cavern walls...' },
    type: 'heroNode',
  },
  {
    id: '5',
    position: { x: 440, y: 350 },
    data: { title: 'The Nest', excerpt: 'Golden eggs glow softly in the evening light...' },
    type: 'heroNode',
  },
];

const initialEdges = [
  {
    id: 'e1-2',
    source: '1',
    target: '2',
    animated: true,
    style: { stroke: '#ec4899', strokeWidth: 1.5, opacity: 0.5 },
  },
  {
    id: 'e1-3',
    source: '1',
    target: '3',
    animated: true,
    style: { stroke: '#ec4899', strokeWidth: 1.5, opacity: 0.5 },
  },
  {
    id: 'e2-4',
    source: '2',
    target: '4',
    animated: true,
    style: { stroke: '#ec4899', strokeWidth: 1.5, opacity: 0.5 },
  },
  {
    id: 'e3-5',
    source: '3',
    target: '5',
    animated: true,
    style: { stroke: '#ec4899', strokeWidth: 1.5, opacity: 0.5 },
  },
];

export const HeroFlow = () => {
  return (
    <div className="relative h-full w-full">
      {/* Subtle radial glow on top-left of the flow - not a visible shape, just diffused light */}
      <div className="pointer-events-none absolute -top-8 -left-8 z-10 h-full w-full" />

      <ReactFlow
        defaultNodes={initialNodes}
        defaultEdges={initialEdges}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 0.15 }}
        style={{ background: 'transparent' }}
        panOnDrag
        zoomOnScroll={false}
        zoomOnPinch={false}
        zoomOnDoubleClick={false}
        nodesDraggable
        elementsSelectable
        proOptions={{ hideAttribution: true }}
      >
        <Background
          variant={BackgroundVariant.Dots}
          gap={22}
          size={1}
          color="#ec4899"
          style={{ opacity: 0.07 }}
        />
      </ReactFlow>
    </div>
  );
};
