'use client';

import { motion } from 'framer-motion';
import { Check, CheckCircle2, Info, UserPlus, Users, X } from 'lucide-react';

import { collaborationRoles } from '@/lib/data/how-to-use-data';
import { cn, scrollReveal } from '@/lib/utils';

import { createBadge } from '../common/badge';

const permissions = [
  { key: 'canWrite' as const, label: 'Write Chapters' },
  { key: 'canPublish' as const, label: 'Publish Chapters' },
  { key: 'canManageCollaborators' as const, label: 'Manage Collaborators' },
  { key: 'canEditSettings' as const, label: 'Edit Story Settings' },
  { key: 'canModerate' as const, label: 'Moderate Community' },
  { key: 'canDistribute' as const, label: 'Distribute Earnings' },
];

const addCollaboratorSteps = [
  'Open your story and go to Story Settings',
  'Click the "Collaborators" tab',
  'Search for the user by their @username',
  'Select a role from the dropdown (Co-Author, Collaborator, Reviewer, or Moderator)',
  'Click "Send Invite" — the user receives a notification',
  'They accept or decline from their Notifications page (invite expires in 7 days)',
];

export function CollaborationSection() {
  return (
    <section id="collaboration" className="scroll-mt-6 py-12">
      {/* Section heading */}
      <motion.div {...scrollReveal.paragraph} className="mb-10">
        <div className="border-brand-blue/20 bg-brand-blue/5 mb-4 flex w-fit rounded-full p-1 shadow-2xl">
          {createBadge({
            icon: Users,
            label: 'Collaboration & Roles',
            color: 'blue',
            className: 'border-none bg-transparent rounded-full shadow-2xl',
            size: 'lg',
          })}
        </div>
        <h2 className="font-libre-baskerville text-text-tertiary mb-3 text-2xl tracking-tight sm:text-3xl">
          Writing Together
        </h2>
        <p className="text-text-secondary-65 max-w-2xl text-sm leading-relaxed">
          StoryChain supports collaborative storytelling with a role-based permission system. Each
          role has specific capabilities to keep your story organised and secure.
        </p>
      </motion.div>

      {/* Role cards */}
      <motion.div
        {...scrollReveal.paragraph}
        className="mb-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-3"
      >
        {collaborationRoles.map((role, index) => {
          const Icon = role.icon;
          return (
            <motion.div
              key={role.role}
              {...scrollReveal.card(index)}
              className={cn(
                'border-border/40 rounded-2xl border p-5 hover:shadow-sm',
                'bg-cream-95/60'
              )}
            >
              <div className="mb-3 flex items-center gap-3">
                <div
                  className={cn(
                    'flex h-9 w-9 items-center justify-center rounded-xl',
                    role.bgColor
                  )}
                >
                  <Icon className={cn('h-4.5 w-4.5', role.color)} />
                </div>
                <h3 className={cn('font-semibold', role.color)}>{role.role}</h3>
              </div>
              <p className="text-text-secondary-65 mb-4 text-xs leading-relaxed">
                {role.description}
              </p>
              <div className="space-y-1.5">
                {permissions.map((p) => (
                  <motion.div
                    key={p.key}
                    {...scrollReveal.list(index)}
                    className="flex items-center gap-2"
                  >
                    {role[p.key] ? (
                      <Check className="h-3.5 w-3.5 shrink-0 text-green-500" />
                    ) : (
                      <X className="text-text-secondary-65/40 h-3.5 w-3.5 shrink-0" />
                    )}
                    <span
                      className={cn(
                        'text-xs',
                        role[p.key]
                          ? 'text-text-secondary-65'
                          : 'text-text-secondary-65/40 line-through'
                      )}
                    >
                      {p.label}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Permissions table (desktop-only supplement) */}
      <motion.div
        {...scrollReveal.paragraph}
        className="border-border/40 bg-cream-95/60 mb-10 hidden overflow-hidden rounded-2xl border md:block"
      >
        <div className="border-border/30 border-b px-5 py-4">
          <h3 className="text-text-primary text-sm font-semibold">Role Permissions at a Glance</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-border/20 border-b">
                <th className="text-text-secondary-65 px-5 py-3 text-left font-medium">
                  Permission
                </th>
                {collaborationRoles.map((r) => (
                  <th
                    key={r.role}
                    className="text-text-secondary-65 px-3 py-3 text-center font-medium"
                  >
                    <span className={cn('font-semibold', r.color)}>{r.role}</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {permissions.map((p, i) => (
                <tr
                  key={p.key}
                  className={cn(
                    'border-border/10 border-b last:border-0',
                    i % 2 === 0 ? 'bg-transparent' : 'bg-cream-95/60'
                  )}
                >
                  <td className="text-text-secondary-65 px-5 py-3">{p.label}</td>
                  {collaborationRoles.map((r) => (
                    <td key={r.role} className="px-3 py-3 text-center">
                      {r[p.key] ? (
                        <CheckCircle2 className="mx-auto h-4 w-4 text-green-500" />
                      ) : (
                        <X className="text-text-secondary-65/30 mx-auto h-4 w-4" />
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* How to add a collaborator */}
      <motion.div
        {...scrollReveal.paragraph}
        className="border-brand-blue/20 bg-brand-blue/5 rounded-2xl border p-6"
      >
        <div className="mb-4 flex items-center gap-3">
          <div className="bg-brand-blue/10 flex h-9 w-9 items-center justify-center rounded-xl">
            <UserPlus className="text-brand-blue h-4.5 w-4.5" />
          </div>
          <h3 className="text-text-primary font-semibold">How to Add a Collaborator</h3>
        </div>
        <ol className="space-y-3">
          {addCollaboratorSteps.map((step, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="bg-brand-blue/10 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-semibold">
                {i + 1}
              </span>
              <span className="text-text-secondary-65 text-sm leading-relaxed">{step}</span>
            </li>
          ))}
        </ol>
        <div className="border-brand-blue/20 bg-brand-blue/5 mt-5 flex items-start gap-2 rounded-lg border p-3">
          <Info className="text-brand-blue mt-0.5 h-4 w-4 shrink-0" />
          <p className="text-text-secondary-65 text-xs leading-relaxed">
            <span className="text-brand-blue font-semibold">Tip:</span> You can have multiple
            co-authors and collaborators on a single story. There is no hard limit on team size.
          </p>
        </div>
      </motion.div>
    </section>
  );
}
