import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getSession } from '@auth0/nextjs-auth0/edge';

// Middleware function to check for admin access
export async function middleware(request: NextRequest) {
  // Get the session from the request
  const session = await getSession(request, NextResponse);

  const user = session?.user;

  // Check if the user is an admin
  const isAdmin = user?.email === 'vinay.shantiinfotech+10@gmail.com';
  const isAdminRoute = request.nextUrl.pathname.startsWith('/admin');

  // Redirect if the user is not an admin and trying to access admin routes
  if (isAdminRoute && !isAdmin) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

// Apply only to admin route
export const config = {
  matcher: ['/admin/:path*'],
};
