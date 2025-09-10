import "./App.scss";
import { Button } from "./elements/button/button.tsx";
import { FormField } from "./compounds/form-field/form-field.tsx";
import { Icon } from "./elements/icon/icon.tsx";
import { useState } from "react";
import { Label } from "./elements/label/label.tsx";
import { type Tab, TabSet } from "./compounds/tab-set/tab-set.tsx";
import { TextInput } from "./elements/text-input/text-input.tsx";
import { MenuInput } from "./organisms/menu-input/menu-input.tsx";
import { Modal } from "./compound-organisms/modal/modal.tsx";
import { AddThingModal } from "./systems/add-thing-modal.tsx";

function App() {
  const [value, setValue] = useState<string>("test");
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <>
      <Button text="Cancel" type="button" variant="secondary" size="medium" />
      <Button
        disabled
        text="Add Thing"
        type="button"
        variant="primary"
        size="medium"
      />
      <Button
        text="Primary Small"
        type="button"
        variant="secondary"
        size="small"
      />
      <AddThingModal />
      <div>
        <FormField
          labelFor="Display Name"
          labelText="Display Name"
          field={
            <TextInput
              onClearCallback={() => setValue("")}
              onChange={(e) => setValue(e.target.value)}
              value={value}
              showClearButton={true}
              name="Display Name"
              placeholder="Enter Name"
            />
          }
        />
      </div>
      <div>
        <MenuInput
          labelText="Time Zone"
          enableSearch={true}
          categoryTabList={[
            { id: "1", label: "cat 1" },
            { id: "2", label: "cat 2" },
          ]}
          items={[
            {
              label: "Time Zone 1",
              description: "zone 2",
              value: "1",
              id: "1",
              categoryId: "1",
              badge: (
                <Label
                  style={{ background: "var(--color-light-green)" }}
                  text="My TIMEZONE cat 1"
                />
              ),
            },
            {
              label: "Time Zone 1",
              description: "Central Standard Time",
              value: "1",
              id: "2",
              categoryId: "2",
              badge: (
                <Label
                  style={{ background: "var(--color-light-green)" }}
                  text="My TIMEZONE cat 2 "
                />
              ),
            },
            {
              label: "Time Zone 1",
              description: "Central Standard Time",
              value: "1",
              id: "3",
              categoryId: "1",
              badge: (
                <Label
                  style={{ background: "var(--color-light-green)" }}
                  text="My TIMEZONE cat 1"
                />
              ),
            },
            {
              label: "Time Zone 1",
              description: "Central Standard Time",
              categoryId: "2",
              value: "11",
              id: "4",
              badge: (
                <Label
                  style={{ background: "var(--color-light-green)" }}
                  text="My TIMEZONE cat 2"
                />
              ),
            },
            {
              label: "Time Zone 1",
              categoryId: "1",
              description: "Central Standard Time",
              value: "1",
              id: "5",
              badge: (
                <Label
                  style={{ background: "var(--color-light-green)" }}
                  text="My TIMEZONE"
                />
              ),
            },
            {
              label: "Time Zone 1",
              categoryId: "1",
              description: "Central Standard Time",
              value: "1",
              id: "6",
              badge: (
                <Label
                  style={{ background: "var(--color-light-green)" }}
                  text="My TIMEZONE"
                />
              ),
            },
            {
              label: "Time Zone 1",
              categoryId: "1",
              description: "Central Standard Time",
              value: "1",
              id: "7",
              badge: (
                <Label
                  style={{ background: "var(--color-light-green)" }}
                  text="My TIMEZONE"
                />
              ),
            },
            {
              label: "Time Zone 1",
              description: "Central Standard Time",
              value: "1",
              id: "8",
              badge: (
                <Label
                  style={{ background: "var(--color-light-green)" }}
                  text="My TIMEZONE"
                />
              ),
            },
          ]}
          selectedId="6"
          onChange={(item) => {
            console.log(item);
          }}
        />
      </div>
      <div>
        icons
        <Icon title="close" name="clear" size="large" />
        <Icon title="open" name="downArrow" size="large" />
      </div>
      <div>
        <Label
          style={{ background: "var(--color-light-green)" }}
          text="EVENT TIMEZone"
        />
        <Label text="My TIMEZONE" />
      </div>
      <div>
        {/*<ul>*/}
        {/*  {[{ name: "Time Zone 1", description: "Central Standard Time" }].map(*/}
        {/*    ({ name, description }, index) => {*/}
        {/*      return (*/}
        {/*        <ListCard*/}
        {/*          id={"1"}*/}
        {/*          value={"1"}*/}
        {/*          key={index}*/}
        {/*          label={name}*/}
        {/*          selected={true}*/}
        {/*          selectedIcon={<Icon name={"check"} size={"small"} />}*/}
        {/*          badge={*/}
        {/*            <Label*/}
        {/*              style={{ background: "var(--color-light-green)" }}*/}
        {/*              text="My TIMEZONE"*/}
        {/*            />*/}
        {/*          }*/}
        {/*          description={description}*/}
        {/*        />*/}
        {/*      );*/}
        {/*    },*/}
        {/*  )}*/}
        {/*</ul>*/}
      </div>
      <div>
        <TabSet
          onSelectCallback={(tab: Tab) => console.log(`${tab.id} selected`)}
          tabs={[
            {
              id: "tab1",
              label: "Tab 1",
              isSelected: true,
            },
            {
              id: "tab2",
              label: "Tab 2",
            },
            {
              id: "tab3",
              label: "Tab 3 Has a Long Name",
              disabled: true,
            },
          ]}
        />
      </div>
      <Button text="Open Modal" onClick={() => setModalOpen(true)} />
      <Modal
        showCloseButton={true}
        id={"modal-1"}
        title="Add a Custom Version of a Thing"
        isOpen={modalOpen}
        closeCallback={() => setModalOpen(false)}
        footerPrimaryButton={
          <Button
            size="medium"
            text="Add Thing"
            onClick={() => setModalOpen(false)}
          />
        }
        footerSecondaryButton={
          <Button
            variant={"secondary"}
            size="medium"
            text="Cancel"
            onClick={() => setModalOpen(false)}
          />
        }
      >
        some children here
      </Modal>
    </>
  );
}

//TODO make a new page and code the full thing....
//make a component that you can reuse that has state for each modal
//in the page loop it 200 times with 100,000 random timezones

export default App;
