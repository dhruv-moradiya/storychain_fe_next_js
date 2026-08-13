'use client';

import { useState } from 'react';

import { useUser } from '@clerk/nextjs';
import {
  AlertCircle,
  BookOpen,
  FileText,
  LayoutDashboard,
  Loader2,
  RefreshCw,
  Trophy,
} from 'lucide-react';

import { ContentLayout } from '@/components/dashboard/layout/content-layout';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  UserProfileAchievements,
  UserProfileActivity,
  UserProfileBio,
  UserProfileHeader,
  UserProfileStats,
  UserProfileStories,
} from '@/components/user-profile';
import { FadeInView } from '@/lib/animations';
import { cn } from '@/lib/utils';
import { useGetUserDetailByClerkId, useMe } from '@/services/users/user.query';

const triggerClass = cn(
  'data-[state=active]:text-primary [&:after]:bg-primary h-auto! flex-none gap-2 rounded-none px-3 text-xs sm:px-5 sm:text-sm font-medium'
);

export default function UserProfileView({ userId }: { userId: string }) {
  const [activeTab, setActiveTab] = useState('overview');
  const { user: currentClerkUser } = useUser();
  const { data: meData } = useMe();
  const { data, isLoading, isError, error, refetch } = useGetUserDetailByClerkId(userId);

  const loggedInClerkId = currentClerkUser?.id || meData?.data?.clerkId;
  const isOwnProfile = !!loggedInClerkId && loggedInClerkId === userId;

  if (isLoading) {
    return (
      <ContentLayout maxWidth="7xl" paddingSize="lg">
        <div className="flex flex-col items-center justify-center py-24">
          <Loader2 className="text-primary mb-4 h-10 w-10 animate-spin" />
          <p className="text-muted-foreground text-sm font-medium">Loading user profile...</p>
        </div>
      </ContentLayout>
    );
  }

  if (isError || !data || !data.user) {
    return (
      <ContentLayout maxWidth="7xl" paddingSize="lg">
        <div className="border-destructive/30 bg-destructive/5 mx-auto my-12 max-w-md rounded-2xl border p-8 text-center shadow-lg">
          <AlertCircle className="text-destructive mx-auto mb-3 h-12 w-12" />
          <h2 className="text-foreground text-xl font-bold">User Not Found</h2>
          <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
            {error instanceof Error ? error.message : 'Unable to load profile for this user.'}
          </p>
          <div className="mt-6 flex justify-center gap-3">
            <Button variant="outline" onClick={() => refetch()} className="border-border gap-2">
              <RefreshCw className="h-4 w-4" /> Try Again
            </Button>
          </div>
        </div>
      </ContentLayout>
    );
  }

  const { user, stories, achievements, chaptersWritten } = data;

  return (
    <ContentLayout maxWidth="7xl" paddingSize="md" spacingSize="lg">
      <div className="space-y-6 pb-16">
        {/* Profile Header */}
        <FadeInView>
          <UserProfileHeader
            user={{
              clerkId: user.clerkId,
              username: user.username,
              email: user.email,
              avatarUrl: user.avatarUrl,
              bio: user.bio,
              joinedAt: user.createdAt,
              level: user.level,
              levelTitle: user.levelTitle,
              xp: user.xp,
              nextLevelXp: user.nextLevelXp,
              role:
                (user as { role?: string }).role || (isOwnProfile ? meData?.data?.role : undefined),
            }}
            isOwnProfile={isOwnProfile}
          />
        </FadeInView>

        {/* Stats Row */}
        <FadeInView delay={0.05}>
          <UserProfileStats stats={user.stats} />
        </FadeInView>

        {/* Tabbed Navigation (referencing Story Overview routes) */}
        <FadeInView delay={0.1}>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList
              variant="line"
              className="border-border/50 bg-background/60 h-auto! w-full justify-start rounded-[10px]! border px-3 py-2!"
            >
              <TabsTrigger value="overview" className={triggerClass}>
                <LayoutDashboard size={16} />
                <span>Overview</span>
              </TabsTrigger>
              <TabsTrigger value="stories" className={triggerClass}>
                <BookOpen size={16} />
                <span>Stories ({stories.length})</span>
              </TabsTrigger>
              <TabsTrigger value="chapters" className={triggerClass}>
                <FileText size={16} />
                <span>Written Chapters ({chaptersWritten.length})</span>
              </TabsTrigger>
              <TabsTrigger value="achievements" className={triggerClass}>
                <Trophy size={16} />
                <span>Achievements</span>
              </TabsTrigger>
            </TabsList>

            {/* Overview Tab Content */}
            <TabsContent value="overview">
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
                {/* Left Column (About & Achievements Summary) */}
                <div className="space-y-6 lg:col-span-4">
                  <UserProfileBio
                    user={{
                      bio: user.bio,
                      email: user.email,
                      joinedAt: user.createdAt,
                    }}
                  />

                  <UserProfileAchievements
                    badges={achievements?.badges}
                    achievements={achievements}
                  />
                </div>

                {/* Right Column (Featured Stories & Activity) */}
                <div className="space-y-6 lg:col-span-8">
                  <UserProfileStories stories={stories} username={user.username} />

                  <UserProfileActivity chaptersWritten={chaptersWritten} />
                </div>
              </div>
            </TabsContent>

            {/* Stories Tab Content */}
            <TabsContent value="stories">
              <UserProfileStories stories={stories} username={user.username} />
            </TabsContent>

            {/* Chapters Tab Content */}
            <TabsContent value="chapters">
              <UserProfileActivity chaptersWritten={chaptersWritten} />
            </TabsContent>

            {/* Achievements Tab Content */}
            <TabsContent value="achievements">
              <UserProfileAchievements badges={achievements?.badges} achievements={achievements} />
            </TabsContent>
          </Tabs>
        </FadeInView>
      </div>
    </ContentLayout>
  );
}
