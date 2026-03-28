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
      <div className="flex items-center gap-2.5 font-medium">
        <Link href="/" className="flex items-center gap-2">
          <StorychainLogo size="xl" className="w-auto" />
          {/* <img
            src="https://res.cloudinary.com/dpji4qfnu/image/upload/v1774158510/storychain-logo-raw-removebg-preview_mhethr.png"
            alt=""
          /> */}
        </Link>
      </div>

      <nav className="flex items-center gap-2 text-sm">
        {isSignedIn ? (
          <>
            <Button
              variant="ghost"
              className="font-ibm-plex-mono font-semibold hover:bg-white/10"
              asChild
            >
              <Link href="/dashboard" className="flex items-center gap-2">
                <LayoutDashboard size={16} />
                Dashboard
              </Link>
            </Button>
            <Button
              variant="ghost"
              className="font-ibm-plex-mono font-semibold hover:bg-white/10"
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
            <Button variant="link" className="font-ibm-plex-mono font-semibold" asChild>
              <Link href="/sign-in">Login</Link>
            </Button>
            <Button variant="link" className="font-ibm-plex-mono font-semibold" asChild>
              <Link href="/sign-up">Sign up</Link>
            </Button>
          </>
        )}
      </nav>
    </motion.header>
  );
};
