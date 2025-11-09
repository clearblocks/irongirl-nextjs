# Storybook Setup

This project uses Storybook v10.0.6 for developing and documenting React components in isolation.

## Overview

Storybook runs in a separate Docker container and provides a UI for browsing and testing all reusable components. This is especially useful for:

- Developing components in isolation
- Testing different component states
- Documenting component APIs
- Verifying agent-generated components
- Visual regression testing

## Running Storybook

### Using Docker (Recommended)

Start the Storybook container:

```bash
docker-compose up storybook
```

Or to run all services including Storybook:

```bash
docker-compose up
```

Storybook will be available at: http://localhost:6006

### Local Development

If you prefer to run Storybook locally without Docker:

```bash
npm run storybook
```

## Building Storybook

To build a static version of Storybook for deployment:

```bash
npm run build-storybook
```

This creates a `storybook-static` directory with the built Storybook.

## Project Structure

```
src/
├── components/
│   ├── atoms/
│   │   ├── Button.tsx
│   │   ├── Button.stories.tsx
│   │   ├── Input.tsx
│   │   ├── Input.stories.tsx
│   │   ├── Label.tsx
│   │   ├── Label.stories.tsx
│   │   └── index.ts
│   └── molecules/
│       ├── Card.tsx
│       ├── Card.stories.tsx
│       ├── FormField.tsx
│       ├── FormField.stories.tsx
│       └── index.ts
.storybook/
├── main.ts          # Storybook configuration
└── preview.ts       # Global decorators and parameters
```

## Important Note: No MDX Support

Due to using Storybook v10.0.6 (required for Next.js 16 support), the `@storybook/addon-essentials` package is not yet available at this version. This means:

- ❌ **No MDX files** - Cannot use `.mdx` files for documentation
- ❌ **No auto-generated Docs tab** - No automatic documentation pages
- ✅ **TSX stories work perfectly** - All component stories work as expected
- ✅ **Use JSDoc for documentation** - Document props with TypeScript and JSDoc comments

For more details, see [STORYBOOK_LIMITATIONS.md](./STORYBOOK_LIMITATIONS.md)

## Creating Stories

### Basic Story Example

```typescript
import type { Meta, StoryObj } from '@storybook/react';
import { YourComponent } from './YourComponent';

const meta = {
  title: 'Atoms/YourComponent',
  component: YourComponent,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary'],
    },
  },
} satisfies Meta<typeof YourComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: 'primary',
    children: 'Click me',
  },
};
```

## Component Categories

### Atoms
Basic building blocks (Button, Input, Label, etc.)

### Molecules
Combinations of atoms (FormField, Card, etc.)

### Organisms
Complex components composed of molecules and atoms

## Demo Components

The following demo components are included:

### Atoms
- **Button**: Configurable button with variants (primary, secondary, outline) and sizes
- **Input**: Form input with error states and validation
- **Label**: Form label with required indicator

### Molecules
- **FormField**: Combined label and input with error/helper text
- **Card**: Container component with title, content, and footer

## Configuration

### Tailwind CSS Support
Storybook is configured to use your project's Tailwind CSS setup, including custom design tokens from `figma-tokens.css`.

### Next.js Integration
The `@storybook/nextjs` framework adapter is configured to work seamlessly with Next.js 16, including:
- Image optimization
- Font optimization
- Path aliases (@/* imports)
- CSS modules

## Docker Configuration

The Storybook container is configured in `docker-compose.yml`:

```yaml
storybook:
  build:
    context: .
    dockerfile: Dockerfile.storybook
  container_name: irongirl-storybook
  ports:
    - "6006:6006"
  volumes:
    - .:/app
    - /app/node_modules
```

## Environment Variables

You can customize the Storybook port by setting:

```bash
STORYBOOK_PORT=6006
```

## Best Practices

1. **One Story File Per Component**: Keep stories alongside their components
2. **Use TypeScript**: Leverage type safety for props
3. **Document Props**: Use JSDoc comments for prop documentation
4. **Multiple Stories**: Create stories for different states and variants
5. **Controls**: Use Storybook controls for interactive prop manipulation
6. **Accessibility**: Test components with keyboard navigation and screen readers

## Troubleshooting

### Port Already in Use
If port 6006 is already in use, change the `STORYBOOK_PORT` environment variable.

### Hot Reload Not Working
Ensure the volume mounts in `docker-compose.yml` are correct and Docker has file watching enabled.

### Build Errors
Run `npm ci` to ensure all dependencies are properly installed, especially Storybook v10.0.6 packages.

## Resources

- [Storybook Documentation](https://storybook.js.org/docs)
- [Storybook for Next.js](https://storybook.js.org/docs/get-started/nextjs)
- [Writing Stories](https://storybook.js.org/docs/writing-stories)
- [Component Story Format](https://storybook.js.org/docs/api/csf)

