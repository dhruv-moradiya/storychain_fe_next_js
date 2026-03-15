import { INVITABLE_ROLES, ROLE_CONFIG } from '@/constants';
import type { TStoryCollaboratorRole } from '@/type/story/story.types';
import { CheckCircle } from 'lucide-react';

import { cn } from '@/lib/utils';

interface RoleSelectorProps {
  value: TStoryCollaboratorRole;
  onChange: (role: TStoryCollaboratorRole) => void;
}

export function RoleSelector({ value, onChange }: RoleSelectorProps) {
  return (
    <div className="space-y-2.5">
      <label className="font-playfair text-text-primary block text-sm font-semibold tracking-tight">
        Select Role
      </label>

      <div className="grid grid-cols-2 gap-2.5">
        {INVITABLE_ROLES.map((role) => {
          const config = ROLE_CONFIG[role];
          if (!config) return null;

          const Icon = config.icon;
          const isSelected = value === role;

          return (
            <button
              key={role}
              type="button"
              onClick={() => onChange(role)}
              className={cn(
                'group relative flex flex-col items-start gap-1.5 rounded-xl border p-3 text-left transition-all duration-200',
                isSelected
                  ? 'border-brand-pink-500 from-brand-pink-500/10 to-brand-blue/5 shadow-brand-pink-shadow25 bg-linear-to-br shadow-md'
                  : 'border-border/50 hover:border-brand-pink-300/40 bg-white/60 hover:bg-white hover:shadow-sm'
              )}
            >
              <div className="flex w-full items-start justify-between">
                <div className="flex items-center gap-2">
                  <div
                    className={cn(
                      'rounded-lg p-1.5 transition-all',
                      isSelected
                        ? 'bg-brand-pink-500/15 text-brand-pink-600 shadow-sm'
                        : 'bg-muted/50 text-text-secondary-65 group-hover:bg-muted'
                    )}
                  >
                    <Icon className="h-3.5 w-3.5" />
                  </div>
                  <span
                    className={cn(
                      'text-[13px] font-semibold tracking-tight',
                      isSelected ? 'text-brand-pink-700' : 'text-text-primary'
                    )}
                  >
                    {config.label}
                  </span>
                </div>

                {isSelected && (
                  <div className="animate-in zoom-in-75 from-brand-pink-500 to-brand-pink-600 flex size-4 items-center justify-center rounded-full bg-linear-to-br duration-150">
                    <CheckCircle className="h-3 w-3 fill-white text-white" />
                  </div>
                )}
              </div>

              <p className="text-text-secondary-65 line-clamp-2 text-[10px] leading-relaxed">
                {config.description}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
