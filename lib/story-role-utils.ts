import {
  ROLE_HIERARCHY,
  STORY_COLLABORATOR_ROLES,
  STORY_COLLABORATOR_ROLE_CONFIG,
  StoryCollaboratorRole,
} from '@/type/story/story-enum';
import type {
  TStoryCollaboratorPermission,
  TStoryCollaboratorRole,
  TStoryCollaboratorRoleOrReader,
} from '@/type/story/story.types';

// ── Reader constant ───────────────────────────────────────────────────────────

/** Sentinel value for users who are NOT collaborators on the story */
export const READER_ROLE = 'reader' as const;

// ── Type guards ───────────────────────────────────────────────────────────────

/**
 * Returns `true` if the given string is a valid story collaborator role
 * (i.e. one of the 5 recognised roles). Readers are excluded.
 */
export function isCollaboratorRole(role: string): role is TStoryCollaboratorRole {
  return (STORY_COLLABORATOR_ROLES as readonly string[]).includes(role);
}

/**
 * Returns `true` if the given role/string is `'reader'`.
 */
export function isReader(role: TStoryCollaboratorRoleOrReader): role is 'reader' {
  return role === READER_ROLE;
}

// ── Permission checks ─────────────────────────────────────────────────────────

/**
 * Checks whether a specific permission is granted to the given role.
 *
 * Readers have **no** permissions — this always returns `false` for them.
 *
 * @example
 * hasPermission('owner', 'canDeleteStory')   // true
 * hasPermission('reviewer', 'canMergePRs')   // false
 * hasPermission('reader', 'canWriteChapters') // false
 */
export function hasPermission(
  role: TStoryCollaboratorRoleOrReader,
  permission: TStoryCollaboratorPermission
): boolean {
  if (isReader(role)) return false;
  return STORY_COLLABORATOR_ROLE_CONFIG[role].permissions[permission];
}

/**
 * Returns `true` if the given role has **all** of the specified permissions.
 *
 * @example
 * hasAllPermissions('owner', ['canDeleteStory', 'canBanFromStory']) // true
 */
export function hasAllPermissions(
  role: TStoryCollaboratorRoleOrReader,
  permissions: TStoryCollaboratorPermission[]
): boolean {
  return permissions.every((p) => hasPermission(role, p));
}

/**
 * Returns `true` if the given role has **at least one** of the specified
 * permissions.
 *
 * @example
 * hasAnyPermission('moderator', ['canDeleteStory', 'canMergePRs']) // true
 */
export function hasAnyPermission(
  role: TStoryCollaboratorRoleOrReader,
  permissions: TStoryCollaboratorPermission[]
): boolean {
  return permissions.some((p) => hasPermission(role, p));
}

/**
 * Returns the full permissions object for a role, or `null` for readers.
 */
export function getPermissionsForRole(
  role: TStoryCollaboratorRoleOrReader
): (typeof STORY_COLLABORATOR_ROLE_CONFIG)[TStoryCollaboratorRole]['permissions'] | null {
  if (isReader(role)) return null;
  return STORY_COLLABORATOR_ROLE_CONFIG[role].permissions;
}

// ── Hierarchy helpers ─────────────────────────────────────────────────────────

/**
 * Returns the numeric hierarchy level of a role.
 * Readers get level -1 (below all collaborators).
 */
export function getRoleLevel(role: TStoryCollaboratorRoleOrReader): number {
  if (isReader(role)) return -1;
  return ROLE_HIERARCHY[role];
}

/**
 * Returns `true` if `role` has a hierarchy level **greater than or equal to**
 * `targetRole`. Useful for "at least moderator" checks.
 *
 * Readers always return `false`.
 *
 * @example
 * hasMinRole('co_author', 'moderator') // true  (co_author > moderator)
 * hasMinRole('reviewer', 'moderator')  // false
 */
