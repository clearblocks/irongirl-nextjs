# Storybook Configuration Fix

## Issue

When running `yarn storybook`, the following error occurred:

```
ReferenceError: __dirname is not defined
at Object.webpackFinal (file://./.storybook/main.ts:16:27)
```

## Root Cause

Storybook 10 uses ES modules (ESM) for configuration files, and `__dirname` is not available in ES modules. It's only available in CommonJS modules.

## Solution

### 1. Removed Unnecessary Webpack Configuration

The `@storybook/nextjs` framework adapter automatically handles Next.js configuration, including path aliases from `tsconfig.json`. We don't need to manually configure webpack for the `@/*` alias.

**Before:**
```typescript
import path from 'path';

webpackFinal: async (config) => {
  if (config.resolve) {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, '../src'),  // ❌ __dirname not available in ESM
    };
  }
  return config;
}
```

**After:**
```typescript
// No webpack configuration needed!
// Path aliases are automatically handled by @storybook/nextjs
```

### 2. Fixed Network Binding

Added explicit host binding to prevent network interface errors:

**Local Development (`package.json`):**
```json
{
  "scripts": {
    "storybook": "storybook dev -p 6006 --host 127.0.0.1"
  }
}
```

**Docker (`Dockerfile.storybook`):**
```dockerfile
CMD ["npx", "storybook", "dev", "-p", "6006", "--host", "0.0.0.0"]
```

### 3. Simplified Configuration

Final `.storybook/main.ts`:

```typescript
import type { StorybookConfig } from '@storybook/nextjs';

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: ['@storybook/addon-links'],
  framework: {
    name: '@storybook/nextjs',
    options: {},
  },
  staticDirs: ['../public'],
};

export default config;
```

## Testing

### Local Development

```bash
yarn storybook
```

Visit: http://localhost:6006

### Docker

```bash
docker-compose up storybook
# or
docker-compose up --build storybook  # if you need to rebuild
```

Visit: http://localhost:6006

## Dependencies

The following Storybook packages are used (all version 10.0.6):

```json
{
  "@storybook/addon-links": "10.0.6",
  "@storybook/nextjs": "10.0.6",
  "@storybook/react": "10.0.6",
  "storybook": "10.0.6"
}
```

**Removed packages** (not yet available in 10.0.6):
- `@storybook/addon-essentials` (includes addon-docs for MDX support)
- `@storybook/addon-interactions`
- `@storybook/test`

**Note**: Without `@storybook/addon-essentials`, MDX files are not supported. All documentation and stories are written as TSX files instead.

## Key Learnings

1. **ES Modules vs CommonJS**: Storybook 10 configuration files are ES modules. Use `import.meta.url` instead of `__dirname` if you need file paths.

2. **Framework Adapters**: Modern framework adapters (like `@storybook/nextjs`) handle most configuration automatically. Avoid manual webpack configuration unless absolutely necessary.

3. **Path Aliases**: Next.js path aliases defined in `tsconfig.json` are automatically available in Storybook when using the Next.js adapter.

4. **Network Binding**:
   - Local: Use `127.0.0.1` (localhost only)
   - Docker: Use `0.0.0.0` (accept external connections)

## Alternative: If You Need __dirname

If you absolutely need `__dirname` in an ES module, use this pattern:

```typescript
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
```

However, for Storybook with Next.js, this is not necessary.

## References

- [Storybook 10 Migration Guide](https://storybook.js.org/docs/migration-guide)
- [ES Modules in Node.js](https://nodejs.org/api/esm.html)
- [@storybook/nextjs Documentation](https://storybook.js.org/docs/get-started/nextjs)

