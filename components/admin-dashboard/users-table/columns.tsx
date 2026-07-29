'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Coins, MoreVertical } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn, getInitials } from '@/lib/utils';

export interface Transaction {
  dateTime: string;
  transactionId: string;
  type: 'Purchase' | 'Spend';
  description: string;
  coins: string;
  amount: string;
  paymentMethod: string;
  status: 'Completed';
}

export interface UserStats {
  id: string;
  name: string;
  avatarUrl?: string;
  email: string;
  role: 'User' | 'Author' | 'Editor';
  coinsBalance: string;
  totalSpent: string;
  joinedOn: string;
  status: 'Active' | 'Inactive';
  transactions: Transaction[];
}

export const columns: ColumnDef<UserStats>[] = [
  {
    id: 'user',
    header: 'User',
    accessorKey: 'name',
    cell: ({ row }) => {
      const user = row.original;

      // Extract dynamic initials for avatar fallback
      const initials = getInitials(user.name);

      return (
        <div className="flex items-center gap-3">
          {/* User Avatar */}
          <Avatar className="border-border-soft h-9 w-9 border">
            {user.avatarUrl && <AvatarImage src={user.avatarUrl} alt={user.name} />}
            <AvatarFallback className="bg-primary/5 text-primary text-xs font-semibold">
              {initials}
            </AvatarFallback>
          </Avatar>

          {/* User Name and USR ID */}
          <div className="flex flex-col">
            <span className="text-text-primary text-sm leading-tight font-semibold tracking-tight">
              {user.name}
            </span>
            <span className="text-text-secondary-50 mt-0.5 font-mono text-xs">{user.id}</span>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: 'email',
    header: 'Email',
    cell: ({ getValue }) => (
      <span className="text-text-secondary-65 text-sm">{getValue() as string}</span>
    ),
  },
  {
    accessorKey: 'role',
    header: 'Role',
    cell: ({ getValue }) => {
      const role = getValue() as string;
      const roleClasses: Record<string, string> = {
        User: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
        Author: 'bg-purple-500/10 text-purple-600 dark:text-purple-400',
        Editor: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
      };

      return (
        <Badge
          className={cn(
            'rounded-full border-none px-2.5 py-0.5 text-xs font-semibold tracking-wider uppercase shadow-none',
            roleClasses[role] || 'bg-muted text-muted-foreground'
          )}
        >
          {role}
        </Badge>
      );
    },
  },
  {
    accessorKey: 'coinsBalance',
    header: 'Coins Balance',
    cell: ({ getValue }) => (
      <div className="text-text-primary flex items-center gap-1.5 text-sm font-semibold">
        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-amber-500/10 text-amber-500">
          <Coins className="h-3 w-3 shrink-0" />
        </div>
        <span>{getValue() as string}</span>
      </div>
    ),
  },
  {
    accessorKey: 'totalSpent',
    header: 'Total Spent',
    cell: ({ getValue }) => (
      <span className="text-text-primary text-sm font-semibold">{getValue() as string}</span>
    ),
  },
  {
    accessorKey: 'joinedOn',
    header: 'Joined On',
    cell: ({ getValue }) => (
      <span className="text-text-secondary-65 text-sm">{getValue() as string}</span>
    ),
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ getValue }) => {
      const status = getValue() as string;
      const isCardActive = status === 'Active';

      return (
        <Badge
          className={cn(
            'rounded-full border-none px-2.5 py-0.5 text-xs font-semibold shadow-none',
            isCardActive
              ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
              : 'bg-rose-500/10 text-rose-600 dark:text-rose-400'
          )}
        >
          {status}
        </Badge>
      );
    },
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: () => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="text-text-secondary-65 hover:text-text-primary hover:bg-brand-warm-beige/30 h-8 w-8 cursor-pointer rounded-lg"
          >
            <MoreVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="border-border-soft bg-card w-40">
          <DropdownMenuLabel className="text-text-secondary-65 px-2.5 py-1.5 text-xs font-semibold tracking-wider uppercase">
            Actions
          </DropdownMenuLabel>
          <DropdownMenuSeparator className="bg-border-soft" />
          <DropdownMenuItem className="text-text-primary hover:bg-brand-warm-beige/30 cursor-pointer rounded-sm text-sm">
            View details
          </DropdownMenuItem>
          <DropdownMenuItem className="text-text-primary hover:bg-brand-warm-beige/30 cursor-pointer rounded-sm text-sm">
            Edit user
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer rounded-sm text-sm text-rose-600 hover:bg-rose-500/10">
            Suspend account
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];
