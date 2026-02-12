import localFont from 'next/font/local';

export const yellowtail = localFont({
  src: '../public/fonts/Yellowtail/Yellowtail-Regular.woff',
  variable: '--font-yellowtail',
  display: 'swap',
});

export const playfair = localFont({
  src: [
    {
      path: '../public/fonts/Playfair/Playfair9pt-Light.woff',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../public/fonts/Playfair/Playfair9pt-Regular.woff',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/Playfair/Playfair9pt-Medium.woff',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../public/fonts/Playfair/Playfair9pt-Bold.woff',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../public/fonts/Playfair/Playfair9pt-ExtraBold.woff',
      weight: '800',
      style: 'normal',
    },
  ],
  variable: '--font-playfair',
  display: 'swap',
});

export const libreBaskerville = localFont({
  src: [
    {
      path: '../public/fonts/LibreBaskerville/LibreBaskerville-Regular.woff',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/LibreBaskerville/LibreBaskerville-Medium.woff',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../public/fonts/LibreBaskerville/LibreBaskerville-SemiBold.woff',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../public/fonts/LibreBaskerville/LibreBaskerville-Bold.woff',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-libre-baskerville',
  display: 'swap',
});

export const ibmPlexMono = localFont({
  src: [
    {
      path: '../public/fonts/IBMPlexMono/IBMPlexMono-Thin.woff',
      weight: '100',
      style: 'normal',
    },
    {
      path: '../public/fonts/IBMPlexMono/IBMPlexMono-ExtraLight.woff',
      weight: '200',
      style: 'normal',
    },
    {
      path: '../public/fonts/IBMPlexMono/IBMPlexMono-Light.woff',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../public/fonts/IBMPlexMono/IBMPlexMono-Regular.woff',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/IBMPlexMono/IBMPlexMono-Medium.woff',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../public/fonts/IBMPlexMono/IBMPlexMono-SemiBold.woff',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../public/fonts/IBMPlexMono/IBMPlexMono-Bold.woff',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-ibm-plex-mono',
  display: 'swap',
});
