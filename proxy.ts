import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

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
]);

export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth();

  // If user is signed in and trying to access auth pages, redirect to home
  if (userId && isAuthRoute(req)) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  // If NOT a public route, protect it (will redirect to sign-in automatically)
  if (!isPublicRoute(req)) {
    await auth.protect();
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
