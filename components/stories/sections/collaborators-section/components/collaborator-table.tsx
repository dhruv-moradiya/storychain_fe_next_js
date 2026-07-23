'use client';

import { useMemo, useState } from 'react';

import type { IUserBasicWithEmail } from '@/type/common';
import type { ICollaboratorRecord } from '@/type/story/story-response.type';
import type { TStoryCollaboratorRole } from '@/type/story/story.types';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { MoreHorizontal, Trash2, UserCog } from 'lucide-react';

import { createBadge } from '@/components/common/badge';
import { ROLE_DISPLAY, ROLE_ICON_COLOR, STATUS_DISPLAY } from '@/components/common/badge/colors';
import { useStoryRole } from '@/components/stories/story-role-context';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { hasPermission } from '@/lib/story-role-utils';
import { cn } from '@/lib/utils';

import { ChangeRoleDialog } from './change-role-dialog';
import { RemoveCollaboratorAlert } from './remove-collaborator-alert';

const columnHelper = createColumnHelper<ICollaboratorRecord>();

interface ActiveCollaborator {
  _id: string;
  user: IUserBasicWithEmail;
  currentRole: TStoryCollaboratorRole;
}

interface CollaboratorTableProps {
  data: ICollaboratorRecord[];
  search: string;
  onChangeRole?: (collaboratorId: string, newRole: TStoryCollaboratorRole) => void;
  onRemove?: (collaboratorId: string) => void;
  isChangingRole?: boolean;
  isRemoving?: boolean;
}

