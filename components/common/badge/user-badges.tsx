import { PlatformRole } from '@/type/user/user-enum';

import type { BadgeColorKey, BadgeConfig } from './types';
import { textBadge } from './utils';

// ============================================
// PLATFORM ROLE BADGES
// ============================================

export const PLATFORM_ROLE_COLORS: Record<string, BadgeColorKey> = {
  [PlatformRole.SUPER_ADMIN]: 'purple',
  [PlatformRole.PLATFORM_MODERATOR]: 'blue',
  [PlatformRole.APPEAL_MODERATOR]: 'amber',
  [PlatformRole.USER]: 'emerald',
};

export const PLATFORM_ROLE_LABELS: Record<string, string> = {
  [PlatformRole.SUPER_ADMIN]: 'Super Admin',
  [PlatformRole.PLATFORM_MODERATOR]: 'Platform Moderator',
  [PlatformRole.APPEAL_MODERATOR]: 'Appeal Moderator',
  [PlatformRole.USER]: 'User',
};

export function platformRoleBadge(
  role: PlatformRole | string,
  options?: Partial<BadgeConfig>
): React.ReactElement {
  const roleKey = (role as PlatformRole) || PlatformRole.USER;
  const label = PLATFORM_ROLE_LABELS[roleKey] || String(role);
  const color = PLATFORM_ROLE_COLORS[roleKey] || 'gray';

  return textBadge(label, color, {
    size: 'sm',
    shape: 'pill',
    style: 'soft',
    ...options,
  });
}
