import Image from 'next/image';

export function StorychainLogo({
  className = '',
  size = 'medium',
}: {
  className?: string;
  size?: 'small' | 'medium' | 'large' | 'xl';
}) {
  const heights = {
    small: 20,
    medium: 28,
    large: 36,
    xl: 48,
  };

  const height = heights[size];

  return (
    <div className={`relative ${className}`} style={{ height }}>
      <Image
        src="https://res.cloudinary.com/dpji4qfnu/image/upload/v1774158510/storychain-logo-raw-removebg-preview_mhethr.png"
        alt="Storychain Logo"
        height={height}
        width={height * 3}
        className="h-full w-auto object-contain"
        priority
      />
    </div>
  );
}
