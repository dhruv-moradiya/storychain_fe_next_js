'use client';

import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import Image from 'next/image';

interface ITestimonialCardProps {
  quote: string;
  author: string;
  role: string;
  avatar: string;
  delay?: number;
}

export const TestimonialCard = ({
  quote,
  author,
  role,
  avatar,
  delay = 0,
}: ITestimonialCardProps) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    className="relative rounded-2xl bg-white/80 p-6 shadow-sm ring-1 ring-black/5 backdrop-blur"
  >
    <div className="mb-4 flex gap-1">
      {[...Array(5)].map((_, i) => (
        <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
      ))}
    </div>
    <p className="text-text-secondary-75 font-ibm-plex-mono mb-4 text-sm leading-relaxed italic">
      &quot;{quote}&quot;
    </p>
    <div className="flex items-center gap-3">
      <div className="relative h-10 w-10 overflow-hidden rounded-full ring-2 ring-white">
        <Image src={avatar} alt={author} fill className="object-cover" />
      </div>
      <div>
        <p className="text-text-tertiary text-sm font-medium">{author}</p>
        <p className="text-text-secondary-65 font-ibm-plex-mono text-xs">{role}</p>
      </div>
    </div>
  </motion.div>
);
