// modal.stories.tsx
import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Modal } from "./modal.tsx";
import { Button } from "../../elements/button/button.tsx";
import { fn } from "storybook/test";

const ensureThemeRoot = (Story: React.FC) => {
  if (!document.getElementById("theme-root")) {
    const root = document.createElement("main");
    root.id = "theme-root";
    // Optional but handy so the overlay isn't cramped in Docs
    root.style.minHeight = "200px";
    root.style.position = "relative";
    document.body.appendChild(root);
  }
  return <Story />;
};

const meta: Meta<typeof Modal> = {
  title: "Compounds/Modal",
  component: Modal,
  tags: ["autodocs"],
  decorators: [ensureThemeRoot],
  parameters: {
    layout: "padded",
    docs: {
      story: { inline: false },
    },
  },
  args: {
    id: "demo-modal",
    title: "Example Modal",
    isOpen: true,
    showCloseButton: true,
    closeCallback: fn(),
    children: (
      <div style={{ width: 350 }}>
        You can put forms, text, or anything here.
      </div>
    ),
  },
  argTypes: {
    id: { control: "text" },
    title: { control: "text", description: "Title text shown in the header" },
    isOpen: { control: "boolean", description: "When true the modal opens" },
    showCloseButton: {
      control: "boolean",
      description: "When true a close button will show in the top right",
    },
    closeCallback: {
      action: "close",
      description: "Callback function fired when the modal closes",
    },
    footerPrimaryButton: {
      table: { disable: true, type: { summary: "ListItem[]" } },
      description: "Button of variant primary shown in footer",
    },
    footerSecondaryButton: {
      table: {
        disable: true,
        description: "Button of variant secondary show in footer",
        table: { type: { summary: "Button" } },
      },
    },
    children: {
      control: "object",
      description: "Modal body markup",
      table: { type: { summary: "ReactNode" } },
    },
  },
};
export default meta;

type Story = StoryObj<typeof Modal>;

export const SimpleModal: Story = {
  args: {
    title: "Simple Modal",
    showCloseButton: false,
    footerPrimaryButton: <Button text="Accept" />,
    children: <div style={{ width: 350 }}>Your message text will go here.</div>,
  },
};

export const Playground: Story = {
  render: (args) => {
    const [open, setOpen] = React.useState(args.isOpen);
    React.useEffect(() => setOpen(args.isOpen), [args.isOpen]);

    return (
      <div style={{ padding: 16 }}>
        <Button
          text={open ? "Close modal" : "Open modal"}
          onClick={() => setOpen((v) => !v)}
        />
        <Modal
          {...args}
          isOpen={open}
          closeCallback={() => {
            setOpen(false);
            args.closeCallback?.();
          }}
        />
      </div>
    );
  },
};

export const WithFooterButtons: Story = {
  args: {
    footerSecondaryButton: (
      <Button
        text="Cancel"
        variant="secondary"
        onClick={fn(() => "footerSecondaryButton.onClick")}
      />
    ),
    footerPrimaryButton: (
      <Button
        text="Confirm"
        variant="primary"
        onClick={fn(() => "footerPrimaryButton.onClick")}
      />
    ),
    children: (
      <div style={{ width: 350, padding: "8px 0 16px" }}>
        You can put forms, text, or anything here.
      </div>
    ),
  },
  render: Playground.render,
};

export const WithScroll: Story = {
  args: {
    title: "20 Lines of Text",
    children: (
      <div style={{ overflowY: "auto", height: 250 }}>
        {Array.from({ length: 20 }).map((_, i) => (
          <p style={{ margin: "0" }} key={i}>
            Line {i + 1}: Lorem ipsum dolor sit amet, consectetur adipiscing
            elit.
          </p>
        ))}
      </div>
    ),
  },
  render: Playground.render,
};
