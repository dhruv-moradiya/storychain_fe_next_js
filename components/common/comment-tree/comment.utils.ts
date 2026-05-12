export function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

export const DEPTH_ACCENT_COLORS = [
  'var(--brand-pink-500)',
  'var(--brand-blue)',
  'var(--brand-orange)',
  'var(--brand-pink-600)',
  'var(--brand-blue-alt)',
];

export function getDepthAccent(depth: number): string {
  return DEPTH_ACCENT_COLORS[depth % DEPTH_ACCENT_COLORS.length];
}
