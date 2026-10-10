// tab-set.stories.tsx
import React, { useMemo, useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { TabSet } from "./tab-set";
import type { Tab } from "./tab-set";
import { fn } from "storybook/test";
import { ElementShowcase } from "../../elements/element-showcase";
import showcaseStyles from "../compound-showcases.module.scss";

const defaultTabs: Tab[] = [
  { id: "t-1", label: "Overview", isSelected: true },
  { id: "t-2", label: "Details" },
  { id: "t-3", label: "Settings" },
];

const meta: Meta<typeof TabSet> = {
  title: "Compounds/TabSet",
  component: TabSet,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      story: { inline: false, height: "720px" },
      description: {
        component:
          "A compact tablist for switching between related views. It supports controlled selection, disabled tabs, and arrow-key navigation through native button controls.",
      },
    },
  },
  args: {
    tabs: defaultTabs,
    onSelectCallback: fn(),
  },
  argTypes: {
    tabs: {
      control: "object",
      description: "`Array containing the list of tabs to display`",
      table: { type: { summary: "Tab[]" } },
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

type StatefulTabSetProps = React.ComponentProps<typeof TabSet> & {
  showContent?: boolean;
};

const StatefulTabSet = ({ showContent = false, ...args }: StatefulTabSetProps) => {
  const [tabs, setTabs] = useState<Tab[]>(args.tabs);

  React.useEffect(() => setTabs(args.tabs), [args.tabs]);

  const handleSelect = useMemo(
    () => (tab: Tab) => {
      setTabs((previousTabs) =>
        previousTabs.map((item) => ({
          ...item,
          isSelected: item.id === tab.id,
        })),
      );
      args.onSelectCallback?.(tab);
    },
    [args],
  );

  const selectedTab = tabs.find((tab) => tab.isSelected) ?? tabs[0];

  return (
    <>
      <TabSet {...args} tabs={tabs} onSelectCallback={handleSelect} />
      {showContent && (
        <div className={showcaseStyles.tabContent} role="tabpanel">
          <strong>{selectedTab?.label}</strong>
          <p>The selected tab determines which related view is displayed.</p>
        </div>
      )}
    </>
  );
};

export const Primary: Story = {
  render: (args) => (
    <ElementShowcase
      eyebrow="Compounds / Navigation"
      title="Tab set"
      description="Tabs keep closely related views in one place while preserving a clear sense of the active context."
      marker="C"
      facts={[
        { label: "Pattern", value: "ARIA tablist" },
        { label: "Navigation", value: "Arrow keys · Home · End" },
        { label: "State", value: "Controlled selection" },
      ]}
    >
      <div className={showcaseStyles.tabDemo}>
        <div className={showcaseStyles.tabPanel}>
          <StatefulTabSet {...args} showContent />
        </div>
      </div>
    </ElementShowcase>
  ),
};

export const Playground: Story = {
  parameters: { layout: "centered" },
  render: (args) => <StatefulTabSet {...args} />,
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
  parameters: { layout: "centered" },
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
  parameters: { layout: "padded" },
};
