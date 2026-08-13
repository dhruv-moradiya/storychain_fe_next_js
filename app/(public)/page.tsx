import dynamic from 'next/dynamic';

import { auth } from '@clerk/nextjs/server';

// Lazy load ALL client components to maintain server/client boundary
const Navbar = dynamic(() => import('@/components/home/navbar').then((mod) => mod.Navbar), {
  ssr: true,
});
const ScrollProgress = dynamic(
  () => import('@/components/home/scroll-progress').then((mod) => mod.ScrollProgress),
  { ssr: true }
);

// const HeroSection = dynamic(
//   () => import('@/components/home/hero-section').then((mod) => mod.HeroSection),
//   { ssr: true }
// );

const NewHeroSection = dynamic(
  () => import('@/components/home/new-hero-section').then((mod) => mod.NewHeroSection),
  { ssr: true }
);

const HeroBackground = dynamic(
  () => import('@/components/home/hero-background').then((mod) => mod.HeroBackground),
  { ssr: true }
);

// FloatingParticles removed with old hero section

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

// const DarkCtaSection = dynamic(
//   () => import('@/components/home/dark-cta-section').then((mod) => mod.DarkCtaSection),
//   { ssr: true }
// );

const FinalVisionSection = dynamic(
  () => import('@/components/home/final-vision-section').then((mod) => mod.FinalVisionSection),
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
    <div className="bg-bg-cream relative min-h-screen overflow-hidden">
      {/* Scroll Progress Indicator */}
      <ScrollProgress />

      <div className="relative">
        <HeroBackground />

        <Navbar isSignedIn={isSignedIn} />

        {/* <HeroSection isSignedIn={isSignedIn} /> */}
        <NewHeroSection isSignedIn={isSignedIn} />
      </div>

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

      {/* <DarkCtaSection /> */}

      <FinalVisionSection />

      {/* TODO: Remove this demo component after verification */}
      <ToastDemo />
    </div>
  );
}
