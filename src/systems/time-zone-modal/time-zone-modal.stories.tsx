// time-zone-modal.stories.tsx
import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { TimeZoneModal } from "./time-zone-modal";
import { Button } from "../../elements/button/button";
import { fn } from "storybook/test";

// Decorator: ensure a portal target exists for the modal
const ensureThemeRoot = (Story: React.FC) => {
  if (
    typeof document !== "undefined" &&
    !document.getElementById("theme-root")
  ) {
    const root = document.createElement("div");
    root.id = "theme-root";
    // Give the canvas some vertical space so the dialog/backdrop isn’t cramped
    root.style.minHeight = "700px";
    root.style.position = "relative";
    document.body.appendChild(root);
  }
  return <Story />;
};

// Best-effort default tz (falls back to empty string)
const guessedTz =
  typeof Intl !== "undefined"
    ? Intl.DateTimeFormat().resolvedOptions().timeZone || ""
    : "";

const meta: Meta<typeof TimeZoneModal> = {
  title: "Systems/Time Zone Modal",
  component: TimeZoneModal,
  tags: ["autodocs"],
  decorators: [ensureThemeRoot],
  parameters: {
    layout: "padded",
    docs: {
      story: { inline: false }, // render in iframe so height control applies
      iframeHeight: 760,
    },
  },
  args: {
    isOpen: true,
    defaultTimeZone: guessedTz,
    onSaveCallback: fn(() => "onSaveCallback"),
    onCloseCallback: fn(() => "onCloseCallback"),
  },
  argTypes: {
    isOpen: { control: "boolean" },
    defaultTimeZone: {
      control: "text",
      description:
        "Initial selected time zone (IANA id, e.g. 'America/Chicago')",
    },
    onSaveCallback: { action: "save", table: { category: "events" } },
    onCloseCallback: { action: "close", table: { category: "events" } },
  },
};
export default meta;

type Story = StoryObj<typeof TimeZoneModal>;

/**
 * Stateful Playground: a button to open/close the modal and pass args through.
 * The modal itself manages “name” and “timeZone” state internally (per your component).
 */
export const Playground: Story = {
  render: (args) => {
    const [open, setOpen] = React.useState<boolean>(args.isOpen);

    // Keep internal state in sync with Controls
    React.useEffect(() => setOpen(args.isOpen), [args.isOpen]);

    return (
      <div style={{ padding: 16, display: "grid", gap: 12 }}>
        <div>
          <Button
            text={open ? "Close modal" : "Open modal"}
            onClick={() => setOpen((v) => !v)}
          />
        </div>
        <TimeZoneModal
          {...args}
          isOpen={open}
          onCloseCallback={() => {
            setOpen(false);
            args.onCloseCallback?.();
          }}
          onSaveCallback={() => {
            args.onSaveCallback?.();
            setOpen(false);
          }}
        />
      </div>
    );
  },
};
