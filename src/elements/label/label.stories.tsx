import type { Meta, StoryObj } from "@storybook/react-vite";

import { ElementShowcase } from "../element-showcase";
import showcaseStyles from "../element-showcase.module.scss";
import { Label } from "./label";

const meta = {
  title: "Elements/Label",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "A compact, non-interactive label for short metadata and status cues. It inherits native span attributes for titles, data attributes, and contextual styling.",
      },
    },
    layout: "fullscreen",
  },
  component: Label,
} satisfies Meta<typeof Label>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    text: "Central time",
  },
  render: (args) => (
    <ElementShowcase
      eyebrow="Elements / Metadata"
      title="Label"
      description="Labels add concise context without competing with the content they describe. Color can shift with meaning while the shape stays familiar."
      facts={[
        { label: "Element", value: "Semantic <span>" },
        { label: "Best for", value: "Status · Category · Metadata" },
        { label: "Density", value: "Short phrases only" },
      ]}
    >
      <div className={showcaseStyles.labelCloud}>
        <Label {...args} />
        <Label text="Available" />
        <Label
          text="Information"
          style={{ background: "var(--color-light-blue)" }}
        />
      </div>
    </ElementShowcase>
  ),
};

export const Default: Story = {
  args: {
    text: "Timezone Label",
  },
  parameters: { layout: "centered" },
};
export const DescriptionOnHover: Story = {
  args: {
    text: "Timezone Label",
    title: "Timezone Description",
  },
  parameters: { layout: "centered" },
};
export const CustomBackgroundColor: Story = {
  args: {
    text: "Timezone Label",
    style: { background: "var(--color-light-blue)" },
  },
  parameters: { layout: "centered" },
};
