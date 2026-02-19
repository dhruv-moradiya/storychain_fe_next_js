import type { Edge, EdgeProps, Node, NodeProps } from '@xyflow/react';
import { IChapter } from '@/type/chapter/chapter.types';
import { ChapterCardNode, LoadMorePlaceholderNode } from '../components';
import AddNodePlaceholderNode from '../components/add-node-placeholder-node';
import { CanvasEdge } from '../components/canvas-edge';

interface IChapterTreeItem extends Omit<IChapter, 'authorId' | 'content' | 'pullRequest'> {
  storySlug: string;
  parentChapterSlug: string | null;
  ancestorSlugs: string[];
  branchIndex: number;
  displayNumber: string;
  author: {
    clerkId: string;
    username: string;
    avatarUrl: string;
  };
  prId: string | null;
  children: IChapterTreeItem[];
}

interface IChapterNodeData extends IChapterTreeItem, Record<string, unknown> {
  hovered: boolean;
  onCommentClick: (nodeId: string) => void;
}

type IChapterNodeType = Node<IChapterNodeData, 'chapterNode'>;

type IChapterNodeProps = NodeProps<Node<IChapterNodeData>>;

type IChapterEdgeData = {
  storySlug: string;
  // onButtonClick: (id: string) => void;
};

type IChapterEdge = Edge<IChapterEdgeData, 'chapterEdge'>;

type IChapterEdgeProps = EdgeProps<IChapterEdge>;

const nodeWidth = 288;
const nodeHeight = 175;

const addNodePlaceholderWidth = 200;
const addNodePlaceholderHeight = 160;

interface AddNodePlaceholderData extends Record<string, unknown> {
  parentChapterId: string;
  storySlug?: string;
}

interface LoadMorePlaceholderData extends Record<string, unknown> {
  parentChapterId: string;
  storySlug?: string;
  remainingCount?: number;
  onLoadMore?: (parentChapterId: string) => Promise<void>;
}

type IAddNodePlaceholderType = Node<AddNodePlaceholderData, 'addNodePlaceholder'>;

type ILoadMorePlaceholderType = Node<LoadMorePlaceholderData, 'loadMorePlaceholder'>;

const loadMorePlaceholderWidth = 200;
const loadMorePlaceholderHeight = 160;

export const nodeTypes = {
  chapterNode: ChapterCardNode,
  addNodePlaceholder: AddNodePlaceholderNode,
  loadMorePlaceholder: LoadMorePlaceholderNode,
};

export const edgeTypes = {
  chapterEdge: CanvasEdge,
};

export type {
  IChapterTreeItem,
  IChapterNodeData,
  IChapterEdge,
  IChapterEdgeData,
  IChapterNodeType,
  IChapterNodeProps,
  IChapterEdgeProps,
  IAddNodePlaceholderType,
  ILoadMorePlaceholderType,
};
export {
  loadMorePlaceholderHeight,
  loadMorePlaceholderWidth,
  addNodePlaceholderHeight,
  addNodePlaceholderWidth,
  nodeHeight,
  nodeWidth,
};
