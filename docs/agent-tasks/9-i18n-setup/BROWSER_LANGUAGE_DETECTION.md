# Browser Language Detection

## Overview

The i18n system automatically detects and uses the user's browser/OS language preference on their first visit (when no locale cookie exists).

## How It Works

### Priority Order

The system determines the user's language in the following order:

1. **Cookie** (`NEXT_LOCALE`) - User's explicit choice (highest priority)
2. **Browser Language** (`Accept-Language` header) - Automatic detection
3. **Default** (`nl`) - Fallback if none of the above match

### Accept-Language Header Parsing

The `Accept-Language` header contains a list of languages with quality values:

```
Accept-Language: en-US,en;q=0.9,nl;q=0.8,de;q=0.7,fr;q=0.5
```

**Format:**

- Languages are comma-separated
- Each language can have a quality value (`q=0.0` to `q=1.0`)
- Higher quality = higher preference
- No quality value defaults to `q=1.0`

### Detection Algorithm

```typescript
function getBrowserLocale(acceptLanguage: string): string | null {
  // 1. Parse the Accept-Language header
  const languages = acceptLanguage
    .split(",")
    .map((lang) => {
      const [code, qValue] = lang.trim().split(";");
      const quality = qValue ? parseFloat(qValue.split("=")[1] ?? "1") : 1;
      return { code: code?.toLowerCase() ?? "", quality };
    })
    .sort((a, b) => b.quality - a.quality); // Sort by preference

  // 2. Try each language in order of preference
  for (const { code } of languages) {
    const baseLanguage = code.split("-")[0]; // en-US → en

    if (baseLanguage && routing.locales.includes(baseLanguage)) {
      return baseLanguage;
    }
  }

  return null;
}
```

**Algorithm steps:**

1. Parse all languages from the header
2. Extract quality values (preference)
3. Sort by quality (highest first)
4. Check each language code against supported locales
5. Strip regional codes (e.g., `en-US` → `en`, `nl-NL` → `nl`)
6. Return first match or `null`

## Examples

### Example 1: English User (United States)

**Browser sends:**

```
Accept-Language: en-US,en;q=0.9
```

**System processes:**

1. Parse: `[{ code: "en-us", quality: 1 }, { code: "en", quality: 0.9 }]`
2. Sort: Already sorted by quality
3. Check `en-us` → extract `en` → ✅ supported
4. **Result:** `en`

### Example 2: Dutch User (Netherlands)

**Browser sends:**

```
Accept-Language: nl-NL,nl;q=0.9,en;q=0.8
```

**System processes:**

1. Parse: `[{ code: "nl-nl", quality: 1 }, { code: "nl", quality: 0.9 }, { code: "en", quality: 0.8 }]`
2. Check `nl-nl` → extract `nl` → ✅ supported
3. **Result:** `nl`

### Example 3: German User (Not Supported)

**Browser sends:**

```
Accept-Language: de-DE,de;q=0.9,en;q=0.8
```

**System processes:**

1. Parse: `[{ code: "de-de", quality: 1 }, { code: "de", quality: 0.9 }, { code: "en", quality: 0.8 }]`
2. Check `de-de` → extract `de` → ❌ not supported
3. Check `de` → ❌ not supported
4. Check `en` → ✅ supported
5. **Result:** `en` (fallback to English)

### Example 4: French User (No Supported Languages)

**Browser sends:**

```
Accept-Language: fr-FR,fr;q=0.9,es;q=0.8
```

**System processes:**

1. Parse: `[{ code: "fr-fr", quality: 1 }, { code: "fr", quality: 0.9 }, { code: "es", quality: 0.8 }]`
2. Check `fr-fr`, `fr`, `es` → all ❌ not supported
3. **Result:** `nl` (default locale)

## Regional Variants Handling

The system intelligently handles regional language codes:

| Browser Language | Code Received | Extracted | Matched |
| ---------------- | ------------- | --------- | ------- |
| English (US)     | `en-US`       | `en`      | ✅      |
| English (UK)     | `en-GB`       | `en`      | ✅      |
| Dutch (NL)       | `nl-NL`       | `nl`      | ✅      |
| Dutch (BE)       | `nl-BE`       | `nl`      | ✅      |
| German (DE)      | `de-DE`       | `de`      | ❌      |
| French (FR)      | `fr-FR`       | `fr`      | ❌      |

