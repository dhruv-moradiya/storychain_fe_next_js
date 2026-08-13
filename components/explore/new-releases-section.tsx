'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { formatDistanceToNow } from 'date-fns';
import { BookOpen, Clock } from 'lucide-react';

import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/components/ui/empty';
import { useGetFreshStories } from '@/services/stories/stories.query';

import { Skeleton } from '../ui/skeleton';

export function NewReleasesSection() {
  const routes = useRouter();
  const { data, isPending, isError } = useGetFreshStories();

  if (isPending) {
    return (
      <section className="mb-16 space-y-6">
        <div className="flex items-end justify-between gap-4">
          <div className="flex flex-col gap-1">
            <h2 className="font-libre-baskerville text-foreground text-2xl font-bold tracking-tight sm:text-3xl">
              Fresh Off the Page
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base">
              Brand new stories - be the first to shape where they go
            </p>
          </div>

          <div className="hidden rounded-full border p-1 sm:flex">
            <button className="bg-muted rounded-full px-3 py-1 text-xs font-medium">7 Days</button>
            <button className="text-muted-foreground hover:text-foreground rounded-full px-3 py-1 text-xs font-medium">
              30 Days
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {new Array(6).fill(0).map((_, index) => (
            <SkeletonStroyCard key={index} />
          ))}
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="mb-16 space-y-6">
        <div className="flex items-end justify-between gap-4">
          <div className="flex flex-col gap-1">
            <h2 className="font-libre-baskerville text-foreground text-2xl font-bold tracking-tight sm:text-3xl">
              Fresh Off the Page
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base">
              Brand new stories - be the first to shape where they go
            </p>
          </div>

          <div className="hidden rounded-full border p-1 sm:flex">
            <button className="bg-muted rounded-full px-3 py-1 text-xs font-medium">7 Days</button>
            <button className="text-muted-foreground hover:text-foreground rounded-full px-3 py-1 text-xs font-medium">
              30 Days
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {new Array(6).fill(0).map((_, index) => (
            <SkeletonStroyCard key={index} />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="mb-16 space-y-6">
      <div className="flex items-end justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h2 className="font-libre-baskerville text-foreground text-2xl font-bold tracking-tight sm:text-3xl">
            Fresh Off the Page
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base">
            Brand new stories - be the first to shape where they go
          </p>
        </div>

        <div className="hidden rounded-full border p-1 sm:flex">
          <button className="bg-muted rounded-full px-3 py-1 text-xs font-medium">7 Days</button>
          <button className="text-muted-foreground hover:text-foreground rounded-full px-3 py-1 text-xs font-medium">
            30 Days
          </button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-6 lg:gap-5">
        {data.data.length > 0 && (
          <>
            {data.data.map((story) => (
              <div
                key={story.slug}
                className="group flex cursor-pointer flex-col gap-2 sm:gap-3"
                onClick={() => routes.push(`/stories/${story.slug}/overview`)}
              >
                <div className="border-primary/20 relative aspect-2/3 w-full overflow-hidden rounded-md border shadow-sm transition-all group-hover:shadow-md lg:rounded-lg">
                  {story.cardImage ? (
                    <Image
                      src={story.cardImage.url}
                      alt={story.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center">
                      <BookOpen className="text-muted-foreground" />
                    </div>
                  )}
                </div>

                <div className="space-y-0.5 sm:space-y-1">
                  <h3 className="font-libre-baskerville group-hover:text-brand-pink-500 line-clamp-2 text-xs leading-tight font-bold transition-colors sm:text-sm lg:text-base">
                    {story.title}
                  </h3>

                  <p className="text-muted-foreground line-clamp-1 text-[10px] sm:text-xs">
                    by {story.creator.username}
                  </p>

                  <div className="flex items-center justify-between pt-0.5 sm:pt-1">
                    <span className="text-brand-teal truncate text-[9px] font-medium tracking-wide uppercase sm:text-[10px]">
                      {story.genres[0]}
                    </span>

                    <div className="text-muted-foreground flex items-center gap-1 text-[9px] sm:text-[10px]">
                      <Clock className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                      <span className="hidden sm:inline">
                        {formatDistanceToNow(new Date(story.createdAt))}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </>
        )}
      </div>

      {data.data.length === 0 && (
        <Empty className="relative mx-auto my-8 max-w-lg overflow-hidden rounded-xl py-14">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.12),transparent_70%)]" />
          <EmptyHeader>
            <div className="relative flex items-center justify-center">
              <div className="bg-primary/20 absolute h-24 w-24 animate-pulse rounded-full blur-2xl" />
              <EmptyMedia variant="icon" className="text-primary drop-shadow-md">
                <BookOpen size={46} strokeWidth={1.4} />
              </EmptyMedia>
            </div>
            <EmptyTitle className="text-xl font-semibold tracking-tight">
              No Fresh Stories Yet
            </EmptyTitle>
            <EmptyDescription className="mx-auto max-w-md leading-relaxed text-balance">
              It seems there are no brand new stories at the moment. Check back later or start
              writing your own!
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      )}
    </section>
  );
}

function SkeletonStroyCard() {
  return (
    <div className="group flex w-44 cursor-pointer flex-col gap-3">
      <div className="border-primary/20 relative aspect-2/3 w-full overflow-hidden rounded-lg border shadow-sm transition-shadow group-hover:shadow-md">
        <Skeleton className="h-full w-full" />
      </div>

      <div className="space-y-1">
        <h3 className="font-libre-baskerville group-hover:text-brand-pink-500 line-clamp-1 text-base leading-tight font-bold transition-colors">
          <Skeleton className="h-4 w-32 rounded-full" />
        </h3>
        <p className="text-muted-foreground line-clamp-1 text-xs">
          <Skeleton className="h-3 w-24 rounded-full" />
        </p>

        <div className="flex items-center justify-between pt-1">
          <span className="text-brand-teal text-[10px] font-medium tracking-wider uppercase">
            <Skeleton className="h-3 w-16 rounded-full" />
          </span>
          <div className="text-muted-foreground flex items-center gap-1 text-[10px]">
            <Clock size={10} />
            <Skeleton className="h-3 w-12 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
