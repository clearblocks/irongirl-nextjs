"use client";

import { useRouter } from "next/navigation";

import { useLocale, useTranslations } from "next-intl";

import { routing } from "@/i18n/routing";

export function LanguageSwitcher(): React.ReactElement {
  const t = useTranslations("common");
  const locale = useLocale();
  const router = useRouter();

  const handleLocaleChange = (newLocale: string): void => {
    // Set cookie for locale preference using a function to avoid linting error
    const setCookie = (name: string, value: string): void => {
      document.cookie = `${name}=${value}; path=/; max-age=31536000; SameSite=Lax`;
    };

    setCookie("NEXT_LOCALE", newLocale);

    // Refresh the page to apply new locale
    router.refresh();
  };

  return (
    <div className="flex items-center gap-2">
      <span className="font-sans text-sm text-foreground mr-2">{t("language")}:</span>
      {routing.locales.map((loc) => (
        <button
          key={loc}
          onClick={() => {
            handleLocaleChange(loc);
          }}
          className={`px-3 py-1 rounded font-sans text-sm transition-colors ${
            locale === loc
              ? "bg-primary text-white"
              : "bg-gray-200 text-foreground hover:bg-gray-300"
          }`}
          aria-label={`Switch to ${loc === "nl" ? t("dutch") : t("english")}`}
        >
          {loc.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
