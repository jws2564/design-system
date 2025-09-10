import React from "react";
import styles from "./list-card.module.scss";
import type { Label } from "../../elements/label/label.tsx";
import { Icon, type Icon as IconType } from "../../elements/icon/icon.tsx";

export interface ListItem {
  selected?: boolean;
  label: string;
  description?: string;
  selectedIcon?: React.ReactElement<
    React.ComponentProps<typeof IconType>,
    typeof IconType
  >;
  value: string;
  id: string;
  badge?: React.ReactElement<React.ComponentProps<typeof Label>, typeof Label>;
  categoryId?: string;
}

export const ListCard: React.FC<ListItem> = ({
  selected = false,
  label,
  description,
  selectedIcon = <Icon name="check" />,
  badge,
}) => {
  return (
    <div className={styles["list-card"]}>
      <div>
        {selected && (
          <span className={styles["selected-icon"]} aria-hidden="true">
            {selectedIcon}
          </span>
        )}
        {badge && <span className={styles.badge}>{badge}</span>}
        <span className={styles.label}>{label}</span>
      </div>
      {description && (
        <div title={description} className={styles.description}>
          {description}
        </div>
      )}
    </div>
  );
};
