'use client';

import { useGetStoryTree } from '@/services/stories/stories.query';
import {
  Background,
  Connection,
  ConnectionLineType,
  ReactFlow,
  addEdge,
  useEdgesState,
  useNodesState,
  type Node,
  type ReactFlowInstance,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useCallback, useEffect, useMemo, useState } from 'react';
import useChapterEdge from '../hooks/use-chapter-edge';
import { useChapterFlowLayout } from '../hooks/use-chapter-flow-layout';
import useChapterNode from '../hooks/use-chapter-node';
import { IChapterTreeItem, edgeTypes, nodeTypes } from '../types/canvas.types';
import { LeftActionButtons } from './left-action-buttons';
import { TopActionButtons } from './top-action-buttons';

const EMPTY_ARRAY: [] = [];

const FlowCanvas = () => {
  const { data } = useGetStoryTree('story-slug');
  const storyTree = data?.data;
  const [_openPanel, setOpenPanel] = useState<string | null>(null);

  const chapters = (storyTree?.chapters ?? []) as unknown as IChapterTreeItem[];

  const rawNodes = useChapterNode(chapters);
  const rawEdges = useChapterEdge(chapters);

  const { nodes: nodesToLayout, edges: edgesToLayout } = useMemo(() => {
    if (!chapters.length) return { nodes: [], edges: [] };

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
        data: { storySlug: 'demo' },
      },
    ];

    return { nodes: newNodes, edges: newEdges };
  }, [chapters.length, rawNodes, rawEdges]);

  const { layout } = useChapterFlowLayout();

  const { nodes: layoutedNodes, edges: layoutedEdges } = useMemo(
    () =>
      nodesToLayout.length
        ? layout(nodesToLayout, edgesToLayout)
        : { nodes: EMPTY_ARRAY, edges: EMPTY_ARRAY },
    [nodesToLayout.length, nodesToLayout, edgesToLayout, layout]
  );

  /* ----------------------------------
   * Node interaction
   * ---------------------------------- */
  const handleNodeButtonClick = (nodeId: string) => {
    console.log('Node ID', nodeId);
    setOpenPanel('comments');
  };

  const nodesWithHandlers = useMemo(
    () =>
      layoutedNodes.map((node) => ({
        ...node,
        data: {
          ...node.data,
          onCommentClick: (nodeId: string) => handleNodeButtonClick(nodeId), // Ensure it matches the expected type
        },
      })),
    [layoutedNodes]
  );

  const [nodes, setNodes, onNodesChange] = useNodesState(nodesWithHandlers as Node[]);
  const [edges, setEdges, onEdgesChange] = useEdgesState(layoutedEdges);

  // Sync nodes and edges when chapter data changes (fixes tab switching issue)
  const chaptersKey = chapters.map((c) => c._id).join(',');
  useEffect(() => {
    if (nodesWithHandlers.length > 0) {
      setNodes(nodesWithHandlers);
      setEdges(layoutedEdges);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chaptersKey]);

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
   * Manual layout toggle
   * ---------------------------------- */
  const _onLayout = useCallback(
    (direction: 'TB' | 'LR') => {
      const { nodes: nextNodes, edges: nextEdges } = layout(nodes, edges, direction);

      setNodes(nextNodes);
      setEdges(nextEdges);
    },
    [nodes, edges, layout, setNodes, setEdges]
  );

  /* ----------------------------------
   * Zoom Controls
   * ---------------------------------- */
  const [rfInstance, setRfInstance] = useState<ReactFlowInstance | null>(null);
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
        connectionLineType={ConnectionLineType.SmoothStep}
        fitView
        fitViewOptions={{ padding: 50 }}
        className="bg-bg-cream h-full w-full"
        onInit={setRfInstance}
      >
        <Background gap={40} size={1.5} color="rgba(0, 0, 0, 0.04)" />
      </ReactFlow>
    </div>
  );
};

export { FlowCanvas };
