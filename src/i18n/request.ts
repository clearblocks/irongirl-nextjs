import { cookies, headers } from "next/headers";

import { getRequestConfig } from "next-intl/server";

import { routing } from "./routing";

/**
 * Parse Accept-Language header and find the best matching supported locale
 * @param acceptLanguage - The Accept-Language header value
 * @returns The best matching locale or null
 */
function getBrowserLocale(acceptLanguage: string): string | null {
  // Parse Accept-Language header (e.g., "en-US,en;q=0.9,nl;q=0.8,de;q=0.7")
  const languages = acceptLanguage
    .split(",")
    .map((lang) => {
      const [code, qValue] = lang.trim().split(";");
      const quality = qValue ? parseFloat(qValue.split("=")[1] ?? "1") : 1;

      return {
        code: code?.toLowerCase() ?? "",
        quality,
      };
    })
    .sort((a, b) => b.quality - a.quality); // Sort by quality (preference)

  // Try to find exact match first (e.g., "nl" matches "nl")
  for (const { code } of languages) {
    const baseLanguage = code.split("-")[0];

    if (baseLanguage && routing.locales.includes(baseLanguage as "nl" | "en")) {
      return baseLanguage;
    }
  }

  return null;
}

export default getRequestConfig(async () => {
  // Try to get locale from cookie first (user's explicit choice)
  const cookieStore = await cookies();
  let locale = cookieStore.get("NEXT_LOCALE")?.value;

  // Use browser/OS language detection if no cookie is set
  if (!locale) {
    const headersList = await headers();
    const acceptLanguage = headersList.get("accept-language");

    if (acceptLanguage) {
      locale = getBrowserLocale(acceptLanguage) ?? undefined;
    }
  }

  // Ensure that a valid locale is used, fallback to default
  if (!locale || !routing.locales.includes(locale as "nl" | "en")) {
    locale = routing.defaultLocale;
  }

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});
