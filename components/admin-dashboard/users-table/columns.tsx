'use client';

import Image from 'next/image';
import { Fragment, MouseEvent } from 'react';

import { PlatformRole } from '@/type/user/user-enum';
import { IPaginatedUserData, TAuthProvider } from '@/type/user/user-response.type';
import { ColumnDef, RowData } from '@tanstack/react-table';
import { format } from 'date-fns';
import {
  BookOpen,
  CheckCircle2,
  Layers,
  Mail,
  MoreVertical,
  ShieldCheck,
  ThumbsUp,
  Zap,
} from 'lucide-react';

import { countBadge, iconBadge, statusBadge, textBadge } from '@/components/common/badge';
import { CopyButton } from '@/components/copy-button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { getInitials } from '@/lib/utils';

export interface IUserTableMeta {
  handleViewProfile?: (event: React.MouseEvent<HTMLDivElement>, id: string) => void;
  handleBanUser?: (event: React.MouseEvent<HTMLDivElement>, user: IPaginatedUserData) => void;
  handleUnbanUser?: (event: React.MouseEvent<HTMLDivElement>, user: IPaginatedUserData) => void;
}

declare module '@tanstack/react-table' {
  interface TableMeta<TData extends RowData> {
    handleViewProfile?: (event: React.MouseEvent<HTMLDivElement>, id: string) => void;
    handleBanUser?: (event: React.MouseEvent<HTMLDivElement>, user: IPaginatedUserData) => void;
    handleUnbanUser?: (event: React.MouseEvent<HTMLDivElement>, user: IPaginatedUserData) => void;
  }
}

const renderProviderIcon = (provider?: TAuthProvider | string, size = 16) => {
  if (!provider) return <Mail className="text-text-secondary-65 size-3.5" />;
  const providerLower = provider.toLowerCase();
  const knownProviders = ['google', 'github', 'discord'];

  if (knownProviders.includes(providerLower)) {
    if (providerLower === 'github') {
      return (
        <>
          <Image
            src={`/providers/github.png`}
            alt={provider}
            width={size}
            height={size}
            className="size-4 object-contain dark:hidden"
          />
          <Image
            src={`/providers/dark-mode-github.png`}
            alt={provider}
            width={size}
            height={size}
            className="hidden size-4 object-contain dark:block"
          />
        </>
      );
    }
    return (
      <Image
        src={`/providers/${providerLower}.png`}
        alt={provider}
        width={size}
        height={size}
        className="size-4 object-contain"
      />
    );
  }
  return <Mail className="text-text-secondary-65 size-3.5" />;
};

