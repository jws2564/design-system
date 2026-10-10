import type { Meta, StoryObj } from "@storybook/react-vite";

import { ElementShowcase } from "../element-showcase";
import showcaseStyles from "../element-showcase.module.scss";
import { Icon } from "./icon";

const meta = {
  title: "Elements/Icon",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "A small SVG wrapper for consistent sizing and accessible labeling. Decorative icons are hidden from assistive technology unless a title is supplied.",
      },
    },
    layout: "fullscreen",
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

export const Primary: Story = {
  args: {
    name: "check",
    size: "large",
    title: "Complete",
  },
  render: (args) => (
    <ElementShowcase
      eyebrow="Elements / Symbol"
      title="Icon"
      description="A deliberately small icon set handles status, dismissal, and disclosure without introducing a second visual language."
      facts={[
        { label: "Glyphs", value: "Clear · Check · Arrow" },
        { label: "Sizes", value: "12 · 18 · 24px" },
        { label: "Accessibility", value: "Decorative by default" },
      ]}
    >
      <div className={showcaseStyles.iconGrid}>
        <div className={showcaseStyles.iconCell}>
          <Icon {...args} />
          <span>Selected control</span>
        </div>
        <div className={showcaseStyles.iconCell}>
          <Icon name="clear" size="large" />
          <span>Clear input</span>
        </div>
        <div className={showcaseStyles.iconCell}>
          <Icon name="downArrow" size="large" />
          <span>Open menu</span>
        </div>
      </div>
    </ElementShowcase>
  ),
};

export const MediumIcon: Story = {
  args: {
    name: "clear",
    size: "medium",
  },
  parameters: { layout: "centered" },
};
export const LargeIcon: Story = {
  args: {
    name: "check",
    size: "large",
  },
  parameters: { layout: "centered" },
};
