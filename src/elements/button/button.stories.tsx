import type { Meta, StoryObj } from "@storybook/react-vite";
import { ElementShowcase } from "../element-showcase";
import showcaseStyles from "../element-showcase.module.scss";
import { Button } from "./button";

const meta: Meta<typeof Button> = {
  title: "Elements/Button",
  component: Button,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "A compact action primitive with clear hierarchy, three sizes, and native button behavior. Use primary actions sparingly and secondary actions for supporting choices.",
      },
    },
    layout: "fullscreen",
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

export const Primary: Story = {
  args: {
    text: "Save changes",
    variant: "primary",
    size: "medium",
  },
  render: (args) => (
    <ElementShowcase
      eyebrow="Elements / Action"
      title="Button"
      description="Buttons turn intent into action. The system keeps the API small so hierarchy comes from context, not a long list of visual variants."
      facts={[
        { label: "Variants", value: "Primary · Secondary" },
        { label: "Sizes", value: "Small · Medium · Large" },
        { label: "Foundation", value: "Native <button>" },
      ]}
    >
      <div className={showcaseStyles.stack}>
        <div className={showcaseStyles.row}>
          <Button {...args} />
          <Button text="Preview" variant="secondary" size={args.size} />
          <Button text="Unavailable" size={args.size} disabled />
        </div>
        <div className={showcaseStyles.divider} />
        <div className={showcaseStyles.row}>
          <Button text="Small" size="small" />
          <Button text="Medium" size="medium" />
          <Button text="Large" size="large" />
        </div>
      </div>
    </ElementShowcase>
  ),
};

export const Default: Story = {
  args: {
    text: "Default Button",
  },
  parameters: { layout: "centered" },
};

export const Secondary: Story = {
  args: {
    text: "Secondary Button",
    variant: "secondary",
  },
  parameters: { layout: "centered" },
};

export const Small: Story = {
  args: {
    text: "Small Button",
    size: "small",
  },
  parameters: { layout: "centered" },
};

export const Large: Story = {
  args: {
    text: "Large Button",
    size: "large",
  },
  parameters: { layout: "centered" },
};

export const Disabled: Story = {
  args: {
    text: "Unavailable",
    disabled: true,
  },
  parameters: { layout: "centered" },
};
