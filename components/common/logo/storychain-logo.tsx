export function StorychainLogo({
  className = '',
  size = 'medium',
}: {
  className?: string;
  size?: 'small' | 'medium' | 'large' | 'xl';
}) {
  // Font sizes for each variant
  const fontSizes = {
    small: 16,
    medium: 22,
    large: 28,
    xl: 36,
  };

  const fontSize = fontSizes[size];
  const viewBoxWidth = fontSize * 10; // Adjust viewBox based on text size

  return (
    <svg
      viewBox={`0 0 ${viewBoxWidth} 50`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Outer glow effect using filters */}
      <defs>
        <filter id={`glow-${size}`} x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="3" result="blur" />
          <feOffset in="blur" dx="0" dy="3" result="offsetBlur" />
          <feFlood floodColor="#ec4899" floodOpacity="0.5" result="color" />
          <feComposite in="color" in2="offsetBlur" operator="in" result="shadow" />
          <feMerge>
            <feMergeNode in="shadow" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Soft shadow/glow layer */}
      <circle cx="25" cy="25" r="14" fill="#ec4899" opacity="0.2" />

      {/* Main pink circle with filter */}
      <circle cx="25" cy="25" r="11" fill="#ec4899" filter={`url(#glow-${size})`} />

      {/* Storychain text */}
      <text
        x="48"
        y={25 + fontSize * 0.35}
        fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
        fontSize={fontSize}
        fontWeight="600"
        fill="currentColor"
        letterSpacing="-0.5"
        className="text-(--font-playfair)"
      >
        Storychain
      </text>
    </svg>
  );
}
