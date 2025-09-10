import type { Meta, StoryObj } from "@storybook/react-vite";
import { FormField } from "./form-field";
import { TextInput } from "../../elements/text-input/text-input";
import { MenuInput } from "../../organisms/menu-input/menu-input.tsx";
import { fn } from "storybook/test";
import React from "react";

const menuInput = (
  <MenuInput
    selectedListIemId="1"
    labelText="Menu Input"
    onSelectCallback={() => fn}
    items={[
      { id: "1", label: "Option One", value: "value one" },
      { id: "2", label: "Option One", value: "value two" },
    ]}
  />
);

const meta: Meta<typeof FormField> = {
  title: "Compounds/FormField",
  component: FormField,
  tags: ["autodocs"],
  args: {
    labelText: "Label",
  },
  argTypes: {
    labelText: {
      control: "text",
      description: "Label to display above the input element.",
    },
    className: {
      control: "text",
      description: "CSS classname to apply",
    },
    labelFor: {
      control: "text",
      description: "Value to set as the for attribute on the label",
    },
    field: {
      control: { type: "select" },
      description: "Accepts a component of type MenuItem or TextInput",
      options: ["MenuInput", "TextInput"],
      mapping: {
        MenuInput: menuInput,
        TextInput: <TextInput placeholder="Enter Text" />,
      },
    },
  },
};
export default meta;

type Story = StoryObj<typeof FormField>;

export const Default: Story = {
  args: {
    labelText: "Text Input Form Field",
    field: "TextInput",
  },
};

export const MenuInputField: Story = {
  args: {
    labelText: "Text Input Form Field",
    field: "MenuInput",
  },
  decorators: [
    (Story) => (
      <div style={{ minHeight: 300, padding: 16 }}>
        <Story />
      </div>
    ),
  ],
};
