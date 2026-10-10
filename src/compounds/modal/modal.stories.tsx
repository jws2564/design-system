// modal.stories.tsx
import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Modal } from "./modal.tsx";
import { Button } from "../../elements/button/button.tsx";
import { fn } from "storybook/test";
import { ElementShowcase } from "../../elements/element-showcase.tsx";
import showcaseStyles from "../compound-showcases.module.scss";

const meta: Meta<typeof Modal> = {
  title: "Compounds/Modal",
  component: Modal,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      story: { inline: false, height: "720px" },
      description: {
        component:
          "A controlled dialog shell with optional title, close control, scrollable body, and two-action footer. Content and open state stay with the parent workflow.",
      },
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

const ModalController = ({
  showcase = false,
  ...args
}: React.ComponentProps<typeof Modal> & { showcase?: boolean }) => {
  const [open, setOpen] = React.useState(args.isOpen);
  React.useEffect(() => setOpen(args.isOpen), [args.isOpen]);

  const trigger = (
    <Button
      text={open ? "Close modal" : "Open modal"}
      onClick={() => setOpen((value) => !value)}
    />
  );

  return (
    <>
      {showcase ? (
        <div className={showcaseStyles.modalDemo}>
          <div className={showcaseStyles.modalPanel}>
            <p>
              The dialog is controlled by its parent and rendered in a portal
              above the current workflow.
            </p>
          </div>
          {trigger}
        </div>
      ) : (
        <div style={{ padding: 16 }}>{trigger}</div>
      )}
      <Modal
        {...args}
        isOpen={open}
        closeCallback={() => {
          setOpen(false);
          args.closeCallback?.();
        }}
      />
    </>
  );
};

export const Primary: Story = {
  args: {
    isOpen: false,
    title: "Confirm selection",
    children: (
      <div style={{ width: 350, padding: "8px 0 16px" }}>
        Review the selection before continuing.
      </div>
    ),
    footerSecondaryButton: <Button text="Cancel" variant="secondary" />,
    footerPrimaryButton: <Button text="Confirm" variant="primary" />,
  },
  render: (args) => (
    <ElementShowcase
      eyebrow="Compounds / Overlay"
      title="Modal"
      description="A focused layer for decisions that need context, supporting content, and an explicit path forward or back."
      marker="C"
      facts={[
        { label: "Element", value: "Native <dialog>" },
        { label: "Structure", value: "Header · Body · Footer" },
        { label: "State", value: "Parent controlled" },
      ]}
    >
      <ModalController {...args} showcase />
    </ElementShowcase>
  ),
};

export const SimpleModal: Story = {
  parameters: { layout: "padded" },
  args: {
    title: "Simple Modal",
    showCloseButton: false,
    footerPrimaryButton: <Button text="Accept" />,
    children: <div style={{ width: 350 }}>Your message text will go here.</div>,
  },
};

export const Playground: Story = {
  parameters: { layout: "padded" },
  render: (args) => <ModalController {...args} />,
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
  parameters: { layout: "padded" },
};

export const WithScroll: Story = {
  args: {
    title: "20 Lines of Text",
    children: (
      <div
        aria-label="Scrollable example content"
        style={{ overflowY: "auto", height: 250 }}
        tabIndex={0}
      >
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
  parameters: { layout: "padded" },
};
