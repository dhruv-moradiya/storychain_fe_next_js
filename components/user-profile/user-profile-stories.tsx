'use client';

import Image from 'next/image';
import Link from 'next/link';

import { motion } from 'framer-motion';
import { ArrowRight, BookOpen, Eye, MessageSquare, Star } from 'lucide-react';

interface Story {
  id: string;
  title: string;
  slug: string;
  coverUrl: string;
  genre: string;
  rating: number;
  reads: number;
  chapters: number;
  description?: string;
}

interface UserProfileStoriesProps {
  stories: Story[];
  username: string;
}

function formatNumber(num: number): string {
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
}

function UserProfileStories({ stories, username }: UserProfileStoriesProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15 }}
      className="border-border/50 bg-cream-95 rounded-xl border p-5"
    >
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-text-primary font-semibold">Featured Stories</h3>
        <Link
          href={`/user/${username}/stories`}
          className="text-brand-pink-500 flex items-center gap-1 text-xs hover:underline"
        >
          View all stories
          <ArrowRight className="h-3 w-3" />
        </Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {stories.map((story, index) => (
          <motion.div
            key={story.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + index * 0.1 }}
            whileHover={{ y: -4 }}
            className="group cursor-pointer"
          >
            <Link href={`/stories/${story.slug}`}>
              {/* Cover image */}
              <div className="bg-muted relative aspect-[4/3] overflow-hidden rounded-xl">
                {story.coverUrl && (
                  <Image
                    src={story.coverUrl}
                    alt={story.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

                {/* Genre Badge */}
                <span className="bg-brand-pink-500/90 absolute top-2 left-2 rounded-md px-2 py-0.5 text-[10px] font-semibold text-white backdrop-blur-sm">
                  {story.genre}
                </span>

                {/* Bookmark icon */}
                <button className="absolute top-2 right-2 flex h-7 w-7 items-center justify-center rounded-md bg-black/40 text-white backdrop-blur-sm transition-colors hover:bg-black/60">
                  <BookOpen className="h-3.5 w-3.5" />
                </button>
              </div>

              {/* Story info below image */}
              <div className="mt-3 space-y-1.5">
                <h4 className="text-text-primary group-hover:text-brand-pink-500 line-clamp-1 font-semibold transition-colors">
                  {story.title}
                </h4>
                {story.description && (
                  <p className="text-text-secondary-65 line-clamp-2 text-xs leading-relaxed">
                    {story.description}
                  </p>
                )}

                <div className="text-text-secondary-65 flex items-center gap-3 text-xs">
                  <span className="flex items-center gap-1">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    {story.rating.toFixed(1)}
                  </span>
                  <span className="flex items-center gap-1">
                    <Eye className="h-3 w-3" />
                    {formatNumber(story.reads)}
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageSquare className="h-3 w-3" />
                    {story.chapters}
                  </span>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {stories.length === 0 && (
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <BookOpen className="text-text-secondary-65/50 mb-2 h-10 w-10" />
          <p className="text-text-secondary-65 text-sm">No stories published yet</p>
        </div>
      )}
    </motion.div>
  );
}

export { UserProfileStories };
