import { AdminSection } from '@/components/profile/admin-section';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <AdminSection>{children}</AdminSection>;
}
