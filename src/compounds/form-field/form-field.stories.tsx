import type { Meta, StoryObj } from "@storybook/react-vite";
import { FormField } from "./form-field";
import { TextInput } from "../../elements/text-input/text-input";
import { MenuInput } from "../../mixtures/menu-input/menu-input.tsx";
import { fn } from "storybook/test";
import { ElementShowcase } from "../../elements/element-showcase.tsx";
import showcaseStyles from "../compound-showcases.module.scss";

const menuInput = (
  <MenuInput
    selectedListItemId="1"
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
  parameters: {
    layout: "fullscreen",
    docs: {
      story: { inline: false, height: "720px" },
      description: {
        component:
          "A field wrapper that creates a consistent label relationship around text and menu inputs. It centralizes spacing and native label association without owning input state.",
      },
    },
  },
  args: {
    labelText: "Label",
  },
  argTypes: {
    labelText: {
      control: "text",
      type: "string",
      description: "Label to display above the input element.",
    },
    className: {
      control: "text",
      type: "string",
      description: "CSS classname to apply",
    },
    labelFor: {
      control: "text",
      type: "string",
      description: "Value to set as the for attribute on the label",
    },
    field: {
      control: { type: "select" },
      description: "Accepts a component of type MenuItem or TextInput",
      options: ["MenuInput", "TextInput"],
      table: { type: { summary: "MenuInput | TextInput" } },
      mapping: {
        MenuInput: menuInput,
        TextInput: <TextInput placeholder="Enter Text" />,
      },
    },
  },
};
export default meta;

type Story = StoryObj<typeof FormField>;

export const Primary: Story = {
  args: {
    labelFor: "team-member-name",
    labelText: "Team member name",
    field: (
      <TextInput id="team-member-name" placeholder="Enter a name" />
    ),
  },
  render: (args) => (
    <ElementShowcase
      eyebrow="Compounds / Field structure"
      title="Form field"
      description="A label and its control become one reusable unit, keeping form structure predictable as individual inputs change."
      marker="C"
      facts={[
        { label: "Composes", value: "Label · Input" },
        { label: "Association", value: "Native htmlFor" },
        { label: "State", value: "Owned by the field" },
      ]}
    >
      <div className={showcaseStyles.fieldDemo}>
        <div className={showcaseStyles.fieldPanel}>
          <FormField {...args} />
        </div>
        <p className={showcaseStyles.helper}>
          The wrapper provides structure while the supplied control retains its
          native props and behavior.
        </p>
      </div>
    </ElementShowcase>
  ),
};

export const Default: Story = {
  args: {
    labelText: "Text Input Form Field",
    field: <TextInput placeholder="Enter text" />,
  },
  parameters: { layout: "centered" },
};

export const MenuInputField: Story = {
  args: {
    labelText: "Menu input form field",
    field: menuInput,
  },
  parameters: { layout: "padded" },
  decorators: [
    (Story) => (
      <div style={{ minHeight: 300, padding: 16 }}>
        <Story />
      </div>
    ),
  ],
};
