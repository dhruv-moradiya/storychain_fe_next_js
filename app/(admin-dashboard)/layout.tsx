import { PlatformRole } from '@/type/user/user-enum';

import Navbar from '@/components/common/navbar';
import { RoleGuard } from '@/components/providers/role-guard';

export default function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <RoleGuard allowedRoles={[PlatformRole.SUPER_ADMIN]}>
      <Navbar />
      <div className="bg-bg-cream pt-16">{children}</div>
    </RoleGuard>
  );
}
