# Cookie-Based Locale Implementation

## Overview

The i18n setup has been modified to use **cookie-based locale storage** instead of URL-based routing. This means:

- ✅ URLs remain clean without locale prefixes (`/` instead of `/nl/` or `/en/`)
- ✅ Language preference persists across sessions
- ✅ Same URLs work for all users
- ✅ Better SEO with single canonical URLs

## Implementation Details

### 1. Routing Configuration

**File**: `src/i18n/routing.ts`

```typescript
export const routing = defineRouting({
  locales: ["nl", "en"],
  defaultLocale: "nl",
  localePrefix: "never", // Key change: never include locale in URL
});
```

### 2. Request Configuration

**File**: `src/i18n/request.ts`

The request config now:

1. Reads locale from `NEXT_LOCALE` cookie
2. Falls back to `Accept-Language` header
3. Defaults to `nl` if neither available

```typescript
export default getRequestConfig(async () => {
  const cookieStore = await cookies();
  let locale = cookieStore.get("NEXT_LOCALE")?.value;

  if (!locale) {
    const headersList = await headers();
    const acceptLanguage = headersList.get("accept-language");
    // Parse and use if supported...
  }

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});
```

### 3. Language Switcher

**File**: `src/components/molecules/LanguageSwitcher.tsx`

The switcher:

1. Sets the cookie when language changes
2. Refreshes the page to apply new locale
3. No longer needs `router.replace` with locale param

```typescript
const handleLocaleChange = (newLocale: string): void => {
  document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000; SameSite=Lax`;
  router.refresh();
};
```

### 4. Middleware

**File**: `src/middleware.ts`

Simplified admin route protection without locale path handling:

```typescript
if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
  // Check auth without worrying about locale prefix
}
```

### 5. App Structure

**Moved from**: `src/app/[locale]/...`
**To**: `src/app/...`

All pages are now at the root app level:

- `src/app/page.tsx`
- `src/app/about/page.tsx`
- `src/app/admin/login/page.tsx`
- `src/app/admin/dashboard/page.tsx`

### 6. Root Layout

**File**: `src/app/layout.tsx`

New root layout uses `getLocale()` instead of params:

```typescript
export default async function RootLayout({ children }) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
```

## Cookie Specification

- **Name**: `NEXT_LOCALE`
- **Values**: `nl` | `en`
- **Path**: `/`
- **Max-Age**: `31536000` (1 year)
- **SameSite**: `Lax`
- **Secure**: Not set (works on both HTTP and HTTPS)

## Migration from URL-Based to Cookie-Based

### What Changed

| Aspect           | Before (URL-based)               | After (Cookie-based)            |
| ---------------- | -------------------------------- | ------------------------------- |
| URLs             | `/nl/about`, `/en/about`         | `/about`                        |
| Locale storage   | URL path                         | Cookie                          |
| Page structure   | `app/[locale]/page.tsx`          | `app/page.tsx`                  |
| Language switch  | `router.replace(path, {locale})` | Set cookie + `router.refresh()` |
| Locale detection | From URL segment                 | From cookie/header              |
| Admin routes     | `/nl/admin/login`                | `/admin/login`                  |

### Why Cookie-Based?

**Advantages:**

1. **Cleaner URLs**: More professional, easier to share
2. **Better UX**: Language persists without URL manipulation
3. **Simpler routing**: No need for `[locale]` dynamic segment
4. **SEO benefits**: Single canonical URL per page
5. **Universal URLs**: Same URL works for all users

**Trade-offs:**

- Requires JavaScript for language switching (but gracefully degrades)
- Cookie must be enabled (standard requirement)
- No locale in URL for bookmarking (mitigated by persistent cookie)

## Browser Language Detection

On first visit (no cookie set), the system:

1. Reads `Accept-Language` header
2. Parses primary language code (e.g., `en-US` → `en`)
3. Checks if it's supported (`nl` or `en`)
4. Uses it if supported, otherwise defaults to `nl`

Example header: `Accept-Language: en-US,en;q=0.9,nl;q=0.8`

- Extracts: `en-US` → `en`
- Supported: ✅
- Result: Page displays in English

## Testing Scenarios

### Scenario 1: First Visit (No Cookie)

1. User visits `/`
2. No `NEXT_LOCALE` cookie exists
3. System checks `Accept-Language: nl-NL,nl;q=0.9`
4. Detects Dutch preference
5. Page renders in Dutch

### Scenario 2: Language Switch

1. User clicks "EN" button
2. Cookie set: `NEXT_LOCALE=en`
3. Page refreshes
4. Page renders in English
5. Cookie persists for future visits

### Scenario 3: Returning User

1. User visits site (has cookie from previous visit)
2. Cookie: `NEXT_LOCALE=en`
3. All pages render in English automatically
4. No URL changes needed

### Scenario 4: Shared URL

1. User A (English) shares `/about` with User B
2. User B clicks link
3. User B has `NEXT_LOCALE=nl` cookie
4. Page renders in Dutch for User B
5. Both see same URL, different languages

## Performance Considerations

- **Server-side**: Cookie read is fast, no additional latency
- **Client-side**: `router.refresh()` causes full page reload (intentional for language switch)
- **Caching**: Pages can be cached per cookie value by CDN
- **Bundle size**: No impact on JS bundle (server-side logic)

## Future Enhancements

Potential improvements:

1. Add language detection toggle in settings
2. Remember language per domain for multi-site setups
3. Add hreflang tags for SEO (with cookie-based detection)
4. Implement client-side language switch without page reload (more complex)
5. Add analytics to track language preferences
