import { useState } from "react";
import "./App.scss";
import { Button } from "./elements/button/button.tsx";
import PerformanceTestPage from "./performance-test.tsx";

function App() {
  const [showPerformanceTest, setShowPerformanceTest] = useState(false);
  return (
    <>
      <Button
        text="Run Performance Test"
        onClick={() => setShowPerformanceTest(true)}
      />
      {showPerformanceTest && <PerformanceTestPage />}
    </>
  );
}

export default App;
