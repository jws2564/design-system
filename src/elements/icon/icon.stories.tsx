import type { Meta, StoryObj } from "@storybook/react-vite";

import { Icon } from "./icon";

const meta = {
  title: "Elements/Icon",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Icon component based on svg. Inherits all native svg attributes.",
      },
    },
  },
  argTypes: {
    name: {
      control: { type: "select" },
      options: ["clear", "check", "downArrow"],
      description: "Icon name",
    },
    size: {
      control: { type: "inline-radio" },
      options: ["small", "medium", "large"],
      description: "Icon size",
    },
    title: {
      control: { type: "text" },
      description: "Aria label title",
    },
    className: {
      control: { type: "text" },
      description: "Class name to append to the icon",
    },
    style: {
      control: { type: "object" },
      description: "CSS object to apply to the icon",
    },
  },

  component: Icon,
} satisfies Meta<typeof Icon>;

export default meta;

type Story = StoryObj<typeof meta>;

export const MediumIcon: Story = {
  args: {
    name: "clear",
    size: "medium",
  },
};
export const LargeIcon: Story = {
  args: {
    name: "check",
    size: "large",
  },
};
