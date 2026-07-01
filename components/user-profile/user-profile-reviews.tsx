'use client';

import Image from 'next/image';
import Link from 'next/link';

import { motion } from 'framer-motion';
import { ArrowRight, Star } from 'lucide-react';

interface Review {
  id: string;
  author: string;
  avatarUrl: string;
  date: string;
  rating: number;
  comment: string;
}

interface UserProfileReviewsProps {
  reviews: Review[];
}

function UserProfileReviews({ reviews }: UserProfileReviewsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.45 }}
      className="border-border/50 bg-cream-95 rounded-xl border p-5"
    >
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-text-primary font-semibold">Reader Reviews</h3>
        <Link
          href="/reviews"
          className="text-brand-pink-500 flex items-center gap-1 text-xs hover:underline"
        >
          View all reviews
          <ArrowRight className="h-3 w-3" />
        </Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {reviews.map((review, index) => (
          <motion.div
            key={review.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 + index * 0.08 }}
            className="border-border/50 bg-background rounded-xl border p-4"
          >
            {/* Reviewer info */}
            <div className="mb-3 flex items-center gap-2.5">
              <div className="relative h-9 w-9 flex-shrink-0 overflow-hidden rounded-full">
                <Image
                  src={review.avatarUrl}
                  alt={review.author}
                  fill
                  className="object-cover"
                  sizes="36px"
                />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-text-primary truncate text-sm font-semibold">{review.author}</p>
                <p className="text-text-secondary-65 text-xs">{review.date}</p>
              </div>
            </div>

            {/* Stars */}
            <div className="mb-2 flex items-center gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-3.5 w-3.5 ${i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-border'}`}
                />
              ))}
            </div>

            {/* Comment */}
            <p className="text-text-secondary line-clamp-2 text-xs leading-relaxed">
              "{review.comment}"
            </p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export { UserProfileReviews };
