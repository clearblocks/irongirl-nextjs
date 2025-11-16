import { useTranslations } from "next-intl";

import { LanguageSwitcher } from "@/components/molecules";
import { Link } from "@/i18n/routing";

export default function Home(): React.ReactElement {
  const t = useTranslations("homepage");

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200 py-4 px-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="font-hero text-2xl text-primary">IronGirl</h1>
          <div className="flex gap-6 items-center">
            <Link href="/" className="font-sans text-base text-foreground hover:text-primary">
              Home
            </Link>
            <Link href="/about" className="font-sans text-base text-foreground hover:text-primary">
              About
            </Link>
            <Link
              href="/admin/login"
              className="font-sans text-base text-primary hover:text-primary/80"
            >
              Admin
            </Link>
            <LanguageSwitcher />
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex-1 flex items-center justify-center bg-primary-light">
        <div className="max-w-4xl mx-auto px-6 py-16 text-center">
          <h2 className="font-hero text-5xl text-primary mb-6">{t("title")}</h2>
          <p className="font-sans text-xl text-foreground mb-8">
            This is the public area of the application. Anyone can view this content.
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/about"
              className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-sans"
            >
              Learn More
            </Link>
            <Link
              href="/admin/login"
              className="px-6 py-3 bg-white text-primary border-2 border-primary rounded-lg hover:bg-primary-light transition-colors font-sans"
            >
              Admin Login
            </Link>
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
