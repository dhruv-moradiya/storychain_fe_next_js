'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { LayoutDashboard, Compass } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { fadeIn } from '@/lib/utils';

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
        <motion.span
          className="h-3 w-3 rounded-full bg-pink-500"
          animate={{
            boxShadow: [
              '0 0 12px rgba(236,72,153,0.7)',
              '0 0 20px rgba(236,72,153,0.9)',
              '0 0 12px rgba(236,72,153,0.7)',
            ],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        Story Chain
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
              <Link href="/explore" className="flex items-center gap-2">
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
