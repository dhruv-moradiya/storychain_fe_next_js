import { DashboardTabs } from '@/components/dashboard';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-bg-cream relative mx-auto min-h-screen w-full space-y-8">
      <DashboardTabs />
      <div className="container mx-auto">{children}</div>
    </div>
  );
}
