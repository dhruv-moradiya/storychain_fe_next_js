import React from 'react';

export default function FontsPage() {
  const fonts = [
    {
      name: 'Sans (Inter/Geist)',
      class: 'font-sans',
      weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
    },
    {
      name: 'Serif (Lora)',
      class: 'font-serif',
      weights: [400, 500, 600, 700],
    },
    {
      name: 'Mono (Fira Code)',
      class: 'font-mono',
      weights: [300, 400, 500, 600, 700],
    },
    {
      name: 'Yellowtail',
      class: 'font-yellowtail',
      weights: [400],
    },
    {
      name: 'Playfair',
      class: 'font-playfair',
      weights: [300, 400, 500, 700, 800],
    },
    {
      name: 'Libre Baskerville',
      class: 'font-libre-baskerville',
      weights: [400, 500, 600, 800],
    },
    {
      name: 'IBM Plex Mono',
      class: 'font-ibm-plex-mono',
      weights: [100, 200, 300, 400, 500, 600, 700],
    },
  ];

  const sizes = [
    { name: 'xs', class: 'text-xs' },
    { name: 'sm', class: 'text-sm' },
    { name: 'base', class: 'text-base' },
    { name: 'lg', class: 'text-lg' },
    { name: 'xl', class: 'text-xl' },
    { name: '2xl', class: 'text-2xl' },
    { name: '4xl', class: 'text-4xl' },
  ];

  return (
    <div className="bg-bg-cream text-text-primary min-h-screen p-8">
      <main className="mx-auto max-w-6xl space-y-16">
        <div className="space-y-4 text-center">
          <h1 className="font-serif text-5xl font-bold">StoryChain Typography</h1>
          <p className="text-text-secondary text-xl">
            A showcase of the typography available in the project, including weights and sizes.
          </p>
        </div>

        <div className="space-y-12">
          {fonts.map((font) => (
            <div
              key={font.name}
              className="space-y-6 rounded-2xl border border-black/5 bg-white/50 p-8 shadow-sm"
            >
              <div className="flex items-center justify-between border-b border-black/5 pb-4">
                <h2 className="text-text-primary text-2xl font-bold">{font.name}</h2>
                <code className="text-text-secondary rounded bg-black/5 px-2 py-1 font-mono text-sm">
                  .{font.class}
                </code>
              </div>

              {/* Sizes Showcase */}
              <div className="space-y-4">
                <h3 className="text-text-tertiary text-sm font-semibold tracking-wider uppercase">
                  Sizes
                </h3>
                <div className="flex flex-col items-start gap-2 overflow-hidden">
                  <div className={`whitespace-nowrap ${font.class} text-3xl`}>
                    The quick brown fox jumps over the lazy dog.
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {sizes.map((size) => (
                    <div key={size.name} className="flex items-baseline gap-4">
                      <span className="text-text-tertiary w-12 shrink-0 font-mono text-xs">
                        {size.name}
                      </span>
                      <span className={`${font.class} ${size.class} truncate`}>
                        StoryChain Visualization
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Weights Showcase */}
              <div className="space-y-4">
                <h3 className="text-text-tertiary text-sm font-semibold tracking-wider uppercase">
                  Weights
                </h3>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {font.weights.map((weight) => (
                    <div key={weight} className="space-y-1">
                      <div className="text-text-tertiary flex items-center justify-between font-mono text-xs">
                        <span>{weight}</span>
                        <span>font-{weight}</span>
                      </div>
                      <div
                        className={`${font.class} text-2xl leading-tight`}
                        style={{ fontWeight: weight }}
                      >
                        Aa Bb Cc Dd
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
