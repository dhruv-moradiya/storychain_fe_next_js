'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface IFloatingParticlesProps {
  count?: number;
  color?: string;
}

interface Particle {
  id: number;
  width: number;
  height: number;
  left: number;
  top: number;
  opacity: number;
  xOffset: number;
  duration: number;
  delay: number;
}

export const FloatingParticles = ({ count = 20, color = 'white' }: IFloatingParticlesProps) => {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [adjustedCount, setAdjustedCount] = useState(0);

  useEffect(() => {
    const updateCount = () => {
      // Optimized particle count: 5 on mobile, max 15 on desktop
      const isMobile = window.innerWidth < 640;
      const targetCount = isMobile ? Math.min(count, 5) : Math.min(count, 15);
      setAdjustedCount((prev) => (prev !== targetCount ? targetCount : prev));
    };

    updateCount();
    window.addEventListener('resize', updateCount);
    return () => window.removeEventListener('resize', updateCount);
  }, [count]);

  useEffect(() => {
    if (adjustedCount === 0) return;

    const timer = setTimeout(() => {
      const newParticles = Array.from({ length: adjustedCount }).map((_, i) => ({
        id: i,
        width: Math.random() * 4 + 2,
        height: Math.random() * 4 + 2,
        left: Math.random() * 100,
        top: Math.random() * 100,
        opacity: Math.random() * 0.3 + 0.1,
        xOffset: Math.random() * 20 - 10,
        duration: Math.random() * 4 + 3,
        delay: Math.random() * 2,
      }));
      setParticles(newParticles);
    }, 0);

    return () => clearTimeout(timer);
  }, [adjustedCount]);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            width: particle.width,
            height: particle.height,
            left: `${particle.left}%`,
            top: `${particle.top}%`,
            backgroundColor: color,
            opacity: particle.opacity,
            willChange: 'transform, opacity',
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, particle.xOffset, 0],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
};
