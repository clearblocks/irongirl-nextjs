# Storybook 10.0.6 Limitations

## Overview

This project uses Storybook v10.0.6 which is the first version with Next.js 16 support. However, some Storybook addons are not yet available at this version.

## Unavailable Addons

The following addons were removed because they don't exist at version 10.0.6:

### 1. `@storybook/addon-essentials`
**What it provides:**
- `@storybook/addon-docs` - MDX support and auto-generated documentation
- `@storybook/addon-controls` - Interactive component controls
- `@storybook/addon-actions` - Action logging
- `@storybook/addon-viewport` - Viewport switching
- `@storybook/addon-backgrounds` - Background color switching
- `@storybook/addon-toolbars` - Custom toolbar items
- `@storybook/addon-measure` - Measure UI elements
- `@storybook/addon-outline` - Outline all elements

**Impact:**
- ❌ No MDX file support (use TSX stories instead)
- ❌ No automatic "Docs" tab for components
- ✅ Interactive controls still work via story args
- ✅ Can still document using JSDoc comments

### 2. `@storybook/addon-interactions`
**What it provides:**
- Interactive testing within Storybook
- Play functions to simulate user interactions

**Impact:**
- ❌ Cannot write interaction tests in Storybook
- ✅ Can still manually test interactions in the preview

### 3. `@storybook/test`
**What it provides:**
- Testing utilities for Storybook
- Vitest-compatible assertions

**Impact:**
- ❌ Cannot write component tests within stories
- ✅ Can use separate testing framework (Jest, Vitest, etc.)

## Workarounds

### Documentation Without MDX

Instead of MDX files, use React components for documentation pages:

**Before (MDX - not supported):**
```mdx
import { Meta } from '@storybook/blocks';

<Meta title="Introduction" />

# Welcome

This is my documentation.
```

**After (TSX - supported):**
```typescript
import type { Meta, StoryObj } from '@storybook/react';

const Welcome = () => {
  return (
    <div className="p-8">
      <h1>Welcome</h1>
      <p>This is my documentation.</p>
    </div>
  );
};

const meta = {
  title: 'Introduction/Welcome',
  component: Welcome,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Welcome>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WelcomePage: Story = {};
```

### Component Documentation

Use JSDoc comments and TypeScript types for component documentation:

```typescript
export interface ButtonProps {
  /**
   * Button variant
   * @default 'primary'
   */
  variant?: 'primary' | 'secondary' | 'outline';
  
  /**
   * Button size
   * @default 'medium'
   */
  size?: 'small' | 'medium' | 'large';
  
  /**
   * Click handler
   */
  onClick?: () => void;
}

/**
 * Primary UI component for user interaction
 */
export const Button: React.FC<ButtonProps> = ({ ... }) => {
  // implementation
};
```

### Interactive Controls

Controls work automatically through story args:

```typescript
export const Primary: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    children: 'Button',
  },
};
```

Users can modify these values in the Storybook UI to see changes in real-time.

### Testing Interactions

For interaction testing, use a separate testing framework:

```typescript
// Button.test.tsx
import { render, fireEvent } from '@testing-library/react';
import { Button } from './Button';

test('calls onClick when clicked', () => {
  const handleClick = jest.fn();
  const { getByText } = render(
    <Button onClick={handleClick}>Click me</Button>
  );
  
  fireEvent.click(getByText('Click me'));
  expect(handleClick).toHaveBeenCalledTimes(1);
});
```

## What Still Works

Despite these limitations, you still have:

✅ **Component Preview**: View components in isolation
✅ **Interactive Controls**: Modify props via Storybook UI
✅ **Multiple Stories**: Create different states per component
✅ **Hot Reload**: See changes instantly
✅ **TypeScript Support**: Full type checking
✅ **Tailwind CSS**: All design tokens available
✅ **Next.js Integration**: Image optimization, fonts, etc.
✅ **Custom Addons**: Can add other compatible addons

## Future Upgrades

When these addons become available at a compatible version, you can add them:

```bash
# When available:
yarn add -D @storybook/addon-essentials@latest
yarn add -D @storybook/addon-interactions@latest
yarn add -D @storybook/test@latest
```

Then update `.storybook/main.ts`:

```typescript
const config: StorybookConfig = {
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',      // Add when available
    '@storybook/addon-interactions',    // Add when available
  ],
  // ... rest of config
};
```

## Checking Addon Availability

To check if addons are available at your Storybook version:

```bash
npm info @storybook/addon-essentials versions
```

Look for versions that match your Storybook version (10.0.6 in this case).

## Recommended Approach

For now, use the minimal setup with:
- **TSX stories** for all components and documentation
- **JSDoc comments** for inline documentation
- **TypeScript interfaces** for prop documentation
- **Separate test files** for interaction/unit tests

This approach is:
- ✅ Simple and maintainable
- ✅ Fully supported in Storybook 10.0.6
- ✅ Compatible with agent-generated components
- ✅ Easy to upgrade later when addons become available

