# Task 9: Internationalization (i18n) Setup

## Objective

Set up internationalization support for the IronGirl website with Dutch (default) and English language support using `next-intl`.

## Implementation Summary

### 1. Package Installation

- Installed `next-intl` v4.5.3 via yarn

### 2. Configuration Files Created

#### Routing Configuration (`src/i18n/routing.ts`)

- Defines supported locales: `nl` (Dutch - default), `en` (English)
- Exports locale-aware navigation utilities: `Link`, `redirect`, `usePathname`, `useRouter`
- Sets `localePrefix: 'always'` to always include locale in URLs

#### Request Configuration (`src/i18n/request.ts`)

- Handles loading of translation messages based on current locale
- Validates incoming locale and falls back to default if invalid

#### Next.js Configuration (`next.config.ts`)

- Integrated `next-intl` plugin with pointer to request configuration

### 3. Translation Files

Created message files in `/messages/` directory:

- `en.json` - English translations
- `nl.json` - Dutch translations

**Structure:**

```json
{
  "common": {
    "language": "Language/Taal",
    "english": "English/Engels",
    "dutch": "Dutch/Nederlands"
  },
  "navigation": { ... },
  "homepage": { ... }
}
```

### 4. Middleware Updates

Updated `/src/middleware.ts` to handle:

1. **Locale routing** - Redirects root to default locale, handles locale prefixes
2. **Admin authentication** - Preserves admin auth logic with locale-aware redirects
3. **API route exclusion** - API routes bypass locale handling

### 5. App Directory Restructuring

**Before:**

```
src/app/
  ├── layout.tsx
  ├── page.tsx
  ├── about/page.tsx
  ├── admin/...
  └── api/...
```

**After:**

```
src/app/
  ├── [locale]/           # All localized routes
  │   ├── layout.tsx      # With NextIntlClientProvider
  │   ├── page.tsx
  │   ├── about/page.tsx
  │   └── admin/...
  └── api/...             # API routes (not localized)
```

### 6. Language Switcher Component

Created `LanguageSwitcher` molecule component:

- Location: `src/components/molecules/LanguageSwitcher.tsx`
- Displays current language and allows switching between locales
- Uses `useTranslations` for labels
- Uses locale-aware `useRouter` and `usePathname`
- Integrated into navigation of all pages

### 7. Updated Pages

Modified all pages to:

- Use `Link` from `@/i18n/routing` instead of `next/link`
- Use `useRouter` from `@/i18n/routing` instead of `next/navigation`
- Include `LanguageSwitcher` component in navigation
- Use `useTranslations` for translated content (where applicable)

**Pages updated:**

- Home page (`[locale]/page.tsx`)
- About page (`[locale]/about/page.tsx`)
- Admin login (`[locale]/admin/login/page.tsx`)
- Admin dashboard (`[locale]/admin/dashboard/page.tsx`)

### 8. Layout Configuration

The `[locale]/layout.tsx`:

- Validates locale parameter
- Loads appropriate message file
- Wraps children with `NextIntlClientProvider`
- Maintains font configuration
- Sets `lang` attribute on `<html>` tag

## URL Structure

### Before

- `/` - Home
- `/about` - About
- `/admin/login` - Admin login

### After

- `/nl/` - Home (Dutch)
- `/en/` - Home (English)
- `/nl/about` - About (Dutch)
- `/en/about` - About (English)
- `/nl/admin/login` - Admin login (Dutch)
- `/en/admin/login` - Admin login (English)

Root URL `/` automatically redirects to `/nl/` (default locale).

## Key Features

1. **Automatic locale detection and routing**
2. **Locale preservation across navigation**
3. **Admin authentication works with localized routes**
4. **Language switcher in header on all pages**
5. **Type-safe translations**
6. **SEO-friendly URLs with locale prefix**

## Code Quality

- ✅ All TypeScript types correctly defined
- ✅ No linting errors in i18n-related files
- ✅ Follows project coding standards
- ✅ Proper error handling
- ✅ Accessible components (aria-labels)

## Files Created/Modified

### Created:

- `/messages/en.json`
- `/messages/nl.json`
- `/src/i18n/request.ts`
- `/src/i18n/routing.ts`
- `/src/app/[locale]/layout.tsx`
- `/src/app/[locale]/page.tsx`
- `/src/app/[locale]/about/page.tsx`
- `/src/app/[locale]/admin/login/page.tsx`
- `/src/app/[locale]/admin/dashboard/page.tsx`
- `/src/components/molecules/LanguageSwitcher.tsx`
- `/src/components/molecules/LanguageSwitcher.stories.tsx`
- `/docs/i18n-setup.md`

### Modified:

- `/next.config.ts`
- `/src/middleware.ts`
- `/src/components/molecules/index.ts`

### Deleted:

- `/src/app/layout.tsx` (moved to `[locale]/layout.tsx`)
- `/src/app/page.tsx` (moved to `[locale]/page.tsx`)
- `/src/app/about/page.tsx` (moved to `[locale]/about/page.tsx`)
- `/src/app/admin/login/page.tsx` (moved to `[locale]/admin/login/page.tsx`)
- `/src/app/admin/dashboard/page.tsx` (moved to `[locale]/admin/dashboard/page.tsx`)

## Testing Instructions

1. Start the development server:

   ```bash
   yarn dev
   ```

2. Visit `http://localhost:3000`
   - Should redirect to `http://localhost:3000/nl/`

3. Test language switching:
   - Click the language switcher in the header
   - URL should update with new locale prefix
   - Content should update (where translations exist)

4. Test navigation:
   - Navigate between pages
   - Verify locale is preserved in URL

5. Test admin functionality:
   - Navigate to admin login
   - Verify URL includes locale (e.g., `/nl/admin/login`)
   - Log in and verify dashboard is accessible at localized URL

## Future Enhancements

1. Add more translations to message files
2. Consider adding more languages (French, German, etc.)
3. Add locale detection based on browser settings
4. Add currency/date formatting based on locale
5. Consider adding translation management system for non-technical users

## Documentation

- Main documentation: `/docs/i18n-setup.md`
- This task summary: `/docs/agent-tasks/9-i18n-setup/README.md`
