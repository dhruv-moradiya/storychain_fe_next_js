'use client';

import { useEffect, useRef, useState } from 'react';

import { motion } from 'framer-motion';
import {
  BookOpen,
  BookText,
  ChevronRight,
  Coins,
  HelpCircle,
  PenTool,
  Share2,
  Smartphone,
  TrendingUp,
  Users,
} from 'lucide-react';

import { cn } from '@/lib/utils';

const tocItems = [
  { id: 'getting-started', label: 'Getting Started', icon: BookOpen },
  { id: 'collaboration', label: 'Collaboration & Roles', icon: Users },
  { id: 'monetization', label: 'In-App Monetization', icon: Coins },
  { id: 'distribution', label: 'Revenue Distribution', icon: TrendingUp },
  { id: 'writing-editing', label: 'Writing & Editing', icon: PenTool },
  { id: 'reading', label: 'Reading Experience', icon: BookText },
  { id: 'profile-settings', label: 'Profile & Settings', icon: Smartphone },
  { id: 'faq', label: 'FAQ', icon: HelpCircle },
];

interface DocLayoutProps {
  children: React.ReactNode;
}

export function DocLayout({ children }: DocLayoutProps) {
  const [activeId, setActiveId] = useState<string>('getting-started');
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      // find the topmost visible section
      const visible = entries
        .filter((e) => e.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
      if (visible.length > 0) {
        setActiveId(visible[0].target.id);
      }
    };

    observerRef.current = new IntersectionObserver(handleIntersect, {
      rootMargin: '-10% 0px -70% 0px',
      threshold: 0,
    });

    tocItems.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observerRef.current?.observe(el);
    });

    return () => observerRef.current?.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveId(id);
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
      <div className="flex gap-8 lg:gap-12">
        {/* Sticky TOC Sidebar */}
        <aside className="hidden w-60 shrink-0 lg:block xl:w-64">
          <div className="sticky top-6 pt-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="border-border/40 bg-cream-95/80 rounded-2xl border p-4 backdrop-blur-sm"
            >
              {/* TOC Header */}
              <div className="mb-4 flex items-center gap-2">
                <div className="bg-brand-blue/10 flex h-6 w-6 items-center justify-center rounded-md">
                  <Share2 className="text-brand-blue h-3.5 w-3.5" />
                </div>
                <span className="text-text-secondary-65 text-xs font-semibold tracking-wider uppercase">
                  On This Page
                </span>
              </div>

              {/* TOC Items */}
              <nav className="space-y-0.5">
                {tocItems.map((item) => {
                  const isActive = activeId === item.id;
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => scrollTo(item.id)}
                      className={cn(
                        'group flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm transition-all duration-200',
                        isActive
                          ? 'bg-brand-blue/10 text-brand-blue font-medium'
                          : 'text-text-secondary-65 hover:bg-brand-blue/5 hover:text-brand-blue'
                      )}
                    >
                      <Icon
                        className={cn(
                          'h-3.5 w-3.5 shrink-0 transition-colors',
                          isActive
                            ? 'text-brand-blue'
                            : 'text-text-secondary-65/60 group-hover:text-brand-blue/70'
                        )}
                      />
                      <span className="flex-1 leading-snug">{item.label}</span>
                      {isActive && <ChevronRight className="text-brand-blue h-3 w-3 shrink-0" />}
                    </button>
                  );
                })}
              </nav>

              {/* Progress indicator */}
              <div className="border-border/30 mt-4 border-t pt-4">
                <div className="text-text-secondary-65/60 text-xs">
                  Section{' '}
                  <span className="text-brand-blue font-semibold">
                    {tocItems.findIndex((t) => t.id === activeId) + 1}
                  </span>{' '}
                  of {tocItems.length}
                </div>
                <div className="bg-border/30 mt-1.5 h-1 w-full rounded-full">
                  <motion.div
                    className="bg-brand-blue h-full rounded-full"
                    animate={{
                      width: `${((tocItems.findIndex((t) => t.id === activeId) + 1) / tocItems.length) * 100}%`,
                    }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="min-w-0 flex-1">{children}</main>
      </div>
    </div>
  );
}
