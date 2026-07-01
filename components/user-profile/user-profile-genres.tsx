'use client';

import { motion } from 'framer-motion';

interface Genre {
  name: string;
  percentage: number;
  color: string;
}

interface UserProfileGenresProps {
  genres: Genre[];
}

function UserProfileGenres({ genres }: UserProfileGenresProps) {
  // Build SVG donut chart
  const size = 100;
  const radius = 38;
  const cx = 50;
  const cy = 50;
  const circumference = 2 * Math.PI * radius;

  const segments = genres.map((genre, index) => {
    const startPercent = genres.slice(0, index).reduce((sum, g) => sum + g.percentage, 0);
    return { ...genre, startPercent };
  });

  function getArcPath(startPercent: number, percent: number) {
    const start = (startPercent / 100) * circumference;
    const len = (percent / 100) * circumference;
    return { strokeDasharray: `${len} ${circumference - len}`, strokeDashoffset: -start };
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="border-border/50 bg-cream-95 rounded-xl border p-5"
    >
      <h3 className="text-text-primary mb-4 font-semibold">Top Genres</h3>

      <div className="flex items-center gap-5">
        {/* Donut chart */}
        <div className="relative shrink-0">
          <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
            {segments.map((seg) => {
              const arc = getArcPath(seg.startPercent, seg.percentage);
              return (
                <circle
                  key={seg.name}
                  cx={cx}
                  cy={cy}
                  r={radius}
                  fill="none"
                  stroke={seg.color}
                  strokeWidth="20"
                  strokeDasharray={arc.strokeDasharray}
                  strokeDashoffset={arc.strokeDashoffset}
                />
              );
            })}
          </svg>
        </div>

        {/* Legend */}
        <div className="space-y-2">
          {genres.map((genre) => (
            <div key={genre.name} className="flex items-center gap-2">
              <span
                className="h-2.5 w-2.5 flex-shrink-0 rounded-full"
                style={{ backgroundColor: genre.color }}
              />
              <span className="text-text-secondary text-xs">{genre.name}</span>
              <span className="text-text-primary ml-auto pl-3 text-xs font-semibold">
                {genre.percentage}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export { UserProfileGenres };
