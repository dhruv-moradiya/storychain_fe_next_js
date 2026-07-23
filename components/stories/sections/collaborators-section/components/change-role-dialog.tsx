'use client';

import { useState } from 'react';

import { INVITABLE_ROLES, ROLE_CONFIG } from '@/constants';
import type { IUserBasicWithEmail } from '@/type/common';
import type { TStoryCollaboratorRole } from '@/type/story/story.types';
import { Check } from 'lucide-react';

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
        'group relative flex cursor-pointer flex-col items-start gap-1.5 rounded-xl border p-3.5 text-left transition-all duration-200',
        selected
          ? 'border-brand-pink-500 bg-brand-pink-500/10 dark:bg-brand-pink-500/15 shadow-brand-pink-shadow25 shadow-xs'
          : 'border-border/60 hover:border-brand-pink-500/40 bg-card/60 hover:bg-card dark:bg-card/40 dark:hover:bg-card/80'
      )}
    >
      <div className="flex w-full items-start justify-between">
        <div className="flex items-center gap-2">
          <div
            className={cn(
              'rounded-lg p-1.5 transition-all',
              selected
                ? 'bg-brand-pink-500/20 text-brand-pink-500 dark:text-brand-pink-400 shadow-xs'
                : 'bg-muted/60 text-text-secondary-65 group-hover:bg-muted group-hover:text-text-primary'
            )}
          >
            <Icon className="h-3.5 w-3.5" />
          </div>
          <span
            className={cn(
              'text-[13px] font-semibold tracking-tight',
              selected ? 'text-brand-pink-500 dark:text-brand-pink-400' : 'text-text-primary'
            )}
          >
            {config.label}
          </span>
        </div>

        {selected && (
          <div className="animate-in zoom-in-75 bg-brand-pink-500 flex size-4.5 items-center justify-center rounded-full text-white shadow-xs">
            <Check className="h-3 w-3 stroke-[3]" />
          </div>
        )}
      </div>

      <p className="text-text-secondary-65 line-clamp-2 text-[11px] leading-relaxed">
        {config.description}
      </p>
    </button>
  );
}

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
      <DialogContent className="border-border/50 bg-background max-w-md gap-0 overflow-hidden p-0">
        {/* ── Header ─────────────────────────────────────────────────────── */}
        <div className="from-brand-pink-500/10 via-brand-pink-500/5 border-border/30 relative border-b bg-gradient-to-br to-transparent px-6 pt-6 pb-4">
          <DialogHeader className="relative">
            <DialogTitle className="text-text-primary text-base font-semibold tracking-tight">
              Change Role
            </DialogTitle>
            <DialogDescription className="text-text-secondary-65 mt-0.5 text-xs">
              Update collaborator permissions for this story.
            </DialogDescription>
          </DialogHeader>

          {/* Collaborator chip */}
          {collaborator && (
            <div className="border-border/50 bg-card/80 mt-4 flex items-center gap-3 rounded-xl border px-3 py-2.5 shadow-xs backdrop-blur-sm">
              <Avatar className="h-8 w-8">
                <AvatarImage src={collaborator.user.avatarUrl} alt={collaborator.user.username} />
                <AvatarFallback className="bg-brand-pink-500/15 text-brand-pink-500 text-xs font-semibold">
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

        <div className="space-y-2.5 px-6 py-5">
          <p className="text-text-secondary-65 text-[11px] font-semibold tracking-widest uppercase">
            Select new role
          </p>
          <div className="grid grid-cols-2 gap-2.5">
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
