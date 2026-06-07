'use client';

import { useState } from 'react';

import { Plus } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';

export const CoinPackagesTabs = () => {
  const [activeTab, setActiveTab] = useState('packages');

  return (
    <div className="flex flex-col gap-6">
      {/* Tabs Header with Add Package Button */}
      <div className="border-border flex items-center justify-between border-b">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList variant="line" className="w-fit gap-0 bg-transparent p-0">
            <TabsTrigger
              value="packages"
              className={cn(
                'text-text-secondary data-[state=active]:border-b-brand-pink-500 data-[state=active]:text-brand-pink-500 relative rounded-none border-b-2 border-transparent px-0 py-3 font-medium transition-colors',
                activeTab === 'packages' ? 'text-brand-pink-500' : 'text-text-secondary'
              )}
            >
              💰 Coin Packages
            </TabsTrigger>
            <TabsTrigger
              value="settings"
              className={cn(
                'text-text-secondary data-[state=active]:border-brand-pink-500 data-[state=active]:text-brand-pink-500 relative ml-8 rounded-none border-b-2 border-transparent px-0 py-3 font-medium transition-colors',
                activeTab === 'settings' ? 'text-brand-pink-500' : 'text-text-secondary'
              )}
            >
              ⚙️ Coin Settings
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Add Package Button */}
        {activeTab === 'packages' && (
          <Button
            size="sm"
            className="bg-brand-pink-500 hover:bg-brand-pink-600 ml-auto shrink-0 gap-2"
          >
            <Plus className="size-4" />
            Add Package
          </Button>
        )}
      </div>

      {/* Tab Contents */}
      <div className="mt-6">
        {activeTab === 'packages' && (
          <div>
            {/* Coin Packages Content */}
            <p className="text-text-secondary text-sm">Coin packages content goes here...</p>
          </div>
        )}

        {activeTab === 'settings' && (
          <div>
            {/* Coin Settings Content */}
            <p className="text-text-secondary text-sm">Coin settings content goes here...</p>
          </div>
        )}
      </div>
    </div>
  );
};