## User Experience Flow

### First Visit (No Cookie)

```
1. User opens website
   ↓
2. Browser sends Accept-Language header
   ↓
3. System detects preferred language
   ↓
4. Page renders in detected language
   ↓
5. No cookie is set yet (user hasn't made explicit choice)
```

### After Language Switch

```
1. User clicks language switcher
   ↓
2. Cookie is set: NEXT_LOCALE=en
   ↓
3. Page refreshes
   ↓
4. Future visits: Cookie takes priority over browser language
```

### Testing Language Detection

**To test browser language detection:**

1. **Clear cookies:**
   - Open DevTools → Application → Cookies
   - Delete `NEXT_LOCALE` cookie

2. **Change browser language:**
   - Chrome: Settings → Languages → Add/reorder languages
   - Firefox: Settings → Language → Choose languages
   - Safari: System Preferences → Language & Region

3. **Visit the site:**
   - Hard refresh (Ctrl+Shift+R / Cmd+Shift+R)
   - Page should display in browser's primary language (if supported)

4. **Verify in DevTools:**
   - Network tab → Select any request → Headers
   - Check `Accept-Language` header value
   - Response should match detected language

## Implementation Benefits

### Automatic Localization

- ✅ Users see content in their preferred language immediately
- ✅ No need to manually select language on first visit
- ✅ Works for all visitors globally

### Respects User Preferences

- ✅ Uses browser's language settings
- ✅ Honors quality values (preference order)
- ✅ Gracefully falls back for unsupported languages

### Quality Value Support

- ✅ Processes multiple languages in order of preference
- ✅ Respects `q` values (e.g., `en;q=0.9`)
- ✅ Returns best available match

### Regional Code Handling

- ✅ Strips regional suffixes automatically
- ✅ `en-US`, `en-GB`, `en-AU` all match `en`
- ✅ `nl-NL`, `nl-BE` both match `nl`

## Edge Cases Handled

1. **Empty header:** Falls back to default (`nl`)
2. **Malformed header:** Parsing errors caught, uses default
3. **All unsupported:** Falls back to default
4. **Mixed case:** Normalized to lowercase
5. **No quality values:** Assumes `q=1.0`
6. **Multiple delimiters:** Properly parsed

## Browser Compatibility

The `Accept-Language` header is supported by all modern browsers:

- ✅ Chrome/Edge (Chromium)
- ✅ Firefox
- ✅ Safari
- ✅ Opera
- ✅ Mobile browsers (iOS/Android)

## Server-Side Detection

**Advantages of server-side detection:**

1. Works without JavaScript
2. No flash of wrong language
3. SEO-friendly (proper language from first render)
4. Works for all users (no client-side requirements)

**No client-side detection needed:**

- All detection happens in `src/i18n/request.ts`
- Runs during server-side rendering
- No additional client bundle size

## Cookie Override

Once a user manually selects a language via the `LanguageSwitcher`:

1. Cookie is set with user's choice
2. Cookie takes **priority** over browser language
3. Browser language detection is **bypassed**
4. User's explicit choice is respected on all future visits

**To reset to browser detection:**

- User must clear the `NEXT_LOCALE` cookie
- Or developer can add a "Reset to browser language" option

## Debugging

### Check Current Locale Detection

Add temporary logging:

```typescript
// In src/i18n/request.ts
export default getRequestConfig(async () => {
  const cookieStore = await cookies();
  const locale = cookieStore.get("NEXT_LOCALE")?.value;

  console.log("Cookie locale:", locale);

  if (!locale) {
    const headersList = await headers();
    const acceptLanguage = headersList.get("accept-language");
    console.log("Accept-Language:", acceptLanguage);

    const detected = getBrowserLocale(acceptLanguage ?? "");
    console.log("Detected locale:", detected);
  }

  // ... rest of code
});
```

### Simulate Different Languages

Use browser DevTools to modify headers:

1. Open DevTools → Network tab
2. Right-click any request → "Edit and Resend"
3. Modify `Accept-Language` header
4. Send request

Or use curl:

```bash
curl http://localhost:3000 -H "Accept-Language: en-US,en;q=0.9"
curl http://localhost:3000 -H "Accept-Language: nl-NL,nl;q=0.9"
curl http://localhost:3000 -H "Accept-Language: fr-FR,fr;q=0.9"
```