const CollaboratorTable = ({
  data,
  search,
  onChangeRole,
  onRemove,
  isChangingRole = false,
  isRemoving = false,
}: CollaboratorTableProps) => {
  const { role: currentUserRole } = useStoryRole();
  const canChangePermissions = hasPermission(currentUserRole, 'canChangePermissions');
  const canRemoveCollaborators = hasPermission(currentUserRole, 'canRemoveCollaborators');

  const [changeRoleTarget, setChangeRoleTarget] = useState<ActiveCollaborator | null>(null);
  const [removeTarget, setRemoveTarget] = useState<{
    _id: string;
    user: IUserBasicWithEmail;
  } | null>(null);

  const filteredData = useMemo(() => {
    if (!search.trim()) return data;
    const q = search.toLowerCase();
    return data.filter(
      (c) => c.user.username.toLowerCase().includes(q) || c.user.email?.toLowerCase().includes(q)
    );
  }, [search, data]);

  const columns = useMemo(
    () => [
      columnHelper.display({
        id: 'user',
        header: 'Collaborator',
        cell: ({ row }) => {
          const { user, role } = row.original;
          const roleConfig = ROLE_DISPLAY[role];

          return (
            <div className="flex items-center gap-3">
              <Avatar className="border-border h-10 w-10 border shadow-2xs">
                <AvatarImage src={user.avatarUrl} alt={user.username} />
                <AvatarFallback className="bg-brand-blue/10 text-brand-blue font-medium">
                  {user.username.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>

              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="text-text-primary text-sm font-semibold">{user.username}</span>
                  {roleConfig && (
                    <roleConfig.icon className={cn('h-4 w-4', ROLE_ICON_COLOR[role])} />
                  )}
                </div>
                <span className="text-text-secondary-65 text-xs">{user.email}</span>
              </div>
            </div>
          );
        },
      }),

      columnHelper.accessor('role', {
        header: 'Role',
        cell: (info) => {
          const config = ROLE_DISPLAY[info.getValue()];
          if (!config) return null;
          return createBadge({
            label: config.label,
            icon: config.icon,
            color: config.color,
            size: 'sm',
            shape: 'pill',
            style: 'soft',
          });
        },
      }),

      columnHelper.accessor('status', {
        header: 'Status',
        cell: (info) => {
          const config = STATUS_DISPLAY[info.getValue()];
          if (!config) return null;
          return createBadge({
            label: config.label,
            icon: config.icon,
            color: config.color,
            size: 'sm',
            shape: 'pill',
            style: 'soft',
          });
        },
      }),

      // ── Invited At ───────────────────────────────────────────────────────
      columnHelper.accessor('invitedAt', {
        header: 'Invited At',
        cell: (info) => {
          const date = info.getValue();
          return (
            <span
              className="text-text-secondary-65 text-sm"
              title={new Date(date).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}
            >
              {formatRelativeTime(date)}
            </span>
          );
        },
      }),

      // ── Invited By ───────────────────────────────────────────────────────
      columnHelper.display({
        id: 'invitedBy',
        header: 'Invited By',
        cell: ({ row }) => {
          const invitedBy = row.original.invitedBy;

          if (!invitedBy) {
            return <span className="text-text-secondary-65 text-sm">-</span>;
          }

          return (
            <div className="flex items-center gap-2">
              <Avatar className="h-6 w-6">
                <AvatarImage src={invitedBy.avatarUrl} alt={invitedBy.username} />
                <AvatarFallback className="bg-brand-blue/10 text-brand-blue text-[10px] font-medium">
                  {invitedBy.username.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <span className="text-text-secondary-65 text-sm">{invitedBy.username}</span>
            </div>
          );
        },
      }),

      // ── Actions ──────────────────────────────────────────────────────────
      columnHelper.display({
        id: 'actions',
        header: '',
        cell: ({ row }) => {
          const collab = row.original;
          if (collab.role === 'owner') return null;

          // Don't show actions dropdown if current user cannot change permissions or remove collaborators
          if (!canChangePermissions && !canRemoveCollaborators) return null;

          return (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-text-secondary-65 hover:text-text-primary hover:bg-muted/60 h-8 w-8 rounded-lg transition-colors"
                >
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                align="end"
                sideOffset={6}
                className="border-border/50 shadow-card w-52 overflow-hidden rounded-xl p-1.5"
              >
                {/* Header chip */}
                <div className="border-border/30 mb-1.5 flex items-center gap-2.5 border-b px-2 pb-2">
                  <Avatar className="h-7 w-7">
                    <AvatarImage src={collab.user.avatarUrl} alt={collab.user.username} />
                    <AvatarFallback className="bg-brand-blue/10 text-brand-blue text-[10px] font-semibold">
                      {collab.user.username.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col leading-none">
                    <span className="text-text-primary text-xs font-semibold">
                      {collab.user.username}
                    </span>
                    <span className="text-text-secondary-65 text-[10px]">
                      {ROLE_DISPLAY[collab.role]?.label ?? collab.role}
                    </span>
                  </div>
                </div>

                {/* Change Role */}
                {canChangePermissions && (
                  <DropdownMenuItem
                    className="text-text-primary hover:bg-muted/70 flex cursor-pointer items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm font-medium transition-colors"
                    onSelect={() =>
                      setChangeRoleTarget({
                        _id: collab._id,
                        user: collab.user,
                        currentRole: collab.role,
                      })
                    }
                  >
                    <UserCog className="text-text-secondary-65 h-4 w-4" />
                    Change Role
                  </DropdownMenuItem>
                )}

                {canChangePermissions && canRemoveCollaborators && (
                  <DropdownMenuSeparator className="bg-border/30 my-1" />
                )}

                {/* Remove */}
                {canRemoveCollaborators && (
                  <DropdownMenuItem
                    className="flex cursor-pointer items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm font-medium text-red-500 transition-colors hover:bg-red-50 hover:text-red-600 focus:bg-red-50 focus:text-red-600 dark:hover:bg-red-950/40 dark:focus:bg-red-950/40"
                    onSelect={() => setRemoveTarget({ _id: collab._id, user: collab.user })}
                  >
                    <Trash2 className="h-4 w-4" />
                    Remove Collaborator
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          );
        },
      }),
    ],
    [canChangePermissions, canRemoveCollaborators]
  );

  // eslint-disable-next-line
  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <>
      <div className="border-border/50 animate-in fade-in-0 overflow-hidden rounded-xl border duration-200">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className="bg-muted/30 hover:bg-muted/30 border-border/30 border-b"
              >
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="text-text-secondary-65 px-4 py-3 text-xs font-semibold tracking-wider uppercase"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows.map((row, idx) => (
              <tr
                key={row.id}
                style={{ animationDelay: `${idx * 30}ms` }}
                className="animate-in fade-in-0 slide-in-from-bottom-1 group hover:bg-muted/20 border-border/30 fill-mode-both border-b duration-150 last:border-0"
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} className="px-4 py-3.5">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </tr>
            ))}
          </TableBody>
        </Table>

        {filteredData.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <p className="text-text-secondary-65 text-sm">
              No collaborators found matching "{search}"
            </p>
          </div>
        )}
      </div>

      {/* ── Dialogs ──────────────────────────────────────────────────────── */}
      <ChangeRoleDialog
        open={!!changeRoleTarget}
        onOpenChange={(open) => {
          if (!open) setChangeRoleTarget(null);
        }}
        collaborator={changeRoleTarget}
        isPending={isChangingRole}
        onConfirm={(id, role) => {
          onChangeRole?.(id, role);
          setChangeRoleTarget(null);
        }}
      />

      <RemoveCollaboratorAlert
        open={!!removeTarget}
        onOpenChange={(open) => {
          if (!open) setRemoveTarget(null);
        }}
        collaborator={removeTarget}
        isPending={isRemoving}
        onConfirm={(id) => {
          onRemove?.(id);
          setRemoveTarget(null);
        }}
      />
    </>
  );
};

export default CollaboratorTable;

/* ── Date helpers ─────────────────────────────────────────────────────────── */

export function formatRelativeTime(date: Date | string) {
  const now = new Date();
  const then = new Date(date);
  const diffMs = now.getTime() - then.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins} min ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}
