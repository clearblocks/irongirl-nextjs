# Tailwind CSS v4 Setup Guide

This project uses **Tailwind CSS v4**, which has a fundamentally different configuration approach than v3. This document explains the setup and how to work with it.

## Key Differences from Tailwind v3

### v3 (Old)
- Required `tailwind.config.js` file
- Used `@tailwind base; @tailwind components; @tailwind utilities;` directives
- Configuration in JavaScript

### v4 (New - Current)
- **Optional** `tailwind.config.ts` (mainly for content paths and IDE support)
- Uses `@import "tailwindcss";` directive
- Configuration in CSS using `@theme` directive
- Better performance and faster builds

## Project Configuration Files

### 1. `tailwind.config.ts`
```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/stories/**/*.{js,ts,jsx,tsx,mdx}",
  ],
};

export default config;
```

**Purpose:**
- Defines content paths for CSS purging
- Provides IDE autocomplete support
- Optional but recommended for better DX

### 2. `postcss.config.mjs`
```javascript
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};

export default config;
```

**Purpose:**
- Integrates Tailwind v4 with PostCSS
- Uses `@tailwindcss/postcss` plugin (not the old `tailwindcss` plugin)

### 3. `src/app/globals.css`

This is where the theme configuration lives:

```css
@import "tailwindcss";
@import "../styles/figma-tokens.css";

:root {
  --background: #ffffff;
  --foreground: #171717;
}

@theme {
  /* All Tailwind theme customizations go here */
  --color-primary: var(--color-primary-500);
  --font-family-sans: var(--font-family-base);
  /* ... more theme tokens ... */
}
```

**Purpose:**
- Imports Tailwind CSS base styles
- Defines custom theme tokens
- Maps Figma design tokens to Tailwind classes

### 4. `src/styles/figma-tokens.css`

Contains raw design tokens from Figma:

```css
:root {
  --color-primary-500: #ff5492;
  --font-size-base: 15px;
  /* ... more design tokens ... */
}
```

## Available Tailwind Classes

All custom classes are defined in the `@theme` block in `globals.css`:

### Colors
- `bg-primary`, `text-primary`, `border-primary`
- `bg-primary-light`, `text-primary-light`
- `bg-header`, `text-header`
- `bg-header-light`, `text-header-light`
- `bg-background`, `text-foreground`

### Typography - Fonts
- `font-hero` - Inria Serif (for hero headings)
- `font-sans` - Inter (default body font)
- `font-header` - Kaisei Tokumin (for section headers)

### Typography - Sizes
- `text-xs` - 11px
- `text-base` - 15px (default)
- `text-xl` - 19px
- `text-2xl` - 22px
- `text-3xl` - 26px

### Line Heights
- `leading-list` - 30px (for list items)

## How to Add New Theme Tokens

1. **Add to Figma tokens** (if design-related):
   ```css
   /* src/styles/figma-tokens.css */
   :root {
     --color-secondary-500: #your-color;
   }
   ```

2. **Map to Tailwind classes**:
   ```css
   /* src/app/globals.css */
   @theme {
     --color-secondary: var(--color-secondary-500);
   }
   ```

3. **Use in components**:
   ```tsx
   <div className="bg-secondary text-white">
     Hello World
   </div>
   ```

## Component Example

```tsx
export const MyComponent = () => {
  return (
    <div className="bg-primary-light p-8 rounded-lg">
      <h1 className="font-hero text-3xl text-primary mb-4">
        Hero Heading
      </h1>
      <p className="font-sans text-base text-foreground leading-list">
        Body text with custom line height
      </p>
      <button className="bg-primary text-white font-sans text-xl px-6 py-3 rounded-full">
        Click Me
      </button>
    </div>
  );
};
```

## Storybook Integration

Storybook automatically inherits all Tailwind styles via:

```typescript
// .storybook/preview.ts
import '../src/app/globals.css';
```

No additional configuration needed!

## IDE Support

### VS Code
Install the official Tailwind CSS IntelliSense extension:
- Extension ID: `bradlc.vscode-tailwindcss`

The extension will automatically detect the `tailwind.config.ts` file and provide:
- Autocomplete for class names
- Hover previews
- Linting

### TypeScript
Tailwind v4 provides excellent TypeScript support out of the box. The `tailwind.config.ts` file is fully typed.

## Common Issues and Solutions

### Issue: "Can't find tailwind.config"
**Solution:** This is normal for v4. The config file is optional. If you see this message from an AI assistant, it's because v4's approach is different. The config file now exists for content paths and IDE support.

### Issue: Classes not working
**Solution:** Make sure:
1. Your component file is in one of the content paths in `tailwind.config.ts`
2. The dev server is running (`yarn dev`)
3. You're importing `globals.css` in your layout

### Issue: Custom colors not working
**Solution:** Check that:
1. Colors are defined in the `@theme` block in `globals.css`
2. The naming follows Tailwind conventions (e.g., `--color-primary`, not `--primary-color`)
3. Figma tokens are properly imported

## Package.json Dependencies

```json
{
  "devDependencies": {
    "@tailwindcss/postcss": "^4",
    "tailwindcss": "^4"
  }
}
```

Note: v4 requires both packages.

## Building for Production

Tailwind v4 automatically handles:
- CSS purging (removes unused styles)
- Minification
- Optimization

Just run:
```bash
yarn build
```

## Migration Notes

If you're used to Tailwind v3:
- ✅ All utility classes work the same way
- ✅ Most configuration is backwards compatible
- ❌ No JIT mode (v4 is always optimized)
- ❌ No `safelist` in config (use `@theme` instead)
- ✅ Better performance and smaller bundle sizes

## Resources

- [Tailwind CSS v4 Documentation](https://tailwindcss.com/docs)
- [Tailwind CSS v4 Beta Announcement](https://tailwindcss.com/blog/tailwindcss-v4-beta)
- [Migration Guide](https://tailwindcss.com/docs/upgrade-guide)

## Summary

**This project uses Tailwind CSS v4 with:**
- ✅ `tailwind.config.ts` for content paths and IDE support
- ✅ `@import "tailwindcss"` in `globals.css`
- ✅ `@theme` directive for custom theme configuration
- ✅ Figma design tokens integration
- ✅ Full Next.js and Storybook support

**No additional setup needed!** Just use Tailwind classes as normal.

