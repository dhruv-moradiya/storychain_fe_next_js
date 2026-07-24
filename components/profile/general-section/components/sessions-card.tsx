'use client';

import { useEffect, useState } from 'react';

import { useAuth, useUser } from '@clerk/nextjs';
import type { SessionWithActivitiesResource } from '@clerk/shared/types/index';
import { formatDistanceToNow } from 'date-fns';
import { Monitor, Smartphone, Tablet } from 'lucide-react';

import toast from '@/components/shared/toast/toast';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

function getClerkErrorMessage(error: unknown): string {
  if (
    error &&
    typeof error === 'object' &&
    'errors' in error &&
    Array.isArray((error as { errors?: Array<{ longMessage?: string; message?: string }> }).errors)
  ) {
    const firstErr = (error as { errors: Array<{ longMessage?: string; message?: string }> })
      .errors[0];
    if (firstErr?.longMessage) return firstErr.longMessage;
    if (firstErr?.message) return firstErr.message;
  }
  if (
    error &&
    typeof error === 'object' &&
    'message' in error &&
    typeof (error as { message?: string }).message === 'string'
  ) {
    return (error as { message: string }).message;
  }
  return 'Failed to revoke session. Additional verification may be required.';
}

const getDeviceIcon = (session: SessionWithActivitiesResource) => {
  const deviceType = session.latestActivity?.deviceType?.toLowerCase();
  if (deviceType === 'mobile' || session.latestActivity?.isMobile) {
    return <Smartphone className="text-text-secondary-65 h-4 w-4" />;
  }
  if (deviceType === 'tablet') {
    return <Tablet className="text-text-secondary-65 h-4 w-4" />;
  }
  return <Monitor className="text-text-secondary-65 h-4 w-4" />;
};

const getDeviceName = (session: SessionWithActivitiesResource) => {
  const activity = session.latestActivity;
  if (!activity) return 'Unknown Device';

  const browser = activity.browserName
    ? `${activity.browserName}${activity.browserVersion ? ` ${activity.browserVersion}` : ''}`
    : 'Unknown Browser';

  const device = activity.deviceType
    ? activity.deviceType.charAt(0).toUpperCase() + activity.deviceType.slice(1)
    : activity.isMobile
      ? 'Mobile'
      : 'Desktop';

  return `${browser} on ${device}`;
};

const getLocation = (session: SessionWithActivitiesResource) => {
  const activity = session.latestActivity;
  if (!activity) return 'Unknown Location';
  return [activity.city, activity.country].filter(Boolean).join(', ') || 'Unknown Location';
};