export function hasMinRole(
  role: TStoryCollaboratorRoleOrReader,
  targetRole: TStoryCollaboratorRole
): boolean {
  return getRoleLevel(role) >= getRoleLevel(targetRole);
}

/**
 * Returns `true` if `role` is strictly higher in the hierarchy than
 * `targetRole`.
 *
 * @example
 * isHigherThan('owner', 'co_author') // true
 * isHigherThan('owner', 'owner')     // false
 */
export function isHigherThan(
  role: TStoryCollaboratorRoleOrReader,
  targetRole: TStoryCollaboratorRole
): boolean {
  return getRoleLevel(role) > getRoleLevel(targetRole);
}

/**
 * Compares two roles and returns:
 *  - `1`  if `roleA` outranks `roleB`
 *  - `-1` if `roleB` outranks `roleA`
 *  - `0`  if they are the same
 *
 * Useful for sorting collaborator lists by seniority.
 */
export function compareRoles(
  roleA: TStoryCollaboratorRoleOrReader,
  roleB: TStoryCollaboratorRoleOrReader
): 1 | -1 | 0 {
  const diff = getRoleLevel(roleA) - getRoleLevel(roleB);
  if (diff > 0) return 1;
  if (diff < 0) return -1;
  return 0;
}

// ── Convenience shortcuts ─────────────────────────────────────────────────────

/** Returns `true` if the role is `owner`. */
export const isOwner = (role: TStoryCollaboratorRoleOrReader) =>
  role === StoryCollaboratorRole.OWNER;

/** Returns `true` if the role can write / create chapters. */
export const canWriteChapters = (role: TStoryCollaboratorRoleOrReader) =>
  hasPermission(role, 'canWriteChapters');

/** Returns `true` if the role can review PRs (comment / give feedback). */
export const canReviewPRs = (role: TStoryCollaboratorRoleOrReader) =>
  hasPermission(role, 'canReviewPRs');

/** Returns `true` if the role can approve and merge PRs. */
export const canApprovePRs = (role: TStoryCollaboratorRoleOrReader) =>
  hasPermission(role, 'canApprovePRs');

/** Returns `true` if the role can moderate comments. */
export const canModerateComments = (role: TStoryCollaboratorRoleOrReader) =>
  hasPermission(role, 'canModerateComments');

/** Returns `true` if the role can invite new collaborators. */
export const canInviteCollaborators = (role: TStoryCollaboratorRoleOrReader) =>
  hasPermission(role, 'canInviteCollaborators');

/** Returns `true` if the role has access to story analytics. */
export const canViewStoryAnalytics = (role: TStoryCollaboratorRoleOrReader) =>
  hasPermission(role, 'canViewStoryAnalytics');

// ── Display helpers ───────────────────────────────────────────────────────────

/** Returns the human-readable display name for a role (e.g. "Story Owner"). */
export function getRoleDisplayName(role: TStoryCollaboratorRoleOrReader): string {
  if (isReader(role)) return 'Reader';
  return STORY_COLLABORATOR_ROLE_CONFIG[role].name;
}

/** Returns the description string for a role. */
export function getRoleDescription(role: TStoryCollaboratorRoleOrReader): string {
  if (isReader(role)) return 'Can read the story but has no editing rights';
  return STORY_COLLABORATOR_ROLE_CONFIG[role].description;
}

// // Single permission
// <StoryRoleGate role={role} permission="canDeleteStory">...</StoryRoleGate>

// // Multiple permissions (AND by default, requireAll={false} for OR)
// <StoryRoleGate role={role} permissions={['canMergePRs', 'canApprovePRs']}>...</StoryRoleGate>

// // Minimum hierarchy level
// <StoryRoleGate role={role} minRole="moderator">...</StoryRoleGate>

// // Explicit allow-list
// <StoryRoleGate role={role} allowedRoles={['owner', 'co_author']} fallback={<ReadonlyView />}>...</StoryRoleGate>
