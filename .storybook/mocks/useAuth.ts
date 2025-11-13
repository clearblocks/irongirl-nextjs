/**
 * Mock useAuth hook for Storybook
 * This prevents localStorage issues during Storybook build
 */

export function useAuth() {
  return {
    isAuthenticated: false,
    isLoading: false,
    login: async (_token: string) => ({ success: false, error: 'Storybook mock' }),
    logout: async () => {},
  };
}

