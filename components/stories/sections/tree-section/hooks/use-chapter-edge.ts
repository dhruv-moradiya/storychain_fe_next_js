import type { Edge } from '@xyflow/react';

import type { IChapterEdge, IChapterTreeItem } from '../types/canvas.types';

const EDGE_STYLE = {
  stroke: '#6b7cff',
  strokeWidth: 2,
  strokeLinecap: 'round' as const,
} as const;

const PLACEHOLDER_EDGE_STYLE = {
  stroke: '#ec4899',
  strokeWidth: 1.5,
  strokeDasharray: '6,4',
  strokeLinecap: 'round' as const,
  opacity: 0.85,
} as const;

const EDGE_TYPE = 'chapterEdge' as const;

type AllEdgeTypes = IChapterEdge | Edge;

const useChapterEdge = (chapters: IChapterTreeItem[]): AllEdgeTypes[] => {
  const edges: AllEdgeTypes[] = [];

  const traverse = (node: IChapterTreeItem, parentId?: string) => {
    // console.log('note', node);
    if (parentId) {
      edges.push({
        id: `${parentId}-${node._id}`,
        source: parentId,
        target: node._id,
        animated: true,
        style: EDGE_STYLE,
        type: EDGE_TYPE,
        data: {
          storySlug: node.storySlug,
          parentChapterSlug: node.parentChapterSlug,
        },
      });
    }

    // Add edge to placeholder node for chapters without children (not endings)
    if (node.children.length === 0 && !node.isEnding) {
      const placeholderId = `placeholder-${node._id}`;
      edges.push({
        id: `${node._id}-${placeholderId}`,
        source: node._id,
        target: placeholderId,
        animated: false,
        style: PLACEHOLDER_EDGE_STYLE,
        type: 'smoothstep',
      });
    }

    node.children.forEach((child) => {
      traverse(child, node._id);
    });
  };

  // start from roots
  chapters.forEach((root) => {
    traverse(root);
  });

  return edges;
};

export default useChapterEdge;
