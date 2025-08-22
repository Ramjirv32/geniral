import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import App from "./Load";         // Loading screen
import HomePage from "./Home"; // Your main homepage

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/loading" element={<App />} />
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<Navigate to="/loading" />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
