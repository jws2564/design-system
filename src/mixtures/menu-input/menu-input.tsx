import {
  ListCard,
  type ListItem,
} from "../../compounds/list-card/list-card.tsx";
import { Icon } from "../../elements/icon/icon.tsx";
import styles from "./menu-input.module.scss";
import React, { useCallback, useId, useMemo, useRef, useState } from "react";
import { type Tab, TabSet } from "../../compounds/tab-set/tab-set.tsx";
import { TextInput } from "../../elements/text-input/text-input.tsx";
import { FormField } from "../../compounds/form-field/form-field.tsx";
import ReactDOM from "react-dom";
import { useMenuPosition } from "./use-menu-position.tsx";

export interface Props {
  id?: string;
  items: ListItem[];
  selectedListItemId: string; //must be unique id
  onSelectCallback: (item: ListItem) => void;
  categoryTabList?: Tab[];
  defaultCategoryId?: string;
  enableSearch?: boolean;
  labelText: string;
  showSelectedCardDescription?: boolean;
  closeOnSelect?: boolean;
}

export const MenuInput: React.FC<Props> = ({
  id,
  items,
  selectedListItemId,
  onSelectCallback,
  enableSearch,
  labelText,
  categoryTabList,
  defaultCategoryId,
  showSelectedCardDescription = false,
  closeOnSelect = true,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [mountNode, setMountNode] = React.useState<HTMLElement | null>(null);

  const generatedId = useId();
  const triggerId = id ?? `menu-input-${generatedId}`;
  const menuId = `${triggerId}-listbox`;
  const resolvedDefaultCategoryId =
    defaultCategoryId ?? categoryTabList?.[0]?.id ?? "";

  const [filterCategoryId, setFilterCategoryId] = useState(
    resolvedDefaultCategoryId,
  );

  const menuTriggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const openMenu = () => setMenuOpen(true);
  const closeMenu = useCallback(() => {
    setSearchText("");
    setFilterCategoryId(resolvedDefaultCategoryId);
    setMenuOpen(false);
  }, [resolvedDefaultCategoryId]);
  const toggleMenu = () => (menuOpen ? closeMenu() : openMenu());

  // Fast lookup by stable id
  const itemByValue = useMemo(() => {
    const map = new Map<string, ListItem>();
    items.forEach((item: ListItem) => map.set(item.id, item));
    return map;
  }, [items]);

  const selectedItem = itemByValue.get(selectedListItemId) ?? items[0];

  const handleListItemSelection = useCallback(
    (listItem: ListItem) => {
      onSelectCallback(listItem);
      if (closeOnSelect) closeMenu();
    },
    [closeMenu, closeOnSelect, onSelectCallback],
  );

  const handleCategorySelection = (tab: Tab) => {
    setFilterCategoryId(tab.id);
  };

  const searchFilter = (
    <div className={styles["search-filter-wrapper"]}>
      <FormField
        labelText={labelText}
        field={
          <TextInput
            onClearCallback={() => setSearchText("")}
            onChange={(event) => setSearchText(event.target.value)}
            value={searchText}
            showClearButton={true}
            name={labelText}
            placeholder="Search"
          />
        }
      />
    </div>
  );

  const tabSet = (
    <div className={styles["tab-set-categories-wrapper"]}>
      <TabSet
        onSelectCallback={handleCategorySelection}
        tabs={
          categoryTabList?.map((tab) =>
            tab.id === filterCategoryId ? { ...tab, isSelected: true } : tab,
          ) || []
        }
      />
    </div>
  );

  const menuInputClasses = [
    styles["menu-input"],
    menuOpen && styles["menu-open"],
  ]
    .filter(Boolean)
    .join(" ");

  const menuListClasses = [
    styles["menu-list"],
    enableSearch && styles["search-enabled"],
    categoryTabList && styles["category-enabled"],
  ]
    .filter(Boolean)
    .join(" ");

  const filteredItems = React.useMemo(() => {
    const normalizedSearchText = searchText.trim().toLocaleLowerCase();
    return items
      .filter(
        (item) => !filterCategoryId || item.categoryId === filterCategoryId,
      )
      .filter((item) =>
        !normalizedSearchText
          ? true
          : item.label.toLocaleLowerCase().includes(normalizedSearchText) ||
            (item.description?.toLocaleLowerCase() ?? "").includes(
              normalizedSearchText,
            ),
      );
  }, [items, filterCategoryId, searchText]);

  const { style: menuStyle } = useMenuPosition(menuTriggerRef, menuRef, {
    open: menuOpen,
    margin: 8,
    preferredPlacement: "bottom",
    watchElementResize: true,
    throttleMs: 16,
    zIndex: 1000,
  });

  const menu = menuOpen && (
    <div
      id={menuId}
      ref={menuRef}
      className={menuListClasses}
      style={menuStyle}
    >
      {enableSearch && searchFilter}
      {categoryTabList && tabSet}
      <ul role="listbox">
        {filteredItems.map((item) => (
          <li
            role="option"
            aria-selected={selectedListItemId === item.id}
            tabIndex={0}
            onClick={() => handleListItemSelection(item)}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                handleListItemSelection(item);
              }
            }}
            key={item.id}
          >
            <ListCard {...item} selected={selectedListItemId === item.id} />
          </li>
        ))}
      </ul>
    </div>
  );

  React.useEffect(() => {
    setMountNode(
      menuTriggerRef.current?.closest<HTMLElement>("[data-theme]") ??
        document.body,
    );
  }, []);

  React.useEffect(() => {
    if (!menuOpen) return;
    const onPointerDown = (e: PointerEvent) => {
      const t = e.target as Node;
      const inTrigger = !!menuTriggerRef.current?.contains(t);
      const inMenu = !!menuRef.current?.contains(t);
      if (!inTrigger && !inMenu) closeMenu();
    };
    document.addEventListener("pointerdown", onPointerDown, { capture: true });
    return () =>
      document.removeEventListener("pointerdown", onPointerDown, {
        capture: true,
      });
  }, [menuOpen, closeMenu]);

  return (
    <>
      <button
        id={triggerId}
        type="button"
        aria-controls={menuId}
        aria-expanded={menuOpen}
        aria-haspopup="listbox"
        aria-label={labelText}
        onClick={toggleMenu}
        onKeyDown={(event) => {
          if (event.key === "ArrowDown") {
            event.preventDefault();
            openMenu();
          }
          if (event.key === "Escape") {
            closeMenu();
          }
        }}
        ref={menuTriggerRef}
        className={menuInputClasses}
      >
        <div className={styles["selected-card-container"]}>
          <ListCard
            {...(showSelectedCardDescription
              ? {
                  ...selectedItem,
                  description: selectedItem.description,
                }
              : {
                  ...selectedItem,
                  description: "",
                })}
          />
        </div>
        <div className={styles["menu-input-icon-wrapper"]}>
          <Icon name="downArrow" />
        </div>
      </button>
      {mountNode && ReactDOM.createPortal(menu, mountNode)}
    </>
  );
};
