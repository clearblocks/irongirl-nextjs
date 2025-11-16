"use client";

import { useState, useEffect } from "react";

import { getAuthToken, login as authLogin, logout as authLogout, verifyAuth } from "@/lib/auth";

export function useAuth(): {
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (token: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
} {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async (): Promise<void> => {
      // First check localStorage for quick client-side check
      const token = getAuthToken();

      if (token) {
        // Verify with server (checks HttpOnly cookie)
        const isValid = await verifyAuth();

        setIsAuthenticated(isValid);

        // If server says invalid but we have localStorage token, clear it
        if (!isValid && typeof window !== "undefined") {
          localStorage.removeItem("admin_token");
        }
      } else {
        setIsAuthenticated(false);
      }

      setIsLoading(false);
    };

    void checkAuth();
  }, []);

  const login = async (token: string): Promise<{ success: boolean; error?: string }> => {
    const result = await authLogin(token);

    if (result.success) {
      setIsAuthenticated(true);
    }

    return result;
  };

  const logout = async (): Promise<void> => {
    await authLogout();
    setIsAuthenticated(false);
  };

  return {
    isAuthenticated,
    isLoading,
    login,
    logout,
  };
}
