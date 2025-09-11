import type { Meta, StoryObj } from "@storybook/react-vite";
import { AddThingModal } from "./add-thing-modal.tsx";

const meta = {
  component: AddThingModal,
  title: "Systems/Add Thing Modal",
} satisfies Meta<typeof AddThingModal>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
