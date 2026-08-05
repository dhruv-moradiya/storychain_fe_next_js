'use client';

import React from 'react';

import { useAuth, useClerk } from '@clerk/nextjs';
import { AlertTriangle, Calendar, Clock, LogOut, ShieldAlert, User } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useMe } from '@/services/users/user.query';

interface BannedUserGuardProps {
  children: React.ReactNode;
}

export function BannedUserGuard({ children }: BannedUserGuardProps) {
  const { isSignedIn } = useAuth();
  const { signOut } = useClerk();
  const { data } = useMe();

  const user = data?.data;
  const isBanned = Boolean(isSignedIn && user?.isBanned);
  const banDetails = user?.isBanned ? user.banDetails : null;

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    try {
      return new Date(dateString).toLocaleString(undefined, {
        dateStyle: 'medium',
        timeStyle: 'short',
      });
    } catch {
      return dateString;
    }
  };

  return (
    <>
      {isBanned && banDetails ? (
        <Dialog open={true} onOpenChange={() => {}}>
          <DialogContent
            showCloseButton={false}
            onEscapeKeyDown={(e) => e.preventDefault()}
            onPointerDownOutside={(e) => e.preventDefault()}
            className="border-destructive/30 bg-background/95 backdrop-blur-xl sm:max-w-lg"
          >
            <DialogHeader className="items-center text-center sm:text-center">
              <div className="bg-destructive/15 border-destructive/30 text-destructive mb-2 flex size-14 items-center justify-center rounded-full border shadow-sm">
                <ShieldAlert className="size-8" />
              </div>
              <DialogTitle className="text-destructive text-2xl font-bold tracking-tight">
                Account Banned
              </DialogTitle>
              <DialogDescription className="text-muted-foreground text-sm">
                Your account has been globally banned from accessing the platform.
              </DialogDescription>
            </DialogHeader>

            <div className="my-2 space-y-4">
              {/* Reason Callout Box */}
              <div className="bg-destructive/10 border-destructive/20 text-destructive-foreground rounded-lg border p-3.5 shadow-xs">
                <div className="flex items-start gap-2.5">
                  <AlertTriangle className="text-destructive mt-0.5 size-4 shrink-0" />
                  <div className="space-y-1">
                    <p className="text-destructive text-xs font-semibold tracking-wider uppercase">
                      Reason for Ban
                    </p>
                    <p className="text-sm leading-relaxed font-medium">
                      {banDetails.reason || 'No specific reason provided.'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Ban Details Metadata Card */}
              <div className="bg-muted/40 border-border/60 space-y-3 rounded-xl border p-4 text-sm">
                {/* Ban Type */}
                <div className="border-border/40 flex items-center justify-between border-b pb-2.5">
                  <span className="text-muted-foreground text-xs font-medium">Ban Type</span>
                  <Badge variant={banDetails.banType === 'PERMANENT' ? 'destructive' : 'outline'}>
                    {banDetails.banType === 'PERMANENT' ? 'Permanent Ban' : 'Temporary Ban'}
                  </Badge>
                </div>

                {/* Issued By */}
                <div className="border-border/40 flex items-center justify-between border-b pb-2.5">
                  <span className="text-muted-foreground flex items-center gap-1.5 text-xs font-medium">
                    <User className="size-3.5" />
                    Issued By
                  </span>
                  <div className="flex items-center gap-2">
                    <Avatar className="size-5">
                      <AvatarImage
                        src={banDetails.bannedBy?.avatarUrl}
                        alt={banDetails.bannedBy?.username || 'Moderator'}
                      />
                      <AvatarFallback className="text-[10px]">
                        {banDetails.bannedBy?.username?.slice(0, 2)?.toUpperCase() || 'MOD'}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-xs font-semibold">
                      @{banDetails.bannedBy?.username || 'Moderator'}
                    </span>
                  </div>
                </div>

                {/* Date Banned */}
                <div className="border-border/40 flex items-center justify-between border-b pb-2.5">
                  <span className="text-muted-foreground flex items-center gap-1.5 text-xs font-medium">
                    <Calendar className="size-3.5" />
                    Date Issued
                  </span>
                  <span className="font-mono text-xs">{formatDate(banDetails.createdAt)}</span>
                </div>

                {/* Duration / Expiration */}
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground flex items-center gap-1.5 text-xs font-medium">
                    <Clock className="size-3.5" />
                    {banDetails.banType === 'PERMANENT' ? 'Duration' : 'Expires At'}
                  </span>
                  <span className="font-mono text-xs font-medium">
                    {banDetails.banType === 'PERMANENT'
                      ? 'Indefinite'
                      : `${banDetails.durationDays ? banDetails.durationDays + ' days (' : ''}${formatDate(banDetails.expiresAt)}${banDetails.durationDays ? ')' : ''}`}
                  </span>
                </div>
              </div>
            </div>

            <DialogFooter className="flex-col gap-2 sm:flex-col sm:justify-stretch">
              <Button
                variant="destructive"
                className="w-full cursor-pointer gap-2 font-semibold shadow-xs"
                onClick={() => signOut({ redirectUrl: '/sign-in' })}
              >
                <LogOut className="size-4" />
                Sign Out / Switch Account
              </Button>
              <p className="text-muted-foreground text-center text-xs">
                If you believe this ban is an error, please contact platform support.
              </p>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      ) : (
        children
      )}
    </>
  );
}
