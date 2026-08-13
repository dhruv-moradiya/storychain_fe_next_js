'use client';

import { motion } from 'framer-motion';
import { Calendar, Instagram, MapPin, Twitter } from 'lucide-react';

import { cn } from '@/lib/utils';

interface UserProfileBioProps {
  user: {
    bio?: string;
    email?: string;
    location?: string;
    joinedAt?: Date | string;
    socialLinks?: {
      twitter?: string;
      instagram?: string;
    };
  };
}

function UserProfileBio({ user }: UserProfileBioProps) {
  const socialLinks = [
    {
      key: 'twitter',
      icon: Twitter,
      href: user.socialLinks?.twitter ? `https://twitter.com/${user.socialLinks.twitter}` : null,
      label: `@${user.socialLinks?.twitter}`,
    },
    {
      key: 'instagram',
      icon: Instagram,
      href: user.socialLinks?.instagram
        ? `https://instagram.com/${user.socialLinks.instagram}`
        : null,
      label: `@${user.socialLinks?.instagram}`,
    },
  ].filter((link) => link.href);

  const formattedJoinedDate = user.joinedAt
    ? new Date(user.joinedAt).toLocaleDateString('en-US', {
        month: 'long',
        year: 'numeric',
      })
    : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="border-border bg-card text-card-foreground rounded-xl border p-5 shadow-sm"
    >
      <h3 className="text-foreground mb-3 font-bold">About</h3>

      <p className="text-muted-foreground text-sm leading-relaxed">
        {user.bio || 'No bio provided.'}
      </p>

      {/* Details */}
      <div className="mt-4 space-y-2">
        {user.location && (
          <div className="text-muted-foreground flex items-center gap-2 text-xs font-medium">
            <MapPin className="text-primary h-4 w-4 flex-shrink-0" />
            <span>{user.location}</span>
          </div>
        )}
        {formattedJoinedDate && (
          <div className="text-muted-foreground flex items-center gap-2 text-xs font-medium">
            <Calendar className="text-primary h-4 w-4 flex-shrink-0" />
            <span>Joined {formattedJoinedDate}</span>
          </div>
        )}
      </div>

      {/* Social Links */}
      {socialLinks.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {socialLinks.map((link) => {
            const Icon = link.icon;
            return (
              <a
                key={link.key}
                href={link.href!}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  'flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs',
                  'border-border bg-muted/50 text-muted-foreground border',
                  'hover:border-primary/40 hover:bg-accent hover:text-accent-foreground transition-colors'
                )}
              >
                <Icon className="h-3.5 w-3.5" />
                <span>{link.label}</span>
              </a>
            );
          })}
        </div>
      )}
    </motion.div>
  );
}

export { UserProfileBio };
