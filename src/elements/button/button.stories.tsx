import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "./button";

const meta: Meta<typeof Button> = {
  title: "Elements/Button",
  component: Button,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Button component based on html button. Inherits all native button attributes.",
      },
    },
  },
  args: {
    text: "Click Me",
    variant: "primary",
    size: "medium",
  },
  argTypes: {
    text: { control: "text" },
    variant: {
      control: { type: "radio" },
      options: ["primary", "secondary"],
    },
    size: {
      control: { type: "radio" },
      options: ["small", "medium", "large"],
    },
    onClick: { action: "clicked" },
  },
};
export default meta;

type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    text: "Default Button",
  },
};

export const Primary: Story = {
  args: {
    text: "Primary Button",
    variant: "primary",
  },
};

export const Secondary: Story = {
  args: {
    text: "Secondary Button",
    variant: "secondary",
  },
};

export const Small: Story = {
  args: {
    text: "Small Button",
    size: "small",
  },
};

export const Large: Story = {
  args: {
    text: "Large Button",
    size: "large",
  },
};
