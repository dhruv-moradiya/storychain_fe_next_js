'use client';

import { Compass, Key, Pen, Sparkles, Users } from 'lucide-react';

export function CharacterQuickFacts() {
  return (
    <div className="border-soft bg-background/50 space-y-5 rounded-2xl border p-5 md:p-6">
      {/* Title */}
      <div className="flex items-center gap-2">
        <Sparkles className="text-brand-pink-500 h-5 w-5 shrink-0" />
        <h3 className="text-text-primary text-base font-semibold">Quick Facts</h3>
      </div>

      {/* Facts List */}
      <div className="space-y-3.5 pt-1">
        <FactItem
          icon={<Compass size={14} className="text-brand-pink-500" />}
          text="Carries a small compass given by his father."
        />
        <FactItem
          icon={<Pen size={14} className="text-brand-pink-500" />}
          text="Has a habit of sketching ships in his journal."
        />
        <FactItem
          icon={<Users size={14} className="text-brand-pink-500" />}
          text="Knows local dock workers and sailors well."
        />
        <FactItem
          icon={<Key size={14} className="text-brand-pink-500" />}
          text="Secretly learns about navigation."
        />
      </div>
    </div>
  );
}

function FactItem({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex items-start gap-3">
      <span className="bg-brand-pink-500/10 mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded">
        {icon}
      </span>
      <p className="text-text-secondary text-xs leading-relaxed sm:text-sm">{text}</p>
    </div>
  );
}
