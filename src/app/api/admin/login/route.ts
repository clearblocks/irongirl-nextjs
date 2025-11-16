import { type NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    // Get the Authorization header
    const authHeader = request.headers.get("authorization");

    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json(
        { error: "Missing or invalid authorization header" },
        { status: 401 }
      );
    }

    // Extract the token
    const token = authHeader.substring(7); // Remove 'Bearer ' prefix

    // Get the admin token from environment
    const adminToken = process.env.ADMIN_TOKEN;

    if (!adminToken) {
      console.error("ADMIN_TOKEN not configured in environment");

      return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
    }

    // Compare tokens
    if (token === adminToken) {
      const response = NextResponse.json(
        { success: true, message: "Authentication successful" },
        { status: 200 }
      );

      // Set the token in a cookie so it's automatically sent with page navigation
      response.cookies.set("admin_token", token, {
        httpOnly: true, // Prevent JavaScript access for security
        secure: process.env.NODE_ENV === "production", // HTTPS only in production
        sameSite: "lax", // CSRF protection
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: "/", // Available site-wide
      });

      return response;
    }

    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  } catch (error) {
    console.error("Login error:", error);

    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// Logout endpoint
export async function DELETE(): Promise<NextResponse> {
  const response = NextResponse.json(
    { success: true, message: "Logged out successfully" },
    { status: 200 }
  );

  // Clear the cookie
  response.cookies.delete("admin_token");

  return response;
}
