import type { Meta, StoryObj } from "@storybook/react-vite";

import { Label } from "./label";

const meta = {
  title: "Elements/Label",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Label component based on html span. Inherits all native span attributes.",
      },
    },
  },
  component: Label,
} satisfies Meta<typeof Label>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    text: "Timezone Label",
  },
};
export const DescriptionOnHover: Story = {
  args: {
    text: "Timezone Label",
    title: "Timezone Description",
  },
};
export const CustomBackgroundColor: Story = {
  args: {
    text: "Timezone Label",
    style: { background: "var(--color-light-blue)" },
  },
};
