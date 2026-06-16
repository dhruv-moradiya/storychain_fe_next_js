import * as React from 'react';

import {
  Calendar,
  CircleDot,
  Globe,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  Ticket,
  User,
  UserCheck,
} from 'lucide-react';

import createBadge from '@/components/common/badge';

interface InfoItemProps {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: React.ReactNode;
}

const InfoItem = ({ icon: Icon, label, value }: InfoItemProps) => {
  return (
    <div className="grid grid-cols-[12rem_1fr] items-center py-2.5">
      <div className="text-text-secondary-65 flex items-center gap-3">
        <Icon className="text-text-secondary-50 h-4.5 w-4.5 shrink-0" />
        <span className="text-sm font-medium">{label}</span>
      </div>
      <div className="text-text-primary text-sm">{value}</div>
    </div>
  );
};

export const UserInfo = () => {
  return (
    <div className="border-border/50 bg-cream-95/80 dark:bg-card/50 relative col-span-4 overflow-hidden rounded-xl border p-6 shadow-2xs">
      <h3 className="text-text-primary mb-6 text-lg font-bold">User Information</h3>

      <div className="flex flex-col">
        <InfoItem icon={User} label="Full Name" value="Arjun Mehta" />
        <InfoItem icon={Mail} label="Email" value="arjun.mehta@example.com" />
        <InfoItem icon={Phone} label="Phone" value="+91 98765 43210" />
        <InfoItem icon={Calendar} label="Date of Birth" value="January 15, 1995" />
        <InfoItem icon={User} label="Gender" value="Male" />
        <InfoItem icon={MapPin} label="Country" value="India" />
        <InfoItem icon={Globe} label="Language" value="English" />
        <InfoItem icon={Ticket} label="Referral Code" value="ARJUN2024" />
        <InfoItem icon={UserCheck} label="Referred By" value="Priya Sharma (USR-1002)" />

        <InfoItem
          icon={CircleDot}
          label="Account Status"
          value={createBadge({
            label: 'Active',
            size: 'sm',
            color: 'emerald',
            mono: false,
          })}
        />

        <InfoItem
          icon={ShieldCheck}
          label="Email Verified"
          value={createBadge({
            label: 'Yes',
            size: 'sm',
            color: 'emerald',
            mono: false,
          })}
        />

        <InfoItem
          icon={Phone}
          label="Phone Verified"
          value={createBadge({
            label: 'Yes',
            size: 'sm',
            color: 'emerald',
            mono: false,
          })}
        />
      </div>
    </div>
  );
};
