/**
 * Common / shared primitive types used across multiple domain modules.
 * Import from here rather than from individual domain files to avoid circular deps.
 */

// ── Image Asset ──────────────────────────────────────────────────────────────
/** Represents a cloud-hosted image with a public ID (e.g. Cloudinary). */
export interface IImageAsset {
  url: string;
  publicId: string;
}

// ── Basic User ────────────────────────────────────────────────────────────────
/**
 * Minimal user shape returned inside populated/nested API fields.
 * Matches the `ICollaboratorUser` shape used in story types.
 */
export interface IUserBasic {
  clerkId: string;
  email: string;
  username: string;
  avatarUrl: string;
}

// ── Votes ─────────────────────────────────────────────────────────────────────
export interface IVotes {
  upvotes: number;
  downvotes: number;
  score: number;
}

// ── Pagination ────────────────────────────────────────────────────────────────
export interface IPagination {
  totalDocs: number;
  limit: number;
  totalPages: number;
  page: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: number | null;
  nextPage: number | null;
}
