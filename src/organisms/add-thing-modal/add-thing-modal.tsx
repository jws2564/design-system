import React, { useState } from "react";
import { Modal } from "../../compounds/modal/modal.tsx";
import styles from "./add-thing-modal.module.scss";
import { TabSet } from "../../compounds/tab-set/tab-set.tsx";
import { FormField } from "../../compounds/form-field/form-field.tsx";
import { TextInput } from "../../elements/text-input/text-input.tsx";
import { MenuInput } from "../../mixtures/menu-input/menu-input.tsx";
import { Button } from "../../elements/button/button.tsx";
import { Label } from "../../elements/label/label.tsx";

const tabs = [
  {
    id: "1",
    label: "Create New",
    type: "button",
  },
  {
    id: "2",
    label: "Use Example",
    type: "button",
  },
];

const itemsForTypeField = [
  {
    id: "1",
    value: "product-designer",
    label: "Product Designer",
    description: "Design and research",
    categoryId: "1",
  },
  {
    id: "2",
    value: "content-designer",
    label: "Content Designer",
    description: "Content and UX writing",
    categoryId: "1",
  },
  {
    id: "3",
    value: "software-engineer",
    label: "Software Engineer",
    description: "Product engineering",
    categoryId: "1",
  },
  {
    id: "4",
    value: "product-manager",
    label: "Product Manager",
    description: "Product strategy and delivery",
    categoryId: "2",
  },
];
const itemsForTimeZoneField = [
  {
    id: "1",
    value: "America/Chicago",
    label: "America/Chicago",
    description: "Central Time",
    categoryId: "1",
    badge: (
      <Label
        style={{ background: "var(--color-light-green)" }}
        text="UTC−6"
      />
    ),
  },
  {
    id: "2",
    value: "America/New_York",
    label: "America/New_York",
    description: "Eastern Time",
    categoryId: "1",
    badge: <Label text="UTC−5" />,
  },
  {
    id: "3",
    value: "America/Los_Angeles",
    label: "America/Los_Angeles",
    description: "Pacific Time",
    categoryId: "1",
    badge: <Label text="UTC−8" />,
  },
];

export interface AddThingFormValues {
  displayName: string;
  type: string;
  timeZone: string;
}

export interface AddThingModalProps {
  isOpen?: boolean;
  initialTabId?: "1" | "2";
  initialValues?: Partial<AddThingFormValues>;
  onCloseCallback?: () => void;
  onSubmitCallback?: (values: AddThingFormValues) => void;
}

const defaultValues: AddThingFormValues = {
  displayName: "",
  type: "1",
  timeZone: "1",
};

export const AddThingModal: React.FC<AddThingModalProps> = ({
  isOpen = true,
  initialTabId = "1",
  initialValues,
  onCloseCallback,
  onSubmitCallback,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(isOpen);
  const [formValues, setFormValues] = useState<AddThingFormValues>({
    ...defaultValues,
    ...initialValues,
  });
  const [selectedTabId, setSelectedTabId] = useState(initialTabId);
  const formValid = Boolean(
    formValues.displayName && formValues.type && formValues.timeZone,
  );
  const closeModal = () => {
    setIsModalOpen(false);
    onCloseCallback?.();
  };
  const handleTabClick = (id: string) => {
    if (id === "1" || id === "2") setSelectedTabId(id);
  };
  const applyExample = (values: AddThingFormValues) => {
    setFormValues(values);
    setSelectedTabId("1");
  };

  return (
    <Modal
      id="add-team-member"
      title="Add a team member"
      isOpen={isModalOpen}
      showCloseButton={true}
      closeCallback={closeModal}
      footerPrimaryButton={
        <Button
          text="Add member"
          disabled={!formValid}
          onClick={() => onSubmitCallback?.(formValues)}
        />
      }
      footerSecondaryButton={
        <Button onClick={closeModal} variant="secondary" text="Cancel" />
      }
    >
      <div className={styles["modal-body"]}>
        <div className={styles["tab-set-container"]}>
          <TabSet
            onSelectCallback={(tab) => handleTabClick(tab.id)}
            tabs={tabs.map((tab) => ({
              ...tab,
              isSelected: tab.id === selectedTabId,
            }))}
          />
        </div>
        <div className={styles["tab-content"]}>
          {selectedTabId === "1" && (
            <div className={styles["tab-content-form"]}>
              <div className={`${styles.row} ${styles.split}`}>
                <FormField
                  className={styles["display-name"]}
                  labelFor="display-name"
                  labelText="Display name"
                  field={
                    <TextInput
                      placeholder="e.g. Morgan Lee"
                      id="display-name"
                      name="display-name"
                      value={formValues.displayName}
                      onChange={(event) =>
                        setFormValues({
                          ...formValues,
                          displayName: event.target.value,
                        })
                      }
                    />
                  }
                />
                <FormField
                  labelFor="team-role"
                  labelText="Role"
                  className={styles.type}
                  field={
                    <MenuInput
                      id="team-role"
                      labelText="Role"
                      items={itemsForTypeField}
                      selectedListItemId={formValues.type}
                      onSelectCallback={(listItem) => {
                        setFormValues({ ...formValues, type: listItem.id });
                      }}
                      enableSearch={true}
                      categoryTabList={[
                        { id: "1", label: "Design & Engineering" },
                        { id: "2", label: "Product" },
                      ]}
                      defaultCategoryId="1"
                    />
                  }
                />
              </div>
              <div className={styles.row}>
                <FormField
                  labelFor="team-time-zone"
                  labelText="Time zone"
                  field={
                    <MenuInput
                      id="team-time-zone"
                      labelText="Time zone"
                      items={itemsForTimeZoneField}
                      selectedListItemId={formValues.timeZone}
                      onSelectCallback={(listItem) => {
                        setFormValues({
                          ...formValues,
                          timeZone: listItem.id,
                        });
                      }}
                      showSelectedCardDescription={true}
                    />
                  }
                />
              </div>
            </div>
          )}
          {selectedTabId === "2" && (
            <div className={styles["template-list"]}>
              <button
                className={styles["template-card"]}
                type="button"
                onClick={() =>
                  applyExample({
                    displayName: "Morgan Lee",
                    type: "1",
                    timeZone: "1",
                  })
                }
              >
                <strong>Remote designer</strong>
                <span>Product Designer · Central Time</span>
              </button>
              <button
                className={styles["template-card"]}
                type="button"
                onClick={() =>
                  applyExample({
                    displayName: "Avery Chen",
                    type: "4",
                    timeZone: "2",
                  })
                }
              >
                <strong>Product lead</strong>
                <span>Product Manager · Eastern Time</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};
