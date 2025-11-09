# Question 1

I have a next js application, I want to build a page that is built up of small components making larger components etc. I like the atoms, molecules, organisms pattern. How would the project structure look like. I do like to have the code in a src directory.

# Answer

Here's a well-organized project structure for your Next.js application using the Atomic Design pattern with a `src` directory:

```
my-nextjs-app/
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── (marketing)/              # Route groups
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx
│   │   │   └── about/
│   │   │       └── page.tsx
│   │   ├── (dashboard)/
│   │   │   ├── layout.tsx
│   │   │   └── dashboard/
│   │   │       └── page.tsx
│   │   ├── layout.tsx                # Root layout
│   │   ├── page.tsx                  # Home page
│   │   └── globals.css
│   │
│   ├── components/
│   │   ├── atoms/                    # Basic building blocks
│   │   │   ├── Button/
│   │   │   │   ├── Button.tsx
│   │   │   │   ├── Button.test.tsx
│   │   │   │   └── index.ts
│   │   │   ├── Input/
│   │   │   ├── Label/
│   │   │   ├── Icon/
│   │   │   ├── Badge/
│   │   │   └── index.ts              # Barrel export
│   │   │
│   │   ├── molecules/                # Simple component groups
│   │   │   ├── FormField/            # Label + Input + Error
│   │   │   │   ├── FormField.tsx
│   │   │   │   └── index.ts
│   │   │   ├── SearchBar/            # Input + Button + Icon
│   │   │   ├── Card/
│   │   │   ├── NavItem/
│   │   │   └── index.ts
│   │   │
│   │   ├── organisms/                # Complex components
│   │   │   ├── Header/               # Logo + Nav + SearchBar
│   │   │   │   ├── Header.tsx
│   │   │   │   └── index.ts
│   │   │   ├── Footer/
│   │   │   ├── LoginForm/            # Multiple FormFields + Button
│   │   │   ├── ProductGrid/
│   │   │   └── index.ts
│   │   │
│   │   ├── templates/                # Page layouts
│   │   │   ├── MainLayout/
│   │   │   │   ├── MainLayout.tsx
│   │   │   │   └── index.ts
│   │   │   ├── DashboardLayout/
│   │   │   └── index.ts
│   │   │
│   │   └── ui/                       # shadcn/ui or other UI library components
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       └── input.tsx
│   │
│   ├── lib/                          # Utility functions
│   │   ├── utils.ts
│   │   ├── api.ts
│   │   └── constants.ts
│   │
│   ├── hooks/                        # Custom React hooks
│   │   ├── useAuth.ts
│   │   ├── useMediaQuery.ts
│   │   └── index.ts
│   │
│   ├── types/                        # TypeScript types
│   │   ├── index.ts
│   │   └── api.ts
│   │
│   ├── styles/                       # Global styles, themes
│   │   ├── themes.ts
│   │   └── variables.css
│   │
│   └── config/                       # Configuration files
│       ├── site.ts
│       └── navigation.ts
│
├── public/                           # Static assets
│   ├── images/
│   └── fonts/
│
├── .env.local
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

**Key principles:**

1. **Atoms** - Smallest components (Button, Input, Icon)
2. **Molecules** - Simple groups of atoms (FormField = Label + Input)
3. **Organisms** - Complex components (Header = Logo + Navigation + SearchBar)
4. **Templates** - Page-level layouts combining organisms
5. **Pages** (in `app/`) - Use templates with real content

**Example component structure:**

```typescript
// src/components/atoms/Button/Button.tsx
export interface ButtonProps {
  variant?: 'primary' | 'secondary';
  children: React.ReactNode;
}

export const Button = ({ variant = 'primary', children }: ButtonProps) => {
  return <button className={variant}>{children}</button>;
};

// src/components/atoms/Button/index.ts
export { Button } from './Button';
export type { ButtonProps } from './Button';
```

This structure keeps your code organized, scalable, and maintainable as your application grows!

# Question 2

What purpose do the index.ts files have in the folders?

# Answer

The `index.ts` files serve as **barrel exports** - they act as a central export point for a folder. Here's why they're useful:

## Benefits

**1. Cleaner imports:**
```typescript
// Without index.ts
import { Button } from '@/components/atoms/Button/Button';
import { ButtonProps } from '@/components/atoms/Button/Button';

