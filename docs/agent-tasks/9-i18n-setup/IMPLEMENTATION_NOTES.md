# i18n Implementation Notes

## Quick Reference

### Using Translations in Components

**Server Components:**

```tsx
import { useTranslations } from "next-intl";

export default function Page() {
  const t = useTranslations("namespace");
  return <h1>{t("key")}</h1>;
}
```

**Client Components:**

```tsx
"use client";
import { useTranslations } from "next-intl";

export default function Component() {
  const t = useTranslations("namespace");
  return <p>{t("key")}</p>;
}
```

### Navigation

**Always import from `@/i18n/routing`:**

```tsx
import { Link, useRouter, usePathname } from "@/i18n/routing";

// Link (automatically locale-aware)
<Link href="/about">About</Link>;

// Router
const router = useRouter();
router.push("/dashboard");

// Pathname (without locale prefix)
const pathname = usePathname(); // Returns '/about', not '/nl/about'
```

### Adding Translations

1. Edit `/messages/en.json` and `/messages/nl.json`
2. Add your key-value pairs in a logical namespace
3. Use in components with `useTranslations('namespace')`

Example:

```json
// messages/en.json
{
  "products": {
    "title": "Our Products",
    "description": "Browse our amazing products"
  }
}

// messages/nl.json
{
  "products": {
    "title": "Onze Producten",
    "description": "Bekijk onze geweldige producten"
  }
}
```

```tsx
// Component
const t = useTranslations('products');
<h1>{t('title')}</h1>
<p>{t('description')}</p>
```

## Important Implementation Details

### Middleware Order

The middleware handles both locale routing and admin authentication. The order is:

1. API routes bypass all locale handling
2. Locale routing is applied to all other routes
3. Admin authentication checks are performed on the localized paths

### Admin Routes

Admin routes maintain authentication while being locale-aware:

- `/nl/admin/login` - Dutch login page
- `/en/admin/login` - English login page
- `/nl/admin/dashboard` - Dutch dashboard
- `/en/admin/dashboard` - English dashboard

The admin token validation works regardless of locale.

### Layout Structure

```
[locale]/layout.tsx (with NextIntlClientProvider)
├── [locale]/page.tsx (home)
├── [locale]/about/page.tsx
└── [locale]/admin/
    ├── login/page.tsx
    └── dashboard/page.tsx
```

### Language Switcher

The `LanguageSwitcher` component:

- Automatically detects current locale
- Preserves current route when switching languages
- Shows active language with different styling
- Uses accessible button elements with aria-labels

## Common Pitfalls to Avoid

### ❌ DON'T: Import from next/link or next/navigation

```tsx
import Link from "next/link"; // ❌ Wrong!
import { useRouter } from "next/navigation"; // ❌ Wrong!
```

### ✅ DO: Import from @/i18n/routing

```tsx
import { Link, useRouter } from "@/i18n/routing"; // ✅ Correct!
```

### ❌ DON'T: Hardcode locale in URLs

```tsx
<Link href="/nl/about">About</Link> // ❌ Wrong!
```

### ✅ DO: Use locale-agnostic paths

```tsx
<Link href="/about">About</Link> // ✅ Correct! Locale added automatically
```

### ❌ DON'T: Access pathname with locale prefix

```tsx
const pathname = usePathname();
if (pathname === '/nl/about') { ... } // ❌ Wrong!
```

### ✅ DO: Access pathname without locale

```tsx
const pathname = usePathname();
if (pathname === '/about') { ... } // ✅ Correct!
```

## Storybook Considerations

The `LanguageSwitcher.stories.tsx` uses buttons instead of actual links in decorators to avoid Storybook navigation issues. This is intentional and only affects the Storybook preview.

## Type Safety

All navigation utilities from `@/i18n/routing` are fully typed and will provide TypeScript errors if used incorrectly.

The `useTranslations` hook is also type-safe with your message files (when properly configured with TypeScript).

## Performance Notes

- Translation messages are loaded per-route automatically
- The locale is determined server-side from the URL
- No client-side locale detection is performed (explicit locale in URL)
- Message files are small and efficiently bundled

## Browser Behavior

- Direct access to root (`/`) redirects to `/nl/` (default locale)
- Direct access to any route without locale redirects to include default locale
- Locale is always visible in the URL for SEO and shareability
- Browser back/forward buttons work correctly with locale changes

## SEO Benefits

1. **Clear language indication**: Search engines can easily identify language from URL
2. **Separate indexing**: Each language version can be indexed separately
3. **Canonical URLs**: Each locale has its own canonical URL
4. **hreflang support**: Can easily add hreflang tags for multi-language SEO

## Accessibility

- Language switcher uses semantic `<button>` elements
- `aria-label` attributes provide clear descriptions
- Language is set on `<html lang="...">` element
- No accessibility barriers for keyboard navigation
