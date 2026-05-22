'use client';

import Image from 'next/image';
import Link from 'next/link';

import {
  ArrowLeft,
  Award,
  BookOpen,
  Bookmark,
  BriefcaseBusiness,
  CalendarDays,
  Camera,
  Ellipsis,
  Heart,
  Share2,
  UserRound,
} from 'lucide-react';

import createBadge from '@/components/common/badge';
import { Button } from '@/components/ui/button';

interface CharacterHeroProps {
  slug: string;
}

export function CharacterHero({ slug }: CharacterHeroProps) {
  return (
    <div className="space-y-6">
      {/* Navigation and Top Actions */}
      <div className="flex items-center justify-between">
        <Link href={`/stories/${slug}/overview?tab=characters`}>
          <Button
            variant="ghost"
            size="sm"
            className="text-text-secondary-65 hover:text-text-primary -ml-3"
          >
            <ArrowLeft size={16} className="mr-1.5" />
            Back to Characters
          </Button>
        </Link>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            className="border-soft bg-background h-9 w-9 rounded-lg"
          >
            <Bookmark size={16} className="text-text-secondary-75" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="border-soft bg-background h-9 w-9 rounded-lg"
          >
            <Share2 size={16} className="text-text-secondary-75" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="border-soft bg-background h-9 w-9 rounded-lg"
          >
            <Ellipsis size={16} className="text-text-secondary-75" />
          </Button>
        </div>
      </div>

      {/* Main Hero Card */}
      <div className="flex flex-col gap-6 md:flex-row md:items-start lg:gap-8">
        {/* Left Column - Image Card */}
        <div className="border-soft relative aspect-[3/4] w-full max-w-[280px] self-center overflow-hidden rounded-2xl border shadow-sm md:w-[280px] md:self-start">
          <Image
            src="https://i.pinimg.com/736x/c4/cf/77/c4cf77c049226340d430cbe8a4391c69.jpg"
            alt="Aarav"
            fill
            priority
            sizes="280px"
            className="object-cover"
          />
          {/* Overlay Change Image Button */}
          <div className="absolute inset-x-0 bottom-4 flex justify-center">
            <button className="bg-background/80 text-text-primary border-soft hover:bg-background flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold shadow-sm backdrop-blur-xs transition-all">
              <Camera size={14} className="text-brand-pink-500" />
              Change Image
            </button>
          </div>
        </div>

        {/* Right Column - Info Section */}
        <div className="flex-1 space-y-5">
          {/* Tag & Title */}
          <div className="space-y-2">
            <div className="text-brand-pink-500 flex items-center gap-1 text-xs font-medium tracking-wider uppercase">
              <UserRound size={13} className="text-brand-pink-500" />
              Character
            </div>
            <div className="flex items-center gap-2">
              <h1 className="text-text-primary font-serif text-3xl font-bold md:text-4xl">Aarav</h1>
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-amber-500/10 text-amber-500">
                <Award size={16} className="fill-amber-500/25" />
              </span>
            </div>
            {/* Badges row */}
            <div className="flex flex-wrap gap-2 pt-1">
              {createBadge({ label: 'Protagonist', size: 'xs', color: 'emerald', mono: true })}
              {createBadge({ label: 'Human', size: 'xs', color: 'blue', mono: true })}
              {createBadge({ label: 'Merchant', size: 'xs', color: 'purple', mono: true })}
            </div>
          </div>

          {/* Quote Block */}
          <div className="rounded-xl border border-amber-500/20 bg-amber-50/30 px-5 py-4 text-center dark:border-amber-900/20 dark:bg-amber-950/10">
            <p className="font-serif text-sm text-amber-800 italic dark:text-amber-300">
              &ldquo;Some routes are drawn on maps, others are written by the choices we dare to
              make.&rdquo;
            </p>
          </div>

          {/* Biography summary */}
          <p className="text-text-secondary text-sm leading-relaxed">
            A young Gujarati merchant who discovers hidden secrets about the ships arriving at
            night. Brave, curious, and deeply loyal to his family, Aarav must navigate dangerous
            truths that could change his destiny.
          </p>

          {/* Grid stats */}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <StatBox
              icon={<CalendarDays size={16} className="text-brand-pink-500" />}
              label="Age"
              value="22"
            />
            <StatBox
              icon={<BriefcaseBusiness size={16} className="text-brand-pink-500" />}
              label="Occupation"
              value="Merchant"
            />
            <StatBox
              icon={<Heart size={16} className="text-brand-pink-500" />}
              label="Status"
              value="Alive"
            />
            <StatBox
              icon={<BookOpen size={16} className="text-brand-pink-500" />}
              label="First Appears"
              value="Chapter 1"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function StatBox({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="border-soft bg-background/50 flex items-center gap-3 rounded-xl border p-3">
      <div className="bg-brand-pink-500/10 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg">
        {icon}
      </div>
      <div className="min-w-0">
        <span className="text-text-secondary-65 block text-[10px] font-semibold tracking-wider uppercase">
          {label}
        </span>
        <span className="text-text-primary mt-0.5 block truncate text-xs font-bold">{value}</span>
      </div>
    </div>
  );
}
