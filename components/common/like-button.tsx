import { useMemo } from 'react';

import { AnimatePresence, motion } from 'framer-motion';

type LikeButtonProps = {
  liked: boolean;
  onChange: (liked: boolean) => void;
  size?: number;
  color?: string;
  particleCount?: number;
  disabled?: boolean;
};

export default function LikeButton({
  liked,
  onChange,
  size = 56,
  color = '#ff4d6d',
  particleCount = 10,
  disabled = false,
}: LikeButtonProps) {
  const particles = useMemo(
    () =>
      Array.from({ length: particleCount }).map((_, i) => {
        const angle = (i * (360 / particleCount) * Math.PI) / 180;
        return {
          x: Math.cos(angle) * (size * 0.7),
          y: Math.sin(angle) * (size * 0.7),
          // eslint-disable-next-line react-hooks/purity
          scale: 0.5 + Math.random(),
        };
      }),
    [particleCount, size]
  );

  return (
    <button
      onClick={() => !disabled && onChange(!liked)}
      disabled={disabled}
      style={{
        background: 'none',
        border: 'none',
        cursor: disabled ? 'not-allowed' : 'pointer',
        position: 'relative',
        width: size * 1.6,
        height: size * 1.6,
        padding: 0,
      }}
    >
      {/* Particles */}
      <AnimatePresence>
        {liked &&
          particles.map((p, i) => (
            <motion.span
              key={i}
              initial={{
                opacity: 1,
                x: 0,
                y: 0,
                scale: 1,
              }}
              animate={{
                opacity: 0,
                x: p.x,
                y: p.y,
                scale: p.scale,
              }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 0.55,
                delay: i * 0.015,
                ease: 'easeOut',
              }}
              style={{
                position: 'absolute',
                left: '50%',
                top: '50%',
                width: size * 0.08,
                height: size * 0.08,
                borderRadius: '50%',
                background: color,
              }}
            />
          ))}
      </AnimatePresence>

      {/* Heart */}
      <motion.svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        animate={{
          scale: liked ? [1, 0.9, 1.25, 1] : 1,
        }}
        transition={{
          duration: 0.45,
          ease: [0.34, 1.56, 0.64, 1],
        }}
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        <motion.path
          d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 
             2 5.42 4.42 3 7.5 3 
             c1.74 0 3.41 0.81 4.5 2.09 
             C13.09 3.81 14.76 3 16.5 3 
             19.58 3 22 5.42 22 8.5 
             c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={false}
          animate={{
            fill: liked ? color : 'rgba(255,255,255,0)',
            strokeWidth: liked ? 1.5 : 1,
          }}
          transition={{
            fill: {
              delay: 0.12,
              duration: 0.25,
            },
            strokeWidth: {
              duration: 0.2,
            },
          }}
        />
      </motion.svg>
    </button>
  );
}
