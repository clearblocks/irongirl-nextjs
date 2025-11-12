import type { Meta, StoryObj } from '@storybook/react';
import { PricingTable } from './PricingTable';

const meta = {
  title: 'Organisms/PricingTable',
  component: PricingTable,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'Optional title for the pricing table',
    },
    subtitle: {
      control: 'text',
      description: 'Optional subtitle for the pricing table',
    },
  },
} satisfies Meta<typeof PricingTable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Strijken',
    subtitle: 'Dames- en herenkleding',
    priceItems: [
      { name: 'Overhemd', price: 180 },
      { name: 'Blouse', price: 180 },
      { name: 'Blouse of overhemd korte mouwen', price: 180 },
      { name: 'Colbert', price: 180 },
      { name: 'Gilet', price: 180 },
      { name: 'Rok', price: 180 },
      { name: 'Korte broek', price: 180 },
    ],
  },
};

export const WithoutSubtitle: Story = {
  args: {
    title: 'Wassen',
    priceItems: [
      { name: 'Tot 6 kg', price: 1650 },
      { name: 'Tot 9 kg', price: 2300 },
      { name: 'Tot 12 kg', price: 2900 },
    ],
  },
};

export const MinimalData: Story = {
  args: {
    priceItems: [
      { name: 'Service 1', price: 500 },
      { name: 'Service 2', price: 750 },
    ],
  },
};

export const SingleItem: Story = {
  args: {
    title: 'Special Service',
    priceItems: [{ name: 'Premium wash', price: 3500 }],
  },
};

