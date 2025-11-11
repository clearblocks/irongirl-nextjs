import type { Meta, StoryObj } from '@storybook/react';
import { Card } from './Card';
import { Button } from '../atoms';

const meta = {
  title: 'Molecules/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'bordered', 'elevated'],
    },
    padding: {
      control: 'select',
      options: ['none', 'small', 'medium', 'large'],
    },
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Card Title',
    children: (
      <p>
        This is a simple card component with some content. It can be used to
        display various types of information in a contained format.
      </p>
    ),
  },
};

export const Bordered: Story = {
  args: {
    title: 'Bordered Card',
    variant: 'bordered',
    children: (
      <p>
        This card has a border around it, making it stand out from the
        background.
      </p>
    ),
  },
};

export const Elevated: Story = {
  args: {
    title: 'Elevated Card',
    variant: 'elevated',
    children: (
      <p>This card has a shadow, giving it an elevated appearance.</p>
    ),
  },
};

export const WithFooter: Story = {
  args: {
    title: 'Card with Footer',
    variant: 'elevated',
    children: (
      <p>
        This card includes a footer section that can contain actions or
        additional information.
      </p>
    ),
    footer: (
      <div className="flex gap-2 justify-end">
        <Button label="Cancel" />
        <Button label="Confirm" />
      </div>
    ),
  },
};

export const NoPadding: Story = {
  args: {
    variant: 'bordered',
    padding: 'none',
    children: (
      <div className="p-4">
        <p>
          This card has no padding by default, but content can add its own
          padding.
        </p>
      </div>
    ),
  },
};

export const SmallPadding: Story = {
  args: {
    title: 'Small Padding',
    variant: 'bordered',
    padding: 'small',
    children: <p>This card has small padding.</p>,
  },
};

export const LargePadding: Story = {
  args: {
    title: 'Large Padding',
    variant: 'elevated',
    padding: 'large',
    children: <p>This card has large padding for a more spacious feel.</p>,
  },
};

