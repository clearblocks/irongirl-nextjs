import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta = {
  title: 'Atoms/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'Button label text',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state with grayscale filter',
    },
    onClick: { 
      action: 'clicked',
      description: 'Click handler function',
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    label: 'Primary Button',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled Button',
    disabled: true,
  },
};

export const Interactive: Story = {
  args: {
    label: 'Click Me',
  },
  play: async () => {
    // This story demonstrates the onClick behavior
    // The action will be logged in the Actions panel
  },
};

export const LongLabel: Story = {
  args: {
    label: 'Button with a Much Longer Label Text',
  },
};

