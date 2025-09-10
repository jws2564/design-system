import React, { useState } from "react";
import type { ListItemProps } from "../../compounds/list-card/list-card.tsx";
import type { Tab } from "../../compounds/tab-set/tab-set.tsx";
import { FormField } from "../../compounds/form-field/form-field.tsx";

interface Props {
  menuItems: ListItemProps[]; //TODO clean up naming here
  labelText: string;
  enableSearch?: boolean;
  onSearch?: (searchText: string) => void;
  onItemSelect?: (item: ListItemProps) => void;
  enableTabSet?: boolean;
  tabs?: Tab[];
  onTabSelectCallback?: (tab: Tab) => void;
}

//will have a UL with LI's that will handle keyboard navigation
//base element will be a input field with a custom  icon -- will need to update
//switching tabs will change the menuItems- no it only will filter.
//will have to find the default tab set and save it
export const PopOverMenu: React.FC<Props> = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <>
      <FormField labelText="Type" />
    </>
  );
};
