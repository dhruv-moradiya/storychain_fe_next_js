'use client';

import { motion } from 'framer-motion';

import {
  UserProfileAchievements,
  UserProfileActivity,
  UserProfileBio,
  UserProfileGenres,
  UserProfileHeader,
  UserProfileNewsletter,
  UserProfileReviews,
  UserProfileSpotlight,
  UserProfileStats,
  UserProfileStories,
} from '@/components/user-profile';

import { ContentLayout } from '../dashboard';

// Static mock user data
const mockUser = {
  id: 'user_123',
  username: 'fantasy_writer',
  fullName: 'Elena Martinez',
  email: 'elena.martinez@example.com',
  avatarUrl: 'https://i.pinimg.com/736x/4c/ab/77/4cab77de6b83b7e3149ce03867194ea5.jpg',
  coverUrl: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1200',
  bio: 'Passionate storyteller crafting epic fantasy worlds. Creator of the Chronicles of Eldoria series. Always looking for fellow writers to collaborate with on new adventures.',
  location: 'San Francisco, CA',
  joinedAt: new Date('2023-06-15'),
  isVerified: true,
  isPro: true,
  stats: {
    stories: 12,
    chapters: 156,
    words: 485000,
    followers: 2847,
    following: 189,
    totalReads: 125000,
    totalLikes: 8934,
    avgRating: 4.7,
  },
  badges: [
    { id: '1', name: 'Story Legend', rarity: 'legendary' as const },
    { id: '2', name: 'On Fire', rarity: 'epic' as const },
    { id: '3', name: 'Wordsmith', rarity: 'rare' as const },
    { id: '4', name: 'First Story', rarity: 'common' as const },
  ],
  stories: [
    {
      id: '1',
      title: 'Chronicles of Eldoria',
      slug: 'chronicles-of-eldoria',
      coverUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400',
      genre: 'Fantasy',
      rating: 4.8,
      reads: 45000,
      chapters: 47,
      description: 'A realm in shadows, a hero rises, and an ancient prophecy awakens.',
    },
    {
      id: '2',
      title: 'The Shadow Realm',
      slug: 'the-shadow-realm',
      coverUrl: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=400',
      genre: 'Dark Fantasy',
      rating: 4.6,
      reads: 32000,
      chapters: 35,
      description: 'When darkness whispers, legends are born.',
    },
    {
      id: '3',
      title: 'Starfall Academy',
      slug: 'starfall-academy',
      coverUrl: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=400',
      genre: 'Sci-Fi',
      rating: 4.5,
      reads: 28000,
      chapters: 28,
      description: 'In a galaxy of endless possibilities, some destinies are written in starlight.',
    },
  ],
  socialLinks: {
    twitter: 'fantasy_elena',
    instagram: 'elenawritesfantasy',
  },
};

const mockActivities = [
  {
    type: 'chapter' as const,
    title: 'Chronicles of Eldoria · Chapter 24',
    subtitle: 'The battle for Eldoria begins.',
    date: '2 days ago',
    imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=96',
  },
  {
    type: 'reads' as const,
    title: 'Starfall Academy',
    subtitle: 'Thank you to all my readers! 🚀',
    date: '1 week ago',
    imageUrl: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=96',
  },
  {
    type: 'story' as const,
    title: 'The Shadow Realm',
    subtitle: 'A dark fantasy adventure awaits.',
    date: '2 weeks ago',
    imageUrl: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=96',
  },
  {
    type: 'badge' as const,
    title: 'On Fire',
    subtitle: 'Published 5 chapters in 30 days',
    date: '3 weeks ago',
    imageUrl: undefined,
  },
];

const mockGenres = [
  { name: 'Fantasy', percentage: 68, color: '#7c3aed' },
  { name: 'Dark Fantasy', percentage: 18, color: '#10b981' },
  { name: 'Sci-Fi', percentage: 9, color: '#3b82f6' },
  { name: 'Adventure', percentage: 5, color: '#f59e0b' },
];

const mockSpotlight = {
  quote: 'Elena has a gift for weaving magic into every word.',
  author: 'Fantasy Fan',
};

const mockReviews = [
  {
    id: '1',
    author: 'LunaStar',
    avatarUrl: 'https://i.pravatar.cc/36?img=1',
    date: '2 days ago',
    rating: 5,
    comment:
      'Absolutely captivating! The world-building is incredible and the characters feel so real.',
  },
  {
    id: '2',
    author: 'BookWanderer',
    avatarUrl: 'https://i.pravatar.cc/36?img=2',
    date: '1 week ago',
    rating: 5,
    comment: 'Every chapter leaves me wanting more. Elena is a true wordsmith!',
  },
  {
    id: '3',
    author: 'DreamChaser',
    avatarUrl: 'https://i.pravatar.cc/36?img=3',
    date: '2 weeks ago',
    rating: 5,
    comment: 'The Chronicles of Eldoria is my new favorite series. Highly recommend!',
  },
];

export default function UserProfileView({}: { userId: string }) {
  // In real implementation, fetch user by userId
  const user = mockUser;

  return (
    <ContentLayout maxWidth="7xl">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pb-16">
        {/* Header card with avatar, name, bio, social links */}
        <UserProfileHeader user={user} />

        {/* Main content */}
        <div className="mx-auto mt-6 max-w-5xl px-4 sm:px-6">
          {/* Stats Row */}
          <UserProfileStats stats={user.stats} />

          {/* Two Column Layout */}
          <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-12">
            {/* Left column */}
            <div className="space-y-6 lg:col-span-4">
              {/* About */}
              <UserProfileBio user={user} />

              {/* Achievements */}
              <UserProfileAchievements badges={user.badges} />
            </div>

            {/* Right column */}
            <div className="space-y-6 lg:col-span-8">
              {/* Featured Stories */}
              <UserProfileStories stories={user.stories} username={user.username} />

              {/* Recent Activity */}
              <UserProfileActivity activities={mockActivities} />
            </div>
          </div>

          {/* Bottom section: Genres | Newsletter | Spotlight */}
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <UserProfileGenres genres={mockGenres} />
            <UserProfileNewsletter />
            <UserProfileSpotlight spotlight={mockSpotlight} />
          </div>

          {/* Reader Reviews */}
          <div className="mt-6">
            <UserProfileReviews reviews={mockReviews} />
          </div>
        </div>
      </motion.div>
    </ContentLayout>
  );
}
