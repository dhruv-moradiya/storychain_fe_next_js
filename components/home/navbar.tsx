'use client';

import Link from 'next/link';

import { motion } from 'framer-motion';
import { Compass, LayoutDashboard } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { fadeIn } from '@/lib/utils';

import { StorychainLogo } from '../common/logo/storychain-logo';

interface INavbarProps {
  isSignedIn: boolean;
}

export const Navbar = ({ isSignedIn }: INavbarProps) => {
  return (
    <motion.header
      {...fadeIn(0)}
      className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-6 py-8"
    >
      <div className="flex items-center gap-2.5 font-medium text-white">
        <Link href="/" className="flex items-center gap-2">
          <StorychainLogo size="medium" className="h-9 w-auto text-white" />
        </Link>
      </div>

      <nav className="flex items-center gap-2 text-sm text-white/80">
        {isSignedIn ? (
          <>
            <Button
              variant="ghost"
              className="font-ibm-plex-mono font-semibold text-white/80 hover:bg-white/10 hover:text-white"
              asChild
            >
              <Link href="/dashboard" className="flex items-center gap-2">
                <LayoutDashboard size={16} />
                Dashboard
              </Link>
            </Button>
            <Button
              variant="ghost"
              className="font-ibm-plex-mono font-semibold text-white/80 hover:bg-white/10 hover:text-white"
              asChild
            >
              <Link href="/explore" className="item s-center flex gap-2">
                <Compass size={16} />
                Explore
              </Link>
            </Button>
          </>
        ) : (
          <>
            <Button
              variant="link"
              className="font-ibm-plex-mono font-semibold text-white/80 hover:text-white"
              asChild
            >
              <Link href="/sign-in">Login</Link>
            </Button>
            <Button
              variant="link"
              className="font-ibm-plex-mono font-semibold text-white/80 hover:text-white"
              asChild
            >
              <Link href="/sign-up">Sign up</Link>
            </Button>
          </>
        )}
      </nav>
    </motion.header>
  );
};
