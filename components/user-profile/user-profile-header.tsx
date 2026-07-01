'use client';

import Image from 'next/image';

import { motion } from 'framer-motion';
import {
  BadgeCheck,
  Globe,
  Instagram,
  MapPin,
  MessageCircle,
  Settings,
  Twitter,
  UserPlus,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface UserProfileHeaderProps {
  user: {
    username: string;
    fullName: string;
    avatarUrl: string;
    coverUrl: string;
    bio: string;
    location?: string;
    isVerified: boolean;
    isPro: boolean;
    stats: {
      followers: number;
      following: number;
    };
    socialLinks?: {
      twitter?: string;
      instagram?: string;
      website?: string;
    };
  };
}

function UserProfileHeader({ user }: UserProfileHeaderProps) {
  const isOwnProfile = false; // Mocked for public view

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

  return (
    <div className="relative mx-auto mt-2.5 px-4">
      <div className="border-border/50 bg-cream-95 rounded-2xl border p-5 sm:p-6">
        <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-start sm:gap-6">
          {/* Avatar */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex-shrink-0"
          >
            <div
              className={cn(
                'h-28 w-28 overflow-hidden rounded-2xl border-4 sm:h-32 sm:w-32',
                'border-background bg-background shadow-xl'
              )}
            >
              <Image
                src={user.avatarUrl}
                alt={user.fullName}
                width={128}
                height={128}
                className="h-full w-full object-cover"
              />
            </div>
          </motion.div>

          {/* Name, Info, Bio */}
          <div className="flex min-w-0 flex-1 flex-col gap-3">
            {/* Top row: name + action buttons */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-text-primary text-2xl font-bold sm:text-3xl">
                    {user.fullName}
                  </h1>
                  {user.isVerified && (
                    <BadgeCheck className="text-brand-pink-500 h-6 w-6 flex-shrink-0" />
                  )}
                </div>
                <p className="text-text-secondary-65 mt-0.5 text-sm">@{user.username}</p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                {isOwnProfile ? (
                  <Button
                    variant="outline"
                    className="border-border/50 hover:border-brand-pink-500/50 hover:bg-brand-pink-500/10 gap-2"
                  >
                    <Settings className="h-4 w-4" />
                    Edit Profile
                  </Button>
                ) : (
                  <>
                    <Button className="bg-brand-pink-500 hover:bg-brand-pink-600 gap-2 text-white">
                      <UserPlus className="h-4 w-4" />
                      Follow
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="border-border/50 hover:border-brand-pink-500/50 hover:bg-brand-pink-500/10"
                    >
                      <MessageCircle className="h-4 w-4" />
                    </Button>
                  </>
                )}
              </div>
            </div>

            {/* Location */}
            {user.location && (
              <div className="text-text-secondary-65 flex items-center gap-1.5 text-sm">
                <MapPin className="h-3.5 w-3.5 flex-shrink-0" />
                <span>{user.location}</span>
              </div>
            )}

            {/* Bio */}
            <p className="text-text-secondary text-sm leading-relaxed">{user.bio}</p>

            {/* Social Links */}
            {socialLinks.length > 0 && (
              <div className="flex flex-wrap items-center gap-2">
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
                        'border-border/50 bg-muted/30 text-text-secondary-65 border',
                        'hover:border-brand-pink-500/50 hover:bg-brand-pink-500/10 hover:text-brand-pink-500 transition-all'
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
