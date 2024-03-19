"use client";

import { Toaster } from "react-hot-toast";

export const ToasterProvider = () => {
  return (
    <Toaster
      toastOptions={{
        // LOG OUT ICON
        style: {
          background: "#CAF0F8",
          color: "green",
        },
      }}
    ></Toaster>
  );
};
