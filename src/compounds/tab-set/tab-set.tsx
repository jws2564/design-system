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
  return (
    <div {...rest} role="tablist">
      {tabs.map((tab, index) => {
        const { id, label, disabled, isSelected } = tab;
        return (
          <button
            className={[styles.tab, isSelected && styles.active]
              .filter(Boolean)
              .join(" ")}
            tabIndex={index}
            aria-selected={isSelected}
            aria-controls={label}
            role="tab"
            id={id}
            key={id}
            disabled={disabled}
            type="button"
            onClick={() => onSelectCallback?.(tab)}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
};
