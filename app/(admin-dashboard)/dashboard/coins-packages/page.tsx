import { CoinsHeader } from '@/components/admin-dashboard/coins-packages/coins-header';
import { CoinsPackagesView } from '@/components/admin-dashboard/coins-packages/coins-packages-view';
import { CoinsStats } from '@/components/admin-dashboard/coins-packages/coins-stats';

export default function CoinsPage() {
  return (
    <div className="w-full space-y-6 bg-transparent p-4">
      <CoinsHeader />
      <CoinsStats />
      <CoinsPackagesView />
    </div>
  );
}
