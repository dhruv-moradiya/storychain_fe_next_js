'use client';

import { useState } from 'react';

import { INVITABLE_ROLES, ROLE_CONFIG } from '@/constants';
import type { IUserBasicWithEmail } from '@/type/common';
import type { TStoryCollaboratorRole } from '@/type/story/story.types';
import { CheckCircle } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';

// ── Types ─────────────────────────────────────────────────────────────────────

interface ChangeRoleDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  collaborator: {
    _id: string;
    user: IUserBasicWithEmail;
    currentRole: TStoryCollaboratorRole;
  } | null;
  onConfirm: (collaboratorId: string, newRole: TStoryCollaboratorRole) => void;
  isPending?: boolean;
}

// ── Role option card ──────────────────────────────────────────────────────────

interface RoleOptionProps {
  role: TStoryCollaboratorRole;
  selected: boolean;
  onSelect: () => void;
}

function RoleOption({ role, selected, onSelect }: RoleOptionProps) {
  const config = ROLE_CONFIG[role];
  const Icon = config.icon;

  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        'group relative flex flex-col items-start gap-1.5 rounded-xl border p-3 text-left transition-all duration-200',
        selected
          ? 'border-brand-pink-500 from-brand-pink-500/10 to-brand-blue/5 shadow-brand-pink-shadow25 bg-linear-to-br shadow-md'
          : 'border-border/50 hover:border-brand-pink-300/40 bg-white/60 hover:bg-white hover:shadow-sm'
      )}
    >
      <div className="flex w-full items-start justify-between">
        <div className="flex items-center gap-2">
          <div
            className={cn(
              'rounded-lg p-1.5 transition-all',
              selected
                ? 'bg-brand-pink-500/15 text-brand-pink-600 shadow-sm'
                : 'bg-muted/50 text-text-secondary-65 group-hover:bg-muted'
            )}
          >
            <Icon className="h-3.5 w-3.5" />
          </div>
          <span
            className={cn(
              'font-semibold tracking-tight',
              selected ? 'text-brand-pink-700 text-[13px]' : 'text-text-primary text-[13px]'
            )}
          >
            {config.label}
          </span>
        </div>

        {selected && (
          <div className="animate-in zoom-in-75 from-brand-pink-500 to-brand-pink-600 flex size-4 items-center justify-center rounded-full bg-linear-to-br duration-150">
            <CheckCircle className="h-3 w-3 fill-white text-white" />
          </div>
        )}
      </div>

      <p className="text-text-secondary-65 line-clamp-2 text-[11px] leading-relaxed">
        {config.description}
      </p>
    </button>
  );
}

// ── Component ─────────────────────────────────────────────────────────────────

export function ChangeRoleDialog({
  open,
  onOpenChange,
  collaborator,
  onConfirm,
  isPending = false,
}: ChangeRoleDialogProps) {
  const [selectedRole, setSelectedRole] = useState<TStoryCollaboratorRole>(
    collaborator?.currentRole ?? 'contributor'
  );

  // Sync selected role when a different collaborator is opened
  const handleOpenChange = (isOpen: boolean) => {
    if (isOpen && collaborator) {
      setSelectedRole(collaborator.currentRole);
    }
    onOpenChange(isOpen);
  };

  const handleConfirm = () => {
    if (!collaborator) return;
    onConfirm(collaborator._id, selectedRole);
  };

  const hasChanged = selectedRole !== collaborator?.currentRole;

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="border-border/50 max-w-md gap-0 overflow-hidden p-0">
        {/* ── Header ─────────────────────────────────────────────────────── */}
        <div className="from-brand-pink-500/8 to-brand-blue/5 relative overflow-hidden bg-linear-to-br px-6 pt-6 pb-4">
          <div className="radial-gradient-orb-pink absolute -top-6 -right-6 size-24 opacity-20 blur-2xl" />
          <DialogHeader className="relative">
            <DialogTitle className="font-playfair text-text-primary text-lg font-semibold tracking-tight">
              Change Role
            </DialogTitle>
            <DialogDescription className="text-text-secondary-65 mt-0.5 text-sm">
              Update collaborator permissions for this story.
            </DialogDescription>
          </DialogHeader>

          {/* Collaborator chip */}
          {collaborator && (
            <div className="border-border/40 mt-4 flex items-center gap-3 rounded-xl border bg-white/70 px-3 py-2.5 shadow-sm backdrop-blur-sm">
              <Avatar className="h-8 w-8">
                <AvatarImage src={collaborator.user.avatarUrl} alt={collaborator.user.username} />
                <AvatarFallback className="bg-brand-pink-500/10 text-brand-pink-600 text-xs font-semibold">
                  {collaborator.user.username.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="text-text-primary text-sm font-semibold">
                  {collaborator.user.username}
                </span>
                <span className="text-text-secondary-65 text-xs">{collaborator.user.email}</span>
              </div>
            </div>
          )}
        </div>

        {/* ── Role Grid ──────────────────────────────────────────────────── */}
        <div className="space-y-2.5 px-6 py-5">
          <p className="text-text-secondary-65 text-[11px] font-semibold tracking-widest uppercase">
            Select new role
          </p>
          <div className="grid grid-cols-2 gap-2">
            {INVITABLE_ROLES.map((role) => (
              <RoleOption
                key={role}
                role={role}
                selected={selectedRole === role}
                onSelect={() => setSelectedRole(role)}
              />
            ))}
          </div>
        </div>

        {/* ── Footer ─────────────────────────────────────────────────────── */}
        <DialogFooter className="border-border/30 bg-muted/20 gap-2 border-t px-6 py-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onOpenChange(false)}
            disabled={isPending}
            className="border-border/60 text-text-secondary-65 hover:text-text-primary"
          >
            Cancel
          </Button>
          <Button
            size="sm"
            onClick={handleConfirm}
            disabled={!hasChanged || isPending}
            className="bg-brand-pink-500 hover:bg-brand-pink-600 font-semibold text-white disabled:opacity-50"
          >
            {isPending ? 'Saving…' : 'Save Changes'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
