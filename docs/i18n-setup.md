# Internationalization (i18n) Setup

This project uses `next-intl` for internationalization with support for Dutch (nl) and English (en).

## Configuration

### Supported Languages

- **Dutch (nl)** - Default language
- **English (en)**

### Routing Structure

**The locale is NOT visible in the URL.** Instead, the user's language preference is stored in a cookie (`NEXT_LOCALE`).

All routes remain the same regardless of language:

- `/` - Home (displays in user's preferred language)
- `/about` - About page
- `/admin/login` - Admin login
- `/admin/dashboard` - Admin dashboard

### How Locale is Determined

The system determines the user's locale in this order:

1. **Cookie**: Checks for `NEXT_LOCALE` cookie (user's explicit choice)
2. **Browser Language**: Automatically detects from `Accept-Language` header
3. **Default**: Uses Dutch (`nl`) if no preference found

**Browser Language Detection Features:**

- ✅ Parses multiple languages in order of preference
- ✅ Respects quality values (e.g., `en-US,en;q=0.9,nl;q=0.8`)
- ✅ Handles regional variants (`en-US`, `en-GB` → `en`)
- ✅ Gracefully falls back for unsupported languages
- ✅ Works automatically on first visit

### Files and Structure

#### Message Files

Translation messages are stored in JSON files:

- `/messages/en.json` - English translations
- `/messages/nl.json` - Dutch translations

#### Configuration Files

- `/src/i18n/routing.ts` - Routing configuration with `localePrefix: 'never'`
- `/src/i18n/request.ts` - Request configuration that reads locale from cookies/headers
- `/next.config.ts` - Next.js configuration with next-intl plugin

#### Middleware

`/src/middleware.ts` handles:

1. Locale detection and cookie management
2. Admin authentication
3. API route exclusion from locale handling

#### App Structure

```
/src/app/
  ├── layout.tsx          # Root layout with i18n provider
  ├── page.tsx            # Home page
  ├── about/
  │   └── page.tsx        # About page
  ├── admin/
  │   ├── login/
  │   │   └── page.tsx
  │   └── dashboard/
  │       └── page.tsx
  └── api/                # API routes (not localized)
      ├── admin/
      └── mail/
```

## Usage

### In Server Components

```tsx
import { useTranslations } from "next-intl";

export default function Page() {
  const t = useTranslations("namespace");

  return <h1>{t("key")}</h1>;
}
```

### In Client Components

```tsx
"use client";

import { useTranslations } from "next-intl";

export default function Component() {
  const t = useTranslations("namespace");

  return <p>{t("key")}</p>;
}
```

### Navigation

Use standard Next.js navigation or the locale-aware utilities:

```tsx
import { Link } from "@/i18n/routing";
// or
import Link from "next/link";

// Both work the same - no locale in URL
<Link href="/about">About</Link>;
```

### Language Switcher

The `LanguageSwitcher` component:

- Sets the `NEXT_LOCALE` cookie when language changes
- Refreshes the page to apply the new language
- Shows the currently active language

```tsx
import { LanguageSwitcher } from "@/components/molecules";

<LanguageSwitcher />;
```

## Adding New Languages

1. Add the locale code to `/src/i18n/routing.ts`:

```typescript
export const routing = defineRouting({
  locales: ["nl", "en", "fr"], // Add new locale
  defaultLocale: "nl",
  localePrefix: "never",
});
```

2. Create a new message file: `/messages/fr.json`

3. Update the `LanguageSwitcher` component if needed for display names

## Adding New Translations

1. Open the appropriate message file (`en.json` or `nl.json`)
2. Add your key-value pairs in a logical namespace:

```json
{
  "homepage": {
    "title": "Welcome to IronGirl",
    "subtitle": "Your subtitle here"
  }
}
```

3. Use in components:

```tsx
const t = useTranslations("homepage");
<h1>{t("title")}</h1>;
```

## Best Practices

1. **Organize translations by feature/page** - Use namespaces like `homepage`, `about`, `admin`, etc.
2. **Keep translations flat when possible** - Avoid deep nesting
3. **Use consistent naming** - Follow camelCase for keys
4. **Test both languages** - Make sure all text is translated
5. **Cookie persistence** - The locale preference persists for 1 year

## How Language Switching Works

1. User clicks language button in `LanguageSwitcher`
2. Component sets `NEXT_LOCALE` cookie with new locale value
3. Page refreshes via `router.refresh()`
4. Middleware/request config reads the cookie
5. Page renders with new language

## Cookie Details

- **Name**: `NEXT_LOCALE`
- **Values**: `nl` or `en`
- **Path**: `/` (available site-wide)
- **Max-Age**: 31536000 seconds (1 year)
- **SameSite**: `Lax`

## Benefits of Cookie-Based Locale

1. **Clean URLs**: No locale prefix cluttering URLs
2. **Persistent preference**: User's choice remembered across sessions
3. **Shareable URLs**: URLs work for all users regardless of language
4. **SEO friendly**: Single canonical URL per page
5. **Better UX**: Language persists across navigation

## Testing

1. Start the development server:

   ```bash
   yarn dev
   ```

2. Visit `http://localhost:3000`
   - **First visit**: Should display in your browser's language (if English/Dutch)
   - **Or**: Dutch by default if your browser language isn't supported

3. Test language switching:
   - Click the language switcher in the header
   - Page should refresh and display in the selected language
   - Verify the cookie is set in DevTools (Application > Cookies)

4. Test persistence:
   - Switch language
   - Navigate to different pages
   - Close and reopen browser
   - Language should remain the same (cookie persists)

5. Test browser language detection:
   - Clear the `NEXT_LOCALE` cookie in DevTools
   - Change your browser's language settings:
     - **Chrome**: Settings → Languages
     - **Firefox**: Settings → Language
     - **Safari**: System Preferences → Language & Region
   - Hard refresh the page (Ctrl+Shift+R / Cmd+Shift+R)
   - Should display in your browser's primary language (if supported)
6. Verify detection in DevTools:
   - Open DevTools → Network tab
   - Refresh page
   - Click any request → Headers tab
   - Look for `Accept-Language` header
   - Page should render in the first supported language from that list

## Troubleshooting

### Issue: Language doesn't change

**Solution**: Check browser DevTools > Application > Cookies. Ensure `NEXT_LOCALE` cookie is being set correctly.

### Issue: Always shows default language

**Solution**:

1. Clear cookies
2. Check that `LanguageSwitcher` is setting the cookie correctly
3. Verify middleware is running (not being bypassed for the route)

### Issue: Different language on first visit

**Solution**: This is expected behavior - the system detects your browser's language preference from the `Accept-Language` header.
