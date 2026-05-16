import { IStoryOverview } from '@/type';
import { Globe2 } from 'lucide-react';

export const WorldTab = ({ story }: { story: IStoryOverview }) => {
  const worldItems = [
    { label: 'Genre', value: story.settings.genres.join(', ') || 'Not set' },
    { label: 'Content Rating', value: story.settings.contentRating },
    { label: 'Visibility', value: story.settings.isPublic ? 'Public' : 'Private' },
    { label: 'Branching', value: story.settings.allowBranching ? 'Allowed' : 'Locked' },
  ];
  return (
    <div className="border-soft space-y-4 rounded-xl border p-4 sm:p-5">
      <div>
        <h2 className="text-text-primary flex items-center gap-2 text-sm font-semibold sm:text-base">
          <Globe2 size={16} className="text-brand-pink-500 sm:h-4.5 sm:w-4.5" />
          About the World
        </h2>
        <p className="text-text-secondary-65 mt-1 text-xs sm:text-sm">
          The setting, tone, and rules behind this story.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {worldItems.map((item) => (
          <div key={item.label} className="border-soft rounded-lg border p-4">
            <p className="text-text-secondary-65 text-xs">{item.label}</p>
            <p className="text-text-primary mt-1 text-sm font-semibold">{item.value}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-3 lg:grid-cols-2">
        <div className="border-soft rounded-lg border p-4">
          <h3 className="text-text-primary text-sm font-semibold">World Description</h3>
          <div
            className="text-text-secondary mt-2 text-sm leading-6"
            dangerouslySetInnerHTML={{ __html: story.description }}
          />
        </div>
        <div className="border-soft rounded-lg border p-4">
          <h3 className="text-text-primary text-sm font-semibold">Key Elements</h3>
          <div className="mt-2 flex flex-wrap gap-2">
            {story.tags.length > 0 ? (
              story.tags.map((tag) => (
                <span
                  key={tag}
                  className="border-brand-pink-500/25 bg-brand-pink-500/5 text-brand-pink-500 rounded-full border px-3 py-1 text-xs"
                >
                  {tag}
                </span>
              ))
            ) : (
              <p className="text-text-secondary-65 text-sm">No story tags added yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
