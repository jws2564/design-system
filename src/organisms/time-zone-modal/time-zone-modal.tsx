import React, { useState } from "react";
import { Modal } from "../../compounds/modal/modal.tsx";
import { FormField } from "../../compounds/form-field/form-field.tsx";
import { TextInput } from "../../elements/text-input/text-input.tsx";
import { Button } from "../../elements/button/button.tsx";
import { MenuInput } from "../../mixtures/menu-input/menu-input.tsx";
import { getTimeZones } from "@vvo/tzdb";
import type { ListItem } from "../../compounds/list-card/list-card.tsx";
import styles from "./time-zone-modal.module.scss";

interface Props {
  onSaveCallback?: () => void;
  onCloseCallback: () => void;
  isOpen: boolean;
  defaultTimeZone?: string;
  timeZoneList?: ListItem[];
}

const timeZones: ListItem[] = getTimeZones().map((z) => ({
  id: z.name,
  value: z.name,
  offsetMinutes: z.currentTimeOffsetInMinutes,
  country: z.countryName,
  label: `(${z.currentTimeOffsetInMinutes >= 0 ? "+" : "-"}${Math.abs(z.currentTimeOffsetInMinutes) / 60}) ${z.name} – ${z.alternativeName}`,
}));

export const TimeZoneModal: React.FC<Props> = ({
  onSaveCallback,
  onCloseCallback,
  isOpen,
  defaultTimeZone = "",
  timeZoneList = timeZones,
}) => {
  const [state, setState] = useState({
    name: "",
    timeZone: defaultTimeZone,
  });

  const onSave = () => {
    if (onSaveCallback) {
      onSaveCallback();
    }
    onCloseCallback();
  };

  return (
    <Modal
      id="time-zone-modal"
      isOpen={isOpen}
      showCloseButton={true}
      footerPrimaryButton={
        <Button
          onClick={onSave}
          text="Save"
          disabled={!state.name || !state.timeZone}
        />
      }
      title={"Add Your Name and Time Zone"}
    >
      <div className={styles.container}>
        <div>
          <FormField
            field={
              <TextInput
                placeholder="Your Name"
                onChange={(e) => setState({ ...state, name: e.target.value })}
              />
            }
            labelText="Name"
          />
        </div>
        <div>
          <FormField
            field={
              <MenuInput
                onSelectCallback={(listItem) =>
                  setState({ ...state, timeZone: listItem.id })
                }
                enableSearch={true}
                labelText="Time Zone"
                items={timeZoneList}
                selectedListItemId={state.timeZone}
              />
            }
            labelText="Time Zone"
          />
        </div>
      </div>
    </Modal>
  );
};
