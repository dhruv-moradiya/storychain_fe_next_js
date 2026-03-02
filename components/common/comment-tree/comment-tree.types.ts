export interface ICommentAuthor {
  id: string;
  displayName: string;
  username?: string;
  avatarUrl?: string;
}

export interface ICommentVotes {
  upvotes: number;
  downvotes: number;
}

export interface ICommentNode {
  id: string;
  author: ICommentAuthor;
  content: string;
  votes: ICommentVotes;
  createdAt: string;
  isEdited?: boolean;
  editedAt?: string;
  isDeleted?: boolean;
  reportCount?: number;
  /** Nested reply nodes (pre-built tree, or flat list nested by the caller) */
  replies?: ICommentNode[];
}

export interface CommentTreeProps {
  /** The root-level comment nodes to render */
  comments: ICommentNode[];
  /** Max nesting depth before replies are collapsed into a "continue thread" link */
  maxDepth?: number;
  /** Called when the user submits a new top-level comment */
  onSubmitComment?: (content: string) => void;
  /** Called when the user submits a reply */
  onSubmitReply?: (parentId: string, content: string) => void;
  /** Called when the user upvotes a comment */
  onUpvote?: (commentId: string) => void;
  /** Called when the user downvotes a comment */
  onDownvote?: (commentId: string) => void;
  /** Label shown in the comment-count badge */
  totalCount?: number;
  /** Whether to show the new-comment composer at the top */
  showComposer?: boolean;
  className?: string;
}

export interface CommentItemProps {
  comment: ICommentNode;
  depth: number;
  maxDepth: number;
  onReply?: (parentId: string, content: string) => void;
  onUpvote?: (commentId: string) => void;
  onDownvote?: (commentId: string) => void;
}
