import { auth } from '@clerk/nextjs/server';
import dynamic from 'next/dynamic';

// Lazy load ALL client components to maintain server/client boundary
const Navbar = dynamic(() => import('@/components/home/navbar').then((mod) => mod.Navbar), {
  ssr: true,
});
const ScrollProgress = dynamic(
  () => import('@/components/home/scroll-progress').then((mod) => mod.ScrollProgress),
  { ssr: true }
);

const HeroSection = dynamic(
  () => import('@/components/home/hero-section').then((mod) => mod.HeroSection),
  { ssr: true }
);

const FloatingParticles = dynamic(
  () => import('@/components/home/floating-particles').then((mod) => mod.FloatingParticles),
  { ssr: true }
);

const NotJustAnAppSection = dynamic(
  () => import('@/components/home/not-just-an-app-section').then((mod) => mod.NotJustAnAppSection),
  { ssr: true }
);

const FeaturesGridSection = dynamic(
  () => import('@/components/home/features-grid-section').then((mod) => mod.FeaturesGridSection),
  { ssr: true }
);

// Lazy load below-fold sections to reduce initial bundle size
const OwnershipSection = dynamic(
  () => import('@/components/home/ownership-section').then((mod) => mod.OwnershipSection),
  { ssr: true }
);

const TestimonialsSection = dynamic(
  () => import('@/components/home/testimonials-section').then((mod) => mod.TestimonialsSection),
  { ssr: true }
);

const CreatorToolsSection = dynamic(
  () => import('@/components/home/creator-tools-section').then((mod) => mod.CreatorToolsSection),
  { ssr: true }
);

const TeamworkSection = dynamic(
  () => import('@/components/home/teamwork-section').then((mod) => mod.TeamworkSection),
  { ssr: true }
);

const DarkCtaSection = dynamic(
  () => import('@/components/home/dark-cta-section').then((mod) => mod.DarkCtaSection),
  { ssr: true }
);

const FinalVisionSection = dynamic(
  () => import('@/components/home/final-vision-section').then((mod) => mod.FinalVisionSection),
  { ssr: true }
);

const FooterSection = dynamic(
  () => import('@/components/home/footer-section').then((mod) => mod.FooterSection),
  { ssr: true }
);

const ToastDemo = dynamic(
  () => import('@/components/shared/toast/toast-demo').then((mod) => mod.ToastDemo),
  { ssr: true }
);

export default async function HomePage() {
  const { userId } = await auth();
  const isSignedIn = !!userId;

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Scroll Progress Indicator */}
      <ScrollProgress />

      {/* Background decoration */}
      <div
        className="absolute inset-0 -z-10 h-screen w-full bg-linear-to-b"
        style={{
          backgroundImage:
            'linear-gradient(to bottom, var(--hero-gradient-from), var(--hero-gradient-via1), var(--hero-gradient-via2), var(--hero-gradient-via3), var(--hero-gradient-to))',
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 -z-10 mix-blend-soft-light"
        style={{ backgroundColor: 'var(--hero-overlay-white10)' }}
      />
      <div
        className="pointer-events-none absolute inset-0 -z-10 mix-blend-screen"
        style={{ backgroundColor: 'var(--hero-overlay-purple5)' }}
      />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-linear-to-b from-white/5 via-transparent to-transparent" />

      {/* Floating Gradient Orbs */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute top-32 left-1/4 h-64 w-64 animate-pulse rounded-full opacity-25 blur-3xl"
          style={{
            background: 'radial-gradient(circle, var(--hero-gradient-via1) 0%, transparent 70%)',
          }}
        />
        <div
          className="absolute top-48 right-1/4 h-48 w-48 animate-pulse rounded-full opacity-20 blur-3xl"
          style={{
            background: 'radial-gradient(circle, var(--hero-gradient-via2) 0%, transparent 70%)',
          }}
        />
        <div
          className="absolute top-64 left-1/3 h-32 w-32 animate-pulse rounded-full opacity-30 blur-2xl"
          style={{
            background: 'radial-gradient(circle, var(--brand-pink-400) 0%, transparent 70%)',
          }}
        />
      </div>

      {/* Hero floating particles - optimized count */}
      <FloatingParticles count={20} color="rgba(255,255,255,0.6)" />

      <Navbar isSignedIn={isSignedIn} />

      <HeroSection isSignedIn={isSignedIn} />

      {/* SECTION BLEND TO CREAM */}
      <section className="relative z-10 h-24 w-full overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to bottom, transparent, var(--cream-50), var(--bg-cream))',
          }}
        />
      </section>

      <NotJustAnAppSection />

      <FeaturesGridSection />

      {/* Below-fold sections: lazy loaded */}
      <OwnershipSection />

      <TestimonialsSection />

      <CreatorToolsSection />

      <TeamworkSection />

      <DarkCtaSection />

      <FinalVisionSection />

      <FooterSection />

      {/* TODO: Remove this demo component after verification */}
      <ToastDemo />
    </div>
  );
}
