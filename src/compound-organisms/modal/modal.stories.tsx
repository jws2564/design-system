// modal.stories.tsx
import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Modal } from "./modal";
import { Button } from "../../elements/button/button";
import { fn } from "storybook/test";

// Decorator: make sure #theme-root exists for the portal
const ensureThemeRoot = (Story: React.FC) => {
  if (!document.getElementById("theme-root")) {
    const root = document.createElement("main");
    root.id = "theme-root";
    // Optional but handy so the overlay isn't cramped in Docs
    root.style.minHeight = "700px";
    root.style.position = "relative";
    document.body.appendChild(root);
  }
  return <Story />;
};

const meta: Meta<typeof Modal> = {
  title: "Compound Organisms/Modal",
  component: Modal,
  tags: ["autodocs"],
  decorators: [ensureThemeRoot],
  parameters: {
    layout: "fullscreen", // optional, gives more width
    docs: {
      story: { inline: false }, // render in an iframe
      iframeHeight: 800, // now respected
    },
  },
  args: {
    id: "demo-modal",
    title: "Example Modal",
    isOpen: true,
    showCloseButton: true,
    closeCallback: fn(),
    children: (
      <div>
        <p>
          This is some modal content. You can put forms, text, or anything here.
        </p>
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
      table: { disable: true },
      description: "Button of variant primary shown in footer",
      type: "Button",
    },
    footerSecondaryButton: {
      table: {
        disable: true,
        description: "Button of variant secondary show in footer",
        type: "Button",
      },
    },
    children: {
      control: "object",
      description: "Modal body markup",
      type: "ReactNode",
    },
  },
};
export default meta;

type Story = StoryObj<typeof Modal>;

/**
 * Stateful playground to demo open/close behavior.
 */
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
  },
  render: Playground.render,
};

export const LongContent: Story = {
  args: {
    children: (
      <div>
        {Array.from({ length: 20 }).map((_, i) => (
          <p key={i}>
            Line {i + 1}: Lorem ipsum dolor sit amet, consectetur adipiscing
            elit.
          </p>
        ))}
      </div>
    ),
  },
  render: Playground.render,
};
