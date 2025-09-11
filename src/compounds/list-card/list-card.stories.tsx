// list-card.stories.tsx
import type { Meta, StoryObj } from "@storybook/react-vite";
import { ListCard } from "./list-card";
import { Icon } from "../../elements/icon/icon";
import { Label } from "../../elements/label/label";

const iconMapping = {
  None: undefined,
  Check: <Icon name="check" />,
} as const;

const badgeMapping = {
  None: undefined,
  New: <Label text="New" />,
  Beta: <Label text="Beta" />,
  Pro: <Label text="Prop" />,
} as const;

const meta: Meta<typeof ListCard> = {
  title: "Compounds/ListCard",
  component: ListCard,
  tags: ["autodocs"],
  args: {
    id: "item-1",
    value: "value-1",

    // Visible props
    label: "List item label",
    description: "Optional supporting text goes here.",
    selected: false,

    selectedIcon: iconMapping.Check,
    badge: badgeMapping.None,
  },
  argTypes: {
    id: {
      control: "text",
      description: "Unique ID to be used in lists of cards",
    },
    value: {
      control: "text",
      description: "Value to be set when card is selected",
    },
    categoryId: {
      control: "text",
      description: "Category ID of card",
      type: "string",
    },

    label: { control: "text", description: "Top line of text for the card" },
    description: {
      control: "text",
      description: "Second line of text under label text",
    },
    selected: {
      control: "boolean",
      description:
        "When true will display the `selectionIcon` on the left hand side",
    },

    selectedIcon: {
      options: Object.keys(iconMapping),
      mapping: iconMapping,
      control: { type: "radio" },
      description: "Icon shown when `selected` is true",
      table: { type: { summary: "Icon" } },
    },
    badge: {
      options: Object.keys(badgeMapping),
      mapping: badgeMapping,
      control: { type: "radio" },
      description: "Optional badge element to show before the label",
      table: { type: { summary: "Label" } },
    },
  },
};
export default meta;

type Story = StoryObj<typeof ListCard>;

export const WithDescription: Story = {};

export const SelectedWithIconAndBadge: Story = {
  args: {
    selected: true,
    selectedIcon: iconMapping.Check,
    badge: badgeMapping.New,
    label: "Selected item",
    description: "This item is selected and shows an icon + badge.",
  },
};

export const Simple: Story = {
  args: {
    selected: false,
    badge: badgeMapping.None,
    description: "",
    label: "Simple list item",
  },
};
