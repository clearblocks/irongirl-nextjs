import { LanguageSwitcher } from "./LanguageSwitcher";

import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Molecules/LanguageSwitcher",
  component: LanguageSwitcher,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof LanguageSwitcher>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const InNavigation: Story = {
  decorators: [
    (Story) => (
      <nav className="bg-white border-b border-gray-200 py-4 px-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="font-hero text-2xl text-primary">IronGirl</h1>
          <div className="flex gap-6 items-center">
            <button
              type="button"
              className="font-sans text-base text-foreground hover:text-primary"
            >
              Home
            </button>
            <button
              type="button"
              className="font-sans text-base text-foreground hover:text-primary"
            >
              About
            </button>
            <Story />
          </div>
        </div>
      </nav>
    ),
  ],
};
