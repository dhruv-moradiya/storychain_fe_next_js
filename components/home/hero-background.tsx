'use client';

import { motion } from 'framer-motion';

export function HeroBackground() {
  return (
    <div className="bg-bg-cream pointer-events-none absolute inset-0 z-0 overflow-hidden transition-colors duration-300 dark:bg-[#0B0B0D]">
      {/* 1. Base Layer */}
      <div className="bg-bg-cream absolute inset-0 transition-colors duration-300 dark:bg-[#0B0B0D]" />

      {/* 2. Soft Radial Light directly behind the headline */}
      {/* Light Mode Radial Light */}
      <motion.div
        className="absolute top-1/3 left-1/2 h-[520px] w-[780px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-70 blur-[110px] dark:hidden"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(236, 72, 153, 0.14) 0%, rgba(245, 158, 11, 0.1) 40%, rgba(139, 92, 246, 0.07) 70%, transparent 85%)',
        }}
        animate={{ scale: [1, 1.05, 1], opacity: [0.65, 0.78, 0.65] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Dark Mode Radial Light */}
      <motion.div
        className="absolute top-1/3 left-1/2 hidden h-[500px] w-[750px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-60 blur-[130px] dark:block"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(139, 92, 246, 0.35) 0%, rgba(236, 72, 153, 0.15) 50%, transparent 80%)',
        }}
        animate={{ scale: [1, 1.05, 1], opacity: [0.55, 0.65, 0.55] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* 3. Subtle Warm Orange Corner Highlight (Top-Right) */}
      <motion.div
        className="absolute -top-32 -right-32 h-[450px] w-[450px] rounded-full opacity-25 blur-[110px] dark:opacity-30"
        style={{
          background: 'radial-gradient(circle, rgba(245, 158, 11, 0.22) 0%, transparent 70%)',
        }}
        animate={{ scale: [1, 1.08, 1], opacity: [0.2, 0.3, 0.2] }}
        transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      />

      {/* 4. Soft Purple Ambient Corner Glow (Bottom-Left) */}
      <motion.div
        className="absolute -bottom-32 -left-32 h-[500px] w-[500px] rounded-full opacity-25 blur-[120px] dark:opacity-30"
        style={{
          background: 'radial-gradient(circle, rgba(107, 33, 168, 0.25) 0%, transparent 70%)',
        }}
        animate={{ scale: [1, 1.06, 1], opacity: [0.2, 0.3, 0.2] }}
        transition={{ duration: 13, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />

      {/* 5. Smooth Vignette around edges */}
      <div
        className="absolute inset-0 dark:hidden"
        style={{
          background:
            'radial-gradient(circle at center, transparent 40%, rgba(250, 247, 242, 0.75) 80%, var(--bg-cream) 100%)',
        }}
      />
      <div
        className="absolute inset-0 hidden dark:block"
        style={{
          background:
            'radial-gradient(circle at center, transparent 35%, rgba(11, 11, 13, 0.8) 75%, #0B0B0D 100%)',
        }}
      />

      {/* 6. Exact Fine Grain / Noise Overlay */}
      {/* Dark Mode Grain Overlay */}
      <svg className="pointer-events-none absolute inset-0 hidden h-full w-full opacity-40 mix-blend-overlay dark:block">
        <filter id="coarse-spray-stipple-grain-dark">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.8"
            numOctaves="4"
            stitchTiles="stitch"
          />
          <feColorMatrix
            type="matrix"
            values="
              2 0 0 0 -0.4
              0 2 0 0 -0.4
              0 0 2 0 -0.4
              0 0 0 1 0"
          />
          <feComponentTransfer>
            <feFuncR type="linear" slope="1.3" />
            <feFuncG type="linear" slope="1.3" />
            <feFuncB type="linear" slope="1.3" />
          </feComponentTransfer>
        </filter>
        <rect width="100%" height="100%" filter="url(#coarse-spray-stipple-grain-dark)" />
      </svg>

      {/* Light Mode Tactile Paper Grain Overlay */}
      <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-20 mix-blend-multiply dark:hidden">
        <filter id="tactile-paper-grain-light">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.75"
            numOctaves="3"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
          <feComponentTransfer>
            <feFuncR type="linear" slope="1.2" />
            <feFuncG type="linear" slope="1.2" />
            <feFuncB type="linear" slope="1.2" />
          </feComponentTransfer>
        </filter>
        <rect width="100%" height="100%" filter="url(#tactile-paper-grain-light)" />
      </svg>

      {/* 7. Bottom Fade transition into next section */}
      <div
        className="absolute inset-x-0 bottom-0 h-32"
        style={{
          background: 'linear-gradient(to bottom, transparent, var(--bg-cream))',
        }}
      />
    </div>
  );
}
