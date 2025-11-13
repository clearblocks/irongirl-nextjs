import type { Preview } from '@storybook/react';
import '../src/app/globals.css';

// Mock localStorage for Storybook if not available (during build)
if (typeof window !== 'undefined' && typeof window.localStorage === 'undefined') {
  // Mocking localStorage for Storybook compatibility
  (window as { localStorage: Storage }).localStorage = {
    getItem: () => null,
    setItem: () => {},
    removeItem: () => {},
    clear: () => {},
    length: 0,
    key: () => null,
  } as Storage;
}

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'light',
      values: [
        {
          name: 'light',
          value: '#ffffff',
        },
        {
          name: 'dark',
          value: '#171717',
        },
      ],
    },
    // Disable Next.js middleware for Storybook
    nextjs: {
      appDirectory: true,
    },
  },
};

export default preview;

