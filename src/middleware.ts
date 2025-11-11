import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only protect /admin routes (except /admin/login page)
  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    // Get the token from the cookie
    const token = request.cookies.get('admin_token')?.value;

    if (!token) {
      // Redirect to login if no token cookie
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    // Get the admin token from environment
    const adminToken = process.env.ADMIN_TOKEN;

    if (!adminToken) {
      console.error('ADMIN_TOKEN not configured in environment');
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    // Compare tokens
    if (token !== adminToken) {
      // Redirect to login if token doesn't match
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  // Allow the request to continue
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (images, fonts, etc.)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|fonts|images).*)',
  ],
};


