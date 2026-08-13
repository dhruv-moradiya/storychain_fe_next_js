import { NextResponse } from 'next/server';

import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

// Auth routes (sign-in, sign-up) - redirect authenticated users away
const isAuthRoute = createRouteMatcher(['/sign-in(.*)', '/sign-up(.*)']);

// Public routes that don't require authentication
const isPublicRoute = createRouteMatcher([
  '/', // Home page
  '/sign-in(.*)', // Sign-in page and sub-routes
  '/sign-up(.*)', // Sign-up page and sub-routes
  '/sso-callback(.*)', // OAuth callback
  '/api/webhooks(.*)', // Webhooks (if any)
  '/pricing(.*)', // Pricing page
  '/how-to-use(.*)', // How to use page
  '/explore(.*)', // Explore page
  '/writing-tips(.*)', // Writing tips page
  '/community-guidelines(.*)', // Community guidelines page

  // Story routes — publicly accessible for SEO / social sharing.
  // The page UI still checks auth client-side; only the SSR metadata needs
  // to be reachable by social media crawlers (WhatsApp, Facebook, etc.)
  // without a Clerk session.
  '/stories/:slug', // Root story URL (redirects to /overview)
  '/stories/:slug/overview', // Story overview — main shareable page
  '/stories/:slug/chapter/:chapterSlug', // Individual chapter read pages
]);

// Role-protected routes and their allowed roles
const ROLE_PROTECTED_ROUTES: {
  matcher: ReturnType<typeof createRouteMatcher>;
  allowedRoles: string[];
}[] = [
  {
    matcher: createRouteMatcher(['/dashboard(.*)']),
    allowedRoles: ['SUPER_ADMIN'],
  },
  {
    matcher: createRouteMatcher(['/moderation(.*)']),
    allowedRoles: ['SUPER_ADMIN', 'PLATFORM_MODERATOR'],
  },
  {
    matcher: createRouteMatcher(['/appeals(.*)']),
    allowedRoles: ['SUPER_ADMIN', 'APPEAL_MODERATOR'],
  },
];

/**
 * Returns the default route for a given role.
 * Duplicated from lib/role-config.ts because middleware runs on Edge
 * and cannot import from the full Node.js module graph reliably.
 */
function getDefaultRouteForRole(role: string): string {
  switch (role) {
    case 'SUPER_ADMIN':
      return '/dashboard';
    case 'PLATFORM_MODERATOR':
      return '/moderation';
    case 'APPEAL_MODERATOR':
      return '/appeals';
    default:
      return '/stories';
  }
}

export default clerkMiddleware(async (auth, req) => {
  const { userId, getToken } = await auth();

  // If user is signed in and trying to access auth pages, redirect to home
  if (userId && isAuthRoute(req)) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  // If NOT a public route, protect it (will redirect to sign-in automatically)
  if (!isPublicRoute(req)) {
    await auth.protect();
  }

  // Check role-based access for protected routes
  const matchedRoute = ROLE_PROTECTED_ROUTES.find((route) => route.matcher(req));

  if (matchedRoute && userId) {
    try {
      const token = await getToken();
      if (!token) {
        console.log('[Middleware] No token found, redirecting to /sign-in');
        return NextResponse.redirect(new URL('/sign-in', req.url));
      }

      const apiUrl = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api').replace(
        /\/$/,
        ''
      );
      const fetchUrl = `${apiUrl}/users/me`;
      console.log('[Middleware] Fetching user role from:', fetchUrl);

      const response = await fetch(fetchUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        console.log('[Middleware] API response not ok:', response.status, response.statusText);
        // If we can't verify the role, redirect to a safe default
        return NextResponse.redirect(new URL('/stories', req.url));
      }

      const userData = await response.json();
      const userRole: string = userData?.data?.role || 'USER';
      console.log('[Middleware] User role:', userRole, '| Allowed:', matchedRoute.allowedRoles);

      if (!matchedRoute.allowedRoles.includes(userRole)) {
        // User doesn't have the required role — redirect to their default route
        const redirectTo = getDefaultRouteForRole(userRole);
        console.log('[Middleware] Unauthorized, redirecting to:', redirectTo);
        return NextResponse.redirect(new URL(redirectTo, req.url));
      }

      console.log('[Middleware] Access granted for role:', userRole);
    } catch (error) {
      console.error('[Middleware] Error fetching role:', error);
      // On any error fetching role, redirect to safe default
      return NextResponse.redirect(new URL('/stories', req.url));
    }
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
