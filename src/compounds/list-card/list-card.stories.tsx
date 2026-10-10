// list-card.stories.tsx
import type { Meta, StoryObj } from "@storybook/react-vite";
import { ListCard } from "./list-card";
import { Icon } from "../../elements/icon/icon";
import { Label } from "../../elements/label/label";
import { ElementShowcase } from "../../elements/element-showcase";
import showcaseStyles from "../compound-showcases.module.scss";

const iconMapping = {
  None: undefined,
  Check: <Icon name="check" />,
} as const;

const badgeMapping = {
  None: undefined,
  New: <Label text="New" />,
  Beta: <Label text="Beta" />,
  Pro: <Label text="Pro" />,
} as const;

const meta: Meta<typeof ListCard> = {
  title: "Compounds/ListCard",
  component: ListCard,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      story: { inline: false, height: "720px" },
      description: {
        component:
          "A compact option summary with optional supporting text, badge, and selected-state icon. It is display-only and becomes interactive when composed inside a menu or list control.",
      },
    },
  },
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

export const Primary: Story = {
  render: (args) => (
    <ElementShowcase
      eyebrow="Compounds / Option display"
      title="List card"
      description="A repeatable content pattern gives every option a clear title, optional context, and a restrained selected state."
      marker="C"
      facts={[
        { label: "Content", value: "Label · Description" },
        { label: "Optional", value: "Badge · Selected icon" },
        { label: "Interaction", value: "Provided by parent" },
      ]}
    >
      <div className={showcaseStyles.listDemo}>
        <div className={showcaseStyles.listItem}>
          <ListCard {...args} />
        </div>
        <div
          className={`${showcaseStyles.listItem} ${showcaseStyles.listItemSelected}`}
        >
          <ListCard
            id="selected-item"
            value="selected"
            label="Selected item"
            description="Selection stays visible without overwhelming the row."
            selected
          />
        </div>
        <div className={showcaseStyles.listItem}>
          <ListCard
            id="badged-item"
            value="badged"
            label="Recently added"
            description="Optional metadata can precede the main label."
            badge={<Label text="New" />}
          />
        </div>
      </div>
    </ElementShowcase>
  ),
};

export const WithDescription: Story = {
  parameters: { layout: "centered" },
};

export const SelectedWithIconAndBadge: Story = {
  parameters: { layout: "centered" },
  args: {
    selected: true,
    selectedIcon: iconMapping.Check,
    badge: badgeMapping.New,
    label: "Selected item",
    description: "This item is selected and shows an icon + badge.",
  },
};

export const Simple: Story = {
  parameters: { layout: "centered" },
  args: {
    selected: false,
    badge: badgeMapping.None,
    description: "",
    label: "Simple list item",
  },
};
