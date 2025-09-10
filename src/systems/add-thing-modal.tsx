import React, { useState } from "react";
import { Modal } from "../compound-organisms/modal/modal.tsx";
import styles from "./add-thing-modal.module.scss";
import { TabSet } from "../compounds/tab-set/tab-set.tsx";
import { FormField } from "../compounds/form-field/form-field.tsx";
import { TextInput } from "../elements/text-input/text-input.tsx";
import { MenuInput } from "../organisms/menu-input/menu-input.tsx";
import { Button } from "../elements/button/button.tsx";
import { Label } from "../elements/label/label.tsx";

const tabs = [
  {
    id: "1",
    label: "Create New",
    type: "button",
  },
  {
    id: "2",
    label: "Choose from Template",
    type: "button",
  },
];

export const AddThingModal: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [formValues, setFormValues] = useState({
    displayName: "",
    type: "1",
    timeZone: "1",
  });
  const [selectedTabId, setSelectedTabId] = useState("1");
  const formValid =
    formValues.displayName && formValues.type && formValues.timeZone;
  const closeModal = () => setIsModalOpen(false);
  const handleTabClick = (id: string) => setSelectedTabId(id);

  return (
    <Modal
      id="Add Anything"
      title="Add One of Your Custom Things"
      isOpen={isModalOpen}
      showCloseButton={true}
      closeCallback={closeModal}
      footerPrimaryButton={<Button text="Add Thing" disabled={!formValid} />}
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
                  labelText="Display Name"
                  field={
                    <TextInput
                      placeholder="Enter Name"
                      id="display-name"
                      name="display-name"
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          displayName: e.target.value,
                        })
                      }
                    />
                  }
                />
                <FormField
                  labelFor="type"
                  labelText="Type"
                  className={styles.type}
                  field={
                    <MenuInput
                      labelText="Type"
                      items={[
                        {
                          id: "1",
                          value: "cool-thing-value-1",
                          label: "Cool Thing",
                          description:
                            "Has user generated description that is long",
                          categoryId: "1",
                        },
                        {
                          id: "2",
                          value: "option-2",
                          label: "Option",
                          description:
                            "Has user generated description that is long",
                          categoryId: "1",
                        },
                        {
                          id: "3",
                          value: "option-3",
                          label: "Option",
                          categoryId: "1",
                        },
                        {
                          id: "4",
                          value: "option-4",
                          label: "Option",
                          categoryId: "1",
                        },
                        {
                          id: "5",
                          value: "option-5",
                          label: "Option",
                          categoryId: "1",
                        },
                        {
                          id: "6",
                          value: "option-6",
                          label: "Option",
                          description: "This is an option for category 2",
                          categoryId: "2",
                        },
                      ]}
                      selectedListIemId={formValues.type}
                      onSelectCallback={(listItem) => {
                        setFormValues({ ...formValues, type: listItem.id });
                      }}
                      enableSearch={true}
                      categoryTabList={[
                        { id: "1", label: "SubCat 1" },
                        { id: "2", label: "SubCat 2" },
                      ]}
                      defaultCategoryId={"1"}
                    />
                  }
                />
              </div>
              <div className={styles.row}>
                <FormField
                  labelFor="timezone"
                  labelText="Time Zone"
                  field={
                    <MenuInput
                      labelText="Time Zone"
                      items={[
                        {
                          id: "1",
                          value: "cool-thing-value-1",
                          label: "Cool Thing",
                          description:
                            "Has user generated description that is long",
                          categoryId: "1",
                          badge: (
                            <Label
                              style={{ background: "var(--color-light-green)" }}
                              text="My TIMEZONE cat 1"
                            />
                          ),
                        },
                        {
                          id: "2",
                          value: "option-2",
                          label: "Option",
                          description:
                            "Has user generated description that is long",
                          categoryId: "1",
                        },
                        {
                          id: "3",
                          value: "option-3",
                          label: "Option",
                          categoryId: "1",
                        },
                        {
                          id: "4",
                          value: "option-4",
                          label: "Option",
                          categoryId: "1",
                        },
                        {
                          id: "5",
                          value: "option-5",
                          label: "Option",
                          categoryId: "1",
                        },
                        {
                          id: "6",
                          value: "option-6",
                          label: "Option",
                          description: "This is an option for category 2",
                          categoryId: "2",
                        },
                      ]}
                      selectedListIemId={formValues.timeZone}
                      onSelectCallback={(listItem) => {
                        setFormValues({ ...formValues, timeZone: listItem.id });
                      }}
                      showSelectedCardDescription={true}
                    />
                  }
                />
              </div>
            </div>
          )}
          {selectedTabId === "2" && <div>TODO</div>}
        </div>
      </div>
    </Modal>
  );
};
