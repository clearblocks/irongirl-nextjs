import { LanguageSwitcher } from "@/components/molecules";
import { Link } from "@/i18n/routing";

export default function AboutPage(): React.ReactElement {
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
            <Link
              href="/admin/login"
              className="font-family-sans text-base text-primary hover:text-primary/80"
            >
              Admin
            </Link>
            <LanguageSwitcher />
          </div>
        </div>
      </nav>

      {/* Content */}
      <main className="flex-1 bg-white">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <h2 className="font-family-hero text-4xl text-primary mb-6">About IronGirl</h2>

          <div className="space-y-6">
            <p className="font-family-sans text-xl text-foreground">
              This is a demonstration of a Next.js application with separate public and admin areas.
            </p>

            <h3 className="font-family-header text-2xl text-header mt-8 mb-4">Public Area</h3>
            <p className="font-family-sans text-base text-foreground">
              The public area is accessible to everyone without authentication. This includes pages
              like the home page and this about page.
            </p>

            <h3 className="font-family-header text-2xl text-header mt-8 mb-4">Admin Area</h3>
            <p className="font-family-sans text-base text-foreground">
              The admin area is protected with Bearer token authentication. Only users with a valid
              admin token can access the admin dashboard and other protected pages.
            </p>

            <div className="bg-blue-50 border-l-4 border-primary p-4 mt-8">
              <p className="font-family-sans text-base text-foreground">
                <strong>Note:</strong> This is an example implementation. In production, you should
                use more secure authentication methods.
              </p>
            </div>
          </div>

          <div className="mt-12">
            <Link
              href="/"
              className="inline-block px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-family-sans"
            >
              Back to Home
            </Link>
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
