'use client';

import { useAuth } from '@clerk/nextjs';
import { AuthBranding } from './auth-branding';
import { AuthLoading } from './auth-loading';

interface AuthPageWrapperProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
  description: string;
}

export function AuthPageWrapper({ children, title, subtitle, description }: AuthPageWrapperProps) {
  const { isLoaded } = useAuth();

  if (!isLoaded) {
    return <AuthLoading />;
  }

  return (
    <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
      <AuthBranding title={title} subtitle={subtitle} description={description} />
      {children}
    </div>
  );
}
