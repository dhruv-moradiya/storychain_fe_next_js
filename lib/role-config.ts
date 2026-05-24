import { PlatformRole } from '@/type/user/user-enum';

/**
 * Maps each role-protected route prefix to the roles allowed to access it.
 * SUPER_ADMIN is included in every entry since it has full access.
 */
export const ROLE_ROUTE_MAP: Record<string, PlatformRole[]> = {
  '/dashboard': [PlatformRole.SUPER_ADMIN],
  '/moderation': [PlatformRole.SUPER_ADMIN, PlatformRole.PLATFORM_MODERATOR],
  '/appeals': [PlatformRole.SUPER_ADMIN, PlatformRole.APPEAL_MODERATOR],
};

/** All route prefixes that require role-based authorization. */
export const ROLE_PROTECTED_PREFIXES = Object.keys(ROLE_ROUTE_MAP);

/**
 * Returns the default landing page for a given role.
 * Used for redirecting unauthorized users to their home route.
 */
export function getDefaultRouteForRole(role: PlatformRole): string {
  switch (role) {
    case PlatformRole.SUPER_ADMIN:
      return '/dashboard';
    case PlatformRole.PLATFORM_MODERATOR:
      return '/moderation';
    case PlatformRole.APPEAL_MODERATOR:
      return '/appeals';
    case PlatformRole.USER:
    default:
      return '/stories';
  }
}

/**
 * Checks whether a given pathname is allowed for the specified role.
 * - Role-protected routes are checked against ROLE_ROUTE_MAP.
 * - Non-role-protected routes (regular user routes) are accessible to all authenticated users.
 */
export function isRouteAllowedForRole(pathname: string, role: PlatformRole): boolean {
  for (const prefix of ROLE_PROTECTED_PREFIXES) {
    if (pathname.startsWith(prefix)) {
      const allowedRoles = ROLE_ROUTE_MAP[prefix];
      return allowedRoles.includes(role);
    }
  }

  // Non-role-protected routes are accessible to all authenticated users
  return true;
}
