'use client';

import type { ReactNode } from 'react';

import type {
  TStoryCollaboratorPermission,
  TStoryCollaboratorRole,
  TStoryCollaboratorRoleOrReader,
} from '@/type/story/story.types';

import {
  hasAllPermissions,
  hasAnyPermission,
  hasMinRole,
  hasPermission,
} from '@/lib/story-role-utils';

// ── Prop types ────────────────────────────────────────────────────────────────

interface StoryRoleGateBaseProps {
  /** The current user's role on this story. Pass `'reader'` for non-collaborators. */
  role: TStoryCollaboratorRoleOrReader;
  /** Content to render when the role check passes. */
  children: ReactNode;
  /** Optional fallback to render when the check fails (default: nothing). */
  fallback?: ReactNode;
}

// --- Strategy A: Permission-based ----------------------------------------- //

interface StoryRoleGateByPermissionProps extends StoryRoleGateBaseProps {
  /**
   * Require a single permission.
   * @example permission="canDeleteStory"
   */
  permission: TStoryCollaboratorPermission;
  permissions?: never;
  requireAll?: never;
  minRole?: never;
  allowedRoles?: never;
}

interface StoryRoleGateByPermissionsProps extends StoryRoleGateBaseProps {
  permission?: never;
  /**
   * Require multiple permissions.
   * Use `requireAll` to control AND vs OR logic (default: `true` → AND).
   */
  permissions: TStoryCollaboratorPermission[];
  requireAll?: boolean;
  minRole?: never;
  allowedRoles?: never;
}

// --- Strategy B: Role-based ------------------------------------------------ //

interface StoryRoleGateByMinRoleProps extends StoryRoleGateBaseProps {
  permission?: never;
  permissions?: never;
  requireAll?: never;
  /**
   * Require the user to be at or above a minimum role in the hierarchy.
   * e.g. `minRole="moderator"` → moderator, co_author, owner all pass.
   */
  minRole: TStoryCollaboratorRole;
  allowedRoles?: never;
}

interface StoryRoleGateByAllowedRolesProps extends StoryRoleGateBaseProps {
  permission?: never;
  permissions?: never;
  requireAll?: never;
  minRole?: never;
  /**
   * Provide an explicit allow-list of roles that should see the content.
   * @example allowedRoles={['owner', 'co_author']}
   */
  allowedRoles: TStoryCollaboratorRoleOrReader[];
}

type StoryRoleGateProps =
  | StoryRoleGateByPermissionProps
  | StoryRoleGateByPermissionsProps
  | StoryRoleGateByMinRoleProps
  | StoryRoleGateByAllowedRolesProps;

// ── Component ─────────────────────────────────────────────────────────────────

/**
 * **StoryRoleGate**
 *
 * A render-gate component that conditionally renders its `children` based on
 * the current user's story-level role.
 *
 * Supports four mutually exclusive strategies:
 *
 * ```tsx
 * // 1. Single permission
 * <StoryRoleGate role={role} permission="canDeleteStory">
 *   <DeleteButton />
 * </StoryRoleGate>
 *
 * // 2. Multiple permissions (AND by default, pass requireAll={false} for OR)
 * <StoryRoleGate role={role} permissions={['canMergePRs', 'canApprovePRs']}>
 *   <MergeSection />
 * </StoryRoleGate>
 *
 * // 3. Minimum role in hierarchy
 * <StoryRoleGate role={role} minRole="moderator">
 *   <ModerationPanel />
 * </StoryRoleGate>
 *
 * // 4. Explicit allow-list
 * <StoryRoleGate role={role} allowedRoles={['owner', 'co_author']}>
 *   <OwnerSettings />
 * </StoryRoleGate>
 * ```
 *
 * Renders `fallback` (default: `null`) when the check fails.
 */
export function StoryRoleGate({
  role,
  children,
  fallback = null,
  ...strategy
}: StoryRoleGateProps) {
  let allowed = false;

  if ('permission' in strategy && strategy.permission !== undefined) {
    // Strategy A1: single permission
    allowed = hasPermission(role, strategy.permission);
  } else if ('permissions' in strategy && strategy.permissions !== undefined) {
    // Strategy A2: multiple permissions (AND / OR)
    const { permissions, requireAll = true } = strategy;
    allowed = requireAll
      ? hasAllPermissions(role, permissions)
      : hasAnyPermission(role, permissions);
  } else if ('minRole' in strategy && strategy.minRole !== undefined) {
    // Strategy B1: minimum hierarchy level
    allowed = hasMinRole(role, strategy.minRole);
  } else if ('allowedRoles' in strategy && strategy.allowedRoles !== undefined) {
    // Strategy B2: explicit allow-list
    allowed = strategy.allowedRoles.includes(role);
  }

  return allowed ? <>{children}</> : <>{fallback}</>;
}
