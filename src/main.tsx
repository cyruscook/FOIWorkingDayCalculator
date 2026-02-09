import "./css/global.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ErrorBoundary } from "react-error-boundary";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundary fallback={<p>⚠️Something went wrong</p>}>
      <App />
    </ErrorBoundary>
  </StrictMode>,
);
