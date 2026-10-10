// time-zone-modal.stories.tsx
import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { TimeZoneModal } from "./time-zone-modal.tsx";
import { Button } from "../../elements/button/button.tsx";
import { fn } from "storybook/test";
import { ElementShowcase } from "../../elements/element-showcase.tsx";
import storyStyles from "../organism-showcases.module.scss";

// Best-effort default tz (falls back to empty string)
const guessedTz =
  typeof Intl !== "undefined"
    ? Intl.DateTimeFormat().resolvedOptions().timeZone || ""
    : "";

const meta: Meta<typeof TimeZoneModal> = {
  title: "Organisms/Time Zone Modal",
  component: TimeZoneModal,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      story: { inline: false, height: "520px" },
      description: {
        component:
          "A focused profile workflow that collects a person's name and IANA time zone. Searchable selection, validation, and save behavior are composed inside the shared modal pattern.",
      },
    },
  },
  args: {
    isOpen: false,
    defaultName: "",
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
    defaultName: {
      control: "text",
      description: "Initial value for the name field",
    },
    onSaveCallback: { action: "save", table: { category: "events" } },
    onCloseCallback: { action: "close", table: { category: "events" } },
  },
};
export default meta;

type Story = StoryObj<typeof TimeZoneModal>;

const TimeZoneController = ({
  showcase = false,
  ...args
}: React.ComponentProps<typeof TimeZoneModal> & { showcase?: boolean }) => {
  const [open, setOpen] = React.useState<boolean>(args.isOpen);

  React.useEffect(() => setOpen(args.isOpen), [args.isOpen]);

  const trigger = (
    <Button
      text={open ? "Close modal" : "Add profile details"}
      onClick={() => setOpen((value) => !value)}
    />
  );

  return (
    <>
      {showcase ? (
        <div className={storyStyles.launch}>
          <div className={storyStyles.flowCard}>
            <span className={storyStyles.step}>01</span>
            <div>
              <strong>Complete profile details</strong>
              <span>
                Add a name and select a searchable IANA time zone before
                saving.
              </span>
            </div>
          </div>
          {trigger}
        </div>
      ) : (
        <div style={{ padding: 16 }}>{trigger}</div>
      )}
      <TimeZoneModal
        {...args}
        isOpen={open}
        onCloseCallback={() => {
          setOpen(false);
          args.onCloseCallback?.();
        }}
        onSaveCallback={(values) => {
          args.onSaveCallback?.(values);
          setOpen(false);
        }}
      />
    </>
  );
};

export const Primary: Story = {
  args: { isOpen: false },
  parameters: { docs: { story: { height: "640px" } } },
  render: (args) => (
    <ElementShowcase
      eyebrow="Organisms / Profile workflow"
      title="Name and time zone"
      description="A concise two-field workflow that combines searchable selection and validation inside the shared modal shell."
      marker="O"
      facts={[
        { label: "Fields", value: "Name · Time zone" },
        { label: "Data", value: "IANA time zones" },
        { label: "Validation", value: "Save requires both" },
      ]}
    >
      <TimeZoneController {...args} showcase />
    </ElementShowcase>
  ),
};

/** Stateful playground that keeps the external open state synchronized. */
export const Playground: Story = {
  parameters: { layout: "padded" },
  render: (args) => <TimeZoneController {...args} />,
};

export const CompletedForm: Story = {
  parameters: { layout: "padded" },
  args: {
    defaultName: "Morgan Lee",
    defaultTimeZone: "America/Chicago",
  },
  render: Playground.render,
};
