import type { StorybookConfig } from '@storybook/nextjs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// ES module equivalent of __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: ['@storybook/addon-links'],
  framework: {
    name: '@storybook/nextjs',
    options: {},
  },
  staticDirs: ['../public'],
  
  // Webpack configuration to handle middleware and browser APIs
  webpackFinal: async (config) => {
    // Ensure resolve configuration exists
    if (!config.resolve) {
      config.resolve = {};
    }
    if (!config.resolve.alias) {
      config.resolve.alias = {};
    }
    
    // Mock middleware and auth modules to prevent localStorage issues during build
    // These modules use browser APIs that aren't available during Storybook's webpack build
    config.resolve.alias = {
      ...config.resolve.alias,
      // Prevent middleware from being loaded in Storybook
      '../src/middleware': path.resolve(__dirname, './mocks/empty.ts'),
      '../src/middleware.ts': path.resolve(__dirname, './mocks/empty.ts'),
      // Mock auth modules
      '@/lib/auth': path.resolve(__dirname, './mocks/auth.ts'),
      '@/hooks/useAuth': path.resolve(__dirname, './mocks/useAuth.ts'),
    };
    
    return config;
  },
};

export default config;
