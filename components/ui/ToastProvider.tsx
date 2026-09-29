"use client";

import { Toaster } from "react-hot-toast";

export default function ToastProvider() {
  return (
    <Toaster
      position="bottom-center"
      toastOptions={{
        style: {
          background: "#1a1a1a",
          color: "#fff",
          fontFamily: "var(--font-dmsans)",
          fontSize: "14px",
        },
        success: { iconTheme: { primary: "#e53935", secondary: "#fff" } },
      }}
    />
  );
}
