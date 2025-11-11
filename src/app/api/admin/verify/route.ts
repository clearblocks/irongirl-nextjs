import { NextRequest, NextResponse } from 'next/server';

/**
 * Verify if the user is authenticated by checking the cookie
 * This is used by the client to check auth state
 */
export async function GET(request: NextRequest) {
  try {
    // Get the token from the cookie
    const token = request.cookies.get('admin_token')?.value;

    if (!token) {
      return NextResponse.json(
        { authenticated: false, error: 'No authentication token' },
        { status: 401 }
      );
    }

    // Get the admin token from environment
    const adminToken = process.env.ADMIN_TOKEN;

    if (!adminToken) {
      console.error('ADMIN_TOKEN not configured in environment');
      return NextResponse.json(
        { authenticated: false, error: 'Server configuration error' },
        { status: 500 }
      );
    }

    // Compare tokens
    if (token === adminToken) {
      return NextResponse.json(
        { authenticated: true },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { authenticated: false, error: 'Invalid token' },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error('Verify error:', error);
    return NextResponse.json(
      { authenticated: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

