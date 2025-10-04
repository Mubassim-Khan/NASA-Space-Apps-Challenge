import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

// Leaflet CSS
import "leaflet/dist/leaflet.css";
import { BrowserRouter } from "react-router-dom";
import ToastProvider from "./components/ToastProvder";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <ToastProvider>
        <App />
      </ToastProvider>
    </BrowserRouter>
  </StrictMode>
);
