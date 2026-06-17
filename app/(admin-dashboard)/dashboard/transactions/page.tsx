import { type StatItem, TransactionStats } from '@/components/admin-dashboard/transactions/stats';
import { TransactionTable } from '@/components/admin-dashboard/transactions/table';
import { ContentLayout, DashboardSection } from '@/components/dashboard';

const stats: StatItem[] = [
  {
    title: 'Total Transactions',
    value: '12,458',
    trend: '18.6%',
    trendType: 'up',
    icon: 'receipt',
    iconBg: 'bg-purple-500/10 dark:bg-purple-500/15',
    iconColor: 'text-purple-500 dark:text-purple-400',
    blurFrom: 'from-purple-500/10',
    blurTo: 'to-indigo-500/10',
  },
  {
    title: 'Total Amount',
    value: '₹24,58,680',
    trend: '16.2%',
    trendType: 'up',
    icon: 'wallet',
    iconBg: 'bg-emerald-500/10 dark:bg-emerald-500/15',
    iconColor: 'text-emerald-500 dark:text-emerald-400',
    blurFrom: 'from-emerald-500/10',
    blurTo: 'to-teal-500/10',
  },
  {
    title: 'Coins Purchased',
    value: '1,25,680',
    trend: '14.8%',
    trendType: 'up',
    icon: 'coins',
    iconBg: 'bg-orange-500/10 dark:bg-orange-500/15',
    iconColor: 'text-orange-500 dark:text-orange-400',
    blurFrom: 'from-orange-500/10',
    blurTo: 'to-amber-500/10',
  },
  {
    title: 'Coins Spent',
    value: '95,420',
    trend: '11.3%',
    trendType: 'up',
    icon: 'lock',
    iconBg: 'bg-pink-500/10 dark:bg-pink-500/15',
    iconColor: 'text-pink-500 dark:text-pink-400',
    blurFrom: 'from-pink-500/10',
    blurTo: 'to-rose-500/10',
  },
  {
    title: 'Refunds',
    value: '₹18,750',
    trend: '4.2%',
    trendType: 'down',
    icon: 'refresh',
    iconBg: 'bg-blue-500/10 dark:bg-blue-500/15',
    iconColor: 'text-blue-500 dark:text-blue-400',
    blurFrom: 'from-blue-500/10',
    blurTo: 'to-cyan-500/10',
  },
];

export default function Page() {
  return (
    <ContentLayout maxWidth="9xl" centered={true} className="w-full space-y-6">
      <DashboardSection>
        <div className="flex flex-col gap-1">
          <h1 className="text-text-primary text-xl font-bold tracking-tight sm:text-2xl">
            Transactions
          </h1>
          <p className="text-text-secondary-65 text-xs font-normal sm:text-sm">
            Manage and view all transactions made in the platform
          </p>
        </div>
      </DashboardSection>

      <DashboardSection>
        <TransactionStats stats={stats} />
      </DashboardSection>

      <DashboardSection>
        <TransactionTable />
      </DashboardSection>
    </ContentLayout>
  );
}
