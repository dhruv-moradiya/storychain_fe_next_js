import { PlatformRole } from '@/type/user/user-enum';

import Navbar from '@/components/common/navbar';
import { RoleGuard } from '@/components/providers/role-guard';

export default function PlatformModeratorLayout({ children }: { children: React.ReactNode }) {
  return (
    <RoleGuard allowedRoles={[PlatformRole.SUPER_ADMIN, PlatformRole.PLATFORM_MODERATOR]}>
      <Navbar />
      <div className="bg-bg-cream pt-16">{children}</div>
    </RoleGuard>
  );
}
