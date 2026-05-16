import Image from 'next/image';

import type { IStoryCollaboratorPopulated } from '@/type/story';
import { AnimatePresence, motion } from 'framer-motion';
import { Crown, Eye, Handshake, type LucideIcon, PenTool, Shield, Users } from 'lucide-react';

import { createBadge } from '@/components/common/badge';
import type { BadgeColorKey } from '@/components/common/badge/types';

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
        <Users size={16} className="text-brand-pink-500 sm:h-4.5 sm:w-4.5" />
        Creators & Collaborators
      </h2>

      <AnimatePresence>
        <div
          className="grid grid-cols-2 gap-3"
          style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 180px), 1fr))' }}
        >
          {/* Owner */}
          {owner && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2 }}
              onClick={() => onOwnerClick(owner.clerkId)}
              className="border-soft hover:border-brand-pink-500/50 flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border p-3 text-center transition"
            >
              <div className="relative h-12 w-12">
                <Image
                  src={
                    owner.avatar ||
                    'https://i.pinimg.com/736x/62/2e/06/622e06c0d2544aebe627158a6776ab2a.jpg'
                  }
                  alt={owner.username}
                  fill
                  className="rounded-full border-2 border-yellow-500/70 object-cover"
                />
                <div className="absolute -right-1 -bottom-1 z-10 flex h-4 w-4 items-center justify-center rounded-full bg-yellow-500 shadow-sm">
                  <Crown size={10} className="text-white" />
                </div>
              </div>

              <span className="text-text-primary truncate text-sm font-medium">
                {owner.username}
              </span>

              {createBadge({
                label: ROLE_DISPLAY[owner.role].label ?? 'Owner',
                icon: ROLE_DISPLAY[owner.role].icon ?? Crown,
                color: ROLE_DISPLAY[owner.role].color ?? 'orange',
                size: 'xs',
                shape: 'pill',
                style: 'soft',
              })}
            </motion.div>
          )}

          {/* Collaborators */}
          {otherCollaborators.slice(0, 3).map((collab, index) => {
            const config = ROLE_DISPLAY[collab.role] || ROLE_DISPLAY.contributor;

            return (
              <motion.div
                key={collab.clerkId}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2, delay: 0.1 + index * 0.05 }}
                onClick={() => onCollaboratorClick(collab.clerkId)}
                className="border-soft hover:border-brand-pink-500/50 flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border p-3 text-center shadow-sm transition hover:shadow-md"
              >
                <div className="relative h-10 w-10">
                  <Image
                    src={
                      collab.avatar ||
                      'https://i.pinimg.com/736x/ab/41/40/ab4140adebd1a3420ef2969ab775664f.jpg'
                    }
                    alt={collab.username}
                    fill
                    className="border-border rounded-full border object-cover"
                  />
                </div>

                <span className="text-text-primary truncate text-xs font-medium sm:text-sm">
                  {collab.username}
                </span>

                {createBadge({
                  label: config.label,
                  icon: config.icon,
                  color: config.color,
                  size: 'xs',
                  shape: 'pill',
                  style: 'soft',
                })}
              </motion.div>
            );
          })}

          {/* View More */}
          {otherCollaborators.length > 3 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              whileTap={{ scale: 0.95 }}
              onClick={onViewAll}
              className="border-brand-pink-500/30 bg-brand-pink-500/5 text-brand-pink-500 hover:border-brand-pink-500/50 hover:bg-brand-pink-500/10 flex cursor-pointer flex-col items-center justify-center gap-1 rounded-xl border border-dashed p-3 transition-colors"
            >
              <span className="font-ibm-plex-mono text-base font-bold">
                +{otherCollaborators.length - 3}
              </span>
              <span className="text-muted-foreground/80 font-ibm-plex-mono text-[10px] font-semibold tracking-wider uppercase">
                more
              </span>
            </motion.div>
          )}
        </div>
      </AnimatePresence>
    </motion.div>
  );
}
