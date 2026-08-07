'use client';

import { useTheme } from 'next-themes';
import { useEffect, useRef, useState } from 'react';

import { ClerkProvider, useUser } from '@clerk/nextjs';
import { dark } from '@clerk/themes';

import { identifyUser, resetUser } from '@/lib/analytics';

interface ClerkThemeProviderProps {
  children: React.ReactNode;
  signInUrl?: string;
  signUpUrl?: string;
  afterSignInUrl?: string;
  afterSignUpUrl?: string;
}

function PostHogIdentity({ children }: { children: React.ReactNode }) {
  const { isLoaded, isSignedIn, user } = useUser();
  const identifiedUserId = useRef<string | null>(null);

  useEffect(() => {
    if (!isLoaded) return;

    if (!isSignedIn || !user) {
      if (identifiedUserId.current) {
        resetUser();
        identifiedUserId.current = null;
      }
      return;
    }

    if (identifiedUserId.current === user.id) return;

    if (identifiedUserId.current) {
      resetUser();
    }

    const personProperties: Record<string, string> = {};
    const email = user.primaryEmailAddress?.emailAddress;

    if (email) personProperties.$email = email;
    if (user.fullName) personProperties.$name = user.fullName;
    if (user.username) personProperties.username = user.username;

    identifyUser(user.id, personProperties);
    identifiedUserId.current = user.id;
  }, [isLoaded, isSignedIn, user]);

  return children;
}

export function ClerkThemeProvider({
  children,
  signInUrl,
  signUpUrl,
  afterSignInUrl,
  afterSignUpUrl,
}: ClerkThemeProviderProps) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch — only apply theme after mount
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  const isDark = mounted && resolvedTheme === 'dark';

  return (
    <ClerkProvider
      signInUrl={signInUrl}
      signUpUrl={signUpUrl}
      afterSignInUrl={afterSignInUrl}
      afterSignUpUrl={afterSignUpUrl}
      appearance={{
        baseTheme: isDark ? dark : undefined,
      }}
    >
      <PostHogIdentity>{children}</PostHogIdentity>
    </ClerkProvider>
  );
}
