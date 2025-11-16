/**
 * Authentication utility functions for admin access
 *
 * Note: Authentication is primarily handled via HttpOnly cookies set by the server.
 * localStorage is used as a secondary indicator for client-side auth state checks.
 */

const TOKEN_KEY = "admin_token";

/**
 * Store the admin token in localStorage (for client-side auth state tracking)
 */
export function setAuthToken(token: string): void {
  if (typeof window !== "undefined") {
    localStorage.setItem(TOKEN_KEY, token);
  }
}

/**
 * Get the admin token from localStorage
 */
export function getAuthToken(): string | null {
  if (typeof window !== "undefined") {
    return localStorage.getItem(TOKEN_KEY);
  }

  return null;
}

/**
 * Remove the admin token from localStorage
 */
export function removeAuthToken(): void {
  if (typeof window !== "undefined") {
    localStorage.removeItem(TOKEN_KEY);
  }
}

/**
 * Check if user is authenticated by verifying with server
 * This checks if the HttpOnly cookie is still valid
 */
export async function verifyAuth(): Promise<boolean> {
  try {
    // Try to access a protected endpoint
    // The cookie will be sent automatically
    const response = await fetch("/api/admin/verify", {
      method: "GET",
      credentials: "include", // Ensure cookies are sent
    });

    return response.ok;
  } catch (error) {
    console.error("Auth verification error:", error);

    return false;
  }
}

/**
 * Login with admin token
 * This will set both the HttpOnly cookie (server-side) and localStorage (client-side)
 */
export async function login(token: string): Promise<{ success: boolean; error?: string }> {
  try {
    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      credentials: "include", // Ensure cookies are received and stored
    });

    if (response.ok) {
      // Store in localStorage for client-side auth state checks
      setAuthToken(token);

      return { success: true };
    }
    const data = await response.json();

    return { success: false, error: data.error ?? "Authentication failed" };
  } catch (error) {
    console.error("Login error:", error);

    return { success: false, error: "Network error" };
  }
}

/**
 * Logout - remove token from storage and clear server cookie
 */
export async function logout(): Promise<void> {
  // Remove from localStorage
  removeAuthToken();

  // Call server to clear the HttpOnly cookie
  try {
    await fetch("/api/admin/login", {
      method: "DELETE",
      credentials: "include", // Ensure cookies are sent for deletion
    });
  } catch (error) {
    console.error("Logout error:", error);
    // Continue anyway - localStorage is already cleared
  }
}

/**
 * Make authenticated API request
 * The HttpOnly cookie will be sent automatically with credentials: 'include'
 */
export async function authenticatedFetch(
  url: string,
  options: RequestInit = {}
): Promise<Response> {
  return fetch(url, {
    ...options,
    credentials: "include", // Ensure cookies are sent
    headers: {
      ...options.headers,
    },
  });
}
