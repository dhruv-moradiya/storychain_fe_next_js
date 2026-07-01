'use client';

import Image from 'next/image';
import Link from 'next/link';

import { motion } from 'framer-motion';
import { ArrowRight, Award, BookOpen, Eye, FileText, Heart, type LucideIcon } from 'lucide-react';

import { cn } from '@/lib/utils';

interface Activity {
  type: 'chapter' | 'story' | 'reads' | 'badge';
  title: string;
  subtitle: string;
  date: string;
  imageUrl?: string;
}

interface UserProfileActivityProps {
  activities: Activity[];
}

const activityConfig: Record<string, { icon: LucideIcon; color: string; bg: string }> = {
  chapter: {
    icon: FileText,
    color: 'text-brand-pink-500',
    bg: 'bg-brand-pink-500/10',
  },
  story: {
    icon: BookOpen,
    color: 'text-brand-orange',
    bg: 'bg-brand-orange/10',
  },
  reads: {
    icon: Eye,
    color: 'text-blue-500',
    bg: 'bg-blue-500/10',
  },
  badge: {
    icon: Award,
    color: 'text-yellow-500',
    bg: 'bg-yellow-500/10',
  },
  like: {
    icon: Heart,
    color: 'text-red-500',
    bg: 'bg-red-500/10',
  },
};

function UserProfileActivity({ activities }: UserProfileActivityProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="border-border/50 bg-cream-95 rounded-xl border p-5"
    >
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-text-primary font-semibold">Recent Activity</h3>
        <Link
          href="/activity"
          className="text-brand-pink-500 flex items-center gap-1 text-xs hover:underline"
        >
          View all activity
          <ArrowRight className="h-3 w-3" />
        </Link>
      </div>

      <div className="space-y-3">
        {activities.map((activity, index) => {
          const config = activityConfig[activity.type] ?? activityConfig.story;
          const Icon = config.icon;

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.25 + index * 0.07 }}
              className="flex items-center gap-3"
            >
              {/* Icon or thumbnail */}
              {activity.imageUrl ? (
                <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-lg">
                  <Image
                    src={activity.imageUrl}
                    alt={activity.title}
                    fill
                    className="object-cover"
                    sizes="48px"
                  />
                  <div
                    className={cn(
                      'absolute right-0 bottom-0 flex h-5 w-5 items-center justify-center rounded-tl-lg',
                      config.bg
                    )}
                  >
                    <Icon className={cn('h-3 w-3', config.color)} />
                  </div>
                </div>
              ) : (
                <div
                  className={cn(
                    'flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl',
                    config.bg
                  )}
                >
                  <Icon className={cn('h-5 w-5', config.color)} />
                </div>
              )}

              {/* Text */}
              <div className="min-w-0 flex-1">
                <p className="text-text-primary text-sm leading-tight font-semibold">
                  {activity.title}
                </p>
                <p className="text-text-secondary-65 line-clamp-1 text-xs">{activity.subtitle}</p>
              </div>

              {/* Date */}
              <span className="text-text-secondary-65 flex-shrink-0 text-xs">{activity.date}</span>
            </motion.div>
          );
        })}
      </div>

      {activities.length === 0 && (
        <div className="flex flex-col items-center justify-center py-6 text-center">
          <p className="text-text-secondary-65 text-sm">No recent activity</p>
        </div>
      )}
    </motion.div>
  );
}

export { UserProfileActivity };
