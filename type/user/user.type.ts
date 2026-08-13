import { PLATFORM_ROLES, PlatformRole } from './user-enum';

type TPlatformRole = keyof typeof PlatformRole;

type TPlatformRoles = typeof PLATFORM_ROLES;

type TPlatformRoleKey = keyof TPlatformRoles;

type TPermissionKey = keyof TPlatformRoles['SUPER_ADMIN'];

type TRolePermissions = {
  [K in TPermissionKey]: boolean;
};

type UserRole = TPlatformRoleKey;

interface IUserPreviewWithEmail {
  clerkId: string;
  username: string;
  avatarUrl: string;
  email: string;
}

// HELPER METHODS
const hasPermission = (role: UserRole, permission: TPermissionKey): boolean => {
  return PLATFORM_ROLES[role][permission];
};

const getRolePermissions = (role: UserRole): TRolePermissions => {
  return PLATFORM_ROLES[role];
};

export { hasPermission, getRolePermissions, PlatformRole };
export type {
  IUserPreviewWithEmail,
  TPlatformRole,
  TPlatformRoles,
  TPlatformRoleKey,
  TPermissionKey,
  TRolePermissions,
  UserRole,
};
