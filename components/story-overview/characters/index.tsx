'use client';

import Image from 'next/image';
import Link from 'next/link';

import { ICharacter } from '@/type/character/characters.type';
import { motion } from 'framer-motion';
import {
  ArrowRight,
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

const getRoleColor = (role?: string) => {
  const normalized = (role || '').toLowerCase();
  if (normalized.includes('protagonist') || normalized.includes('main')) return 'emerald';
  if (normalized.includes('antagonist') || normalized.includes('villain')) return 'rose';
  if (normalized.includes('mentor')) return 'purple';
  if (normalized.includes('side') || normalized.includes('supporting')) return 'blue';
  return 'amber';
};

const getStatusBadge = (status?: string) => {
  if (!status) return null;
  const normalized = status.toLowerCase();
  let colorClass = 'bg-muted text-muted-foreground border-border/50';
  if (normalized === 'alive') {
    colorClass = 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20';
  } else if (normalized === 'deceased' || normalized === 'dead') {
    colorClass = 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20';
  } else if (normalized === 'unknown' || normalized === 'missing') {
    colorClass = 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20';
  }

  const label = status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();
  return (
    <span
      className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold tracking-wide uppercase ${colorClass}`}
    >
      {label}
    </span>
  );
};

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

            const hasInfoItems =
              character.age !== undefined ||
              Boolean(character.occupation) ||
              Boolean(character.gender);

            return (
              <motion.div
                key={character._id}
                {...scrollReveal.card(index + 2)}
                className="bg-card/70 border-border/70 hover:border-brand-pink-500/40 hover:shadow-brand-pink-500/5 group flex flex-col overflow-hidden rounded-2xl border p-5 transition-all duration-300 hover:shadow-md"
              >
                {/* Header */}
                <div className="flex flex-col items-center text-center">
                  <div className="bg-muted/60 border-primary/50 relative mb-3.5 h-20 w-20 overflow-hidden rounded-full border transition-transform duration-300">
                    {character.image?.url ? (
                      <Image
                        src={character.image.url}
                        alt={character.fullName}
                        fill
                        sizes="80px"
                        className="object-cover"
                      />
                    ) : (
                      <div className="bg-brand-pink-500/10 text-brand-pink-500 flex h-full w-full items-center justify-center text-2xl font-bold">
                        {character.fullName?.charAt(0)?.toUpperCase() || '?'}
                      </div>
                    )}
                  </div>

                  <h3 className="text-foreground text-lg font-bold tracking-tight">
                    {character.fullName}
                  </h3>
                  {character.nickname && (
                    <p className="text-muted-foreground/80 mt-0.5 text-xs font-medium italic">
                      "{character.nickname}"
                    </p>
                  )}

                  <div className="mt-2.5 flex flex-wrap items-center justify-center gap-1.5">
                    {createBadge({
                      label: roleCapitalized,
                      size: 'xs',
                      color: getRoleColor(roleCapitalized),
                      mono: true,
                    })}
                    {getStatusBadge(character.statusInStory)}
                  </div>

                  {character.biography && (
                    <p className="text-muted-foreground/90 mt-3 line-clamp-2 text-xs leading-relaxed">
                      {character.biography}
                    </p>
                  )}
                </div>

                {/* Info List */}
                {hasInfoItems && (
                  <div className="border-border/40 bg-muted/20 divide-border/30 my-4 divide-y rounded-xl border px-3 py-1">
                    {character.age !== undefined && (
                      <InfoItem
                        icon={<CalendarDays size={14} className="text-brand-pink-500 shrink-0" />}
                        label="Age"
                        value={character.age}
                      />
                    )}

                    {character.occupation && (
                      <InfoItem
                        icon={
                          <BriefcaseBusiness size={14} className="text-brand-pink-500 shrink-0" />
                        }
                        label="Occupation"
                        value={character.occupation}
                      />
                    )}

                    {character.gender && (
                      <InfoItem
                        icon={<UserRound size={14} className="text-brand-pink-500 shrink-0" />}
                        label="Gender"
                        value={character.gender}
                      />
                    )}
                  </div>
                )}

                {/* Personality & Goal Blocks */}
                {(character.personality || character.motivationGoal) && (
                  <div className="mb-4 space-y-2.5">
                    {character.personality && (
                      <div className="bg-muted/30 border-border/30 rounded-xl border p-3">
                        <div className="text-foreground/80 mb-1 flex items-center gap-1.5 text-xs font-semibold">
                          <Brain size={13} className="text-brand-pink-500 shrink-0" />
                          <span>Personality</span>
                        </div>
                        <p className="text-muted-foreground line-clamp-3 text-xs leading-relaxed">
                          {character.personality}
                        </p>
                      </div>
                    )}

                    {character.motivationGoal && (
                      <div className="bg-muted/30 border-border/30 rounded-xl border p-3">
                        <div className="text-foreground/80 mb-1 flex items-center gap-1.5 text-xs font-semibold">
                          <Target size={13} className="text-brand-pink-500 shrink-0" />
                          <span>Goal</span>
                        </div>
                        <p className="text-muted-foreground line-clamp-2 text-xs leading-relaxed">
                          {character.motivationGoal}
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {/* View Details Button */}
                <div className="mt-auto pt-2">
                  <Link href={`/stories/${slug}/characters/${character._id}`} className="block">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-border/60 hover:bg-brand-pink-500/10 hover:text-brand-pink-500 hover:border-brand-pink-500/30 group-hover:border-brand-pink-500/40 w-full text-xs transition-all duration-200"
                    >
                      <span>View Details</span>
                      <ArrowRight
                        size={13}
                        className="ml-1 opacity-70 transition-transform group-hover:translate-x-0.5"
                      />
                    </Button>
                  </Link>
                </div>
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
    <div className={`flex items-start justify-between gap-3 py-2 text-xs ${className}`}>
      <div className="flex shrink-0 items-center gap-2 pt-0.5">
        <span className="shrink-0">{icon}</span>
        <span className="text-muted-foreground shrink-0 font-medium">{label}</span>
      </div>

      <div className="text-foreground/90 line-clamp-2 max-w-[65%] min-w-0 text-right leading-relaxed font-medium">
        {value}
      </div>
    </div>
  );
};
