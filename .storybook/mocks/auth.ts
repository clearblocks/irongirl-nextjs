/**
 * Mock auth module for Storybook
 * This prevents localStorage issues during Storybook build
 */

export function setAuthToken(_token: string): void {
  // Mock implementation for Storybook
}

export function getAuthToken(): string | null {
  // Mock implementation for Storybook
  return null;
}

export function removeAuthToken(): void {
  // Mock implementation for Storybook
}

export async function verifyAuth(): Promise<boolean> {
  // Mock implementation for Storybook
  return false;
}

export async function login(_token: string): Promise<{ success: boolean; error?: string }> {
  // Mock implementation for Storybook
  return { success: false, error: 'Storybook mock' };
}

export async function logout(): Promise<void> {
  // Mock implementation for Storybook
}

export async function authenticatedFetch(
  url: string,
  options: RequestInit = {}
): Promise<Response> {
  // Mock implementation for Storybook
  return fetch(url, options);
}

