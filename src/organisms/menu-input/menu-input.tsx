import {
  ListCard,
  type ListItem,
} from "../../compounds/list-card/list-card.tsx";
import { Icon } from "../../elements/icon/icon.tsx";
import styles from "./menu-input.module.scss";
import React, { useMemo, useRef, useState } from "react";
import { type Tab, TabSet } from "../../compounds/tab-set/tab-set.tsx";
import { TextInput } from "../../elements/text-input/text-input.tsx";
import { FormField } from "../../compounds/form-field/form-field.tsx";

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

  const handleBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    const next = e.relatedTarget as Node | null;
    if (!next || !menuTriggerRef.current?.contains(next)) {
      closeMenu();
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
    if (closeOnSelect) {
      closeMenu();
    }
    onSelectCallback(listItem);
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
  //TODO tabing doesn't work

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

  const menuInputclasses = [
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

  return (
    <div
      ref={menuTriggerRef}
      tabIndex={0}
      onBlur={handleBlur}
      className={menuInputclasses}
    >
      <div className={styles["selected-card-container"]} onClick={toggleMenu}>
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
        <Icon name="downArrow" onClick={toggleMenu} />
        {menuOpen && (
          <div ref={menuRef} className={menuListClasses}>
            {enableSearch && searchFilter}
            {categoryTabList && tabSet}
            <ul>
              {items
                .filter((item) => {
                  //filter by category first
                  if (filterCategoryId === "") {
                    return true;
                  }
                  return item.categoryId === filterCategoryId;
                })
                .filter((item) => {
                  //filter by search text
                  if (!searchText) {
                    return true;
                  }
                  const searchTextLower = searchText.toLowerCase();
                  const itemLabelLower = item.label.toLowerCase();
                  const itemDescriptionLower =
                    item.description?.toLowerCase() ?? "";
                  return (
                    itemDescriptionLower.includes(searchTextLower) ||
                    itemLabelLower.includes(searchTextLower)
                  );
                })
                .map((item) => {
                  return (
                    //TODO could memoize this if needed
                    <li
                      onClick={() => handleListItemSelection(item)}
                      key={item.id}
                    >
                      <ListCard
                        {...item}
                        selected={selectedListItemId === item.id}
                      />
                    </li>
                  );
                })}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};