export const columns: ColumnDef<IPaginatedUserData>[] = [
  {
    id: 'user',
    header: 'User',
    accessorKey: 'username',
    cell: ({ row }) => {
      const user = row.original;
      const initials = getInitials(user.username || user.email || 'User');

      return (
        <div className="flex items-center gap-3">
          <Avatar className="ring-border/40 h-9 w-9 shrink-0 ring-1">
            {user.avatarUrl && <AvatarImage src={user.avatarUrl} alt={user.username} />}
            <AvatarFallback className="bg-primary/10 text-primary text-xs font-bold">
              {initials}
            </AvatarFallback>
          </Avatar>

          <div className="flex min-w-0 flex-col">
            <div className="flex items-center gap-1.5">
              <span className="text-text-primary max-w-35 truncate text-sm leading-tight font-semibold tracking-tight">
                {user.username || 'Anonymous User'}
              </span>
            </div>
            <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
              <CopyButton
                text={user.clerkId}
                size="icon-xs"
                className="text-text-secondary-50 bg-transparent text-xs hover:bg-transparent"
              />
              <span className="text-text-secondary-50 truncate font-mono text-[11px]">
                {user.clerkId.slice(0, 20)}...
              </span>
            </div>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: 'email',
    header: 'Email & Auth',
    cell: ({ row }) => {
      const user = row.original;

      return (
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1.5">
            <span className="text-text-secondary-65 max-w-45 truncate text-xs font-medium">
              {user.email}
            </span>
            {user.emailVerified && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <CheckCircle2 className="size-3.5 shrink-0 text-emerald-500" />
                  </TooltipTrigger>
                  <TooltipContent side="top" className="text-[11px]">
                    Verified Email
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
          <div className="text-text-secondary-50 flex items-center gap-1 text-[11px]">
            <span className="text-[10px] font-semibold tracking-wider uppercase">Primary:</span>
            <div className="flex items-center gap-1">
              {renderProviderIcon(user.primaryAuthMethod, 14)}
              <span className="capitalize">{user.primaryAuthMethod || 'email'}</span>
            </div>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: 'connectedAccounts',
    header: 'Connected',
    cell: ({ row }) => {
      const user = row.original;
      const accounts = user.connectedAccounts || [];

      if (accounts.length === 0) {
        return <span className="text-text-secondary-50 text-xs">-</span>;
      }

      return (
        <TooltipProvider>
          <div className="flex items-center gap-1.5">
            {accounts.map((acc, index) => (
              <Tooltip key={acc.providerAccountId || `${acc.provider}-${index}`}>
                <TooltipTrigger asChild>
                  <div className="border-border/40 bg-muted/40 hover:bg-muted/80 flex h-7 w-7 cursor-pointer items-center justify-center rounded-lg border transition-all">
                    {renderProviderIcon(acc.provider, 16)}
                  </div>
                </TooltipTrigger>
                <TooltipContent side="top" className="space-y-0.5 text-xs">
                  <p className="font-semibold capitalize">{acc.provider}</p>
                  {acc.username && <p className="text-[11px]">@{acc.username}</p>}
                  {acc.email && <p className="text-[11px]">{acc.email}</p>}
                </TooltipContent>
              </Tooltip>
            ))}
          </div>
        </TooltipProvider>
      );
    },
  },
  {
    accessorKey: 'role',
    header: 'Role',
    cell: ({ getValue }) => {
      const role = (getValue() as PlatformRole) || PlatformRole.USER;
      const roleColors: Record<string, 'purple' | 'blue' | 'amber' | 'emerald'> = {
        [PlatformRole.SUPER_ADMIN]: 'purple',
        [PlatformRole.PLATFORM_MODERATOR]: 'blue',
        [PlatformRole.APPEAL_MODERATOR]: 'amber',
        [PlatformRole.USER]: 'emerald',
      };

      const roleLabels: Record<string, string> = {
        [PlatformRole.SUPER_ADMIN]: 'Super Admin',
        [PlatformRole.PLATFORM_MODERATOR]: 'Platform Mod',
        [PlatformRole.APPEAL_MODERATOR]: 'Appeal Mod',
        [PlatformRole.USER]: 'User',
      };

      return textBadge(roleLabels[role] || role, roleColors[role] || 'gray', {
        size: 'sm',
        shape: 'pill',
        style: 'soft',
      });
    },
  },
  {
    id: 'levelXp',
    header: 'Level & XP',
    cell: ({ row }) => {
      const user = row.original;
      const level = user.level ?? 1;
      const xp = user.xp ?? 0;

      return (
        <div className="flex items-center gap-2 text-xs font-medium">
          {iconBadge(`Lvl ${level}`, Zap, 'amber', { size: 'xs', shape: 'pill', style: 'soft' })}
          <span className="text-text-secondary-65 font-mono text-xs">
            {(xp || 0).toLocaleString()} XP
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: 'badges',
    header: 'Badges',
    cell: ({ row }) => {
      const badges = row.original.badges || [];

      if (badges.length === 0) {
        return <span className="text-text-secondary-50 text-xs">-</span>;
      }

      return (
        <div className="flex max-w-32.5 flex-wrap items-center gap-1">
          {badges.slice(0, 2).map((badge, idx) => (
            <Fragment key={idx}>
              {textBadge(badge, 'purple', { size: 'sm', shape: 'pill', style: 'soft' })}
            </Fragment>
          ))}
          {badges.length > 2 &&
            countBadge(badges.length - 2, 'gray', { size: 'sm', shape: 'pill' })}
        </div>
      );
    },
  },
  {
    id: 'stats',
    header: 'Activity Stats',
    cell: ({ row }) => {
      const stats = row.original.stats;
      if (!stats) return <span className="text-text-secondary-50 text-xs">—</span>;

      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="text-text-secondary-65 flex cursor-pointer items-center gap-2 text-xs">
                <span className="flex items-center gap-1" title="Stories Created">
                  <BookOpen className="size-3 text-indigo-500" />
                  {stats.storiesCreated || 0}
                </span>
                <span className="flex items-center gap-1" title="Chapters Written">
                  <Layers className="size-3 text-emerald-500" />
                  {stats.chaptersWritten || 0}
                </span>
                <span className="flex items-center gap-1" title="Total Upvotes">
                  <ThumbsUp className="size-3 text-amber-500" />
                  {stats.totalUpvotes || 0}
                </span>
              </div>
            </TooltipTrigger>
            <TooltipContent side="top" className="space-y-1 p-2.5 text-xs">
              <p className="mb-1 border-b pb-1 font-semibold">User Activity Stats</p>
              <p>
                Stories Created: <span className="font-bold">{stats.storiesCreated || 0}</span>
              </p>
              <p>
                Chapters Written: <span className="font-bold">{stats.chaptersWritten || 0}</span>
              </p>
              <p>
                Branches Created: <span className="font-bold">{stats.branchesCreated || 0}</span>
              </p>
              <p>
                Total Upvotes:{' '}
                <span className="font-bold text-emerald-500">{stats.totalUpvotes || 0}</span>
              </p>
              <p>
                Total Downvotes:{' '}
                <span className="font-bold text-rose-500">{stats.totalDownvotes || 0}</span>
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    },
  },
  {
    accessorKey: 'isActive',
    header: 'Status',
    cell: ({ row }) => {
      const user = row.original;
      const isActive = user.isActive ?? true;

      if (!isActive) {
        return statusBadge('Inactive', 'neutral', { size: 'sm', shape: 'pill' });
      }

      return iconBadge('Active', ShieldCheck, 'success', {
        size: 'sm',
        shape: 'pill',
        style: 'soft',
      });
    },
  },
  {
    accessorKey: 'createdAt',
    header: 'Joined On',
    cell: ({ getValue }) => {
      const val = getValue() as string;
      if (!val) return <span className="text-text-secondary-50 text-xs">—</span>;
      try {
        return (
          <span className="text-text-secondary-65 font-mono text-xs">
            {format(new Date(val), 'MMM dd, yyyy')}
          </span>
        );
      } catch {
        return <span className="text-text-secondary-65 font-mono text-xs">{val}</span>;
      }
    },
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row, table }) => {
      const user = row.original;
      const isActive = user.isActive ?? true;
      const meta = table.options.meta;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => e.stopPropagation()}
              className="text-text-secondary-65 hover:text-text-primary hover:bg-muted/50 h-8 w-8 cursor-pointer rounded-lg"
            >
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="border-border/50 bg-card w-44 shadow-md">
            <DropdownMenuLabel className="text-text-secondary-50 px-2.5 py-1.5 text-[11px] font-semibold tracking-wider uppercase">
              User Actions
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-border/40" />
            <DropdownMenuItem
              onClick={(event) => meta?.handleViewProfile?.(event, user.clerkId)}
              className="text-text-primary hover:bg-muted/50 cursor-pointer rounded-md text-xs font-medium"
            >
              View Profile
            </DropdownMenuItem>
            {isActive ? (
              <DropdownMenuItem
                onClick={(event) => meta?.handleBanUser?.(event, user)}
                className="hover:bg-muted/50 cursor-pointer rounded-md text-xs font-medium text-rose-600"
              >
                Ban User
              </DropdownMenuItem>
            ) : (
              <DropdownMenuItem
                onClick={(event) => meta?.handleUnbanUser?.(event, user)}
                className="hover:bg-muted/50 cursor-pointer rounded-md text-xs font-medium text-emerald-600"
              >
                Unban User
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
