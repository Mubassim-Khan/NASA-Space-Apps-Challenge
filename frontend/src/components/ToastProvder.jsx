import React from "react";
import { Toaster } from "react-hot-toast";

const ToastProvider = ({ children }) => (
  <>
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 2000,
        style: {
          background: "#333",
          color: "#fff",
        },
      }}
    />
    {children}
  </>
);

export default ToastProvider;
