'use client';

import Link from 'next/link';

import { motion } from 'framer-motion';
import { AlertTriangle, Bell, Palette, Settings, ShieldAlert, Users } from 'lucide-react';
import { toast } from 'sonner';

import SettingSectionLoading from '@/components/common/story/setting-section-loading';
import StoryNotFound from '@/components/common/story/story-not-found';
import { StoryRoleGate } from '@/components/stories/story-role-context';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn, fadeIn } from '@/lib/utils';

import { AppearanceTab } from './appearance-tab';
import { CollaborationTab } from './collaboration-tab';
import { DangerTab } from './danger-tab';
import { GeneralTab } from './general-tab';
import { NotificationsTab } from './notifications-tab';
import type { SettingTab } from './setting-section.types';
import { useSettingSection } from './use-setting-section';

const tabs = [
  { id: 'general' as const, label: 'General', icon: Settings },
  { id: 'appearance' as const, label: 'Appearance', icon: Palette },
  { id: 'collaboration' as const, label: 'Collaboration', icon: Users },
  { id: 'notifications' as const, label: 'Notifications', icon: Bell },
  { id: 'danger' as const, label: 'Danger Zone', icon: AlertTriangle },
];

interface SettingSectionProps {
  slug: string;
}

function SettingsAccessDenied({ slug }: { slug: string }) {
  return (
    <div className="mx-auto flex w-full max-w-md flex-col items-center justify-center px-4 py-16 text-center">
      <div className="border-border/50 bg-card flex w-full flex-col items-center justify-center rounded-2xl border p-8 shadow-sm">
        <div className="border-brand-pink-500/20 bg-brand-pink-500/10 text-brand-pink-500 mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border shadow-2xs">
          <ShieldAlert className="h-7 w-7" />
        </div>
        <h3 className="text-text-primary mb-1.5 text-lg font-semibold tracking-tight">
          Access Restricted
        </h3>
        <p className="text-text-secondary-65 mb-6 max-w-xs text-xs leading-relaxed">
          You do not have permission to view or edit settings for this story. Only story owners and
          co-authors can access story settings.
        </p>
        <Button
          asChild
          className="bg-brand-pink-500 hover:bg-brand-pink-600 w-full cursor-pointer font-medium text-white shadow-2xs"
        >
          <Link href={`/stories/${slug}/overview`}>Back to Story Overview</Link>
        </Button>
      </div>
    </div>
  );
}

const SettingSection = ({ slug }: SettingSectionProps) => {
  const {
    activeTab,
    setActiveTab,
    settings,
    isLoading,
    cardPreview,
    coverPreview,
    cardUploading,
    coverUploading,
    handleSettingUpdate,
    handleImageUpload,
    setCardPreview,
    setCoverPreview,
  } = useSettingSection(slug);

  if (isLoading) return <SettingSectionLoading />;
  if (!settings) return <StoryNotFound onCreate={() => {}} />;

  return (
    <StoryRoleGate
      permission="canEditStorySettings"
      fallback={<SettingsAccessDenied slug={slug} />}
    >
      <motion.section className="mx-auto max-w-3xl px-4 pb-14">
        {/* Header */}
        <motion.div {...fadeIn(0.2)} className="mb-6">
          <h2 className="text-text-primary text-2xl font-bold">Story Settings</h2>
          <p className="text-text-secondary-65 mt-1 text-sm">
            Configure your story's visibility, appearance, and collaboration settings
          </p>
        </motion.div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as SettingTab)}>
          <motion.div {...fadeIn(0.3)} className="w-full">
            <TabsList className="border-border/50 bg-cream-95 mb-6 flex w-full items-center gap-1 overflow-x-auto rounded-lg border p-1">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                const isDanger = tab.id === 'danger';

                return (
                  <TabsTrigger
                    key={tab.id}
                    value={tab.id}
                    className={cn(
                      'flex items-center justify-center gap-1.5 rounded-md px-4 py-2 text-sm font-medium whitespace-nowrap transition-all',
                      'data-[state=active]:shadow-sm',
                      isActive
                        ? isDanger
                          ? 'bg-destructive/10 text-destructive'
                          : 'bg-brand-pink-500/10 text-brand-pink-500'
                        : isDanger
                          ? 'text-text-secondary-65 hover:bg-destructive/5 hover:text-destructive'
                          : 'text-text-secondary-65 hover:bg-muted/50 hover:text-text-primary'
                    )}
                  >
                    <Icon className="h-4 w-4 shrink-0" />
                    <span className="hidden sm:inline">{tab.label}</span>
                  </TabsTrigger>
                );
              })}
            </TabsList>
          </motion.div>

          <TabsContent value="general" className="mt-0">
            <GeneralTab settings={settings.settings} onSettingUpdate={handleSettingUpdate} />
          </TabsContent>

          <TabsContent value="appearance" className="mt-0">
            <AppearanceTab
              cardPreview={cardPreview}
              coverPreview={coverPreview}
              cardUploading={cardUploading}
              coverUploading={coverUploading}
              currentCardImage={settings.cardImage?.url}
              currentCoverImage={settings.coverImage?.url}
              onCardImageSelect={(f) => handleImageUpload(f, 'card')}
              onCoverImageSelect={(f) => handleImageUpload(f, 'cover')}
              onCardImageRemove={() => setCardPreview(null)}
              onCoverImageRemove={() => setCoverPreview(null)}
            />
          </TabsContent>

          <TabsContent value="collaboration" className="mt-0">
            <CollaborationTab settings={settings.settings} onSettingUpdate={handleSettingUpdate} />
          </TabsContent>

          <TabsContent value="notifications" className="mt-0">
            <NotificationsTab />
          </TabsContent>

          <TabsContent value="danger" className="mt-0">
            <DangerTab
              storyTitle={'Tide of the Azure Serpent'}
              onArchive={() => toast.info('Archive feature coming soon')}
              onTransferOwnership={() => toast.info('Transfer feature coming soon')}
              onDelete={() => toast.info('Delete feature coming soon')}
            />
          </TabsContent>
        </Tabs>
      </motion.section>
    </StoryRoleGate>
  );
};

export default SettingSection;
