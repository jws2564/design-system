import React from "react";
import styles from "./tab-set.module.scss";

export interface Tab {
  id: string;
  label: string;
  disabled?: boolean;
  isSelected?: boolean;
}

type TabSetProps = React.HTMLAttributes<HTMLDivElement> & {
  tabs: Tab[];
  onSelectCallback?: (tab: Tab) => void;
};

export const TabSet: React.FC<TabSetProps> = ({
  tabs,
  onSelectCallback,
  ...rest
}) => {
  const hasSelectedTab = tabs.some((tab) => tab.isSelected);

  const moveFocus = (
    event: React.KeyboardEvent<HTMLButtonElement>,
  ) => {
    const enabledTabs = Array.from(
      event.currentTarget.parentElement?.querySelectorAll<HTMLButtonElement>(
        '[role="tab"]:not(:disabled)',
      ) ?? [],
    );
    const currentIndex = enabledTabs.indexOf(event.currentTarget);
    let nextIndex = currentIndex;

    if (event.key === "ArrowRight") nextIndex = currentIndex + 1;
    if (event.key === "ArrowLeft") nextIndex = currentIndex - 1;
    if (event.key === "Home") nextIndex = 0;
    if (event.key === "End") nextIndex = enabledTabs.length - 1;

    if (nextIndex !== currentIndex) {
      event.preventDefault();
      const nextTab = enabledTabs.at(nextIndex % enabledTabs.length);
      const wrappedTab = nextIndex < 0 ? enabledTabs.at(-1) : nextTab;
      wrappedTab?.focus();
      const selectedTab = tabs.find((tab) => tab.id === wrappedTab?.id);
      if (selectedTab) onSelectCallback?.(selectedTab);
    }
  };

  return (
    <div {...rest} role="tablist">
      {tabs.map((tab, index) => {
        const { id, label, disabled, isSelected } = tab;
        return (
          <button
            className={[styles.tab, isSelected && styles.active]
              .filter(Boolean)
              .join(" ")}
            tabIndex={isSelected || (!hasSelectedTab && index === 0) ? 0 : -1}
            aria-selected={isSelected}
            role="tab"
            id={id}
            key={id}
            disabled={disabled}
            type="button"
            onClick={() => onSelectCallback?.(tab)}
            onKeyDown={moveFocus}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
};
