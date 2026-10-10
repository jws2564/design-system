import type { Meta, StoryObj } from "@storybook/react-vite";
import { ElementShowcase } from "../element-showcase";
import showcaseStyles from "../element-showcase.module.scss";
import { TextInput } from "./text-input";

const meta = {
  title: "Elements/TextInput",
  tags: ["autodocs"],
  component: TextInput,
  parameters: {
    docs: {
      description: {
        component:
          "A focused single-line input with native text-field behavior and an optional clear action. Pair it with a visible label whenever the surrounding pattern allows.",
      },
    },
    layout: "fullscreen",
    component: TextInput,
  },
  argTypes: {
    showClearButton: { control: "boolean" },
    onClearCallback: { action: "clicked" },
  },
} satisfies Meta<typeof TextInput>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    "aria-label": "Team member name",
    placeholder: "Search by name",
    showClearButton: false,
  },
  render: (args) => (
    <ElementShowcase
      eyebrow="Elements / Input"
      title="Text input"
      description="The input keeps data entry calm and legible, with a strong keyboard focus state and an optional clear action for search-like tasks."
      facts={[
        { label: "Element", value: "Native <input>" },
        { label: "Interaction", value: "Keyboard-first focus" },
        { label: "Optional", value: "Clear action" },
      ]}
    >
      <div className={showcaseStyles.inputStack}>
        <label>
          Empty state
          <TextInput {...args} />
        </label>
        <label>
          Search with value
          <TextInput
            aria-label="Search with value"
            defaultValue="Jordan Lee"
            showClearButton
            onClearCallback={() => undefined}
          />
        </label>
        <label>
          Disabled
          <TextInput aria-label="Disabled input" value="Not editable" disabled />
        </label>
      </div>
    </ElementShowcase>
  ),
};

export const Default: Story = {
  args: {
    "aria-label": "Example text input",
    placeholder: "Enter text",
    showClearButton: false,
  },
  parameters: { layout: "centered" },
};

export const WithClearButton: Story = {
  args: {
    "aria-label": "Search",
    defaultValue: "Sample query",
    showClearButton: true,
    onClearCallback: () => undefined,
  },
  parameters: { layout: "centered" },
};
