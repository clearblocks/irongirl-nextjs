import type { Meta, StoryObj } from '@storybook/react';
import { Label } from './Label';

const meta = {
  title: 'Atoms/Label',
  component: Label,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
    required: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Label>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Form Label',
  },
};

export const Required: Story = {
  args: {
    children: 'Required Field',
    required: true,
  },
};

export const Small: Story = {
  args: {
    children: 'Small Label',
    size: 'small',
  },
};

export const Medium: Story = {
  args: {
    children: 'Medium Label',
    size: 'medium',
  },
};

export const Large: Story = {
  args: {
    children: 'Large Label',
    size: 'large',
  },
};