// With index.ts
import { Button, ButtonProps } from '@/components/atoms/Button';
```

**2. Encapsulation:**
You control what's exported from a folder. Internal implementation files stay private:
```typescript
// src/components/atoms/Button/index.ts
export { Button } from './Button';
export type { ButtonProps } from './Button';
// ButtonHelpers.ts is NOT exported - stays internal
```

**3. Easy refactoring:**
If you rename `Button.tsx` to `PrimaryButton.tsx`, you only update the `index.ts`:
```typescript
// index.ts
export { PrimaryButton as Button } from './PrimaryButton';
```
All imports throughout your app still work!

**4. Grouping exports:**
```typescript
// src/components/atoms/index.ts
export * from './Button';
export * from './Input';
export * from './Label';

// Now you can do:
import { Button, Input, Label } from '@/components/atoms';
```

## Example Structure

```typescript
// src/components/molecules/FormField/FormField.tsx
export const FormField = ({ label, error, ...props }) => { /* ... */ };

// src/components/molecules/FormField/index.ts
export { FormField } from './FormField';

// Usage in your page:
import { FormField } from '@/components/molecules/FormField';
```

**Note:** They're optional! If you prefer `import { Button } from './Button/Button'`, you can skip them. But they're a common pattern in larger codebases for cleaner imports.

# Question 3

Why are page level layouts in the templates dir but also in the app page dirs?

# Answer 

Great question! This can be confusing. Let me clarify the distinction:

## Templates vs App Layouts

**Templates** (in `components/templates/`):
- **Reusable UI structure** without route-specific logic
- Pure presentation components
- Can be used across different pages/routes
- Contains slots/props for content injection

```typescript
// src/components/templates/MainLayout/MainLayout.tsx
export const MainLayout = ({ children, sidebar }) => (
  <div>
    <Header />
    <div className="container">
      <aside>{sidebar}</aside>
      <main>{children}</main>
    </div>
    <Footer />
  </div>
);
```

**Layouts** (in `app/`):
- **Next.js specific** - tied to routing
- Contains route-specific logic, metadata, data fetching
- Uses your template components
- Handles Next.js features (loading states, error boundaries, etc.)

```typescript
// src/app/layout.tsx
import { MainLayout } from '@/components/templates/MainLayout';

export const metadata = {
  title: 'My App',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  );
}
```

## When to use what?

**Use Templates when:**
- You want to reuse the same layout structure in multiple places
- You need to showcase layouts in Storybook
- You want separation between UI and routing logic

**Use App Layouts when:**
- You need Next.js routing features (nested layouts, route groups)
- You need to add metadata, data fetching, or server components

## Alternative: Skip Templates

Many developers **skip the templates folder entirely** and just use Next.js layouts directly. This is totally valid:

```
src/
├── app/
│   ├── layout.tsx           # Just use this
│   └── dashboard/
│       └── layout.tsx       # And this
└── components/
    ├── atoms/
    ├── molecules/
    └── organisms/           # Header, Footer go here
```

The templates layer is most useful if you're strictly following Atomic Design or need highly reusable layout components. Otherwise, you can simplify and just use Next.js layouts!

# Question 4

I want to use tail wind but also use design tokens from figma, which i think should be put in a theme. how could this be set up?

# Answer

Great approach! Here's how to set up Tailwind with Figma design tokens in a structured way:

## Project Structure

```
src/
├── styles/
│   ├── design-tokens/
│   │   ├── colors.ts
│   │   ├── typography.ts
│   │   ├── spacing.ts
│   │   ├── shadows.ts
│   │   ├── borders.ts
│   │   └── index.ts
│   ├── themes/
│   │   ├── light.ts
│   │   ├── dark.ts
│   │   └── index.ts
│   └── globals.css
├── tailwind.config.ts
└── ...
```

## 1. Define Design Tokens (from Figma)

```typescript
// src/styles/design-tokens/colors.ts
export const colors = {
  // Primary
  primary: {
    50: '#eff6ff',
    100: '#dbeafe',
    500: '#3b82f6',
    600: '#2563eb',
    900: '#1e3a8a',
  },
  // Semantic colors
  success: {
    light: '#d1fae5',
    DEFAULT: '#10b981',
    dark: '#065f46',
  },
  error: {
    light: '#fee2e2',
    DEFAULT: '#ef4444',
    dark: '#991b1b',
  },
  // Neutral
  neutral: {
    0: '#ffffff',
    50: '#f9fafb',
    100: '#f3f4f6',
    500: '#6b7280',
    900: '#111827',
    1000: '#000000',
  },
} as const;

