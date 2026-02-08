import Navbar from '@/components/common/navbar';

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <div className="bg-bg-cream pt-16">{children}</div>
    </>
  );
}
