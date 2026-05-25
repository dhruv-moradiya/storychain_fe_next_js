import { PlatformRole } from '@/type/user/user-enum';

import { DashboardSidebar } from '@/components/admin-dashboard/sidebar/dashboard-sidebar';
import { RoleGuard } from '@/components/providers/role-guard';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';

export default function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <RoleGuard allowedRoles={[PlatformRole.SUPER_ADMIN]}>
      <SidebarProvider>
        <DashboardSidebar />
        <main className="w-full">
          <div className="border-border border-b p-4">
            <SidebarTrigger />
          </div>
          {children}
        </main>
      </SidebarProvider>
    </RoleGuard>
  );
}
