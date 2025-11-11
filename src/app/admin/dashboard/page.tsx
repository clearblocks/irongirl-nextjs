'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/atoms/Button';

export default function AdminDashboardPage() {
  const { isAuthenticated, isLoading, logout } = useAuth();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isLoading && !isAuthenticated && mounted) {
      router.push('/admin/login');
    }
  }, [isAuthenticated, isLoading, mounted, router]);

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  if (isLoading || !mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-primary-light">
        <div className="text-center">
          <p className="font-sans text-base text-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // Will redirect
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200 py-4 px-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="font-hero text-2xl text-primary">IronGirl Admin</h1>
          <div className="flex gap-6 items-center">
            <Link href="/" className="font-sans text-base text-foreground hover:text-primary">
              Public Site
            </Link>
            <Link href="/admin/dashboard" className="font-sans text-base text-primary hover:text-primary/80">
              Dashboard
            </Link>
            <Button
              onClick={handleLogout}
              label="Logout"
            />
          </div>
        </div>
      </nav>

      {/* Dashboard Content */}
      <main className="flex-1 bg-header-light">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="mb-8">
            <h2 className="font-hero text-4xl text-primary mb-4">
              Admin Dashboard
            </h2>
            <p className="font-sans text-xl text-foreground">
              Welcome to the protected admin area.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="font-header text-lg text-header mb-2">
                Total Users
              </h3>
              <p className="font-sans text-3xl font-bold text-primary">
                1,234
              </p>
              <p className="font-sans text-sm text-foreground/70 mt-2">
                +12% from last month
              </p>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="font-header text-lg text-header mb-2">
                Active Sessions
              </h3>
              <p className="font-sans text-3xl font-bold text-primary">
                89
              </p>
              <p className="font-sans text-sm text-foreground/70 mt-2">
                Currently online
              </p>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="font-header text-lg text-header mb-2">
                System Status
              </h3>
              <p className="font-sans text-3xl font-bold text-green-600">
                Healthy
              </p>
              <p className="font-sans text-sm text-foreground/70 mt-2">
                All systems operational
              </p>
            </div>
          </div>

          {/* Content Sections */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="font-header text-2xl text-header mb-4">
                Recent Activity
              </h3>
              <ul className="space-y-3">
                <li className="border-b border-gray-200 pb-3">
                  <p className="font-sans text-base text-foreground">
                    User registration completed
                  </p>
                  <p className="font-sans text-sm text-foreground/70">
                    2 minutes ago
                  </p>
                </li>
                <li className="border-b border-gray-200 pb-3">
                  <p className="font-sans text-base text-foreground">
                    System backup completed
                  </p>
                  <p className="font-sans text-sm text-foreground/70">
                    1 hour ago
                  </p>
                </li>
                <li className="border-b border-gray-200 pb-3">
                  <p className="font-sans text-base text-foreground">
                    New content published
                  </p>
                  <p className="font-sans text-sm text-foreground/70">
                    3 hours ago
                  </p>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="font-header text-2xl text-header mb-4">
                Quick Actions
              </h3>
              <div className="space-y-3">
                <div className="w-full">
                  <Button label="Manage Users" />
                </div>
                <div className="w-full">
                  <Button label="View Reports" />
                </div>
                <div className="w-full">
                  <Button label="System Settings" />
                </div>
              </div>
            </div>
          </div>

          {/* Security Notice */}
          <div className="mt-8 bg-blue-50 border-l-4 border-blue-600 p-6">
            <h4 className="font-header text-lg text-foreground mb-2">
              Security Information
            </h4>
            <p className="font-sans text-base text-foreground">
              You are currently authenticated with a Bearer token. 
              This token is sent with every request to protected admin endpoints. 
              Make sure to logout when you're done to protect your session.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-foreground text-white py-8">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="font-sans text-base">&copy; 2025 IronGirl. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}


