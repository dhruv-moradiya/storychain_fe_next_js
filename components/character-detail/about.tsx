'use client';

import {
  AlertTriangle,
  BookOpen,
  Globe,
  GraduationCap,
  Languages,
  MapPin,
  Sparkles,
  Target,
  ThumbsDown,
  User,
  Users,
} from 'lucide-react';

export function CharacterAbout() {
  return (
    <div className="border-soft bg-background/50 space-y-6 rounded-2xl border p-5 md:p-6">
      {/* Title */}
      <div className="border-soft flex items-center gap-2 border-b pb-4">
        <BookOpen className="text-brand-pink-500 h-5 w-5 shrink-0" />
        <h2 className="text-text-primary text-base font-semibold">About Aarav</h2>
      </div>

      {/* Description Paragraphs */}
      <div className="text-text-secondary space-y-4 text-xs leading-relaxed font-medium sm:text-sm">
        <p>
          Born into a respected trading family in Surat, Aarav was trained from a young age in the
          ways of commerce. Though intelligent and capable, he often questions the secrets and
          silence surrounding the late-night shipments that arrive at the docks.
        </p>
        <p>
          His curiosity leads him down a path of danger, uncovering a web of illegal trade, hidden
          alliances, and long-buried family secrets.
        </p>
      </div>

      {/* Details List */}
      <div className="divide-border/30 divide-y pt-2">
        <AboutRow
          icon={<User size={14} className="text-brand-pink-500" />}
          label="Full Name"
          value="Aarav Virendrasinh"
        />
        <AboutRow
          icon={<Globe size={14} className="text-brand-pink-500" />}
          label="Nationality"
          value="Indian (Gujarati)"
        />
        <AboutRow
          icon={<Languages size={14} className="text-brand-pink-500" />}
          label="Languages"
          value="Gujarati, Hindustani, Some Arabic"
        />
        <AboutRow
          icon={<MapPin size={14} className="text-brand-pink-500" />}
          label="Birthplace"
          value="Surat, Gujarat"
        />
        <AboutRow
          icon={<Users size={14} className="text-brand-pink-500" />}
          label="Family"
          value="Son of Virendrasinh (Merchant), Younger brother to Devanshi"
        />
        <AboutRow
          icon={<GraduationCap size={14} className="text-brand-pink-500" />}
          label="Education"
          value="Trained in Trade, Accounting, Navigation"
        />
        <AboutRow
          icon={<Target size={14} className="text-brand-pink-500" />}
          label="Goal"
          value="Uncover the truth and protect his family"
        />
        <AboutRow
          icon={<AlertTriangle size={14} className="text-brand-pink-500" />}
          label="Greatest Fear"
          value="Losing the ones he loves"
        />
        <AboutRow
          icon={<Sparkles size={14} className="text-brand-pink-500" />}
          label="Strengths"
          value="Brave, Intelligent, Observant, Loyal"
        />
        <AboutRow
          icon={<ThumbsDown size={14} className="text-brand-pink-500" />}
          label="Weaknesses"
          value="Impulsive, Stubborn, Overthinks"
        />
      </div>
    </div>
  );
}

interface AboutRowProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

function AboutRow({ icon, label, value }: AboutRowProps) {
  return (
    <div className="flex flex-col gap-1 py-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
      <div className="flex shrink-0 items-center gap-2">
        <span className="bg-brand-pink-500/10 flex h-5 w-5 items-center justify-center rounded">
          {icon}
        </span>
        <span className="text-text-secondary-65 text-xs">{label}</span>
      </div>
      <span className="text-text-primary max-w-sm pl-7 text-xs sm:pl-0 sm:text-right sm:text-sm">
        {value}
      </span>
    </div>
  );
}
