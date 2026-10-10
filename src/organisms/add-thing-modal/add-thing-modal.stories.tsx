import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { AddThingModal } from "./add-thing-modal.tsx";
import { fn } from "storybook/test";
import { Button } from "../../elements/button/button.tsx";
import { ElementShowcase } from "../../elements/element-showcase.tsx";
import storyStyles from "../organism-showcases.module.scss";

const meta: Meta<typeof AddThingModal> = {
  component: AddThingModal,
  title: "Organisms/Add Thing Modal",
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      story: { inline: false, height: "760px" },
      description: {
        component:
          "A complete team-member creation workflow composed from the library's modal, tabs, form fields, menu inputs, labels, and buttons. Visitors can enter values directly or begin from an example.",
      },
    },
  },
  args: {
    isOpen: true,
    onCloseCallback: fn(),
    onSubmitCallback: fn(),
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

const AddThingController = (
  args: React.ComponentProps<typeof AddThingModal>,
) => {
  const [open, setOpen] = React.useState(args.isOpen ?? false);

  React.useEffect(() => setOpen(args.isOpen ?? false), [args.isOpen]);

  return (
    <>
      <div className={storyStyles.launch}>
        <div className={storyStyles.flowCard}>
          <span className={storyStyles.step}>01</span>
          <div>
            <strong>Launch the workflow</strong>
            <span>
              Add details manually or start with one of the supplied examples.
            </span>
          </div>
        </div>
        <Button text="Add a team member" onClick={() => setOpen(true)} />
      </div>
      {open && (
        <AddThingModal
          {...args}
          isOpen
          onCloseCallback={() => {
            setOpen(false);
            args.onCloseCallback?.();
          }}
          onSubmitCallback={(values) => {
            setOpen(false);
            args.onSubmitCallback?.(values);
          }}
        />
      )}
    </>
  );
};

export const Primary: Story = {
  args: { isOpen: false },
  render: (args) => (
    <ElementShowcase
      eyebrow="Organisms / Creation workflow"
      title="Add a team member"
      description="A complete task flow that brings navigation, fields, selection controls, validation, and modal actions into one focused experience."
      marker="O"
      facts={[
        { label: "Paths", value: "Create · Use example" },
        { label: "Fields", value: "Name · Role · Time zone" },
        { label: "Validation", value: "Required before submit" },
      ]}
    >
      <AddThingController {...args} />
    </ElementShowcase>
  ),
};

export const EmptyForm: Story = {
  parameters: { layout: "padded" },
};

export const CompletedForm: Story = {
  parameters: { layout: "padded" },
  args: {
    initialValues: {
      displayName: "Morgan Lee",
      type: "1",
      timeZone: "1",
    },
  },
};

export const ExamplePicker: Story = {
  parameters: { layout: "padded" },
  args: {
    initialTabId: "2",
  },
};
