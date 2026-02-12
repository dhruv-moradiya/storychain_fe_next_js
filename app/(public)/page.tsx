'use client';

import { useAuth } from '@clerk/nextjs';
import { motion } from 'framer-motion';
import { ScrollProgress } from '@/components/home/scroll-progress';
import { Navbar } from '@/components/home/navbar';
import { HeroSection } from '@/components/home/hero-section';
import { FloatingParticles } from '@/components/home/floating-particles';
import { NotJustAnAppSection } from '@/components/home/not-just-an-app-section';
import { FeaturesGridSection } from '@/components/home/features-grid-section';
import { OwnershipSection } from '@/components/home/ownership-section';
import { TestimonialsSection } from '@/components/home/testimonials-section';
import { CreatorToolsSection } from '@/components/home/creator-tools-section';
import { TeamworkSection } from '@/components/home/teamwork-section';
import { DarkCtaSection } from '@/components/home/dark-cta-section';
import { FinalVisionSection } from '@/components/home/final-vision-section';
import { FooterSection } from '@/components/home/footer-section';
import { ToastDemo } from '@/components/shared/toast/toast-demo';

export default function HomePage() {
  const { isSignedIn } = useAuth();

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Scroll Progress Indicator */}
      <ScrollProgress />

      {/* Background decoration */}
      <div
        className="absolute inset-0 -z-10 h-screen w-full bg-gradient-to-b"
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
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-white/5 via-transparent to-transparent" />

      {/* Floating Gradient Orbs */}
      <motion.div
        className="pointer-events-none absolute top-32 left-1/4 h-64 w-64 rounded-full opacity-25 blur-3xl"
        style={{
          background: 'radial-gradient(circle, var(--hero-gradient-via1) 0%, transparent 70%)',
        }}
      />
      <motion.div
        className="pointer-events-none absolute top-48 right-1/4 h-48 w-48 rounded-full opacity-20 blur-3xl"
        style={{
          background: 'radial-gradient(circle, var(--hero-gradient-via2) 0%, transparent 70%)',
        }}
      />
      <motion.div
        className="pointer-events-none absolute top-64 left-1/3 h-32 w-32 rounded-full opacity-30 blur-2xl"
        style={{
          background: 'radial-gradient(circle, var(--brand-pink-400) 0%, transparent 70%)',
        }}
      />

      {/* Hero floating particles */}
      <FloatingParticles count={30} color="rgba(255,255,255,0.6)" />

      <Navbar isSignedIn={!!isSignedIn} />

      <HeroSection isSignedIn={!!isSignedIn} />

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
