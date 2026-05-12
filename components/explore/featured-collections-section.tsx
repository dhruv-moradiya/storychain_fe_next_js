import Image from 'next/image';

import { ArrowRight } from 'lucide-react';

const COLLECTIONS = [
  {
    title: 'Best Horror of 2025',
    description: 'The most terrifying tales crafted by our community this year.',
    storyCount: 15,
    image: 'https://i.pinimg.com/1200x/dc/49/67/dc49670e2a7f1fa64a7d6c206514118b.jpg',
    color: 'from-zinc-900 to-zinc-800',
  },
  {
    title: 'Fantasy Worlds to Get Lost In',
    description: 'Epic sagas with rich magic systems and sprawling lore.',
    storyCount: 24,
    image: 'https://i.pinimg.com/1200x/0a/16/61/0a1661c44d8301b97eb8e4496b9713e3.jpg',
    color: 'from-brand-purple/80 to-brand-purple',
  },
];

export function FeaturedCollectionsSection() {
  return (
    <section className="mb-16 space-y-6">
      <div className="flex flex-col gap-1">
        <h2 className="font-libre-baskerville text-foreground text-2xl font-bold tracking-tight sm:text-3xl">
          Featured Collections
        </h2>
        <p className="text-muted-foreground text-sm sm:text-base">
          Handpicked thematic bundles by the Storychain team
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {COLLECTIONS.map((collection) => (
          <div
            key={collection.title}
            className="group relative flex h-64 cursor-pointer flex-col justify-end overflow-hidden rounded-2xl border shadow-sm transition-shadow hover:shadow-md"
          >
            <Image
              src={collection.image}
              alt={collection.title}
              fill
              className="object-cover opacity-60 transition-transform duration-700 group-hover:scale-105"
            />
            <div
              className={`absolute inset-0 bg-gradient-to-t ${collection.color} opacity-80 mix-blend-multiply`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

            <div className="relative z-10 p-6 sm:p-8">
              <span className="mb-2 inline-block rounded-full bg-white/20 px-3 py-1 text-xs font-semibold text-white backdrop-blur-md">
                {collection.storyCount} Stories
              </span>
              <h3 className="font-libre-baskerville mb-2 text-2xl font-bold text-white sm:text-3xl">
                {collection.title}
              </h3>
              <div className="flex items-center justify-between">
                <p className="line-clamp-2 max-w-[80%] text-sm text-white/80">
                  {collection.description}
                </p>
                <div className="group-hover:bg-brand-pink-500 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition-colors">
                  <ArrowRight size={20} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
