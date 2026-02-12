'use client';

import { motion } from 'framer-motion';

interface IDotsGridProps {
  className?: string;
}

export const DotsGrid = ({ className = '' }: IDotsGridProps) => (
  <div className={`pointer-events-none absolute ${className}`}>
    <div className="grid grid-cols-5 gap-3 opacity-20">
      {[...Array(25)].map((_, i) => (
        <motion.div
          key={i}
          className="h-1 w-1 rounded-full bg-current"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.02 }}
        />
      ))}
    </div>
  </div>
);
