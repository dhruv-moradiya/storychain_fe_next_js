'use client';

import type { IPRReview } from '@/type';

import ReviewCard from './review-card';

// ── Types ────────────────────────────────────────────────────────────────────

interface ReviewsTabProps {
  reviews: IPRReview[];
}

// ── Component ────────────────────────────────────────────────────────────────

export default function ReviewsTab({ reviews }: ReviewsTabProps) {
  return (
    <div className="mt-8 space-y-8">
      {reviews.map((review) => (
        <ReviewCard key={review._id} review={review} />
      ))}
    </div>
  );
}
