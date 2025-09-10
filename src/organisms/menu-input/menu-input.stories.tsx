// menu-input.stories.tsx
import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { MenuInput } from "./menu-input";
import type { Props as MenuInputProps } from "./menu-input";
import type { ListItem } from "../../compounds/list-card/list-card";
import type { Tab } from "../../compounds/tab-set/tab-set";
import { fn } from "storybook/test";

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
  title: "Organisms/MenuInput",
  component: MenuInput,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div style={{ minHeight: 300, padding: 16 }}>
        <Story />
      </div>
    ),
  ],
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
      type: "ListItem[]",
    },
    categoryTabList: {
      control: "object",
      description: "Array of `Tab` used to populate the `TabSet`",
      type: "Tab[]",
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
        "When enabled a search filter will be available in the menu. Search filters the menu list by matches in the `description` and `label` fields of the `ListItem`",
    },
    showSelectedCardDescription: {
      control: "boolean",
      table: {
        defaultValue: { summary: "false" },
      },
      description:
        "Shows or hides the description on the selected item when the menu is closed",
    },
    closeOnSelect: {
      control: "boolean",
      description: "When true the menu will close after a row is clicked",
      table: {
        defaultValue: { summary: "true" },
      },
    },
    onSelectCallback: {
      action: "select",
      description: "Callback function fired when a row is clicked",
    },
  },
};
export default meta;

type Story = StoryObj<typeof MenuInput>;

/** Stateful playground so clicking an item updates the selectedListItemId */
export const Playground: Story = {
  render: (args) => {
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
  },
};

export const WithSearchAndTabs: Story = {
  args: {
    enableSearch: true,
    categoryTabList: sampleTabs,
    defaultCategoryId: "cat-a",
    showSelectedCardDescription: true,
  },
  render: Playground.render,
};

export const NoSearch_NoTabs: Story = {
  args: {
    enableSearch: false,
    categoryTabList: undefined,
    defaultCategoryId: undefined,
  },
  render: Playground.render,
};

export const PreselectedCategoryB: Story = {
  args: {
    defaultCategoryId: "cat-b",
    selectedListItemId: "3",
  },
  render: Playground.render,
};
