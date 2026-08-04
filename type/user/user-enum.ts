export enum AuthProvider {
  EMAIL = 'email',
  GOOGLE = 'google',
  GITHUB = 'github',
  DISCORD = 'discord',
}

export const AUTH_PROVIDER = ['email', 'google', 'github', 'discord'] as const;

export const CONNECTED_ACCOUNTS: readonly AuthProvider[] = [
  AuthProvider.GOOGLE,
  AuthProvider.GITHUB,
  AuthProvider.DISCORD,
] as const;

enum PlatformRole {
  SUPER_ADMIN = 'SUPER_ADMIN',
  PLATFORM_MODERATOR = 'PLATFORM_MODERATOR',
  APPEAL_MODERATOR = 'APPEAL_MODERATOR',
  USER = 'USER',
}

const PLATFORM_ROLE_HIERARCHY: PlatformRole[] = [
  PlatformRole.USER,
  PlatformRole.APPEAL_MODERATOR,
  PlatformRole.PLATFORM_MODERATOR,
  PlatformRole.SUPER_ADMIN,
];

export const PLATFORM_ROLES = {
  SUPER_ADMIN: {
    canBanUsers: true,
    canUnbanUsers: true,
    canViewAllReports: true,
    canDeleteAnyContent: true,
    canReviewAppeals: true,
    canApproveAppeals: true,
    canRejectAppeals: true,
    canEscalateAppeals: true,
    canManageRoles: true,
    canAssignModerators: true,
    canAccessAdminPanel: true,
    canViewPlatformAnalytics: true,
    canManageSettings: true,
    canManageFeaturedContent: true,
  },

  PLATFORM_MODERATOR: {
    canBanUsers: true,
    canUnbanUsers: false,
    canViewAllReports: true,
    canDeleteAnyContent: true,
    canReviewAppeals: true,
    canApproveAppeals: false,
    canRejectAppeals: true,
    canEscalateAppeals: true,
    canManageRoles: false,
    canAssignModerators: false,
    canAccessAdminPanel: true,
    canViewPlatformAnalytics: false,
    canManageSettings: false,
    canManageFeaturedContent: false,
  },

  APPEAL_MODERATOR: {
    canBanUsers: false,
    canUnbanUsers: true,
    canViewAllReports: true,
    canDeleteAnyContent: false,
    canReviewAppeals: true,
    canApproveAppeals: true,
    canRejectAppeals: true,
    canEscalateAppeals: true,
    canManageRoles: false,
    canAssignModerators: false,
    canAccessAdminPanel: true,
    canViewPlatformAnalytics: false,
    canManageSettings: false,
    canManageFeaturedContent: false,
  },

  USER: {
    canBanUsers: false,
    canUnbanUsers: false,
    canViewAllReports: false,
    canDeleteAnyContent: false,
    canReviewAppeals: false,
    canApproveAppeals: false,
    canRejectAppeals: false,
    canEscalateAppeals: false,
    canManageRoles: false,
    canAssignModerators: false,
    canAccessAdminPanel: false,
    canViewPlatformAnalytics: false,
    canManageSettings: false,
    canManageFeaturedContent: false,
  },
} as const;

export enum BanType {
  TEMPORARY = 'TEMPORARY',
  PERMANENT = 'PERMANENT',
}

export const BAN_TYPES = [BanType.TEMPORARY, BanType.PERMANENT] as const;

export { PlatformRole, PLATFORM_ROLE_HIERARCHY };
