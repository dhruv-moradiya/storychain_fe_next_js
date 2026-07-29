'use client';

import Image from 'next/image';
import Link from 'next/link';

import { ICharacter } from '@/type/character/characters.type';
import { motion } from 'framer-motion';
import {
  Brain,
  BriefcaseBusiness,
  CalendarDays,
  Loader2,
  Plus,
  Target,
  UserRound,
  Users,
} from 'lucide-react';

import createBadge from '@/components/common/badge';
import { Button } from '@/components/ui/button';
import { scrollReveal } from '@/lib/utils';
import { useGetCharacters } from '@/services/characters/characters.query';

export const CharacterTab = ({ slug }: { slug: string }) => {
  const { data: charactersResponse, isLoading } = useGetCharacters(slug);
  const characters = charactersResponse?.data || [];

  return (
    <div className="border-soft space-y-4 rounded-xl border p-4 sm:p-5">
      <motion.div {...scrollReveal.card(0)} className="flex items-start justify-between gap-3">
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
      </motion.div>

      {isLoading ? (
        <div className="flex h-48 flex-col items-center justify-center space-y-2">
          <Loader2 className="text-brand-pink-500 h-6 w-6 animate-spin" />
          <p className="text-muted-foreground text-xs font-medium">Loading characters...</p>
        </div>
      ) : characters.length === 0 ? (
        <div className="border-border/40 bg-bg-cream/20 flex flex-col items-center justify-center rounded-xl border border-dashed p-8 text-center">
          <div className="bg-brand-pink-500/10 mb-3 flex h-10 w-10 items-center justify-center rounded-full">
            <Users className="text-brand-pink-500 h-5 w-5" />
          </div>
          <h4 className="text-text-primary text-sm font-semibold">No characters found</h4>
          <p className="text-muted-foreground mt-1 max-w-sm text-xs">
            Start building your story's cast by adding your first character.
          </p>
          <Link href={`/stories/${slug}/add-character`} className="mt-4">
            <Button variant="outline-brand" size="sm">
              <Plus size={14} />
              Add Character
            </Button>
          </Link>
        </div>
      ) : (
        <motion.div
          {...scrollReveal.card(1)}
          className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3"
        >
          {characters.map((character: ICharacter, index: number) => {
            const roleFormatted = character.roleInStory?.replace('_', ' ') || 'Supporting';
            const roleCapitalized = roleFormatted.charAt(0).toUpperCase() + roleFormatted.slice(1);

            return (
              <motion.div
                key={character._id}
                {...scrollReveal.card(index + 2)}
                className="bg-background border-border hover:border-primary/30 flex flex-col rounded-2xl border p-5 hover:shadow-sm"
              >
                {/* Top */}
                <div className="flex flex-col items-center text-center">
                  <div className="border-border/60 bg-muted relative mb-4 h-24 w-24 overflow-hidden rounded-full border">
                    {character.image?.url ? (
                      <Image
                        src={character.image.url}
                        alt={character.fullName}
                        fill
                        sizes="96px"
                        className="object-cover"
                      />
                    ) : (
                      <div className="bg-brand-pink-500/10 text-brand-pink-500 flex h-full w-full items-center justify-center text-2xl font-bold">
                        {character.fullName?.charAt(0)?.toUpperCase() || '?'}
                      </div>
                    )}
                  </div>

                  <h3 className="text-foreground text-xl font-semibold">{character.fullName}</h3>
                  {character.nickname && (
                    <p className="text-muted-foreground text-xs font-medium">
                      "{character.nickname}"
                    </p>
                  )}

                  <div className="mt-2">
                    {createBadge({
                      label: roleCapitalized,
                      size: 'xs',
                      color:
                        roleCapitalized.toLowerCase() === 'protagonist'
                          ? 'emerald'
                          : roleCapitalized.toLowerCase() === 'antagonist'
                            ? 'rose'
                            : roleCapitalized.toLowerCase() === 'mentor'
                              ? 'purple'
                              : 'blue',
                      mono: true,
                    })}
                  </div>

                  {character.biography && (
                    <p className="text-muted-foreground mt-4 line-clamp-3 max-w-[30ch] text-sm leading-6">
                      {character.biography}
                    </p>
                  )}
                </div>

                {/* Info */}
                <div className="divide-border/50 mt-6 divide-y rounded-lg">
                  <InfoItem
                    icon={<UserRound size={14} className="text-primary" />}
                    label="Role"
                    value={roleCapitalized}
                  />

                  {character.age !== undefined && (
                    <InfoItem
                      icon={<CalendarDays size={14} className="text-primary" />}
                      label="Age"
                      value={character.age}
                    />
                  )}

                  {character.occupation && (
                    <InfoItem
                      icon={<BriefcaseBusiness size={14} className="text-primary" />}
                      label="Occupation"
                      value={character.occupation}
                    />
                  )}

                  {character.personality && (
                    <InfoItem
                      icon={<Brain size={14} className="text-primary" />}
                      label="Personality"
                      value={character.personality}
                    />
                  )}

                  {character.motivationGoal && (
                    <InfoItem
                      icon={<Target size={14} className="text-primary" />}
                      label="Goal"
                      value={character.motivationGoal}
                    />
                  )}
                </div>

                {/* Button */}
                <Link
                  href={`/stories/${slug}/characters/${character._id}`}
                  className="mt-auto pt-4"
                >
                  <Button variant="outline" size="sm" className="w-full">
                    View Details
                  </Button>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      )}
    </div>
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
