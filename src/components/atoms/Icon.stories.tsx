import type { Meta, StoryObj } from '@storybook/react';
import { Icon } from './Icon';

const meta = {
  title: 'Atoms/Icon',
  component: Icon,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    src: {
      control: 'text',
      description: 'URL of the icon image',
    },
    alt: {
      control: 'text',
      description: 'Alternative text for accessibility',
    },
  },
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    src: '/images/file.svg',
    alt: 'File icon',
  },
};

export const Globe: Story = {
  args: {
    src: '/images/globe.svg',
    alt: 'Globe icon',
  },
};

export const Window: Story = {
  args: {
    src: '/images/window.svg',
    alt: 'Window icon',
  },
};

