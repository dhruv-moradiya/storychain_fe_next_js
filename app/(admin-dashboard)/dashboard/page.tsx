import { DashboardHeader } from '@/components/admin-dashboard/dashboard/header';
import { DashboardStats } from '@/components/admin-dashboard/dashboard/stats';
import { UsersTable } from '@/components/admin-dashboard/users-table/users-table';

export default function DashboardPage() {
  return (
    <div className="w-full bg-transparent">
      <DashboardHeader />
      <DashboardStats />
      <UsersTable />
    </div>
  );
}