// src/styles/design-tokens/typography.ts
export const typography = {
  fontFamily: {
    sans: ['Inter', 'system-ui', 'sans-serif'],
    mono: ['Roboto Mono', 'monospace'],
  },
  fontSize: {
    xs: ['0.75rem', { lineHeight: '1rem' }],      // 12px
    sm: ['0.875rem', { lineHeight: '1.25rem' }],   // 14px
    base: ['1rem', { lineHeight: '1.5rem' }],      // 16px
    lg: ['1.125rem', { lineHeight: '1.75rem' }],   // 18px
    xl: ['1.25rem', { lineHeight: '1.75rem' }],    // 20px
    '2xl': ['1.5rem', { lineHeight: '2rem' }],     // 24px
    '3xl': ['1.875rem', { lineHeight: '2.25rem' }], // 30px
    '4xl': ['2.25rem', { lineHeight: '2.5rem' }],  // 36px
  },
  fontWeight: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
} as const;

// src/styles/design-tokens/spacing.ts
export const spacing = {
  0: '0',
  1: '0.25rem',   // 4px
  2: '0.5rem',    // 8px
  3: '0.75rem',   // 12px
  4: '1rem',      // 16px
  5: '1.25rem',   // 20px
  6: '1.5rem',    // 24px
  8: '2rem',      // 32px
  10: '2.5rem',   // 40px
  12: '3rem',     // 48px
  16: '4rem',     // 64px
  20: '5rem',     // 80px
} as const;

// src/styles/design-tokens/shadows.ts
export const shadows = {
  sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  DEFAULT: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
  md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
} as const;

// src/styles/design-tokens/borders.ts
export const borders = {
  radius: {
    none: '0',
    sm: '0.25rem',    // 4px
    DEFAULT: '0.5rem', // 8px
    md: '0.75rem',    // 12px
    lg: '1rem',       // 16px
    full: '9999px',
  },
  width: {
    0: '0',
    DEFAULT: '1px',
    2: '2px',
    4: '4px',
  },
} as const;

// src/styles/design-tokens/index.ts
export * from './colors';
export * from './typography';
export * from './spacing';
export * from './shadows';
export * from './borders';
```

## 2. Create Theme Configurations

```typescript
// src/styles/themes/light.ts
import { colors } from '../design-tokens';

export const lightTheme = {
  colors: {
    background: colors.neutral[0],
    foreground: colors.neutral[900],
    card: colors.neutral[0],
    'card-foreground': colors.neutral[900],
    primary: colors.primary[600],
    'primary-foreground': colors.neutral[0],
    secondary: colors.neutral[100],
    'secondary-foreground': colors.neutral[900],
    muted: colors.neutral[100],
    'muted-foreground': colors.neutral[500],
    border: colors.neutral[200],
    input: colors.neutral[200],
    ring: colors.primary[500],
  },
} as const;

// src/styles/themes/dark.ts
import { colors } from '../design-tokens';

export const darkTheme = {
  colors: {
    background: colors.neutral[950],
    foreground: colors.neutral[50],
    card: colors.neutral[900],
    'card-foreground': colors.neutral[50],
    primary: colors.primary[500],
    'primary-foreground': colors.neutral[0],
    secondary: colors.neutral[800],
    'secondary-foreground': colors.neutral[50],
    muted: colors.neutral[800],
    'muted-foreground': colors.neutral[400],
    border: colors.neutral[800],
    input: colors.neutral[800],
    ring: colors.primary[400],
  },
} as const;

