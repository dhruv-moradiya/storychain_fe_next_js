import Image from 'next/image';
import Link from 'next/link';

import {
  Brain,
  BriefcaseBusiness,
  CalendarDays,
  Plus,
  Target,
  UserRound,
  Users,
} from 'lucide-react';

import createBadge from '@/components/common/badge';
import { Button } from '@/components/ui/button';
import { FadeInView } from '@/lib/animations';

export const CharacterTab = ({ slug }: { slug: string }) => {
  return (
    <FadeInView delay={0.1}>
      <div className="border-soft space-y-4 rounded-xl border p-4 sm:p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 className="text-text-primary flex items-center gap-2 text-sm font-semibold sm:text-base">
              <Users size={16} className="text-brand-pink-500 sm:h-4.5 sm:w-4.5" />
              Characters
            </h2>
            <p className="text-foreground/60 mt-1 text-xs font-medium sm:text-sm">
              Meet the people who bring this story to life.
            </p>
          </div>
          <Link href={`/stories/${slug}/add-character`}>
            <Button variant="outline-brand" size="sm" className="rounded-sm!">
              <Plus size={14} />
              Add Character
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {[1, 2, 3].map((character) => (
            <div
              key={character}
              className="bg-background border-border hover:border-primary/30 flex flex-col rounded-2xl border p-5 transition-all hover:shadow-sm"
            >
              {/* Top */}
              <div className="flex flex-col items-center text-center">
                <div className="relative mb-4 h-24 w-24 overflow-hidden rounded-full border">
                  <Image
                    src="https://i.pinimg.com/736x/c4/cf/77/c4cf77c049226340d430cbe8a4391c69.jpg"
                    alt="Aarav"
                    fill
                    sizes="96px"
                    className="object-cover"
                  />
                </div>

                <h3 className="text-foreground text-xl font-semibold">Aarav</h3>

                <div className="mt-2">
                  {createBadge({
                    label: 'Protagonist',
                    size: 'xs',
                    color: 'emerald',
                    mono: true,
                  })}
                </div>

                <p className="text-muted-foreground mt-4 line-clamp-3 text-sm leading-6">
                  A young Gujarati merchant who discovers hidden secrets about the ships arriving at
                  night.
                </p>
              </div>

              {/* Info */}
              <div className="divide-border/50 mt-6 divide-y rounded-lg">
                <InfoItem
                  icon={<UserRound size={14} className="text-primary" />}
                  label="Role"
                  value="Protagonist"
                />

                <InfoItem
                  icon={<CalendarDays size={14} className="text-primary" />}
                  label="Age"
                  value="22"
                />

                <InfoItem
                  icon={<BriefcaseBusiness size={14} className="text-primary" />}
                  label="Occupation"
                  value="Merchant"
                />

                <InfoItem
                  icon={<Brain size={14} className="text-primary" />}
                  label="Personality"
                  value="Curious, Brave"
                />

                <InfoItem
                  icon={<Target size={14} className="text-primary" />}
                  label="Goal"
                  value="Protect family"
                />
              </div>

              {/* Button */}
              <Link href={`/stories/${slug}/characters/aarav`} className="mt-4">
                <Button variant="outline" size="sm" className="w-full">
                  View Details
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </FadeInView>
  );
};

interface InfoItemProps {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
  className?: string;
}

const InfoItem: React.FC<InfoItemProps> = ({ icon, label, value, className = '' }) => {
  return (
    <div className={`flex items-center justify-between gap-4 py-2 ${className}`}>
      <div className="flex min-w-0 items-center gap-2">
        <span className="shrink-0">{icon}</span>

        <span className="text-foreground/60 truncate text-sm font-medium">{label}</span>
      </div>

      <div className="text-foreground/90 text-right text-sm">{value}</div>
    </div>
  );
};
