import type { Meta, StoryObj } from "@storybook/react-vite";
import { TextInput } from "./text-input";

const meta = {
  title: "Elements/TextInput",
  tags: ["autodocs"],
  component: TextInput,
  parameters: {
    docs: {
      description: {
        component:
          "Text input component for form fields. Inherits all native input attributes.",
      },
    },
    component: TextInput,
  },
  argTypes: {
    showClearButton: { control: "boolean" },
    onClearCallback: { action: "clicked" },
  },
} satisfies Meta<typeof TextInput>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    showClearButton: false,
  },
};

export const WithClearButton: Story = {
  args: {
    showClearButton: true,
  },
};
