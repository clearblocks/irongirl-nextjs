import { TextArea } from "./TextArea";

import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Atoms/TextArea",
  component: TextArea,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    placeholder: {
      control: "text",
      description: "Placeholder text for the textarea",
    },
    disabled: {
      control: "boolean",
      description: "Disabled state of the textarea",
    },
    error: {
      control: "boolean",
      description: "Error state of the textarea",
    },
    required: {
      control: "boolean",
      description: "Whether the textarea is required",
    },
  },
} satisfies Meta<typeof TextArea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: "message",
    placeholder: "Enter your message...",
    required: false,
  },
};

export const WithValue: Story = {
  args: {
    name: "message",
    value: "This is some sample text in the textarea.",
    placeholder: "Enter your message...",
  },
};

export const Disabled: Story = {
  args: {
    name: "message",
    placeholder: "This field is disabled",
    disabled: true,
  },
};

export const Error: Story = {
  args: {
    name: "message",
    placeholder: "This field has an error",
    error: true,
  },
};

export const Required: Story = {
  args: {
    name: "message",
    placeholder: "This field is required",
    required: true,
  },
};
