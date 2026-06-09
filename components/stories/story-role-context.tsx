'use client';

import { useParams } from 'next/navigation';
import { createContext, useContext, useMemo } from 'react';

import type {
  TStoryCollaboratorPermission,
  TStoryCollaboratorRole,
  TStoryCollaboratorRoleOrReader,
  TStoryCollaboratorStatus,
} from '@/type/story/story.types';

import {
  READER_ROLE,
  hasAllPermissions,
  hasAnyPermission,
  hasMinRole,
  hasPermission,
} from '@/lib/story-role-utils';
import { useGetUserRole } from '@/services/stories/stories.query';

// ── Context shape ─────────────────────────────────────────────────────────────

interface StoryRoleContextValue {
  /** The current user's role in this story */
  role: TStoryCollaboratorRoleOrReader;
  /** Collaborator status (null for readers) */
  roleStatus: TStoryCollaboratorStatus | null;
  /** `true` while the role is being fetched */
  isLoading: boolean;
  /** The error object if the fetch failed */
  error: Error | null;
}

const StoryRoleContext = createContext<StoryRoleContextValue | null>(null);

// ── Provider ──────────────────────────────────────────────────────────────────

export function StoryRoleProvider({ children }: { children: React.ReactNode }) {
  const { slug } = useParams();
  const slugStr = Array.isArray(slug) ? slug[0] : (slug ?? '');

  const { data, isLoading, error } = useGetUserRole(slugStr);

  const value = useMemo<StoryRoleContextValue>(
    () => ({
      role: data?.data?.role ?? READER_ROLE,
      roleStatus: data?.data?.roleStatus ?? null,
      isLoading,
      error: error as Error | null,
    }),
    [data, isLoading, error]
  );

  return <StoryRoleContext.Provider value={value}>{children}</StoryRoleContext.Provider>;
}

// ── Hook ──────────────────────────────────────────────────────────────────────

/**
 * Returns the current user's story role from the nearest `<StoryRoleProvider>`.
 *
 * @throws if called outside a `<StoryRoleProvider>`.
 */
export function useStoryRole(): StoryRoleContextValue {
  const ctx = useContext(StoryRoleContext);
  if (!ctx) {
    throw new Error('useStoryRole must be used within a <StoryRoleProvider>');
  }
  return ctx;
}

// ── Gate component ────────────────────────────────────────────────────────────

interface StoryRoleGateProps {
  children: React.ReactNode;
  /** Fallback UI when the user lacks access (defaults to `null`) */
  fallback?: React.ReactNode;

  // ── Permission-based ────────────────────────────────────────────────────
  /** Single permission to check */
  permission?: TStoryCollaboratorPermission;
  /** Multiple permissions to check */
  permissions?: TStoryCollaboratorPermission[];
  /** When `true`, ALL listed permissions must be granted (default). When `false`, ANY suffices. */
  requireAll?: boolean;

  // ── Role-based ──────────────────────────────────────────────────────────
  /** Require at least this role in the hierarchy */
  minRole?: TStoryCollaboratorRole;
  /** Explicit allow-list of roles */
  allowedRoles?: TStoryCollaboratorRoleOrReader[];
}

/**
 * Declaratively gate UI behind story-level permissions or roles.
 *
 * @example
 * // Single permission
 * <StoryRoleGate permission="canDeleteStory">...</StoryRoleGate>
 *
 * // Multiple permissions (AND by default, requireAll={false} for OR)
 * <StoryRoleGate permissions={['canMergePRs', 'canApprovePRs']}>...</StoryRoleGate>
 *
 * // Minimum hierarchy level
 * <StoryRoleGate minRole="moderator" fallback={<ReadonlyView />}>...</StoryRoleGate>
 *
 * // Explicit allow-list
 * <StoryRoleGate allowedRoles={['owner', 'co_author']} fallback={<ReadonlyView />}>...</StoryRoleGate>
 */
export function StoryRoleGate({
  children,
  fallback = null,
  permission,
  permissions,
  requireAll = true,
  minRole,
  allowedRoles,
}: StoryRoleGateProps) {
  const { role, isLoading } = useStoryRole();

  // While loading, render nothing (or fallback) to avoid flash of wrong content
  if (isLoading) return <>{fallback}</>;

  let allowed = true;

  // Check single permission
  if (permission) {
    allowed = hasPermission(role, permission);
  }

  // Check multiple permissions
  if (allowed && permissions && permissions.length > 0) {
    allowed = requireAll
      ? hasAllPermissions(role, permissions)
      : hasAnyPermission(role, permissions);
  }

  // Check minimum role in hierarchy
  if (allowed && minRole) {
    allowed = hasMinRole(role, minRole);
  }

  // Check explicit allow-list
  if (allowed && allowedRoles) {
    allowed = allowedRoles.includes(role);
  }

  return <>{allowed ? children : fallback}</>;
}
