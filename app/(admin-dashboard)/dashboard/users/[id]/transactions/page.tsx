import { UserTransactionsTable } from '@/components/admin-dashboard/user-detail/user-transactions-table';
import { ContentLayout } from '@/components/dashboard';

export default function UserTransactionsPage() {
  return (
    <ContentLayout maxWidth="9xl" centered={true} className="w-full space-y-6">
      <UserTransactionsTable />
    </ContentLayout>
  );
}
