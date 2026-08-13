'use client';

import Image from 'next/image';
import Link from 'next/link';

import { IUserChapterWrittenItem } from '@/type/user/user-response.type';
import { motion } from 'framer-motion';
import { Award, BookOpen, Eye, Feather, Heart, type LucideIcon } from 'lucide-react';

import { cn } from '@/lib/utils';

interface Activity {
  type: 'chapter' | 'story' | 'reads' | 'badge';
  title: string;
  subtitle: string;
  date: string;
  imageUrl?: string;
  url?: string;
}

interface UserProfileActivityProps {
  activities?: Activity[];
  chaptersWritten?: IUserChapterWrittenItem[];
}

const activityConfig: Record<string, { icon: LucideIcon; color: string; bg: string }> = {
  chapter: {
    icon: Feather,
    color: 'text-primary',
    bg: 'bg-primary/10 border-primary/20',
  },
  story: {
    icon: BookOpen,
    color: 'text-chart-2',
    bg: 'bg-chart-2/10 border-chart-2/20',
  },
  reads: {
    icon: Eye,
    color: 'text-chart-4',
    bg: 'bg-chart-4/10 border-chart-4/20',
  },
  badge: {
    icon: Award,
    color: 'text-amber-500',
    bg: 'bg-amber-500/10 border-amber-500/20',
  },
  like: {
    icon: Heart,
    color: 'text-destructive',
    bg: 'bg-destructive/10 border-destructive/20',
  },
};

function formatDate(dateVal?: Date | string): string {
  if (!dateVal) return '';
  const d = new Date(dateVal);
  if (isNaN(d.getTime())) return '';
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function UserProfileActivity({ activities, chaptersWritten }: UserProfileActivityProps) {
  const items: Activity[] = [];

  if (chaptersWritten && chaptersWritten.length > 0) {
    chaptersWritten.forEach((ch) => {
      items.push({
        type: 'chapter',
        title: ch.title || `Chapter #${ch.chapterNumber ?? 1}`,
        subtitle: ch.storyTitle ? `From: ${ch.storyTitle}` : `Story: ${ch.storySlug}`,
        date: formatDate(ch.createdAt),
        url: `/stories/${ch.storySlug}/chapter/${ch.slug}`,
      });
    });
  } else if (activities && activities.length > 0) {
    items.push(...activities);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="border-border bg-card text-card-foreground rounded-xl border p-5 shadow-sm"
    >
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-foreground font-bold">Written Chapters</h3>
      </div>

      {items.length > 0 ? (
        <div className="space-y-2.5">
          {items.map((activity, index) => {
            const config = activityConfig[activity.type] ?? activityConfig.chapter;
            const Icon = config.icon;

            const content = (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + index * 0.04 }}
                className="group border-border bg-muted/30 hover:border-primary/40 hover:bg-accent/40 flex items-center gap-3.5 rounded-xl border p-3.5 shadow-sm transition-all"
              >
                {/* Icon or thumbnail */}
                {activity.imageUrl ? (
                  <div className="border-border relative h-11 w-11 shrink-0 overflow-hidden rounded-lg border">
                    <Image
                      src={activity.imageUrl}
                      alt={activity.title}
                      fill
                      className="object-cover"
                      sizes="44px"
                      unoptimized
                    />
                  </div>
                ) : (
                  <div
                    className={cn(
                      'flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border',
                      config.bg
                    )}
                  >
                    <Icon className={cn('h-4 w-4', config.color)} />
                  </div>
                )}

                {/* Text */}
                <div className="min-w-0 flex-1">
                  <p className="text-foreground group-hover:text-primary line-clamp-1 text-sm font-bold transition-colors">
                    {activity.title}
                  </p>
                  <p className="text-muted-foreground mt-0.5 line-clamp-1 text-xs font-medium">
                    {activity.subtitle}
                  </p>
                </div>

                {/* Date */}
                {activity.date && (
                  <span className="text-muted-foreground shrink-0 font-mono text-xs">
                    {activity.date}
                  </span>
                )}
              </motion.div>
            );

            if (activity.url) {
              return (
                <Link key={index} href={activity.url} className="block">
                  {content}
                </Link>
              );
            }

            return <div key={index}>{content}</div>;
          })}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <Feather className="text-muted-foreground/40 mb-2 h-10 w-10" />
          <p className="text-muted-foreground text-sm">No chapters written yet</p>
        </div>
      )}
    </motion.div>
  );
}

export { UserProfileActivity };
