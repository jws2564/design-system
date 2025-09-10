// tab-set.stories.tsx
import React, { useMemo, useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { TabSet } from "./tab-set";
import type { Tab } from "./tab-set";
import { fn } from "storybook/test";

const defaultTabs: Tab[] = [
  { id: "t-1", label: "Overview", isSelected: true },
  { id: "t-2", label: "Details" },
  { id: "t-3", label: "Settings" },
];

const meta: Meta<typeof TabSet> = {
  title: "Compounds/TabSet",
  component: TabSet,
  tags: ["autodocs"],
  args: {
    tabs: defaultTabs,
    onSelectCallback: fn(),
  },
  argTypes: {
    tabs: {
      control: "object",
      description: "`Array containing the list of tabs to display`",
      type: "Tab[]",
    },
    onSelectCallback: {
      action: "selected",
      table: { category: "events" },
      description: "Callback function that fires when a tab is clicked",
    },
    className: {
      control: "text",
      description: "CSS class to append",
      type: "string",
    },
  },
};
export default meta;

type Story = StoryObj<typeof TabSet>;

export const Playground: Story = {
  render: (args) => {
    const [tabs, setTabs] = useState<Tab[]>(args.tabs);

    // Re-sync if controls modify the tabs array
    React.useEffect(() => setTabs(args.tabs), [args.tabs]);

    const handleSelect = useMemo(
      () => (tab: Tab) => {
        setTabs((prev) =>
          prev.map((t) => ({ ...t, isSelected: t.id === tab.id })),
        );
        args.onSelectCallback?.(tab);
      },
      [args],
    );

    return <TabSet {...args} tabs={tabs} onSelectCallback={handleSelect} />;
  },
};

export const WithDisabled: Story = {
  args: {
    tabs: [
      { id: "a", label: "Active", isSelected: true },
      { id: "b", label: "Disabled", disabled: true },
      { id: "c", label: "Another" },
    ],
  },
  render: Playground.render,
};

export const ManyTabs: Story = {
  args: {
    tabs: Array.from({ length: 8 }).map((_, i) => ({
      id: `m-${i}`,
      label: `Tab ${i + 1}`,
      isSelected: i === 0,
    })),
  },
  render: Playground.render,
};
