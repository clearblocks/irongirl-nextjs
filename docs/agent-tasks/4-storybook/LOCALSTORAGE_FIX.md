# Storybook localStorage Error Fix

## Problem
Storybook failed to build with the following error:
```
ERROR in SecurityError: Cannot initialize local storage without a `--localstorage-file` path
```

This error occurred because:
1. Next.js middleware (`src/middleware.ts`) was being processed during Storybook's webpack build
2. Authentication modules (`src/lib/auth.ts` and `src/hooks/useAuth.ts`) use `localStorage` which is not available in Node.js environment during build time
3. HtmlWebpackPlugin was trying to evaluate code that accessed browser APIs during the build phase

## Solution

### 1. Updated Storybook Configuration (`.storybook/main.ts`)

- Added ES module-compatible `__dirname` replacement using `fileURLToPath` and `dirname`
- Configured webpack to alias auth modules and middleware to mock implementations
- Created webpack resolve aliases to prevent localStorage-dependent modules from being processed

```typescript
// ES module equivalent of __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Mock middleware and auth modules to prevent localStorage issues
config.resolve.alias = {
  ...config.resolve.alias,
  '../src/middleware': path.resolve(__dirname, './mocks/empty.ts'),
  '../src/middleware.ts': path.resolve(__dirname, './mocks/empty.ts'),
  '@/lib/auth': path.resolve(__dirname, './mocks/auth.ts'),
  '@/hooks/useAuth': path.resolve(__dirname, './mocks/useAuth.ts'),
};
```

### 2. Created Mock Modules

Created mock implementations in `.storybook/mocks/` directory:

- **`empty.ts`**: Empty mock for middleware (which is not needed in Storybook)
- **`auth.ts`**: Mock implementation of authentication functions
- **`useAuth.ts`**: Mock implementation of the useAuth hook

These mocks provide the same API but with no-op implementations, preventing localStorage access during build.

### 3. Updated Preview Configuration (`.storybook/preview.ts`)

Added localStorage mock for runtime (if needed):
```typescript
if (typeof window !== 'undefined' && typeof window.localStorage === 'undefined') {
  (window as { localStorage: Storage }).localStorage = {
    getItem: () => null,
    setItem: () => {},
    removeItem: () => {},
    clear: () => {},
    length: 0,
    key: () => null,
  } as Storage;
}
```

### 4. Fixed Auth Code (`src/hooks/useAuth.ts`)

Added missing browser check for direct `localStorage.removeItem` call:
```typescript
if (!isValid && typeof window !== 'undefined') {
  localStorage.removeItem('admin_token');
}
```

## Files Modified

1. `.storybook/main.ts` - Updated webpack configuration with mocks
2. `.storybook/preview.ts` - Added localStorage mock for runtime
3. `src/hooks/useAuth.ts` - Added missing `typeof window` check
4. `.storybook/mocks/empty.ts` - Created (new file)
5. `.storybook/mocks/auth.ts` - Created (new file)
6. `.storybook/mocks/useAuth.ts` - Created (new file)

## Result

Storybook now builds successfully without localStorage errors. The authentication and middleware code is properly mocked during Storybook build, while component stories continue to work as expected.

## Testing

Run Storybook with:
```bash
yarn storybook
```

Storybook should start on http://127.0.0.1:6006 without errors.

