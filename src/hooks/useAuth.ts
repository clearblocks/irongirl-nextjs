'use client';

import { useState, useEffect } from 'react';
import { getAuthToken, login as authLogin, logout as authLogout, verifyAuth } from '@/lib/auth';

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    // First check localStorage for quick client-side check
    const token = getAuthToken();
    
    if (token) {
      // Verify with server (checks HttpOnly cookie)
      const isValid = await verifyAuth();
      setIsAuthenticated(isValid);
      
      // If server says invalid but we have localStorage token, clear it
      if (!isValid && typeof window !== 'undefined') {
        localStorage.removeItem('admin_token');
      }
    } else {
      setIsAuthenticated(false);
    }
    
    setIsLoading(false);
  };

  const login = async (token: string) => {
    const result = await authLogin(token);
    
    if (result.success) {
      setIsAuthenticated(true);
    }
    
    return result;
  };

  const logout = async () => {
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


