import Navbar from '@/components/common/navbar';

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <div className="pt-16">{children}</div>
    </>
  );
}
