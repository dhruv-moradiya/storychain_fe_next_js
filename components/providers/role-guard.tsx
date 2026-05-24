'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { PlatformRole } from '@/type/user/user-enum';

import { getDefaultRouteForRole } from '@/lib/role-config';
import { useMe } from '@/services/users/user.query';

interface RoleGuardProps {
  allowedRoles: PlatformRole[];
  children: React.ReactNode;
}

/**
 * Client-side authorization guard.
 * Wraps children and only renders them if the current user's role
 * is in the allowedRoles list. Redirects unauthorized users to their
 * default route.
 */
export function RoleGuard({ allowedRoles, children }: RoleGuardProps) {
  const router = useRouter();
  const { data, isLoading } = useMe();

  const userRole = data?.data?.role;
  const isAuthorized = userRole && allowedRoles.includes(userRole);

  useEffect(() => {
    // Only redirect once we have the role data and know the user is unauthorized
    if (!isLoading && userRole && !allowedRoles.includes(userRole)) {
      const redirectTo = getDefaultRouteForRole(userRole);
      router.replace(redirectTo);
    }
  }, [isLoading, userRole, allowedRoles, router]);

  // Show nothing while loading or redirecting unauthorized users
  if (isLoading || !isAuthorized) {
    return null;
  }

  return <>{children}</>;
}
