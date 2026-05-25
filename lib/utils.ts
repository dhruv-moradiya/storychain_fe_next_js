import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const DEFAULT_AVATAR_URL =
  'https://i.pinimg.com/736x/15/7e/59/157e59bbf90bb9942734a34aef0529a4.jpg';

export const fadeIn = (delay = 0) => ({
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.45 },
});

// Scroll-based reveal animations for viewport entry
export const scrollReveal = {
  heading: {
    initial: { opacity: 0, y: 14 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-60px' },
    transition: { duration: 0.6, ease: 'easeOut' as const },
  },
  paragraph: {
    initial: { opacity: 0, y: 10 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-40px' },
    transition: { duration: 0.55, ease: 'easeOut' as const },
  },
  image: {
    initial: { opacity: 0, scale: 0.98 },
    whileInView: { opacity: 1, scale: 1 },
    viewport: { once: true, margin: '-40px' },
    transition: { duration: 0.65, ease: 'easeOut' as const },
  },
  card: (index: number) => ({
    initial: { opacity: 0, y: 12 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-30px' },
    transition: { duration: 0.5, delay: index * 0.08, ease: 'easeOut' as const },
  }),
  list: (index: number) => ({
    initial: { opacity: 0, x: -8 },
    whileInView: { opacity: 1, x: 0 },
    viewport: { once: true, margin: '-20px' },
    transition: { duration: 0.4, delay: index * 0.06, ease: 'easeOut' as const },
  }),
};

/**
 * Generates type-safe initials from a user's name string.
 * @param name The full name of the user (e.g. "Arjun Mehta" or undefined)
 * @param fallback The default fallback string to return if name is empty (default: "AD")
 * @returns A string representing the user's initials (up to 2 characters)
 */
export function getInitials(name?: string | null, fallback = 'AD'): string {
  if (!name || typeof name !== 'string') return fallback;

  const trimmed = name.trim();
  if (!trimmed) return fallback;

  const parts = trimmed.split(/\s+/).filter(Boolean);
  if (parts.length === 0) return fallback;

  if (parts.length === 1) {
    return parts[0].slice(0, 2).toUpperCase();
  }

  const firstInitial = parts[0][0] || '';
  const lastInitial = parts[parts.length - 1][0] || '';

  return (firstInitial + lastInitial).slice(0, 2).toUpperCase();
}
