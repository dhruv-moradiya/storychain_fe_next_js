'use client';

import type { IUserBasic } from '@/type/common';
import { AlertTriangle } from 'lucide-react';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

// ── Types ─────────────────────────────────────────────────────────────────────

interface RemoveCollaboratorAlertProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  collaborator: {
    _id: string;
    user: IUserBasic;
  } | null;
  onConfirm: (collaboratorId: string) => void;
  isPending?: boolean;
}

// ── Component ─────────────────────────────────────────────────────────────────

export function RemoveCollaboratorAlert({
  open,
  onOpenChange,
  collaborator,
  onConfirm,
  isPending = false,
}: RemoveCollaboratorAlertProps) {
  const handleConfirm = () => {
    if (!collaborator) return;
    onConfirm(collaborator._id);
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="border-border/50 max-w-sm gap-0 overflow-hidden p-0">
        {/* ── Danger header band ──────────────────────────────────────── */}
        <div className="relative overflow-hidden bg-red-50 px-6 pt-6 pb-5">
          <div className="absolute -top-8 -right-8 size-24 rounded-full bg-red-100 opacity-60 blur-2xl" />

          <div className="relative flex items-start gap-4">
            {/* Icon */}
            <div className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-red-200 bg-red-100 shadow-sm">
              <AlertTriangle className="h-5 w-5 text-red-600" />
            </div>

            <AlertDialogHeader className="gap-1 text-left">
              <AlertDialogTitle className="font-playfair text-text-primary text-base font-semibold tracking-tight">
                Remove Collaborator
              </AlertDialogTitle>
              <AlertDialogDescription className="text-text-secondary-65 text-sm leading-relaxed">
                This action cannot be undone. The collaborator will lose all access to this story.
              </AlertDialogDescription>
            </AlertDialogHeader>
          </div>
        </div>

        {/* ── Collaborator chip ───────────────────────────────────────── */}
        {collaborator && (
          <div className="px-6 py-4">
            <div className="border-border/40 flex items-center gap-3 rounded-xl border bg-white px-3.5 py-3 shadow-sm">
              <Avatar className="h-9 w-9">
                <AvatarImage src={collaborator.user.avatarUrl} alt={collaborator.user.username} />
                <AvatarFallback className="bg-red-50 text-xs font-semibold text-red-500">
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
          </div>
        )}

        {/* ── Footer ─────────────────────────────────────────────────── */}
        <AlertDialogFooter className="border-border/30 bg-muted/10 gap-2 border-t px-6 py-4">
          <AlertDialogCancel
            size="sm"
            disabled={isPending}
            className="border-border/60 text-text-secondary-65 hover:text-text-primary"
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            size="sm"
            onClick={handleConfirm}
            disabled={isPending}
            className="bg-red-500 font-semibold text-white shadow-sm hover:bg-red-600 disabled:opacity-50"
          >
            {isPending ? 'Removing…' : 'Remove'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
