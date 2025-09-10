import React from "react";
import styles from "./tab-set.module.scss";

export interface Tab {
  id: string;
  label: string;
  disabled?: boolean;
  isSelected?: boolean;
}

type Props = React.HTMLAttributes<HTMLDivElement> & {
  tabs: Tab[];
  onSelectCallback?: (tab: Tab) => void;
};

//TODO keyboard navigation, etc for accessibility

export const TabSet: React.FC<Props> = ({
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