export function SessionsCard() {
  const { user, isLoaded: isUserLoaded } = useUser();
  const { sessionId, isLoaded: isAuthLoaded } = useAuth();
  const [sessions, setSessions] = useState<SessionWithActivitiesResource[]>([]);
  const [loading, setLoading] = useState(true);
  const [revokingSessionIds, setRevokingSessionIds] = useState<string[]>([]);
  const [isRevokingAll, setIsRevokingAll] = useState(false);

  const handleLogoutDevice = async (id: string) => {
    if (revokingSessionIds.includes(id)) return;
    setRevokingSessionIds((prev) => [...prev, id]);
    try {
      const sessionToRevoke = sessions.find((s) => s.id === id);
      if (sessionToRevoke) {
        await sessionToRevoke.revoke();
        setSessions((prev) => prev.filter((s) => s.id !== id));
        toast.success('Session logged out successfully');
      }
    } catch (error) {
      console.error('Failed to revoke session:', error);
      toast.error(getClerkErrorMessage(error));
    } finally {
      setRevokingSessionIds((prev) => prev.filter((item) => item !== id));
    }
  };

  const handleLogoutAllOtherDevices = async () => {
    if (isRevokingAll) return;
    setIsRevokingAll(true);
    try {
      const otherSessions = sessions.filter((s) => s.id !== sessionId);
      const results = await Promise.allSettled(otherSessions.map((s) => s.revoke()));

      const revokedIds: string[] = [];
      let lastError: unknown = null;

      results.forEach((res, idx) => {
        if (res.status === 'fulfilled') {
          revokedIds.push(otherSessions[idx].id);
        } else {
          lastError = res.reason;
        }
      });

      if (revokedIds.length > 0) {
        setSessions((prev) => prev.filter((s) => s.id === sessionId || !revokedIds.includes(s.id)));
      }

      if (lastError) {
        toast.error(getClerkErrorMessage(lastError));
      } else if (revokedIds.length > 0) {
        toast.success('Logged out all other devices');
      }
    } catch (error) {
      console.error('Failed to revoke all other sessions:', error);
      toast.error(getClerkErrorMessage(error));
    } finally {
      setIsRevokingAll(false);
    }
  };

  useEffect(() => {
    let active = true;

    async function fetchSessions() {
      if (!user) {
        if (active) {
          setSessions([]);
          setLoading(false);
        }
        return;
      }

      try {
        const sessions = await user.getSessions();
        if (active) {
          setSessions(sessions);
        }
      } catch (error) {
        console.error('Failed to fetch sessions:', error);
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    if (isUserLoaded) {
      fetchSessions();
    }

    return () => {
      active = false;
    };
  }, [user, isUserLoaded]);

  const hasOtherSessions = sessions.some((s) => s.id !== sessionId);

  const isLoading = !isUserLoaded || !isAuthLoaded || loading;

  const revokingSet = new Set(revokingSessionIds);

  return (
    <div className="border-border/50 bg-cream-95 rounded-xl border p-5">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Monitor className="text-brand-pink-500 h-5 w-5" />
          <div>
            <h2 className="text-text-primary text-base font-semibold">Active Sessions</h2>
            <p className="text-text-secondary-65 text-sm">Devices logged into your account</p>
          </div>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={handleLogoutAllOtherDevices}
          disabled={isLoading || isRevokingAll || !hasOtherSessions}
        >
          {isRevokingAll ? 'Logging out...' : 'Log out other devices'}
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-text-secondary-65">Device</TableHead>
            <TableHead className="text-text-secondary-65">Last Active</TableHead>
            <TableHead className="text-text-secondary-65">Location</TableHead>
            <TableHead className="text-text-secondary-65 text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={4} className="text-text-secondary-65 h-24 text-center">
                <div className="flex items-center justify-center gap-2">
                  <div className="border-brand-pink-500 h-4 w-4 animate-spin rounded-full border-2 border-t-transparent" />
                  <span>Loading active sessions...</span>
                </div>
              </TableCell>
            </TableRow>
          ) : sessions.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-text-secondary-65 h-24 text-center">
                No active sessions found.
              </TableCell>
            </TableRow>
          ) : (
            sessions.map((session) => {
              const isCurrent = session.id === sessionId;
              const isRevoking = revokingSet.has(session.id);

              return (
                <TableRow key={session.id} className="hover:bg-muted/40 transition-colors">
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getDeviceIcon(session)}
                      <span className="text-text-primary">{getDeviceName(session)}</span>
                      {isCurrent && (
                        <Badge
                          variant="secondary"
                          className="bg-brand-pink-500/10 text-brand-pink-500"
                        >
                          Current
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-text-secondary-65">
                    {formatDistanceToNow(new Date(session.lastActiveAt), { addSuffix: true })}
                  </TableCell>
                  <TableCell className="text-text-secondary-65">{getLocation(session)}</TableCell>
                  <TableCell className="text-right">
                    {!isCurrent && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-destructive hover:bg-destructive/10"
                        onClick={() => handleLogoutDevice(session.id)}
                        disabled={isRevoking}
                      >
                        {isRevoking ? 'Logging out...' : 'Log out'}
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>
    </div>
  );
}
