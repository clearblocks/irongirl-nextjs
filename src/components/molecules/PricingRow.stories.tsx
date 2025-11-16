import { PricingRow } from "./PricingRow";

import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Molecules/PricingRow",
  component: PricingRow,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    name: {
      control: "text",
      description: "Name of the pricing item",
    },
    price: {
      control: "number",
      description: "Price in cents (integer)",
    },
  },
} satisfies Meta<typeof PricingRow>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: "Overhemd",
    price: 180,
  },
};

export const HigherPrice: Story = {
  args: {
    name: "Tot 6 kg",
    price: 1650,
  },
};

export const LongName: Story = {
  args: {
    name: "Blouse of overhemd korte mouwen",
    price: 180,
  },
};
