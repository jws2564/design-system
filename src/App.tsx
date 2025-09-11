import { useState } from "react";
import "./App.scss";
//import { AddThingModal } from "./systems/add-thing-modal/add-thing-modal.tsx";
import { TimeZoneModal } from "./organisms/time-zone-modal/time-zone-modal.tsx";

function App() {
  //return <AddThingModal />;
  const [isOpen, setIsOpen] = useState(true);
  return (
    <TimeZoneModal
      isOpen={isOpen}
      onCloseCallback={() => setIsOpen(false)}
      defaultTimeZone={"America/Chicago"}
    />
  );
}

export default App;
