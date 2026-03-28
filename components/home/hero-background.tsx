'use client';

import { motion } from 'framer-motion';

export function HeroBackground() {
  return (
    <>
      {/* Dot grid — very subtle */}
      <div className="bg-grid-pattern pointer-events-none absolute inset-0 z-0" />

      {/* Layered radial gradients */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        {/* Top-left — large pink bloom */}
        <motion.div
          className="bg-radial-pink-bloom absolute -top-40 -left-40 h-[600px] w-[600px] rounded-full blur-[140px]"
          animate={{ scale: [1, 1.08, 1], opacity: [1, 0.8, 1] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Top-right — soft indigo/blue */}
        <motion.div
          className="bg-radial-indigo-soft absolute -top-32 -right-40 h-[560px] w-[560px] rounded-full blur-[130px]"
          animate={{ scale: [1, 1.1, 1], opacity: [1, 0.75, 1] }}
          transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
        />

        {/* Center-top — wide lavender wash */}
        <motion.div
          className="bg-radial-lavender-wash absolute -top-20 left-1/2 h-[420px] w-[700px] -translate-x-1/2 rounded-full blur-[110px]"
          animate={{ scale: [1, 1.06, 1], opacity: [1, 0.7, 1] }}
          transition={{ duration: 13, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        />

        {/* Mid-left — warm peach accent */}
        <motion.div
          className="bg-radial-peach-accent absolute top-1/2 -left-28 h-[380px] w-[380px] -translate-y-1/2 rounded-full blur-[100px]"
          animate={{ scale: [1, 1.12, 1], opacity: [1, 0.65, 1] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
        />
      </div>
    </>
  );
}
