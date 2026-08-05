'use client';

import { useParams, useRouter } from 'next/navigation';
import { createContext, useContext, useMemo } from 'react';

import type {
  TStoryCollaboratorPermission,
  TStoryCollaboratorRole,
  TStoryCollaboratorRoleOrReader,
  TStoryCollaboratorStatus,
} from '@/type/story/story.types';
import { useUser } from '@clerk/nextjs';
import { format } from 'date-fns';
import { ShieldAlert } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  READER_ROLE,
  hasAllPermissions,
  hasAnyPermission,
  hasMinRole,
  hasPermission,
} from '@/lib/story-role-utils';
import { useCheckUserStoryBan, useGetUserRole } from '@/services/stories/stories.query';

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

export function StoryRoleProvider({ children }: { children: React.ReactNode }) {
  const { slug } = useParams();
  const router = useRouter();
  const slugStr = Array.isArray(slug) ? slug[0] : (slug ?? '');

  const { user } = useUser();
  const userId = user?.id;

  const { data, isLoading, error } = useGetUserRole(slugStr);
  const { data: banResponse } = useCheckUserStoryBan(slugStr, userId);

  const banData = banResponse?.data;
  const isBanned = Boolean(banData?.isBanned);
  const banDetails = banData?.banDetails;

  const value = useMemo<StoryRoleContextValue>(
    () => ({
      role: data?.data?.role ?? READER_ROLE,
      roleStatus: data?.data?.roleStatus ?? null,
      isLoading,
      error: error as Error | null,
    }),
    [data, isLoading, error]
  );

  return (
    <StoryRoleContext.Provider value={value}>
      {isBanned ? (
        <Dialog open={true} onOpenChange={() => {}}>
          <DialogContent
            showCloseButton={false}
            onPointerDownOutside={(e) => e.preventDefault()}
            onEscapeKeyDown={(e) => e.preventDefault()}
            className="bg-card max-w-md border-rose-500/30 p-6 shadow-2xl [&>button]:hidden"
          >
            <DialogHeader className="flex flex-col items-center gap-2 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-rose-500/10 text-rose-500">
                <ShieldAlert className="size-6" />
              </div>
              <DialogTitle className="text-xl font-bold text-rose-600 dark:text-rose-400">
                Access Revoked
              </DialogTitle>
              <DialogDescription className="text-text-secondary-65 text-xs">
                You have been banned from accessing this story.
              </DialogDescription>
            </DialogHeader>

            {banDetails && (
              <div className="border-border/40 bg-muted/30 mt-2 space-y-3 rounded-xl border p-4 text-xs">
                <div className="border-border/20 flex flex-col gap-1 border-b pb-2.5">
                  <span className="text-text-secondary-50 text-[10px] font-semibold tracking-wider uppercase">
                    Reason for Ban
                  </span>
                  <p className="text-text-primary text-sm font-medium">
                    {banDetails.reason || 'No specific reason provided.'}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-1">
                  <div>
                    <span className="text-text-secondary-50 block text-[10px] font-semibold tracking-wider uppercase">
                      Banned By
                    </span>
                    <div className="mt-1 flex items-center gap-1.5">
                      {banDetails.bannedBy?.avatarUrl && (
                        <img
                          src={banDetails.bannedBy.avatarUrl}
                          alt={banDetails.bannedBy.username}
                          className="size-4 rounded-full object-cover"
                        />
                      )}
                      <span className="text-text-primary font-medium">
                        @{banDetails.bannedBy.username || 'Moderator'}
                      </span>
                    </div>
                  </div>

                  <div>
                    <span className="text-text-secondary-50 block text-[10px] font-semibold tracking-wider uppercase">
                      Role
                    </span>
                    <span className="text-text-primary mt-1 block font-medium capitalize">
                      {banDetails.bannedByRole || 'Moderator'}
                    </span>
                  </div>
                </div>

                <div className="border-border/20 grid grid-cols-2 gap-2 border-t pt-2.5">
                  <div>
                    <span className="text-text-secondary-50 block text-[10px] font-semibold tracking-wider uppercase">
                      Banned On
                    </span>
                    <span className="text-text-secondary-65 mt-0.5 block font-mono text-[11px]">
                      {banDetails.createdAt
                        ? format(new Date(banDetails.createdAt), 'MMM dd, yyyy')
                        : '—'}
                    </span>
                  </div>

                  <div>
                    <span className="text-text-secondary-50 block text-[10px] font-semibold tracking-wider uppercase">
                      Duration
                    </span>
                    <span className="text-text-secondary-65 mt-0.5 block font-mono text-[11px]">
                      {banDetails.expiresAt
                        ? format(new Date(banDetails.expiresAt), 'MMM dd, yyyy')
                        : 'Permanent'}
                    </span>
                  </div>
                </div>
              </div>
            )}

            <div className="flex items-center justify-center pt-3">
              <Button
                className="w-full cursor-pointer bg-rose-600 font-medium text-white shadow-xs hover:bg-rose-700"
                onClick={() => router.push('/explore')}
              >
                Leave Story &amp; Go to Explore
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      ) : (
        children
      )}
    </StoryRoleContext.Provider>
  );
}

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

interface StoryRoleGateProps {
  children: React.ReactNode;
  /** Fallback UI when the user lacks access (defaults to `null`) */
  fallback?: React.ReactNode;
  /** Single permission to check */
  permission?: TStoryCollaboratorPermission;
  /** Multiple permissions to check */
  permissions?: TStoryCollaboratorPermission[];
  /** When `true`, ALL listed permissions must be granted (default). When `false`, ANY suffices. */
  requireAll?: boolean;

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
