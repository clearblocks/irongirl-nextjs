# Storybook Quick Start Guide

## Installation

Since new packages were added to `package.json`, you need to install dependencies:

### Option 1: Using Docker (Recommended)

The Docker containers will automatically install dependencies when they're built. Just run:

```bash
# Build and start all services
docker-compose up --build

# Or just Storybook
docker-compose up --build storybook
```

### Option 2: Local Installation

If you want to run locally without Docker:

```bash
# Install dependencies
npm install

# Or if you prefer yarn (as per project rules)
yarn install
```

## First Run

### Using Docker

```bash
# Start Storybook container
docker-compose up storybook
```

Storybook will be available at: **http://localhost:6006**

### Local Development

```bash
# Start Storybook
npm run storybook
# or
yarn storybook
```

## What You'll See

When you open Storybook, you'll find:

1. **Introduction/Welcome**: Overview and guidelines (start here!)
2. **Atoms Folder**: Basic components
   - Button (with 7 different stories)
   - Input (with 7 different stories)
   - Label (with 5 different stories)
3. **Molecules Folder**: Composite components
   - Card (with 7 different stories)
   - FormField (with 6 different stories)

## Testing the Setup

### 1. Open Storybook
Navigate to http://localhost:6006

### 2. Browse Components
Click on "Atoms" → "Button" in the sidebar

### 3. Interact with Controls
- Try changing the `variant` dropdown
- Try changing the `size` dropdown
- Toggle the `disabled` checkbox
- Watch the button update in real-time

### 4. Check Documentation
Click the "Docs" tab to see auto-generated documentation

## Creating Your First Component Story

Let's create a simple example:

### 1. Create a Component

Create `src/components/atoms/Badge.tsx`:

```typescript
import React from 'react';

export interface BadgeProps {
  children: React.ReactNode;
  color?: 'blue' | 'green' | 'red';
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  color = 'blue',
}) => {
  const colors = {
    blue: 'bg-blue-100 text-blue-800',
    green: 'bg-green-100 text-green-800',
    red: 'bg-red-100 text-red-800',
  };

  return (
    <span className={`px-2 py-1 rounded-full text-sm ${colors[color]}`}>
      {children}
    </span>
  );
};
```

### 2. Create a Story

Create `src/components/atoms/Badge.stories.tsx`:

```typescript
import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from './Badge';

const meta = {
  title: 'Atoms/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Blue: Story = {
  args: {
    children: 'Blue Badge',
    color: 'blue',
  },
};

export const Green: Story = {
  args: {
    children: 'Green Badge',
    color: 'green',
  },
};

export const Red: Story = {
  args: {
    children: 'Red Badge',
    color: 'red',
  },
};
```

### 3. See It Live

Save both files and Storybook will automatically hot-reload. You'll see "Atoms/Badge" appear in the sidebar!

## Troubleshooting

### Storybook Won't Start

**Issue**: Container fails to start or port is in use

**Solution**:
```bash
# Stop any running containers
docker-compose down

# Rebuild and start
docker-compose up --build storybook
```

### Changes Not Showing

**Issue**: Code changes don't appear in Storybook

**Solution**:
- Check that files are saved
- Verify you're editing files inside `src/` directory
- Check the terminal for any error messages
- Try refreshing the browser

### Import Errors

**Issue**: Can't import components with `@/` alias

**Solution**: The path alias is configured in:
- `tsconfig.json` (for TypeScript)
- `.storybook/main.ts` (for Webpack)

Both are already set up correctly.

## Next Steps

1. ✅ Browse the demo components
2. ✅ Read the full documentation: [STORYBOOK.md](./STORYBOOK.md)
3. ✅ Try creating your own component story
4. ✅ Share Storybook URL with your team
5. ✅ Use it for component development and verification

## Useful Commands

```bash
# Start Storybook (Docker)
docker-compose up storybook

# Start Storybook (local)
npm run storybook

# Build static Storybook
npm run build-storybook

# Stop all containers
docker-compose down

# View container logs
docker-compose logs storybook

# Rebuild container after dependency changes
docker-compose up --build storybook
```

## Port Configuration

Default ports:
- Storybook: `6006`
- Next.js: `3000`
- PostgreSQL: `5432`

To change the Storybook port, create/edit `.env`:

```bash
STORYBOOK_PORT=6006
```

## Support

If you encounter any issues:

1. Check the logs: `docker-compose logs storybook`
2. Verify dependencies: `docker-compose exec storybook npm list`
3. Review the configuration files in `.storybook/`
4. Read the detailed documentation in [STORYBOOK.md](./STORYBOOK.md)

Happy component development! 🎨

