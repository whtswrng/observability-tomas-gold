import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";

// Disabled the strict mode for debuggig purposes, making sure I'm not triggering more API requests than necessary
ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
  <App />
  // </React.StrictMode>
);
