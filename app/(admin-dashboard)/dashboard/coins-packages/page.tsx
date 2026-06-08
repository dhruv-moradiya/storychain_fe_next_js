import { CoinsHeader } from '@/components/admin-dashboard/coins-packages/coins-header';
import { CoinsPackagesView } from '@/components/admin-dashboard/coins-packages/coins-packages-view';
import { CoinsStats } from '@/components/admin-dashboard/coins-packages/coins-stats';
import { ContentLayout, DashboardSection } from '@/components/dashboard';

export default function CoinsPage() {
  return (
    <ContentLayout maxWidth="9xl" centered={true} className="w-full space-y-6">
      <DashboardSection>
        <CoinsHeader />
      </DashboardSection>

      <DashboardSection>
        <CoinsStats />
      </DashboardSection>

      <DashboardSection>
        <CoinsPackagesView />
      </DashboardSection>
    </ContentLayout>
  );
}
