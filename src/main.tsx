import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.scss";
import App from "./App.tsx";
import { ThemeProvider } from "./Theme-Provider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider as="main">
      <App />
    </ThemeProvider>
  </StrictMode>,
);
