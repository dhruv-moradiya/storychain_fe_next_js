import * as React from 'react';

import { Box, Clock, Cpu, Globe, History, Smartphone } from 'lucide-react';

import { cn } from '@/lib/utils';

interface DeviceItemProps {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: React.ReactNode;
}

const DeviceItem = ({ icon: Icon, label, value }: DeviceItemProps) => {
  return (
    <div className="grid grid-cols-[10rem_1fr] items-center py-2.5">
      <div className="text-text-secondary-65 flex items-center gap-3">
        <Icon className="text-text-secondary-50 h-4.5 w-4.5 shrink-0" />
        <span className="text-sm font-medium">{label}</span>
      </div>
      <div className="text-text-primary text-sm font-semibold">{value}</div>
    </div>
  );
};

export const DeviceLoginDetails = () => {
  return (
    <div className="border-border/50 bg-cream-95/80 dark:bg-card/50 relative col-span-4 overflow-hidden rounded-xl border p-6 shadow-2xs">
      <h3 className="text-text-primary mb-6 text-lg font-bold">Device &amp; Login Details</h3>

      <div className="flex flex-col">
        <DeviceItem icon={Smartphone} label="Device" value="iPhone 14 Pro" />
        <DeviceItem icon={Cpu} label="OS" value="iOS 17.4.1" />
        <DeviceItem icon={Box} label="App Version" value="2.4.1" />
        <DeviceItem icon={Globe} label="Last Login IP" value="103.21.244.12" />
        <DeviceItem icon={Clock} label="Last Login" value="May 16, 2024, 10:30 AM" />
        <DeviceItem
          icon={History}
          label="Login History"
          value={
            <button className="bg-brand-pink-500/10 hover:bg-brand-pink-500/15 text-brand-pink-500 h-8 cursor-pointer rounded-lg px-4 text-xs font-bold transition-all duration-200">
              View History
            </button>
          }
        />
      </div>
    </div>
  );
};
