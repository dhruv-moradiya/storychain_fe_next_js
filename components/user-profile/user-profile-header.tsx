'use client';

import Image from 'next/image';
import { useState } from 'react';

import { motion } from 'framer-motion';
import {
  BadgeCheck,
  Calendar,
  Globe,
  Instagram,
  MapPin,
  Settings,
  Share2,
  Twitter,
  UserPlus,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface UserProfileHeaderProps {
  user: {
    clerkId?: string;
    username: string;
    fullName?: string;
    email?: string;
    role?: string;
    avatarUrl?: string;
    bio?: string;
    location?: string;
    joinedAt?: Date | string;
    isVerified?: boolean;
    level?: number;
    levelTitle?: string;
    xp?: number;
    nextLevelXp?: number;
    socialLinks?: {
      twitter?: string;
      instagram?: string;
      website?: string;
    };
  };
  isOwnProfile?: boolean;
}

function UserProfileHeader({ user, isOwnProfile = false }: UserProfileHeaderProps) {
  const [imgError, setImgError] = useState(false);

  const displayName = user.fullName || user.username;
  const fallbackAvatar = `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(user.username)}`;
  const avatarSrc = imgError || !user.avatarUrl ? fallbackAvatar : user.avatarUrl;

  const socialLinks = [
    {
      key: 'twitter',
      icon: Twitter,
      href: user.socialLinks?.twitter ? `https://twitter.com/${user.socialLinks.twitter}` : null,
    },
    {
      key: 'instagram',
      icon: Instagram,
      href: user.socialLinks?.instagram
        ? `https://instagram.com/${user.socialLinks.instagram}`
        : null,
    },
    {
      key: 'website',
      icon: Globe,
      href: user.socialLinks?.website ?? null,
    },
  ].filter((link) => link.href);

  const formattedJoinedDate = user.joinedAt
    ? new Date(user.joinedAt).toLocaleDateString('en-US', {
        month: 'long',
        year: 'numeric',
      })
    : null;

  return (
    <div className="relative mx-auto w-full space-y-4">
      {/* Top Card */}
      <div className="border-border bg-card text-card-foreground rounded-2xl border p-5 shadow-sm sm:p-6">
        <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-start sm:gap-6">
          {/* Avatar */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex-shrink-0"
          >
            <div className="border-border bg-muted relative h-24 w-24 overflow-hidden rounded-2xl border-2 shadow-md sm:h-28 sm:w-28">
              <Image
                src={avatarSrc}
                alt={displayName}
                fill
                className="h-full w-full object-cover"
                onError={() => setImgError(true)}
                unoptimized
              />
            </div>
          </motion.div>

          {/* Name, Role & Info */}
          <div className="flex min-w-0 flex-1 flex-col gap-2.5">
            {/* Top row: Name + Action buttons */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="flex flex-wrap items-center gap-2.5">
                  <h1 className="text-foreground text-2xl font-extrabold tracking-tight sm:text-3xl">
                    {displayName}
                  </h1>

                  {user.isVerified && <BadgeCheck className="text-primary h-6 w-6 flex-shrink-0" />}

                  {/* Role Tag */}
                  {user.role && (
                    <span className="border-primary/30 bg-primary/10 text-primary rounded-full border px-3 py-0.5 text-xs font-bold tracking-wider uppercase">
                      {user.role}
                    </span>
                  )}

                  {/* Level Tag */}
                  {user.level !== undefined && (
                    <span className="border-border bg-muted text-muted-foreground rounded-full border px-3 py-0.5 text-xs font-semibold">
                      Lvl {user.level} {user.levelTitle ? `• ${user.levelTitle}` : ''}
                    </span>
                  )}
                </div>
                <p className="font-ibm-plex-mono text-muted-foreground mt-0.5 text-xs">
                  @{user.username}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="border-border text-muted-foreground hover:text-foreground h-9 w-9"
                  onClick={() => {
                    if (navigator.share) {
                      navigator.share({ title: displayName, url: window.location.href });
                    } else {
                      navigator.clipboard.writeText(window.location.href);
                    }
                  }}
                >
                  <Share2 className="h-4 w-4" />
                </Button>

                {isOwnProfile ? (
                  <Button variant="outline" className="border-border gap-2">
                    <Settings className="h-4 w-4" />
                    Edit Profile
                  </Button>
                ) : (
                  <Button className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2">
                    <UserPlus className="h-4 w-4" />
                    Follow
                  </Button>
                )}
              </div>
            </div>

            {/* Location & Joined Date */}
            <div className="text-muted-foreground flex flex-wrap items-center gap-4 text-xs font-medium">
              {user.location && (
                <div className="flex items-center gap-1.5">
                  <MapPin className="text-primary h-3.5 w-3.5" />
                  <span>{user.location}</span>
                </div>
              )}
              {formattedJoinedDate && (
                <div className="flex items-center gap-1.5">
                  <Calendar className="text-primary h-3.5 w-3.5" />
                  <span>Joined {formattedJoinedDate}</span>
                </div>
              )}
            </div>

            {/* Bio */}
            {user.bio && (
              <p className="text-muted-foreground mt-1 text-sm leading-relaxed">{user.bio}</p>
            )}

            {/* Social Links */}
            {socialLinks.length > 0 && (
              <div className="mt-1 flex flex-wrap items-center gap-2">
                {socialLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <a
                      key={link.key}
                      href={link.href!}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(
                        'flex h-8 w-8 items-center justify-center rounded-lg',
                        'border-border bg-muted/50 text-muted-foreground border',
                        'hover:border-primary/40 hover:bg-accent hover:text-accent-foreground transition-colors'
                      )}
                    >
                      <Icon className="h-4 w-4" />
                    </a>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export { UserProfileHeader };
