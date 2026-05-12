import Image from 'next/image';

import { LockKeyhole, Sparkles } from 'lucide-react';

import { Button } from '@/components/ui/button';

const PERSONALIZED_STORIES = [
  {
    title: 'The Outlaws of Neon City',
    reason: 'Because you read "Cyberpunk: Neon Genesis"',
    image: 'https://i.pinimg.com/736x/74/91/5c/74915cfe2e29d53bafb269ffa0a6c1dc.jpg',
  },
  {
    title: 'Whispers in the Manor',
    reason: "Similar tags to stories you've read",
    image: 'https://i.pinimg.com/1200x/dc/49/67/dc49670e2a7f1fa64a7d6c206514118b.jpg',
  },
  {
    title: 'Echoes of the Forgotten Empire',
    reason: 'Top rated in Fantasy',
    image: 'https://i.pinimg.com/1200x/0a/16/61/0a1661c44d8301b97eb8e4496b9713e3.jpg',
  },
];

interface PersonalizedSectionProps {
  isAuthenticated?: boolean;
}

export function PersonalizedSection({ isAuthenticated = false }: PersonalizedSectionProps) {
  return (
    <section className="from-brand-pink-50/50 to-brand-purple/5 dark:from-brand-pink-950/20 dark:to-brand-purple/10 mb-16 space-y-6 rounded-2xl border bg-gradient-to-br p-6 sm:p-8">
      <div className="flex flex-col gap-1">
        <h2 className="font-libre-baskerville text-foreground flex items-center gap-2 text-2xl font-bold tracking-tight sm:text-3xl">
          <Sparkles className="text-brand-pink-500" /> Picked For You
        </h2>
        <p className="text-muted-foreground text-sm sm:text-base">
          Personalized recommendations based on your reading history
        </p>
      </div>

      {!isAuthenticated ? (
        <div className="bg-background/50 flex flex-col items-center justify-center rounded-xl border border-dashed py-12 text-center backdrop-blur-sm">
          <div className="bg-muted mb-4 flex h-12 w-12 items-center justify-center rounded-full">
            <LockKeyhole className="text-muted-foreground" />
          </div>
          <h3 className="font-libre-baskerville mb-2 text-xl font-bold">
            Sign up to get personalized story picks
          </h3>
          <p className="text-muted-foreground mb-6 max-w-md text-sm">
            We analyze your reading history, favorite genres, and branch choices to find stories
            you'll absolutely love.
          </p>
          <div className="flex gap-3">
            <Button className="bg-brand-pink-500 hover:bg-brand-pink-600 rounded-full px-6 text-white">
              Create Account
            </Button>
            <Button variant="outline" className="rounded-full px-6">
              Log In
            </Button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {PERSONALIZED_STORIES.map((story) => (
            <div key={story.title} className="group cursor-pointer space-y-3">
              <div className="relative aspect-square w-full overflow-hidden rounded-xl shadow-sm">
                <Image
                  src={story.image}
                  alt={story.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div>
                <h3 className="font-libre-baskerville group-hover:text-brand-pink-500 text-lg leading-tight font-bold transition-colors">
                  {story.title}
                </h3>
                <p className="text-muted-foreground mt-1 text-xs">
                  <span className="text-brand-purple flex items-center gap-1.5 font-medium">
                    <Sparkles size={12} /> Match:
                  </span>{' '}
                  {story.reason}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
