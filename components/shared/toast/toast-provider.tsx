'use client';

import { Toaster } from 'react-hot-toast';

import type { ToastPosition, ToastProviderProps } from './types';

// Position mapping for react-hot-toast
const positionMap: Record<
  ToastPosition,
  'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right'
> = {
  'top-left': 'top-left',
  'top-center': 'top-center',
  'top-right': 'top-right',
  'bottom-left': 'bottom-left',
  'bottom-center': 'bottom-center',
  'bottom-right': 'bottom-right',
};

export function ToastProvider({
  position = 'top-center',
  // maxToasts = 5,
  gap = 8,
  children,
}: ToastProviderProps) {
  return (
    <>
      {children}
      <Toaster
        position={positionMap[position]}
        toastOptions={{
          duration: 4000,
        }}
        containerStyle={{
          top: 12,
          right: 12,
          bottom: 12,
          left: 12,
        }}
        gutter={gap}
        containerClassName="toast-container !z-[9999]"
      />
    </>
  );
}

export default ToastProvider;
