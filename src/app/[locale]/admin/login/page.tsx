"use client";

import { useState, useEffect } from "react";

import { Button } from "@/components/atoms/Button";
import { Input } from "@/components/atoms/Input";
import { LanguageSwitcher } from "@/components/molecules";
import { useAuth } from "@/hooks/useAuth";
import { useRouter, Link } from "@/i18n/routing";

export default function AdminLoginPage(): React.ReactElement {
  const [token, setToken] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login, isAuthenticated, isLoading: authLoading } = useAuth();
  const router = useRouter();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated && !authLoading) {
      router.push("/admin/dashboard");
    }
  }, [isAuthenticated, authLoading, router]);

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const result = await login(token);

      if (result.success) {
        router.push("/admin/dashboard");
      } else {
        setError(result.error ?? "Authentication failed");
      }
    } catch (_err) {
      setError("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-primary-light">
        <div className="text-center">
          <p className="font-family-sans text-base text-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200 py-4 px-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="font-family-hero text-2xl text-primary">IronGirl</h1>
          <div className="flex gap-6 items-center">
            <Link href="/" className="font-family-sans text-base text-foreground hover:text-primary">
              Home
            </Link>
            <Link href="/about" className="font-family-sans text-base text-foreground hover:text-primary">
              About
            </Link>
            <LanguageSwitcher />
          </div>
        </div>
      </nav>

      {/* Login Form */}
      <main className="flex-1 flex items-center justify-center bg-primary-light">
        <div className="w-full max-w-xl mx-auto px-6">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="font-family-hero text-3xl text-primary mb-6 text-center">Admin Login</h2>

            <form
              onSubmit={(e) => {
                void handleSubmit(e);
              }}
              className="space-y-6"
            >
              <div>
                <label htmlFor="token" className="block font-family-sans text-base text-foreground mb-2">
                  Admin Token
                </label>
                <Input
                  id="token"
                  type="password"
                  value={token}
                  onChange={(e) => {
                    setToken(e.target.value);
                  }}
                  placeholder="Enter your admin token"
                  required
                />
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                  <p className="font-family-sans text-sm">{error}</p>
                </div>
              )}

              <Button
                type="submit"
                label={isLoading ? "Authenticating..." : "Login"}
                disabled={isLoading || !token}
                className="w-full"
              />
            </form>

            <div className="mt-6 text-center">
              <Link href="/" className="font-family-sans text-sm text-primary hover:text-primary/80">
                &larr; Back to Home
              </Link>
            </div>

            <div className="mt-8 p-4 bg-blue-50 rounded-lg">
              <p className="font-family-sans text-xs text-foreground">
                <strong>Note:</strong> Enter your admin token to access the protected admin area.
                The token is configured in the server&apos;s environment variables.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-foreground text-white py-8">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="font-family-sans text-base">&copy; 2025 IronGirl. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