// src/styles/themes/index.ts
export * from './light';
export * from './dark';
```

## 3. Configure Tailwind

```typescript
// tailwind.config.ts
import type { Config } from 'tailwindcss';
import { colors, typography, spacing, shadows, borders } from './src/styles/design-tokens';

const config: Config = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        ...colors,
        // Theme-aware colors (uses CSS variables)
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: 'hsl(var(--card))',
        'card-foreground': 'hsl(var(--card-foreground))',
        primary: {
          ...colors.primary,
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
      },
      fontFamily: typography.fontFamily,
      fontSize: typography.fontSize,
      fontWeight: typography.fontWeight,
      spacing: spacing,
      boxShadow: shadows,
      borderRadius: borders.radius,
      borderWidth: borders.width,
    },
  },
  plugins: [],
};

export default config;
```

## 4. Set up CSS Variables for Theming

```css
/* src/styles/globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    /* Light theme */
    --background: 0 0% 100%;
    --foreground: 222 47% 11%;
    --card: 0 0% 100%;
    --card-foreground: 222 47% 11%;
    --primary: 217 91% 60%;
    --primary-foreground: 0 0% 100%;
    --secondary: 220 14% 96%;
    --secondary-foreground: 222 47% 11%;
    --muted: 220 14% 96%;
    --muted-foreground: 215 16% 47%;
    --border: 220 13% 91%;
    --input: 220 13% 91%;
    --ring: 217 91% 60%;
  }

  .dark {
    /* Dark theme */
    --background: 222 47% 4%;
    --foreground: 213 31% 97%;
    --card: 222 47% 11%;
    --card-foreground: 213 31% 97%;
    --primary: 217 91% 60%;
    --primary-foreground: 0 0% 100%;
    --secondary: 215 28% 17%;
    --secondary-foreground: 213 31% 97%;
    --muted: 215 28% 17%;
    --muted-foreground: 215 16% 65%;
    --border: 215 28% 17%;
    --input: 215 28% 17%;
    --ring: 217 91% 60%;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
  }
}
```

## 5. Usage in Components

```typescript
// Using design tokens directly
<button className="bg-primary-600 text-neutral-0 px-4 py-2 rounded-md">
  Click me
</button>

// Using theme-aware colors (adapts to light/dark mode)
<button className="bg-primary text-primary-foreground px-4 py-2 rounded-md">
  Click me
</button>

// Using typography tokens
<h1 className="text-3xl font-bold">Heading</h1>

// Using spacing tokens
<div className="p-4 m-8">Content</div>
```

## 6. Optional: Figma Tokens Plugin Integration

If you're using the **Figma Tokens** plugin, you can export tokens as JSON and convert them:

```typescript
// scripts/convert-figma-tokens.ts
import figmaTokens from './figma-tokens.json';

// Convert Figma tokens to your format
const colors = Object.entries(figmaTokens.colors).reduce((acc, [key, value]) => {
  acc[key] = value;
  return acc;
}, {});

// Write to design-tokens files
```

This setup gives you:
- ✅ Type-safe design tokens
- ✅ Single source of truth from Figma
- ✅ Easy theme switching (light/dark)
- ✅ Full Tailwind utility classes
- ✅ Consistent spacing, colors, typography across your app

# Question 5

Can I use the Figma MCP to export the design tokens out of Figma. Will this work if the design tokens are just Figma variables that follow a naming convention?

# Answer

Yes, you can use the Figma MCP (Model Context Protocol) server to export design tokens from Figma! However, there are some important considerations:

## How Figma MCP Works with Variables

The Figma MCP can access Figma files and extract information, including variables. If your design tokens are set up as **Figma variables** with a consistent naming convention, the MCP can read them.

**What you can do:**
- Read variable collections
- Extract variable names, values, and types
- Get color, number, string, and boolean variables
- Access variable modes (for light/dark themes)

## Example Workflow

```typescript
// Using Figma MCP to extract variables
// The MCP would return something like:

