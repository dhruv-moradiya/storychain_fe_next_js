import Navbar from '@/components/common/navbar';

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  console.log('Protected Layout');
  return (
    <>
      <Navbar />
      <div className="pt-16">{children}</div>
    </>
  );
}
