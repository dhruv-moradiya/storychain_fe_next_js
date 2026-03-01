import type {
  IAddNodePlaceholderType,
  IChapterTreeItem,
  IChapterNodeType,
} from '../types/canvas.types';

function formatTimeAgo(date: Date): string {
  const diff = Date.now() - new Date(date).getTime();
  const minutes = Math.floor(diff / 60000);

  if (minutes < 1) return 'just now';
  if (minutes < 60) return `${minutes} min ago`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hr ago`;

  return `${Math.floor(hours / 24)} days ago`;
}

function estimateReadTime(text: string): number {
  const words = text.split(' ').length;
  return Math.max(1, Math.round(words / 200));
}

const HORIZONTAL_GAP = 320;
const VERTICAL_GAP = 160;

type AllNodeTypes = IChapterNodeType | IAddNodePlaceholderType;

const useChapterNode = (chapters: IChapterTreeItem[]): AllNodeTypes[] => {
  const nodes: AllNodeTypes[] = [];
  const yTracker = new Map<number, number>();

  const getNextY = (depth: number) => {
    const current = yTracker.get(depth) ?? 0;
    yTracker.set(depth, current + 1);
    return current * VERTICAL_GAP;
  };

  const traverse = (node: IChapterTreeItem) => {
    const y = getNextY(node.depth);

    nodes.push({
      id: node._id,
      type: 'chapterNode',
      position: {
        x: node.depth * HORIZONTAL_GAP,
        y,
      },
      data: {
        // Spread all properties from the input node (covers storySlug, branchIndex, etc.)
        ...node,

        // Ensure nullable fields are handled if necessary
        parentChapterSlug: node.parentChapterSlug ?? null,

        // UI helpers
        timeAgo: formatTimeAgo(node.createdAt),
        readTime: estimateReadTime(node.title),
        hasChildren: node.children.length > 0,

        // Fix signature to match (nodeId: string) => void
        onCommentClick: () => {},
        hovered: false,
      },
    } as IChapterNodeType);

    // Add placeholder node for chapters without children (not endings)
    if (node.children.length === 0 && !node.isEnding) {
      const placeholderY = getNextY(node.depth + 1);
      const placeholderId = `placeholder-${node._id}`;

      nodes.push({
        id: placeholderId,
        type: 'addNodePlaceholder',
        position: {
          x: (node.depth + 1) * HORIZONTAL_GAP,
          y: placeholderY,
        },
        data: {
          parentChapterSlug: node.slug,
        },
      } as IAddNodePlaceholderType);
    }

    node.children.forEach(traverse);
  };

  chapters.forEach(traverse);

  return nodes;
};

export default useChapterNode;