{
  "collections": [
    {
      "name": "Colors",
      "modes": ["Light", "Dark"],
      "variables": [
        {
          "name": "colors/primary/500",
          "type": "COLOR",
          "valuesByMode": {
            "Light": "#3b82f6",
            "Dark": "#60a5fa"
          }
        },
        {
          "name": "spacing/4",
          "type": "FLOAT",
          "value": 16
        }
      ]
    }
  ]
}
```

## Converting to Your Token Structure

You'd need to parse the naming convention and transform it:

```typescript
// scripts/sync-figma-tokens.ts
// This would use Figma MCP to fetch variables

function parseVariableName(name: string) {
  // "colors/primary/500" -> { category: 'colors', name: 'primary', variant: '500' }
  const parts = name.split('/');
  return {
    category: parts[0],
    name: parts[1],
    variant: parts[2],
  };
}

function convertToDesignTokens(figmaVariables) {
  const tokens = {
    colors: {},
    spacing: {},
    typography: {},
  };

  figmaVariables.forEach(variable => {
    const parsed = parseVariableName(variable.name);
    
    if (parsed.category === 'colors') {
      if (!tokens.colors[parsed.name]) {
        tokens.colors[parsed.name] = {};
      }
      tokens.colors[parsed.name][parsed.variant] = variable.value;
    }
    // ... handle other categories
  });

  return tokens;
}

// Write to src/styles/design-tokens/colors.ts
```

## Naming Convention Requirements

For this to work well, your Figma variables should follow a clear naming pattern:

```
✅ Good naming conventions:
- colors/primary/500
- colors/primary/600
- spacing/4
- spacing/8
- typography/fontFamily/sans
- typography/fontSize/base
- shadows/md
- borders/radius/md

❌ Avoid:
- Inconsistent separators (primary-500, primary/600)
- No clear hierarchy (primaryColor500)
- Special characters that don't parse well
```

## Limitations to Consider

1. **Variable Support**: Figma variables are relatively new. Make sure your design system uses them (not just regular styles)

2. **Complex Transformations**: Some token types might need manual mapping:
   - Typography (font families, weights, sizes) might be spread across multiple variables
   - Composite values (like `fontSize` with `lineHeight`) need combining
   - Semantic tokens might reference primitive tokens

3. **MCP Access**: You need the Figma file URL/ID and proper permissions

4. **One-way Sync**: This is typically a one-way sync from Figma → Code

## Recommended Approach

**Option 1: MCP + Custom Script** (More Control)
```typescript
// Use Figma MCP to fetch variables
// Transform to your format
// Generate TypeScript files
```

**Option 2: Figma Tokens Plugin** (Easier)
- Use the community plugin "Tokens Studio for Figma"
- Exports to JSON in various formats
- Better support for complex token relationships
- Can sync with GitHub

**Option 3: Hybrid**
- Use Figma variables for source of truth
- Use MCP or REST API to fetch
- Run a script to generate design-tokens files
- Commit generated files to git

## Example Script Structure

```typescript
// scripts/sync-design-tokens.ts
import fs from 'fs';

async function syncTokensFromFigma() {
  // 1. Use Figma MCP to fetch variables
  const variables = await fetchFigmaVariables();
  
  // 2. Transform to your structure
  const colors = transformColors(variables);
  const spacing = transformSpacing(variables);
  const typography = transformTypography(variables);
  
  // 3. Generate TypeScript files
  generateTokenFile('colors.ts', colors);
  generateTokenFile('spacing.ts', spacing);
  generateTokenFile('typography.ts', typography);
  
  console.log('✅ Design tokens synced from Figma');
}

syncTokensFromFigma();
```

**Run this as part of your development workflow:**
```json
// package.json
{
  "scripts": {
    "sync-tokens": "tsx scripts/sync-design-tokens.ts",
    "dev": "npm run sync-tokens && next dev"
  }
}
```

So yes, it can work! The key is having a consistent naming convention in Figma and writing a transform script to convert the MCP output to your design token structure.