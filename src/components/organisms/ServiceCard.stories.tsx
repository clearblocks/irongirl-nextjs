import { ServiceCard } from "./ServiceCard";

import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Organisms/ServiceCard",
  component: ServiceCard,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    title: {
      control: "text",
      description: "Title of the service",
    },
    iconSrc: {
      control: "text",
      description: "URL of the icon image",
    },
    iconAlt: {
      control: "text",
      description: "Alternative text for the icon",
    },
    description: {
      control: "text",
      description: "Description of the service",
    },
    buttonLabel: {
      control: "text",
      description: "Label text for the button",
    },
    onClick: { action: "clicked" },
  },
} satisfies Meta<typeof ServiceCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Washing: Story = {
  args: {
    title: "Wassen",
    iconSrc: "/images/file.svg",
    iconAlt: "Washing icon",
    description: "Laat je was zorgeloos aan ons over voor een frisse en schone garderobe.",
    buttonLabel: "Meer",
    onClick: () => {
      console.info("Washing service clicked");
    },
  },
};

export const Ironing: Story = {
  args: {
    title: "Strijken",
    iconSrc: "/images/globe.svg",
    iconAlt: "Ironing icon",
    description: "Professioneel strijkwerk voor kledij die er perfect uitziet.",
    buttonLabel: "Meer",
    onClick: () => {
      console.info("Ironing service clicked");
    },
  },
};

export const DryCleaning: Story = {
  args: {
    title: "Stomen",
    iconSrc: "/images/window.svg",
    iconAlt: "Dry cleaning icon",
    description: "Delicate stoffen verdienen de beste zorg met onze stoomreiniging.",
    buttonLabel: "Meer",
    onClick: () => {
      console.info("Dry cleaning service clicked");
    },
  },
};

export const ShortDescription: Story = {
  args: {
    title: "Express Service",
    iconSrc: "/images/file.svg",
    iconAlt: "Express icon",
    description: "Snelle service voor dringende zaken.",
    buttonLabel: "Nu boeken",
    onClick: () => {
      console.info("Express service clicked");
    },
  },
};
