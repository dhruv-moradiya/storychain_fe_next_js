import Image from 'next/image';

import type { IStoryCollaboratorPopulated } from '@/type/story';
import { AnimatePresence, motion } from 'framer-motion';
import { Crown, Eye, Handshake, type LucideIcon, PenTool, Shield, Users } from 'lucide-react';

import { createBadge } from '@/components/common/badge';
import type { BadgeColorKey } from '@/components/common/badge/types';
import { Button } from '@/components/ui/button';

interface CollaboratorsPreviewProps {
  collaborators: IStoryCollaboratorPopulated[];
  onOwnerClick: (clerkId: string) => void;
  onCollaboratorClick: (clerkId: string) => void;
  onViewAll: () => void;
}

const ROLE_DISPLAY: Record<string, { icon: LucideIcon; color: BadgeColorKey; label: string }> = {
  owner: { icon: Crown, color: 'orange', label: 'Owner' },
  co_author: { icon: PenTool, color: 'purple', label: 'Co-Author' },
  moderator: { icon: Shield, color: 'blue', label: 'Moderator' },
  reviewer: { icon: Eye, color: 'cyan', label: 'Reviewer' },
  contributor: { icon: Handshake, color: 'gray', label: 'Contributor' },
};

export function CollaboratorsPreview({
  collaborators,
  onOwnerClick,
  onCollaboratorClick,
  onViewAll,
}: CollaboratorsPreviewProps) {
  const owner = collaborators.find((c) => c.role === 'owner');
  const otherCollaborators = collaborators.filter((c) => c.role !== 'owner');

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="space-y-3 sm:space-y-4"
    >
      <h2 className="text-text-primary flex items-center gap-2 text-sm font-semibold sm:text-base">
        <Users size={16} className="text-brand-pink-500 sm:h-[18px] sm:w-[18px]" />
        Creators & Collaborators
      </h2>

      {/* Owner Card */}
      {owner && (
        <div
          onClick={() => onOwnerClick(owner.details.clerkId)}
          className="border-border/50 hover:border-brand-pink-500/50 flex cursor-pointer items-center gap-3 rounded-xl border p-3 transition sm:gap-4 sm:p-4"
        >
          <div className="relative h-10 w-10 sm:h-12 sm:w-12">
            <Image
              src={
                owner.details.avatarUrl ||
                'https://i.pinimg.com/736x/62/2e/06/622e06c0d2544aebe627158a6776ab2a.jpg'
              }
              alt={owner.details.username}
              fill
              className="rounded-full border-2 border-yellow-500/50 object-cover"
            />
            <div className="absolute -right-1 -bottom-1 z-10 flex h-4 w-4 items-center justify-center rounded-full bg-yellow-500 shadow-sm sm:h-5 sm:w-5">
              <Crown size={10} className="text-white sm:h-3 sm:w-3" />
            </div>
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
              <span className="text-text-primary truncate text-sm font-medium sm:text-base">
                @{owner.details.username}
              </span>
              {createBadge({
                label: ROLE_DISPLAY['owner']?.label ?? 'Owner',
                icon: ROLE_DISPLAY['owner']?.icon ?? Crown,
                color: ROLE_DISPLAY['owner']?.color ?? 'orange',
                size: 'xs',
                shape: 'pill',
                style: 'soft',
              })}
            </div>
            <p className="text-text-secondary-65 hidden text-xs sm:block">
              Building worlds one chapter at a time
            </p>
          </div>

          <Button
            variant="outline"
            size="sm"
            className="border-brand-pink-500/30 text-brand-pink-500 hover:bg-brand-pink-500/10 hidden text-xs sm:inline-flex"
          >
            Following ✓
          </Button>
        </div>
      )}

      {/* Collaborators Grid */}
      <AnimatePresence>
        <div className="scrollbar-hide -mx-3 flex gap-2 overflow-x-auto px-3 pb-2 sm:mx-0 sm:gap-3 sm:px-0">
          {otherCollaborators.slice(0, 3).map((collab, index) => {
            const config = ROLE_DISPLAY[collab.role] || ROLE_DISPLAY.contributor;

            return (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2, delay: 0.4 + index * 0.05 }}
                key={collab.details.clerkId}
                onClick={() => onCollaboratorClick(collab.details.clerkId)}
                className="border-border/50 hover:border-brand-pink-500/50 min-w-[120px] cursor-pointer rounded-xl border p-2.5 shadow-sm transition-all hover:shadow-md sm:min-w-[140px] sm:p-3"
              >
                <div className="flex items-center gap-2">
                  <div className="relative h-7 w-7 sm:h-8 sm:w-8">
                    <Image
                      src={
                        collab.details.avatarUrl ||
                        'https://i.pinimg.com/736x/ab/41/40/ab4140adebd1a3420ef2969ab775664f.jpg'
                      }
                      alt={collab.details.username}
                      fill
                      className="rounded-full border-2 border-transparent object-cover"
                    />
                  </div>
                  <span className="text-text-primary truncate text-xs font-medium sm:text-sm">
                    @{collab.details.username}
                  </span>
                </div>
                <div className="mt-2.5 flex items-center justify-start">
                  {createBadge({
                    label: config.label,
                    icon: config.icon,
                    color: config.color,
                    size: 'xs',
                    shape: 'pill',
                    style: 'soft',
                  })}
                </div>
              </motion.div>
            );
          })}

          {otherCollaborators.length > 3 && (
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              whileTap={{ scale: 0.95 }}
              onClick={onViewAll}
              className="border-brand-pink-500/30 bg-brand-pink-500/5 text-brand-pink-500 hover:border-brand-pink-500/50 hover:bg-brand-pink-500/10 flex min-w-[80px] flex-col items-center justify-center gap-1 rounded-xl border border-dashed p-2.5 transition-colors sm:min-w-[100px] sm:p-3"
            >
              <span className="font-ibm-plex-mono text-base font-bold sm:text-lg">
                +{otherCollaborators.length - 3}
              </span>
              <span className="text-muted-foreground/80 font-ibm-plex-mono text-[10px] font-semibold tracking-wider uppercase sm:text-xs">
                more
              </span>
            </motion.button>
          )}
        </div>
      </AnimatePresence>
    </motion.div>
  );
}
