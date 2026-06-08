'use client';

import { useState } from 'react';

import { BookOpen, ScrollText, Shield, User } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

import { ChaptersTable } from './chapters-table';
import { MOCK_CHAPTERS_TABLE, MOCK_CURRENT_USER_ID } from './mock-data';
import type { IChaptersTableContext, UserRole } from './types';

// ─── Mock role options for demo ───────────────────────────────────────────────

interface RoleOption {
  role: UserRole;
  label: string;
  isPrivileged: boolean;
  icon: typeof User;
}

const ROLE_OPTIONS: RoleOption[] = [
  { role: 'owner', label: 'Owner', isPrivileged: true, icon: Shield },
  { role: 'co_author', label: 'Co-Author', isPrivileged: true, icon: BookOpen },
  { role: 'contributor', label: 'Contributor', isPrivileged: false, icon: User },
  { role: 'reader', label: 'Reader', isPrivileged: false, icon: User },
];

export function ChaptersTableSection() {
  const [selectedRole, setSelectedRole] = useState<RoleOption>(ROLE_OPTIONS[3]);

  const context: IChaptersTableContext = {
    isOwnerOrPrivileged: selectedRole.isPrivileged,
    currentUserId: MOCK_CURRENT_USER_ID,
    userRole: selectedRole.role,
  };

  return (
    <div className="flex flex-col gap-5">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-brand-pink-500/10 flex h-10 w-10 items-center justify-center rounded-xl">
            <ScrollText className="text-brand-pink-500 h-5 w-5" />
          </div>
          <div>
            <h1 className="text-text-primary text-xl font-semibold">Chapters</h1>
            <p className="text-text-secondary-65 text-sm">Manage your story chapters</p>
          </div>
        </div>

        {/* Demo: Role switcher */}
        <div className="flex flex-col gap-1.5">
          <p className="text-text-secondary-50 text-[10px] font-medium tracking-wider uppercase">
            Preview as role
          </p>
          <div className="flex items-center gap-1.5">
            {ROLE_OPTIONS.map((option) => {
              const Icon = option.icon;
              const isActive = selectedRole.role === option.role;
              return (
                <Button
                  key={option.role}
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedRole(option)}
                  className={cn(
                    'h-8 gap-1.5 border px-2.5 text-xs transition-all duration-150',
                    isActive
                      ? 'border-brand-pink-500/40 bg-brand-pink-500/10 text-brand-pink-500'
                      : 'border-border/40 text-text-secondary-65 hover:text-text-primary hover:border-border'
                  )}
                >
                  <Icon className="h-3 w-3" />
                  {option.label}
                </Button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="border-border/30 bg-muted/20 flex flex-wrap items-center gap-4 rounded-xl border px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/10">
            <span className="text-[10px] text-emerald-500">✓</span>
          </div>
          <span className="text-text-secondary-65 text-xs">Unlocked / Free</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex h-5 w-5 items-center justify-center rounded-full bg-amber-500/10">
            <span className="text-[10px] text-amber-500">🔒</span>
          </div>
          <span className="text-text-secondary-65 text-xs">Locked — costs coins</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="border-l-brand-pink-500/20 bg-muted/20 h-2 w-4 rounded border-l-2" />
          <span className="text-text-secondary-65 text-xs">Child branch (depth 1)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="border-l-brand-pink-500/30 bg-muted/30 h-2 w-4 rounded border-l-2" />
          <span className="text-text-secondary-65 text-xs">Grandchild (depth 2+)</span>
        </div>
        <span className="text-text-secondary-50 ml-auto text-xs">
          Click <kbd className="bg-muted border-border/50 rounded border px-1 text-[10px]">▶</kbd>{' '}
          to expand branches
        </span>
      </div>

      {/* Table */}
      <ChaptersTable data={MOCK_CHAPTERS_TABLE} context={context} pageSize={10} />
    </div>
  );
}
