'use client';

import { useParams } from 'next/navigation';
import { useCallback, useEffect, useMemo, useState } from 'react';

import {
  Background,
  Connection,
  ConnectionLineType,
  type Node,
  ReactFlow,
  type ReactFlowInstance,
  addEdge,
  useEdgesState,
  useNodesState,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import { useGetStoryTree } from '@/services/stories/stories.query';

import useChapterEdge from '../hooks/use-chapter-edge';
import { type LayoutDirection, useChapterFlowLayout } from '../hooks/use-chapter-flow-layout';
import useChapterNode from '../hooks/use-chapter-node';
import { IChapterTreeItem, edgeTypes, nodeTypes } from '../types/canvas.types';
import { LeftActionButtons } from './left-action-buttons';
import { TopActionButtons } from './top-action-buttons';

const EMPTY_ARRAY: [] = [];

const FlowCanvas = () => {
  const { slug } = useParams();
  const { data } = useGetStoryTree(slug as string);
  const storyTree = data?.data;
  const [_openPanel, setOpenPanel] = useState<string | null>(null);
  const [direction, setDirection] = useState<LayoutDirection>('TB');

  const chapters = (storyTree?.chapters ?? []) as unknown as IChapterTreeItem[];

  const rawNodes = useChapterNode(chapters);
  const rawEdges = useChapterEdge(chapters);

  const { nodes: nodesToLayout, edges: edgesToLayout } = useMemo(() => {
    if (!chapters.length) {
      return {
        nodes: [
          {
            id: 'root-placeholder',
            type: 'addNodePlaceholder',
            data: { parentChapterSlug: 'root', storySlug: slug as string },
            position: { x: 0, y: 0 },
          },
        ],
        edges: [],
      };
    }

    const lastNode = rawNodes[rawNodes.length - 1];
    const loadingNodeId = 'loading-node-demo';

    const newNodes = [
      ...rawNodes,
      {
        id: loadingNodeId,
        type: 'loadingNode',
        data: {},
        position: { x: 0, y: 0 },
      },
    ];

    const newEdges = [
      ...rawEdges,
      {
        id: `edge-${lastNode.id}-${loadingNodeId}`,
        source: lastNode.id,
        target: loadingNodeId,
        type: 'chapterEdge',
        animated: true,
        style: { stroke: '#6b7cff', strokeWidth: 2, strokeLinecap: 'round' as const },
        data: { storySlug: slug as string },
      },
    ];

    return { nodes: newNodes, edges: newEdges };
  }, [chapters.length, rawNodes, rawEdges, slug]);

  const { layout } = useChapterFlowLayout();

  const { nodes: layoutedNodes, edges: layoutedEdges } = useMemo(
    () =>
      nodesToLayout.length
        ? layout(nodesToLayout, edgesToLayout, direction)
        : { nodes: EMPTY_ARRAY, edges: EMPTY_ARRAY },
    [nodesToLayout, edgesToLayout, layout, direction]
  );

  /* ----------------------------------
   * Node interaction
   * ---------------------------------- */
  const handleNodeButtonClick = useCallback((nodeId: string) => {
    setOpenPanel('comments');
    // Suppress unused variable warning - nodeId used for future panel targeting
    void nodeId;
  }, []);

  const nodesWithHandlers = useMemo(
    () =>
      layoutedNodes.map((node) => ({
        ...node,
        data: {
          ...node.data,
          // Inject storySlug into every addNodePlaceholder so it can build the correct URL
          ...(node.type === 'addNodePlaceholder' ? { storySlug: slug as string } : {}),
          onCommentClick: (nodeId: string) => handleNodeButtonClick(nodeId),
        },
      })),
    [layoutedNodes, slug, handleNodeButtonClick]
  );

  const [nodes, setNodes, onNodesChange] = useNodesState(nodesWithHandlers as Node[]);
  const [edges, setEdges, onEdgesChange] = useEdgesState(layoutedEdges);
  const [rfInstance, setRfInstance] = useState<ReactFlowInstance | null>(null);

  // Sync nodes and edges whenever chapter data or direction changes & center view
  const chaptersKey = chapters.map((c) => c._id).join(',');
  useEffect(() => {
    if (nodesWithHandlers.length > 0) {
      setNodes(nodesWithHandlers as Node[]);
      setEdges(layoutedEdges);
      const timer = setTimeout(() => {
        rfInstance?.fitView({ padding: 0.2, duration: 300 });
      }, 100);
      return () => clearTimeout(timer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chaptersKey, direction, rfInstance]);

  /* ----------------------------------
   * Edge connect
   * ---------------------------------- */
  const onConnect = useCallback(
    (connection: Connection) => {
      setEdges((eds) =>
        addEdge(
          {
            ...connection,
            animated: true,
            type: 'chapterEdge',
            style: { stroke: '#6b7cff', strokeWidth: 2, strokeLinecap: 'round' },
          },
          eds
        )
      );
    },
    [setEdges]
  );

  /* ----------------------------------
   * Zoom & Layout Controls
   * ---------------------------------- */
  const onInit = useCallback((instance: ReactFlowInstance) => {
    setRfInstance(instance);
    setTimeout(() => {
      instance.fitView({ padding: 0.2, duration: 300 });
    }, 100);
  }, []);

  const _onLayout = useCallback((dir: LayoutDirection) => {
    setDirection(dir);
  }, []);

  const onZoomIn = useCallback(() => rfInstance?.zoomIn(), [rfInstance]);
  const onZoomOut = useCallback(() => rfInstance?.zoomOut(), [rfInstance]);

  /* ----------------------------------
   * Story Editor
   * ---------------------------------- */
  const [_openStoryEditor, setOpenStoryEditor] = useState(false);

  return (
    <div className="relative h-[calc(100vh-64px)] w-full">
      <LeftActionButtons
        onLayout={_onLayout}
        setOpenStoryEditor={setOpenStoryEditor}
        onZoomIn={onZoomIn}
        onZoomOut={onZoomOut}
      />
      <TopActionButtons setOpenPanel={setOpenPanel} />
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        connectionLineType={ConnectionLineType.SimpleBezier}
        fitView
        fitViewOptions={{ padding: 0.2 }}
        className="bg-bg-cream h-full w-full"
        onInit={onInit}
      >
        <Background gap={40} size={1.5} color="rgba(0, 0, 0, 0.04)" />
      </ReactFlow>
    </div>
  );
};

export { FlowCanvas };
