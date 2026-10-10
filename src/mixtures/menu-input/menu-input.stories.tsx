import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import type { ListItem } from "../../compounds/list-card/list-card.tsx";
import type { Tab } from "../../compounds/tab-set/tab-set.tsx";
import { ElementShowcase } from "../../elements/element-showcase.tsx";
import { MenuInput } from "./menu-input.tsx";
import type { Props as MenuInputProps } from "./menu-input.tsx";
import storyStyles from "./menu-input.stories.module.scss";

const sampleItems: ListItem[] = [
  {
    id: "1",
    label: "Option One",
    description: "First choice",
    value: "value-one",
    categoryId: "cat-a",
  },
  {
    id: "2",
    label: "Option Two",
    description: "Second choice",
    value: "value-two",
    categoryId: "cat-a",
  },
  {
    id: "3",
    label: "Third Thing",
    description: "Something different",
    value: "value-three",
    categoryId: "cat-b",
  },
  {
    id: "4",
    label: "Fourth",
    description: "Another option",
    value: "value-four",
    categoryId: "cat-b",
  },
];

const sampleTabs: Tab[] = [
  { id: "cat-a", label: "Category A" },
  { id: "cat-b", label: "Category B" },
];

const meta: Meta<typeof MenuInput> = {
  title: "Mixtures/MenuInput",
  component: MenuInput,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      story: { inline: false, height: "720px" },
      description: {
        component:
          "A composed selection control that combines a trigger, searchable list, category tabs, and selected-state feedback. Use it when a standard select cannot provide enough context for each option.",
      },
    },
  },
  args: {
    items: sampleItems,
    selectedListItemId: "1",
    labelText: "Search",
    enableSearch: true,
    categoryTabList: sampleTabs,
    defaultCategoryId: "cat-a",
    showSelectedCardDescription: false,
    closeOnSelect: true,
    onSelectCallback: fn(),
  },
  argTypes: {
    items: {
      control: "object",
      description: "Array of `ListItem` to be shown in the menu",
      table: { type: { summary: "ListItem[]" } },
    },
    categoryTabList: {
      control: "object",
      description: "Array of `Tab` used to populate the `TabSet`",
      table: { type: { summary: "Tab[]" } },
    },
    defaultCategoryId: {
      control: "text",
      description:
        "CategoryId of the tab that will show as selected by default",
    },
    selectedListItemId: {
      control: "text",
      description: "Id of the `ListItem` that is currently selected",
    },
    enableSearch: {
      control: "boolean",
      description:
        "When enabled, search filters the menu by matches in the item label and description.",
    },
    showSelectedCardDescription: {
      control: "boolean",
      table: { defaultValue: { summary: "false" } },
      description:
        "Shows or hides the description on the selected item when the menu is closed",
    },
    closeOnSelect: {
      control: "boolean",
      description: "When true the menu will close after a row is clicked",
      table: { defaultValue: { summary: "true" } },
    },
    onSelectCallback: {
      action: "select",
      description: "Callback function fired when a row is clicked",
    },
  },
};
export default meta;

type Story = StoryObj<typeof MenuInput>;

const StatefulMenuInput = (args: MenuInputProps) => {
  const [selectedId, setSelectedId] = React.useState(args.selectedListItemId);

  React.useEffect(() => {
    setSelectedId(args.selectedListItemId);
  }, [args.selectedListItemId]);

  const handleSelect: MenuInputProps["onSelectCallback"] = (item) => {
    setSelectedId(item.id);
    args.onSelectCallback?.(item);
  };

  return (
    <MenuInput
      {...args}
      selectedListItemId={selectedId}
      onSelectCallback={handleSelect}
    />
  );
};

export const Primary: Story = {
  render: (args) => (
    <ElementShowcase
      eyebrow="Mixtures / Selection"
      title="Menu input"
      description="A richer alternative to a standard select, built for choices that need supporting detail, search, or lightweight categorization."
      marker="M"
      facts={[
        { label: "Composes", value: "5 system components" },
        { label: "Filters", value: "Search · Category" },
        { label: "Selection", value: "Controlled callback" },
      ]}
    >
      <div className={storyStyles.demo}>
        <p className={storyStyles.guidance}>
          <span className={storyStyles.index}>01</span>
          Open the field to search, switch categories, and choose an item.
        </p>
        <div className={storyStyles.control}>
          <span className={storyStyles.controlLabel}>Selected option</span>
          <StatefulMenuInput {...args} />
        </div>
      </div>
    </ElementShowcase>
  ),
};

/** Stateful playground so clicking an item updates the selectedListItemId. */
export const Playground: Story = {
  parameters: { layout: "padded" },
  render: (args) => (
    <div style={{ height: 300, padding: 16 }}>
      <StatefulMenuInput {...args} />
    </div>
  ),
};

export const WithSearchAndTabs: Story = {
  args: {
    enableSearch: true,
    categoryTabList: sampleTabs,
    defaultCategoryId: "cat-a",
    showSelectedCardDescription: true,
  },
  render: Playground.render,
  parameters: { layout: "padded" },
};

export const NoSearchNoTabs: Story = {
  name: "No Search / No Tabs",
  args: {
    enableSearch: false,
    categoryTabList: undefined,
    defaultCategoryId: undefined,
  },
  render: Playground.render,
  parameters: { layout: "padded" },
};

export const PreselectedCategoryB: Story = {
  args: {
    defaultCategoryId: "cat-b",
    selectedListItemId: "3",
  },
  render: Playground.render,
  parameters: { layout: "padded" },
};
