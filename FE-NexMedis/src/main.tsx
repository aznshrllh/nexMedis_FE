import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./routes";
import { Toaster } from "sonner";
import { ThemeProvider } from "./components/theme-provider";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="light" storageKey="nexmedis-theme">
      <Toaster richColors position="top-center" />
      <RouterProvider router={router} />
    </ThemeProvider>
  </StrictMode>
);
