import {
  ListCard,
  type ListItem,
} from "../../compounds/list-card/list-card.tsx";
import { Icon } from "../../elements/icon/icon.tsx";
import styles from "./menu-input.module.scss";
import React, { useLayoutEffect, useMemo, useRef, useState } from "react";
import { type Tab, TabSet } from "../../compounds/tab-set/tab-set.tsx";
import { TextInput } from "../../elements/text-input/text-input.tsx";
import { FormField } from "../../compounds/form-field/form-field.tsx";
import ReactDOM from "react-dom";

export interface Props {
  items: ListItem[];
  selectedListItemId: string; //must be unique if
  onSelectCallback: (item: ListItem) => void;
  categoryTabList?: Tab[];
  defaultCategoryId?: string;
  enableSearch?: boolean;
  labelText: string;
  showSelectedCardDescription?: boolean;
  closeOnSelect?: boolean;
  //TODO could add props here to show hide badges or description
  //TODO could add a custom search/filter function prop
  //TODO handle peak req mentioned
}

//TODO accessibility..
//TODO code style clean up for inline functions

export const MenuInput: React.FC<Props> = ({
  items,
  selectedListItemId,
  onSelectCallback, //TODO rename
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
  // Menu positioning state
  const [menuPosition, setMenuPosition] = useState<{
    top: number;
    left: number;
    minWidth: number;
    placement: "top" | "bottom";
  } | null>(null);

  const getDefaultCategoryId = () => {
    //TODO get the category of the current selected item and make that show as the default
    //want to be able to scroll to selected item?
    //possibly should be at top of list?
    return defaultCategoryId ?? categoryTabList?.[0]?.id ?? "";
  };

  const [filterCategoryId, setFilterCategoryId] = useState(
    getDefaultCategoryId(),
  );

  const menuTriggerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const openMenu = () => {
    setMenuOpen(true);
  };

  const closeMenu = () => {
    setSearchText("");
    setFilterCategoryId(getDefaultCategoryId());
    setMenuOpen(false);
  };

  const toggleMenu = () => {
    if (menuOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  };

  // Fast lookup by stable id
  const itemByValue = useMemo(() => {
    const map = new Map<string, ListItem>();
    items.forEach((item: ListItem) => map.set(item.id, item));
    return map;
  }, [items]);

  const selectedItem = itemByValue.get(selectedListItemId) ?? items[0];

  const handleListItemSelection = (listItem: ListItem) => {
    console.log("handleListItemSelection");
    onSelectCallback(listItem);
    if (closeOnSelect) {
      closeMenu();
    }
  };

  const handleCategorySelection = (tab: Tab) => {
    setFilterCategoryId(tab.id);
  };

  //TODO search filtering
  //add a prop that lets you filter the data?
  //add a prop tab: Tabs[] - has an id and a label
  //tab set has a callback - we will get a value back with the category, filter the data by that category
  //value we need to filter the data - listItem will gain a category -
  //TODO tabs - will just be buttons that apply pre determined filter to list
  //TODO any on click event inside the menu needs to be captured and not bubbled
  //TODO tabbing doesn't work

  //TODO should we memoize this?
  const searchFilter = (
    <div className={styles["search-filter-wrapper"]}>
      <FormField
        labelText={labelText}
        field={
          <TextInput
            onClearCallback={() => {
              setSearchText("");
            }}
            onChange={(event) => {
              setSearchText(event.target.value);
            }}
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

  // Compute and clamp menu position to the viewport
  const computeMenuPosition = React.useCallback(() => {
    const triggerEl = menuTriggerRef.current;
    const menuEl = menuRef.current;
    if (!triggerEl || !menuEl) return;

    const viewportW = window.innerWidth;
    const viewportH = window.innerHeight;
    const margin = 8;

    const triggerRect = triggerEl.getBoundingClientRect();
    const minWidth = Math.ceil(triggerRect.width);

    // Temporarily measure the menu
    const prev = {
      position: menuEl.style.position,
      visibility: menuEl.style.visibility,
      top: menuEl.style.top,
      left: menuEl.style.left,
      minWidth: menuEl.style.minWidth,
    };
    menuEl.style.position = "fixed"; //so measurements are in viewport coordinates (not affected by scroll)
    menuEl.style.visibility = "hidden"; //avoid flicker
    menuEl.style.top = "0px"; //reset placement
    menuEl.style.left = "0px";
    menuEl.style.minWidth = `${minWidth}px`; //match trigger width

    const menuRect = menuEl.getBoundingClientRect();

    const spaceBelow = viewportH - triggerRect.bottom - margin;
    const spaceAbove = triggerRect.top - margin;
    const fitsBelow = menuRect.height <= spaceBelow;
    const fitsAbove = menuRect.height <= spaceAbove;

    let placement: "top" | "bottom" = "bottom"; //TODO can make this a prop
    let top: number;
    //prefer bottom placement by default
    if (fitsBelow || (!fitsAbove && spaceBelow >= spaceAbove)) {
      placement = "bottom";
      top = Math.min(
        triggerRect.bottom + margin,
        viewportH - margin - menuRect.height,
      );
    } else {
      placement = "top";
      top = Math.max(triggerRect.top - margin - menuRect.height, margin);
    }

    let left = triggerRect.left;
    if (left + menuRect.width + margin > viewportW) {
      left = Math.max(margin, viewportW - margin - menuRect.width);
    }
    if (left < margin) left = margin;

    // restore temp styles from measuring
    menuEl.style.position = prev.position;
    menuEl.style.visibility = prev.visibility;
    menuEl.style.top = prev.top;
    menuEl.style.left = prev.left;
    menuEl.style.minWidth = prev.minWidth;

    setMenuPosition({
      top: Math.round(top),
      left: Math.round(left),
      minWidth,
      placement,
    });
  }, []);

  const triggerWidth = Math.ceil(
    menuTriggerRef.current?.getBoundingClientRect().width ?? 0,
  );

  const menu = menuOpen && (
    <div
      ref={menuRef}
      className={menuListClasses}
      style={{
        position: "fixed",
        // If not positioned yet, put it at 0,0 and hide it for measurement.
        top: menuPosition ? `${menuPosition.top}px` : "0px",
        left: menuPosition ? `${menuPosition.left}px` : "0px",
        minWidth: menuPosition
          ? `${menuPosition.minWidth}px`
          : `${triggerWidth}px`,
        visibility: menuPosition ? "visible" : "hidden",
        pointerEvents: menuPosition ? "auto" : "none",
        // zIndex optional if you still need it above siblings
        zIndex: 1000,
      }}
    >
      {enableSearch && searchFilter}
      {categoryTabList && tabSet}
      <ul role="listbox">
        {items
          // ... your filters/map unchanged
          .map((item) => (
            <li
              role="option"
              onClick={() => handleListItemSelection(item)}
              key={item.id}
            >
              <ListCard {...item} selected={selectedListItemId === item.id} />
            </li>
          ))}
      </ul>
    </div>
  );

  //TODO calculate position based on menu trigger ref
  React.useEffect(() => {
    setMountNode(document.getElementById("theme-root") ?? document.body);
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

  useLayoutEffect(() => {
    if (!menuOpen) return;
    computeMenuPosition();
    const onResize = () => computeMenuPosition();
    const onScroll = () => computeMenuPosition();

    window.addEventListener("resize", onResize, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onScroll);
    };
  }, [
    menuOpen,
    computeMenuPosition,
    searchText,
    filterCategoryId,
    items.length,
  ]);

  return (
    <>
      <div
        onClick={toggleMenu}
        ref={menuTriggerRef}
        tabIndex={0}
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
      </div>
      {mountNode && ReactDOM.createPortal(menu, mountNode)}
    </>
  );
};
